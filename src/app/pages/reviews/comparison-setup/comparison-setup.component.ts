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
import {CurrentUserService} from "../../../service/current-user.service";
import {RoleEnum} from "../../../model/enums/role-enum";
import {ConfirmModalComponent} from "../../system/modal/confirm-modal/confirm-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoleType} from "../../../model/enums/role-type";
import {FocusService} from "../../../service/focus.service";

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
                public focusService: FocusService,
                private router: Router,
                private toastRepository: ToastRepository,
                public reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository,
                private currentUserService: CurrentUserService,
                private ngbModal: NgbModal) {
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
            setTimeout(() => {
                this.focusService.initializationService();
            }, 500)
            this.initSelectedAnalyseType();
            this.reviewService.cacheCurrentStepSaveData(this.buildCacheSaveData());
        });
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.leaveSubscribe();
    }


    isNormalUser(): boolean {
        return this.currentUserService.authorities().some(a => a.type == RoleType.SupplierUser.value && a.roleName == RoleEnum.User.name);
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
            this.save(callback);
        })
    }

    save(callback?: () => void) {
        let comparison = Commons.deepCopy(this.reviewService.comparison);
        let isAdd = !comparison.id;
        if (this.validSave(comparison)) {
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComparison`)) {
            return;
        }
        this.reviewService.loading = true;
        this.dealSaveData(comparison);
        this.reviewRepository.saveComparison(comparison).subscribe(res => {
            this.reviewService.loading = false;
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            Object.assign(this.reviewService.comparison, res.data);
            if (callback) {
                callback();
            } else {
                if (isAdd) {
                    this.toastRepository.showSuccess('Save successfully.');
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                        this.router.navigate([`/review/comparison-setup/${this.reviewService.comparison.id}`]);
                    })
                }
            }
        });
    }

    saveRelation() {
        let comparison = Commons.deepCopy(this.reviewService.comparison);
        if (this.validSave(comparison)) {
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/compare/changeComparisonRelation`)) {
            return;
        }
        this.reviewService.loading = true;
        this.dealSaveData(comparison);
        this.reviewRepository.changeComparisonRelation(comparison).subscribe(res => {
            this.reviewService.loading = false;
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            Object.assign(this.reviewService.comparison, res.data);
        });
    }

    changeSave() {
        if (this.reviewService.comparison.id) {
            this.save();
        }
    }

    dealSaveData(comparison) {
        comparison.analyseVoList = this.analyses.filter(a => a.checked).map(a => {
            let analyse = new ComparisonAnalyseInfo();
            analyse.shAnalyseId = a.id;
            analyse.name = a.name;
            return analyse;
        })
        comparison.comparisonProductVoList = comparison.nonFeeProducts.map(nf => {
            let product = new ComparisonProductInfo();
            product.shProductId = nf;
            return product;
        })
        delete comparison.nonFeeProducts;
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.exitCurrentPage(() => {
                this.reviewService.nextStep();
            })
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.exitCurrentPage(() => {
                this.router.navigateByUrl('/supplier/comparisons-list');
            })
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
            this.exitCurrentPage(() => {
                this.router.navigateByUrl('/supplier/comparisons-list');
            })
        })
    }

    exitCurrentPage(callback: () => void): void {
        if (!this.reviewService.comparison.id) {
            this.reviewService.dealLeave(this.buildCacheSaveData(true));
        } else {
            this.focusService.waitBlur(() => {
                callback();
            })
        }
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
        return [comparison.userId, comparison.name, comparison.adviserName, comparison.practiceName, comparison.objectives, analyses].filter(i => i);
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
        if (!this.isNormalUser()) {
            if (!comparison.adviserName) {
                this.toastRepository.showDanger('Adviser name is required.');
                return true;
            }
            if (!comparison.practiceName) {
                this.toastRepository.showDanger('Practice name is required.');
                return true;
            }
        }
        if (comparison.mainPlatformCheck && !comparison.mainPlatformId) {
            this.toastRepository.showDanger('Main platform is required.');
            return true;
        }
        return false;
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

    changeOwner() {
        let user = this.supplierUsers.find(su => su.id == this.reviewService.comparison.userId);
        this.reviewService.comparison.userName = this.configService.fullName(user.firstName, user.lastName);
        this.changeSave();
    }

    changeNonFee() {
        this.reviewService.comparison.nonFeeProductName = this.products.filter(p => this.reviewService.comparison.nonFeeProducts.includes(p.id)).map(p => p.name).join(', ');
        this.changeRelation();
    }

    changeMainPlatform() {
        let mainPlatform = this.products.find(p => p.id == this.reviewService.comparison.mainPlatformId);
        this.reviewService.comparison.productName = mainPlatform?.name;
        this.reviewService.comparison.feeProducts = this.reviewService.comparison.feeProducts.filter(p => p != this.reviewService.comparison.mainPlatformId);
        this.reviewService.comparison.nonFeeProducts = this.reviewService.comparison.nonFeeProducts.filter(p => p != this.reviewService.comparison.mainPlatformId);
        this.reviewService.comparison.nonFeeProductName = this.products.filter(p => this.reviewService.comparison.nonFeeProducts.includes(p.id)).map(p => p.name).join(', ');
        this.changeRelation();
    }

    changeCheckMain() {
        this.reviewService.comparison.mainPlatformId = this.reviewService.comparison.mainPlatformCheck ? this.reviewService.comparison.mainPlatformId : ''
        this.reviewService.comparison.mainVersionId = this.reviewService.comparison.mainPlatformCheck ? this.reviewService.comparison.mainVersionId : ''
        this.reviewService.comparison.productName = this.reviewService.comparison.mainPlatformCheck ? this.reviewService.comparison.productName : ''
        if (!this.reviewService.comparison.mainPlatformCheck) {
            this.changeRelation();
        }
    }

    changeRelation(): void {
        this.reviewRepository.checkUpToDate(this.reviewService.comparison.id).subscribe(res => {
            if (!res.data) {
                this.showChangeMainPlatformConfirm();
            } else {
                this.saveRelation();
            }
        });
    }


    showChangeMainPlatformConfirm(): void {
        const modalRef = this.ngbModal.open(ConfirmModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.modal = {
            title: 'Are you sure change main platform?',
            text: 'Changing the main platform will clear all Features, Business Metrics and/or Fee & Rates inputs and selections, as some platform data has since been updated.',
            cancelText: 'No, do nothing',
            confirmText: 'Yes, to change'
        }
        modalRef.result.then(() => {
            this.saveRelation();
        }).catch(() => {
            this.reviewRepository.getCompareDetail(this.reviewService.comparison.id).subscribe(res => {
                this.reviewService.initComparison(res.data);
            });
        })
    }
}
