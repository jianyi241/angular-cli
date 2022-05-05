import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {Pagination} from "swiper";
import {ReviewRepository} from "../../../repository/review-repository";
import {GroupVo} from "../../../model/vo/groupVo";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {Router} from "@angular/router";
import {ReviewService} from "../../../service/review.service";
import {ToastRepository} from "../../../repository/toast-repository";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {SwiperComponent} from "swiper/angular";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {ComparisonPropertyInfo} from "../../../model/po/comparisonPropertyInfo";
import {SaveService} from "../../../service/save.service";
import {environment} from "../../../../environments/environment";
import {DeselectFeaturesTipComponent} from "../deselect-feature-tip/deselect-features-tip.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

SwiperCore.use([Pagination]);

@Component({
    selector: 'app-feature-selection',
    templateUrl: './feature-selection.component.html',
    styleUrls: ['./feature-selection.component.less']

})
export class FeatureSelectionComponent implements OnInit, OnDestroy {
    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;
    featureForm: Array<GroupVo> = new Array<GroupVo>();
    subGroups: Array<GroupVo> = [];
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
    currentIndex: number = 0;
    config = {
        spaceBetween: 8,
        navigation: false,
        centeredSlides: true,
        loop: true,
        pagination: false,
        breakpoints: {
            1440: {
                slidesPerView: 4,
                spaceBetween: 8,

            },
            991: {
                centeredSlides: true,
                slidesPerView: 4,
                spaceBetween: 8,

            },
            768: {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 8,
            },
            375: {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 8,
            },

        },
    };

    constructor(private reviewRepository: ReviewRepository,
                private reviewService: ReviewService,
                private saveService: SaveService,
                private toastRepository: ToastRepository,
                private storage: LocalStorageObServable,
                private ref: ChangeDetectorRef,
                private modalService: NgbModal,
                private router: Router) {
    }

    ngOnInit(): void {
        this.init();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    }


    init(): void {
        this.subscribe();
        this.getFeatureSelection();
    }

    subscribe(): void {
        this.initComparisonObservable = this.reviewService.initComparisonObservable.subscribe(() => {
            this.getFeatureSelection();
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe(() => {
            let groups = this.featureForm;
            let props = groups.flatMap(g => g.subList || []).flatMap(g => g.propertyVoList || []).filter(p => p.compChecked)
            if (this.validSave(props)) {
                return;
            }
            if (this.saveService.saveCheck(environment.baseURL + `/compare/saveComparisonProperty`)) {
                return;
            }
            let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.feature.value);
            let comparisonProps = props.map(p => {
                let prop = new ComparisonPropertyInfo();
                prop.essential = p.essential;
                prop.shPropertyId = p.id;
                prop.shAnalyseId = analyseInfo.shAnalyseId;
                prop.shComparisonId = this.reviewService.comparison.id;
                return prop;
            });
            this.reviewRepository.saveComparisonProperty(comparisonProps).subscribe(res => {
                if (res.statusCode != 200) {
                    this.toastRepository.showDanger(res.msg);
                    return;
                }
                this.toastRepository.showSuccess('Save successfully.');
            });
        })
    }

    validSave(props: Array<PropertyVo>): boolean {
        if (props.length == 0) {
            this.toastRepository.showDanger('Please select feature.');
            return true;
        }
        return false;
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/feature-comparison/${this.reviewService.comparison.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.reviewService.preStep(AnalysisType.feature);
        })
    }

    getFeatureSelection(): void {
        if (!this.reviewService.comparison.id) {
            return
        }
        this.reviewRepository.getFeatureGroupAndProperty(this.reviewService.comparison.id).subscribe(res => {
            this.featureForm = res.data || this.featureForm;
        });
    }

    checkSelectList(props: Array<PropertyVo>): boolean {
        return props.some(p => p.compChecked);
    }

    slideChange(event: any): void {
        this.subGroups = this.featureForm[event.realIndex].subList || [];
        this.ref.detectChanges();
        this.currentIndex = event.realIndex;
    }

    selectProp(prop: PropertyVo) {
        prop.compChecked = true;
        this.ref.detectChanges();
    }

    unSelectProp(prop: PropertyVo) {
        prop.compChecked = false;
        this.ref.detectChanges();
    }

    essential(prop: PropertyVo, event: any) {
        event.stopPropagation();
        prop.essential = !prop.essential;
        this.ref.detectChanges();
    }

    selectGroupAll(group: GroupVo): void {
        group.subList.forEach(s => {
            this.selectSubGroupAll(s);
        });
        this.ref.detectChanges();
    }

    deselectGroupAll(group: GroupVo): void {
        const modalRef = this.modalService.open(DeselectFeaturesTipComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Deselect all features?';
        modalRef.componentInstance.info = `You’ve selected ${this.selectPropCount(group)} features in this group, are you sure to deselect all of them?`;
        modalRef.componentInstance.btnText = 'Yes, deselect all';
        modalRef.componentInstance.btnCancelText = 'No, don’t do anything';

        modalRef.result.then((result) => {
            group.subList.forEach(s => {
                this.deselectSubGroupAll(s);
            });
            this.ref.detectChanges();
        }, (reason) => {
        });
    }

    selectSubGroupAll(subGroup: GroupVo): void {
        subGroup.propertyVoList.forEach(p => p.compChecked = true);
        this.ref.detectChanges();
    }

    deselectSubGroupAll(subGroup: GroupVo): void {
        subGroup.propertyVoList.forEach(p => p.compChecked = false);
        this.ref.detectChanges();
    }

    hasSelect(group: GroupVo): boolean {
        if (!group.subList || group.subList.length == 0) {
            return false;
        }
        return group.subList.some(s => s.propertyVoList.some(p => p.compChecked));
    }

    slideNext() {
        this.swiper.swiperRef.slideNext();
    }

    slidePrev() {
        this.swiper.swiperRef.slidePrev();
    }

    totalPropCount(group: GroupVo): number {
        if (!group.subList || group.subList.length == 0) {
            return 0;
        }
        return group.subList.flatMap(s => s.propertyVoList.flatMap(p => p.id)).length;
    }

    selectPropCount(group: GroupVo): number {
        if (!group.subList || group.subList.length == 0) {
            return 0;
        }
        return group.subList.flatMap(s => s.propertyVoList.filter(p => p.compChecked).flatMap(p => p.id)).length;
    }

    getCurrentAnaStep(): number {
        return this.reviewService.comparison.analyseVoList.findIndex(a => a.name == AnalysisType.feature.value) + 2;
    }

}
