import {Component, OnInit} from '@angular/core';
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

interface SingleGroup {
    tabType?: number;
    tabTypeName?: string;
    groupId?: string;
    groupName?: string;
    subGroupId?: string;
    subGroupName?: string;
    selectCount: number;
    totalCount: number;
    properties: Array<PropertyInfo>;
}

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {
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
    featureGroupsList: Array<SingleGroup> = new Array<SingleGroup>();
    businessGroupList: Array<SingleGroup> = new Array<SingleGroup>();
    businessCounts = {
        totalCount: 0,
        activeCount: 0
    }
    featureProperties: GroupInfo = new GroupInfo();
    currentCommit: ComparisonCommentInfo = new ComparisonCommentInfo();
    currentFinalAnalysis: FinalAnalyse = new FinalAnalyse();

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
        window.addEventListener('resize',(e: UIEvent) => {
            const windowWidth = window.innerWidth
            this.updateViewList(windowWidth, false)
        })
        this.comparisonInfo = this.reviewService.comparison
        this.activatedRoute.params.subscribe(res => {
            if (res.id) {
                this.comparisonInfo.id = res.id
            }
        })
        this.initPageData()
    }

    includeAnalysis(name: string): boolean {
        const idx = this.comparisonInfo.analyseVoList.findIndex(item => item.name === name)
        return idx >=0 ? true : false
    }

   getDynamicAnalysis(shAnalysisId: string, list: Array<ComparisonCommentInfo>): any {
           const obj = list.find(item => item.shAnalyseId === shAnalysisId)
           if (typeof obj != 'undefined') {
               return obj
           } else {
               return ''
           }
   }

   getTabTypeNameByTabType(tabType: number): string {
       const type = TabType.Values().find(item => item.value === tabType)
       return type.name
   }

   getSingleGroupList(list: Array<GroupInfo>,key: string): void {
        list.forEach(item => {
            if (item.properties) {
                this[key].push({
                    tabType: item.tabType,
                    tabTypeName: this.getTabTypeNameByTabType(item.tabType),
                    groupId: '',
                    groupName: '',
                    subGroupId: '',
                    subGroupName: '',
                    selectCount: key === 'featureGroupsList' ? item.selectedPropCount : item.properties.filter(item => item.selected).length,
                    totalCount: key === 'featureGroupsList' ? item.totalPropCount : item.properties.length,
                    properties: item.properties
                })
            } else if (item.groups) {
                item.groups.forEach(_item => {
                    if (_item.properties) {
                        this[key].push({
                            tabType: item.tabType,
                            tabTypeName: this.getTabTypeNameByTabType(item.tabType),
                            groupId: _item.id,
                            groupName: _item.name,
                            subGroupId: '',
                            subGroupName: '',
                            selectCount: _item.properties.filter(item => item.selected).length,
                            totalCount: _item.properties.length,
                            properties: _item.properties
                        })
                    } else if (key === 'featureGroupsList' && _item.subList) {
                        _item.subList.forEach(__item => {
                            this[key].push({
                                tabType: item.tabType,
                                groupId: _item.id,
                                groupName: _item.name,
                                subGroupId: __item.id,
                                subGroupName: __item.name,
                                selectCount: __item.selectedPropCount,
                                totalCount: __item.totalPropCount,
                                properties: __item.properties
                            })
                        })
                    } else if (_item.groups){
                        this.getSingleGroupList(_item.groups, key)
                    }
                })
            }
        })
   }

   getProperties(groups: Array<GroupInfo>): void {
       if (!groups || groups.length == 0) {
           return;
       }
       const list = JSON.parse(JSON.stringify(groups))
       let propIds = this.comparisonProducts.flatMap(p => p.productPropVoList).flatMap(pp => pp.shPropertyId);
       list.forEach(i => {
           if (i.properties && i.properties.length) {
               this.businessProperties.push(...i.properties.filter(_i => propIds.includes(_i.id)));
           } else {
               if (i.subList) {
                   this.getProperties(i.subList)
               } else if (i.groups) {
                   this.getProperties(i.groups)
               }
           }
       });
   }

    showFeatureFlag(product) {
        return product.showFlag || (product.shProductId === this.reviewService.comparison.mainPlatformId)
    }

    getSummaryInfo() {
        this.reviewRepository.getSummary(this.comparisonInfo.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'get data error')
                return
            }

            this.comparisonProducts = res.data.products.filter(res => this.showFeatureFlag(res))
            this.updateViewList(window.innerWidth, true)
            this.platformCounts = {
                totalCount: res.data.products.length,
                activeCount: this.comparisonProducts.length
            }
            this.comparisonGroups = res.data.comparisonTabs
            const businessGroups = res.data.comparisonTabs.filter(item => [TabType.overview.value, TabType.esg.value,TabType.information.value].includes(item.tabType))
            this.getProperties(businessGroups)
            const featureGroups = res.data.comparisonTabs.find(item => item.tabType === TabType.features.value)
            this.getSingleGroupList([featureGroups], 'featureGroupsList');
            this.getSingleGroupList(businessGroups, 'businessGroupList');
            this.featureProperties = res.data.comparisonTabs[res.data.comparisonTabs.length - 1]
        })
    }

    updateViewList(windowWidth: number, init = false) {
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

    convertList() {
        let _list = arr1ToArr2(JSON.parse(JSON.stringify(this.comparisonProducts)), this.section)
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
        this.nextSubscribe();
        this.backSubscribe();
        this.saveSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            // this.router.navigateByUrl(`/due/summary/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/fee-comparison/${this.reviewService.comparison.id}`);
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

    initPageData():void {
        this.getSummaryInfo()
    }

    openFinalAnalysisPopover(pComment: NgbPopover,finalAnalysis: FinalAnalyse,shProductId: string): void {
        if (!finalAnalysis || (typeof finalAnalysis.id) === 'undefined') {
            Object.assign(this.currentFinalAnalysis, {
                ...finalAnalysis,
                shComparisonId: this.comparisonInfo.id,
                shProductId: shProductId,
                finalAnalyse: ''
            })
        } else {
            this.currentFinalAnalysis = JSON.parse(JSON.stringify(finalAnalysis))
        }
        this.openPopover(pComment)
    }

    saveFinalAnalysis(pComment: NgbPopover) {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateFinalAnalyse`)) {
            return;
        }
        this.reviewRepository.saveOrUpdateFinalAnalyse(this.currentFinalAnalysis).subscribe(res => {
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


    openCommentPopover(pComment: NgbPopover, commentInfo: ComparisonCommentInfo, {shProductId,shAnalyseId}): void {
        if (!commentInfo) {
            this.currentCommit = {
                shComparisonId: this.comparisonInfo.id,
                shProductId: shProductId,
                shAnalyseId: shAnalyseId,
                comment: ''
            }
        } else {
            this.currentCommit = JSON.parse(JSON.stringify(commentInfo))
        }
        this.openPopover(pComment)
    }

    saveComment(pComment: NgbPopover) {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
            return;
        }
        this.reviewRepository.saveComment(this.currentCommit).subscribe(res => {
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

    saveComparisonInfo(pComment: NgbPopover): void {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComparison`)) {
            return;
        }
        this.reviewRepository.saveComparison(this.comparisonInfo).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'save failed.')
                pComment.close();
                return
            }
            this.toastRepository.showSuccess('save successfully.')
            pComment.close();
        })
    }

    openPopover(pComment: NgbPopover) {
        pComment.open();
    }

    getProductPropValue(propertyList: Array<ProductPropInfo> ,prop: PropertyInfo): string {
        const obj = propertyList.find(item => item.shPropertyId === prop.id)
        if (obj) {
            return obj.propValue
        } else {
            return ''
        }
    }
}
