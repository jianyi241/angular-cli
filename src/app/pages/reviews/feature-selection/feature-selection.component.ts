import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import SwiperCore, {Pagination} from "swiper";
import {ReviewRepository} from "../../../repository/review-repository";
import {TabType} from "../../../model/enums/tab-type";
import {ProductFormVo} from "../../../model/vo/productFormVo";
import {GroupVo} from "../../../model/vo/groupVo";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {Router} from "@angular/router";
import {ReviewService} from "../../../service/review.service";
import {ToastRepository} from "../../../repository/toast-repository";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";

SwiperCore.use([Pagination]);

@Component({
    selector: 'app-feature-selection',
    templateUrl: './feature-selection.component.html',
    styleUrls: ['./feature-selection.component.less']

})
export class FeatureSelectionComponent implements OnInit, OnDestroy {
    featureForm: ProductFormVo = new ProductFormVo();
    subGroups: Array<GroupVo> = [];
    reviewObservable: any;

    constructor(private reviewRepository: ReviewRepository,
                private reviewService: ReviewService,
                private toastRepository: ToastRepository,
                private storage: LocalStorageObServable,
                private ref: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit(): void {
        this.init();
    }

    ngOnDestroy(): void {
        this.reviewObservable.unsubscribe();
    }


    init(): void {
        this.subscribe();
        this.getFeatureForm();
    }

    subscribe(): void {
        this.reviewObservable = this.reviewService.nextObservable.subscribe(res => {
            let groups = this.featureForm.groupVoList;
            if (!groups || groups.length == 0) {
                this.toastRepository.showDanger('Please select feature.');
                return;
            }
            let subGroups = groups.flatMap(g => g.subList);
            if (!subGroups || subGroups.length == 0) {
                this.toastRepository.showDanger('Please select feature.');
                return;
            }
            let props = subGroups.flatMap(s => s.propertyVoList);
            if (!props || props.length == 0) {
                this.toastRepository.showDanger('Please select feature.');
                return;
            }
            let selectProps = props.filter(p => p.selected).map(p => ({
                id: p.id,
                essential: p.essential || false,
            }));
            if (!selectProps || selectProps.length == 0) {
                this.toastRepository.showDanger('Please select feature.');
                return;
            }
            this.storage.setItem('select-essential', selectProps);
            this.router.navigateByUrl('/review/feature-comparison');
        });
    }

    getFeatureForm(): void {
        this.reviewRepository.getProductInfo(TabType.features.value).subscribe(res => {
            this.featureForm = res.data || this.featureForm;
            this.subGroups = this.featureForm.groupVoList[0].subList || [];
        })
    }

    config = {
        spaceBetween: 8,
        navigation: true,
        centeredSlides: true,
        loop: true,
        pagination: true,
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

    checkSelectList(props: Array<PropertyVo>): boolean {
        return props.some(p => p.selected);
    }

    slideChange(event: any): void {
        this.subGroups = this.featureForm.groupVoList[event.realIndex].subList || [];
        this.ref.detectChanges();
    }

    selectProp(prop: PropertyVo) {
        prop.selected = true;
        this.ref.detectChanges();
    }

    unSelectProp(prop: PropertyVo) {
        prop.selected = false;
        this.ref.detectChanges();
    }

    essential(prop: PropertyVo, event: any) {
        event.stopPropagation();
        prop.essential = true;
        this.ref.detectChanges();
    }

    selectGroupAll(group: GroupVo): void {
        group.subList.forEach(s => {
            this.selectSubGroupAll(s);
        });
        this.ref.detectChanges();
    }

    deselectGroupAll(group: GroupVo): void {
        group.subList.forEach(s => {
            this.deselectSubGroupAll(s);
        });
        this.ref.detectChanges();
    }

    selectSubGroupAll(subGroup: GroupVo): void {
        subGroup.propertyVoList.forEach(p => p.selected = true);
        this.ref.detectChanges();
    }

    deselectSubGroupAll(subGroup: GroupVo): void {
        subGroup.propertyVoList.forEach(p => p.selected = false);
        this.ref.detectChanges();
    }
}
