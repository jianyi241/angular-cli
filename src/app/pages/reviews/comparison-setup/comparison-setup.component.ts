import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from "../../../model/constants";
import {ReviewService} from "../../../service/review.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {PlatformRepository} from "../../../repository/platform-repository";
import {TeamInfo} from "../../../model/po/teamInfo";
import {ProductInfo} from "../../../model/po/productInfo";
import {ConfigService} from "../../../service/config.service";
import {AnalyseTypeVo} from "../../../model/vo/analyseTypeVo";
import {Router} from "@angular/router";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonVo} from "../../../model/vo/comparisonVo";
import {SaveService} from "../../../service/save.service";
import {environment} from "../../../../environments/environment";
import {ComparisonAnalyseInfo} from "../../../model/po/comparisonAnalyseInfo";
import {ComparisonProductInfo} from "../../../model/po/comparisonProductInfo";
import {Commons} from "../../../utils/Commons";
import {AnalysisType} from "../../../model/enums/analysis-type";

@Component({
    selector: 'app-comparison-setup',
    templateUrl: './comparison-setup.component.html',
    styleUrls: ['./comparison-setup.component.less']
})
export class ComparisonSetupComponent implements OnInit, OnDestroy {
    config = {...Constants.EDITOR_CONFIG};
    analyses: Array<AnalyseTypeVo> = new Array<AnalyseTypeVo>();
    supplierUsers: Array<TeamInfo> = new Array<TeamInfo>();
    products: Array<ProductInfo> = new Array<ProductInfo>();
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
    reviewLeaveObservable: any;

    constructor(public reviewService: ReviewService,
                public configService: ConfigService,
                private saveService: SaveService,
                private router: Router,
                private toastRepository: ToastRepository,
                public reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getAnalyseType();
        this.getSupplierUsers();
        this.getProducts();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.initComparisonObservable = this.reviewService.initComparisonObservable.subscribe(() => {
            this.initSelectedAnalyseType();
            this.reviewService.cacheCurrentStepSaveData(this.buildCacheSaveData());
        });
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.leaveSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
            this.save(callback);
        })
    }

    save(callback?: () => void) {
        let comparison = Commons.deepCopy(this.reviewService.comparison);
        if (this.validSave(comparison)) {
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComparison`)) {
            return;
        }
        this.dealSaveData(comparison);
        this.reviewRepository.saveComparison(comparison).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            Object.assign(this.reviewService.comparison, res.data);
            if (callback) {
                callback();
            } else {
                this.toastRepository.showSuccess('Save successfully.');
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([`/review/comparison-setup/${this.reviewService.comparison.id}`]);
                })
            }
        });
    }

    dealSaveData(comparison) {
        comparison.analyseVoList = this.analyses.filter(a => a.checked).map(a => {
            let analyse = new ComparisonAnalyseInfo();
            analyse.shAnalyseId = a.id;
            analyse.name = a.name;
            return analyse;
        })
        let feeProducts = comparison.feeProducts.map(f => {
            let product = new ComparisonProductInfo();
            product.shProductId = f;
            product.feeFlag = true;
            return product;
        });
        let nonFeeProducts = comparison.nonFeeProducts.map(f => {
            let product = new ComparisonProductInfo();
            product.shProductId = f;
            product.feeFlag = false;
            return product;
        });
        comparison.comparisonProductVoList = feeProducts.concat(nonFeeProducts);
        delete comparison.feeProducts;
        delete comparison.nonFeeProducts;
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.save(() => {
                this.reviewService.nextStep();
            });
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.reviewService.dealLeave(this.buildCacheSaveData(true));
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
            this.reviewService.dealLeave(this.buildCacheSaveData(true));
        })
    }

    initSelectedAnalyseType(): void {
        let analyses = this.reviewService.comparison.analyseVoList;
        if (analyses && analyses.length > 0) {
            this.analyses.forEach(a => {
                a.checked = analyses.some(aa => aa.shAnalyseId == a.id);
            });
        }
    }

    buildCacheSaveData(leave?: boolean): any[] {
        let comparison = this.reviewService.comparison;
        let analyses = leave ? this.analyses.filter(a => a.checked).map(a => a.id) : comparison.analyseVoList.map(a => a.shAnalyseId);
        return [comparison.userId, comparison.name, comparison.adviserName, comparison.practiceName, comparison.objectives, analyses];
    }

    validSave(comparison: ComparisonVo): boolean {
        if (!comparison.userId) {
            this.toastRepository.showDanger('Owner is required.');
            return true;
        }
        if (!comparison.name) {
            this.toastRepository.showDanger('Name of analysis is required.');
            return true;
        }
        if (!this.analyses.some(a => a.checked)) {
            this.toastRepository.showDanger('Analyse is required.');
            return true;
        }
        if (!comparison.adviserName) {
            this.toastRepository.showDanger('Adviser name is required.');
            return true;
        }
        if (!comparison.practiceName) {
            this.toastRepository.showDanger('Practice name is required.');
            return true;
        }
        if (comparison.mainPlatformCheck && !comparison.mainPlatformId) {
            this.toastRepository.showDanger('Main platform is required.');
            return true;
        }

        if (comparison.nonFeeProducts.length == 0) {
            this.toastRepository.showDanger('Non-fee platforms is required.');
            return true;
        }

        if (this.showFeeProduct() && comparison.feeProducts.length == 0) {
            this.toastRepository.showDanger('Fee platforms is required.');
            return true;
        }

        return false;
    }


    disableAnalyse(): boolean {
        return !!this.reviewService.comparison.id;
    }


    getAnalyseType() {
        this.reviewRepository.getAnalyseType().subscribe(res => {
            this.analyses = res.data;
            this.initSelectedAnalyseType();
        })
    }

    getSupplierUsers() {
        this.reviewRepository.getSupplierUser().subscribe(res => {
            this.supplierUsers = res.data;
        })
    }

    getProducts() {
        this.platformRepository.getAllProduct().subscribe(res => {
            this.products = res.data;
        })
    }

    changeNonFee() {
        this.reviewService.comparison.nonFeeProductName = this.products.filter(p => this.reviewService.comparison.nonFeeProducts.includes(p.id)).map(p => p.name).join(', ');
    }

    changeFee() {
        this.reviewService.comparison.feeProductName = this.products.filter(p => this.reviewService.comparison.feeProducts.includes(p.id)).map(p => p.name).join(', ');
    }

    changeOwner() {
        let user = this.supplierUsers.find(su => su.id == this.reviewService.comparison.userId);
        this.reviewService.comparison.userName = this.configService.fullName(user.firstName, user.lastName);
    }

    changeMainPlatform() {
        let mainPlatform = this.products.find(p => p.id == this.reviewService.comparison.mainPlatformId);
        this.reviewService.comparison.productName = mainPlatform?.name;
        this.reviewService.comparison.feeProducts = this.reviewService.comparison.feeProducts.filter(p => p != this.reviewService.comparison.mainPlatformId);
        this.reviewService.comparison.nonFeeProducts = this.reviewService.comparison.nonFeeProducts.filter(p => p != this.reviewService.comparison.mainPlatformId);
        this.changeFee();
        this.changeNonFee();
    }

    changeCheckMain() {
        this.reviewService.comparison.mainPlatformId = this.reviewService.comparison.mainPlatformCheck ? this.reviewService.comparison.mainPlatformId : null
        this.reviewService.comparison.productName = this.reviewService.comparison.mainPlatformCheck ? this.reviewService.comparison.productName : ''
    }

    changeAnalysis() {
        let hasFee = this.analyses.some(a => a.name == AnalysisType.fee.value && a.checked);
        if (!hasFee) {
            this.reviewService.comparison.feeProducts = [];
            this.reviewService.comparison.feeProductName = '';
        }
    }

    showFeeProduct(): boolean {
        return this.analyses.some(a => a.name == AnalysisType.fee.value && a.checked);
    }
}
