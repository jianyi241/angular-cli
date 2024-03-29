import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../../service/review.service";
import {arr1ToArr2} from "../../../utils/array";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ComparisonVo} from "../../../model/vo/comparisonVo";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonCommentInfo} from "../../../model/po/comparisonCommentInfo";
import {GroupInfo} from "../../../model/po/groupInfo";
import {PropertyInfo} from "../../../model/po/propertyInfo";
import {TabType} from "../../../model/enums/tab-type";
import {environment} from "../../../../environments/environment";
import {SaveService} from "../../../service/save.service";
import {Constants} from "../../../model/constants";
import FinalAnalyse from "../../../model/po/finalAnalyse";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {PlatformFeeChartsComponent} from "../components/charts/platform-fee-charts/platform-fee-charts.component";
import {TotalCostChartsComponent} from "../components/charts/total-cost-charts/total-cost-charts.component";
import {FeeReviewChart} from "../../../model/po/feeReviewChart";
import {ComparisonFeeInfo} from "../../../model/po/comparisonFeeInfo";
import {ComparisonMemberValueInfo} from "../../../model/po/comparisonMemberValueInfo";
import ComparisonSummary from "../../../model/po/comparisonSummary";
import {dealThousands} from "../../../utils/amount-format";
import {Commons} from "../../../utils/Commons";

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit, AfterViewInit {
    reviewSaveObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewLeaveObservable: any;
    config = {...Constants.EDITOR_CONFIG};
    section: number = 4
    comparisonInfo: ComparisonVo
    comparisonProducts = []
    comparisonTwoProducts = []
    platformCounts = {
        totalCount: 0,
        activeCount: 0
    }
    comparisonGroups = []
    businessProperties: Array<PropertyInfo> = new Array<PropertyInfo>();
    featureGroupsList: Array<GroupInfo> = new Array<GroupInfo>();
    businessGroupList: Array<GroupInfo> = new Array<GroupInfo>();
    businessCounts = {
        totalCount: 0,
        activeCount: 0
    }
    featureProperties: GroupInfo = new GroupInfo();
    currentCommit: ComparisonCommentInfo = new ComparisonCommentInfo();
    currentFinalAnalysis: FinalAnalyse = new FinalAnalyse();
    currentEditorText: string = '';
    // fee相关
    feeChartData: FeeReviewChart = null;
    feeFormData: ComparisonFeeInfo = new ComparisonFeeInfo();
    feeHeldPlatformChoose: string = ''
    feeTotalAssets: string = ''
    feeOutsideManagedAccounts: number = 0
    feeWithinManagedAccounts: number = 0

    constructor(public reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private toastRepository: ToastRepository,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private saveService: SaveService) {
    }

    ngOnInit(): void {
        this.subscribe();
        if (window.innerWidth <= 1540) {
            this.section = 3
        } else {
            this.section = 4
        }
        window.addEventListener('resize', (e: UIEvent) => {
            const windowWidth = window.innerWidth
            this.updateViewList(windowWidth, false)
        })
        this.comparisonInfo = this.reviewService.comparison
        this.activatedRoute.params.subscribe(res => {
            if (res.id) {
                this.comparisonInfo.id = res.id
            }
        })
        // this.getSummaryInfo()
    }

    @ViewChild('platformFeeChartsComponent')
    platformFeeChartsComponent: PlatformFeeChartsComponent

    @ViewChild('totalCostChartsComponent')
    totalCostChartsComponent: TotalCostChartsComponent

    ngAfterViewInit() {
        this.getSummaryInfo()
    }

    includeAnalysis(name: string): boolean {
        const idx = this.comparisonInfo.analyseVoList.findIndex(item => item.name === name)
        return idx >= 0
    }

    getDynamicAnalysis(shAnalysisId: string, list: Array<ComparisonCommentInfo>): any {
        const obj = list.find(item => item.shAnalyseId === shAnalysisId)
        return (typeof obj) != 'undefined' ? obj : ''
    }

    getParentGroupName(parentId: string): string {
        if (!parentId) return ''
        const featureGroup = this.comparisonGroups.find(item => item.tabType === TabType.features.value).groups.find(e => e.id === parentId)
        return featureGroup ? featureGroup.name : ''
    }

    getTabTypeName(tabType: number): string {
        const type = TabType.Values().find(e => e.value === tabType)
        return type ? type.name : ''
    }

    getPropertiesCountOrSelectCount(properties: Array<PropertyInfo>, type: string): number {
        if (!properties || !properties.length) return 0
        if (type === 'selected') return properties.filter(e => e.selected).length
        return properties.length
    }

    getProperties(list: Array<GroupInfo>):Array<PropertyInfo> {
        const recursion = (list: Array<GroupInfo>): Array<PropertyInfo> => {
            return list.flatMap(i => {
                if (i.properties) {
                    return i.properties
                } else if (i.groups) {
                    recursion(i.groups)
                } else if (i.subList) {
                    recursion(i.subList)
                }
            })
        }
        return recursion(list)
    }

    getGroups(list: Array<GroupInfo>, type: string): Array<GroupInfo> {
        // type: feature/metric
        const recursion = (list: Array<GroupInfo>): Array<GroupInfo> => {
            return list.flatMap(e => {
                if (e.properties) {
                        return e
                } else if (e.groups) {
                    if (type === 'metric') {
                        e.properties = e.groups.flatMap(e => e.properties)
                        return e
                    } else {
                        return recursion(e.groups)
                    }
                } else if (e.subList) {
                    return recursion(e.subList)
                }
            })
        }
        return recursion(list)
    }

    showFeatureFlag(product): void {
        return product.showFlag || (product.shProductId === this.reviewService.comparison.mainPlatformId)
    }

    getSummaryInfo(): void {
        this.reviewRepository.getSummary(this.comparisonInfo.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'get data error');
                return;
            }
            this.getFeeInfo(res.data)
            this.comparisonProducts = res.data.products.filter(res => this.showFeatureFlag(res));
            this.updateViewList(window.innerWidth, true);
            this.platformCounts = {
                totalCount: res.data.products.length,
                activeCount: this.comparisonProducts.length
            }
            this.comparisonGroups = res.data.comparisonTabs;
            const businessGroups = res.data.comparisonTabs.filter(item => [TabType.overview.value, TabType.esg.value, TabType.information.value].includes(item.tabType));
            const featureGroups = res.data.comparisonTabs.filter(item => item.tabType === TabType.features.value);
            this.featureProperties = Commons.deepCopy(featureGroups)[0];
            this.businessProperties = this.getProperties(businessGroups).filter(p => p && p.selected);
            // this.getGroupOrPropertiesList(featureGroups, 'featureGroupsList');
            this.featureGroupsList = this.getGroups(featureGroups,'feature');
            // this.getGroupOrPropertiesList(businessGroups, 'businessGroupList');
            this.businessGroupList = this.getGroups(businessGroups,'metric')
        })
    }

    getFeeInfo(data: ComparisonSummary): void {
        this.feeChartData = {platforms: data.products, totalBalance: data.totalBalance, scopes: data.scopes}
        if (this.includeAnalysis(AnalysisType.fee.value)) {
            this.platformFeeChartsComponent.setChartsData(this.feeChartData)
            this.totalCostChartsComponent.setChartsData(this.feeChartData)
        }
        this.feeFormData = data.fee
        this.feeHeldPlatformChoose = this.reviewService.finalPlatformHoldingsAndTransactions.filter(f => this.feeFormData[f.key]).map(i => i.value).toString()
        const _feeTotalAssets = this.feeFormData.members.flatMap(m => m.memberValues.map(i => i.balance)).reduce((a, b) => a + b, 0)
        this.feeTotalAssets = dealThousands(_feeTotalAssets.toString())
        const {
            mfTransactions,
            auTransactions,
            intlTransactions,
            bondTransactions,
            maMfTransactions,
            maAuTransactions,
            maIntlTransactions
        } = this.feeFormData
        this.feeOutsideManagedAccounts = mfTransactions + auTransactions + intlTransactions + bondTransactions
        this.feeWithinManagedAccounts = maMfTransactions + maAuTransactions + maIntlTransactions
    }

    updateViewList(windowWidth: number, init = false): void {
        if (init) {
            this.convertList()
        }
        if (windowWidth <= 1540) {
            if (this.section != 3) {
                this.section = 3
                this.convertList()
            }
        } else {
            if (this.section != 4) {
                this.section = 4
                this.convertList()
            }
        }
    }

    convertList(): void {
        let _list = arr1ToArr2(Commons.deepCopy(this.comparisonProducts), this.section)
        _list[_list.length - 1].length = this.section
        this.comparisonTwoProducts = _list
    }

    ngOnDestroy(): void {
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.leaveSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            // this.router.navigateByUrl(`/due/summary/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            const fee = this.reviewService.comparison.analyseVoList.some(i => i.name === AnalysisType.fee.value)
            const metric = this.reviewService.comparison.analyseVoList.some(i => i.name === AnalysisType.metric.value)
            const feature = this.reviewService.comparison.analyseVoList.some(i => i.name === AnalysisType.feature.value)
            if (fee) {
                this.router.navigateByUrl(`/review/fee-review/${this.reviewService.comparison.id}`);
            } else if (metric) {
                this.router.navigateByUrl(`/review/metric-comparison/${this.reviewService.comparison.id}`);
            } else if (feature) {
                this.reviewService.preStep(AnalysisType.metric);
            }
        })
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
            callback && callback();
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
            this.router.navigateByUrl('/supplier/comparisons-list');
        })
    }

    openFinalAnalysisPopover(pComment: NgbPopover, finalAnalysis: FinalAnalyse, shProductId: string): void {
        if (!finalAnalysis || (typeof finalAnalysis.id) === 'undefined') {
            Object.assign(this.currentFinalAnalysis, {
                ...finalAnalysis,
                shComparisonId: this.comparisonInfo.id,
                shProductId: shProductId,
                finalAnalyse: ''
            })
        } else {
            this.currentFinalAnalysis = Commons.deepCopy(finalAnalysis)
        }
        this.openPopover(pComment)
    }

    saveFinalAnalysis(pComment: NgbPopover): void {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateFinalAnalyse`)) {
            return;
        }
        this.reviewService.showLoading()
        this.reviewRepository.saveOrUpdateFinalAnalyse(this.currentFinalAnalysis).subscribe(res => {
            this.reviewService.hideLoading()
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'save failed.')
                pComment.close();
                return
            }
            this.toastRepository.showSuccess('save successfully.')
            this.getSummaryInfo()
            pComment.close();
        })
    }

    openCommentPopover(pComment: NgbPopover, commentInfo: ComparisonCommentInfo, {shProductId, shAnalyseId}): void {
        if (!commentInfo) {
            this.currentCommit = {
                shComparisonId: this.comparisonInfo.id,
                shProductId: shProductId,
                shAnalyseId: shAnalyseId,
                comment: ''
            }
        } else {
            this.currentCommit = Commons.deepCopy(commentInfo)
        }
        this.openPopover(pComment)
    }

    saveComment(pComment: NgbPopover): void {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
            return;
        }
        this.reviewService.showLoading()
        this.reviewRepository.saveComment(this.currentCommit).subscribe(res => {
            this.reviewService.hideLoading()
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'save failed.')
                pComment.close();
                return
            }
            this.toastRepository.showSuccess('save successfully.')
            this.getSummaryInfo()
            pComment.close();
        })
    }

    saveComparisonInfo(pComment: NgbPopover, key: string): void {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComparison`)) {
            return;
        }
        const comparison = Commons.deepCopy(this.comparisonInfo)
        comparison[key] = this.currentEditorText
        this.reviewService.showLoading()
        this.reviewRepository.saveComparison(comparison).subscribe(res => {
            this.reviewService.hideLoading()
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'save failed.')
                pComment.close();
                return
            }
            this.comparisonInfo[key] = this.currentEditorText
            this.toastRepository.showSuccess('save successfully.')
            pComment.close();
        })
    }

    openEditorTextPopover(pComment: NgbPopover, key: string): void {
        const comparison = Commons.deepCopy(this.comparisonInfo)
        this.currentEditorText = comparison[key]
        pComment.open();
    }

    openPopover(pComment: NgbPopover): void {
        pComment.open();
    }

    getProductPropValue(propertyList: Array<ProductPropInfo>, prop: PropertyInfo): string {
        const obj = propertyList.find(item => item.shPropertyId === prop.id)
        return obj ? obj.propValue : ''
    }

    getMemberValuesByType(memberValues: Array<ComparisonMemberValueInfo>, type: string): Array<ComparisonMemberValueInfo> {
        return memberValues.filter(i => i.type === type)
    }
}
