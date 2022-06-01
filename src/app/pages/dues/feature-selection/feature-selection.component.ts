import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {Pagination} from "swiper";
import {ReviewRepository} from "../../../repository/review-repository";
import {GroupVo} from "../../../model/vo/groupVo";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {Router} from "@angular/router";
import {ToastRepository} from "../../../repository/toast-repository";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {SwiperComponent} from "swiper/angular";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {SaveService} from "../../../service/save.service";
import {DueTipComponent} from "../due-tip/due-tip.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfigService} from "../../../service/config.service";
import {DueService} from "../../../service/due.service";
import {SaveTemplateModalComponent} from "../save-template-modal/save-template-modal.component";
import {TemplatePropertyInfo} from "../../../model/po/templatePropertyInfo";
import {NgbAccordion} from "@ng-bootstrap/ng-bootstrap/accordion/accordion";
import {SelectionCondition} from "../../../model/condition/selection-condition";
import {SelectionType} from "../../../model/enums/selection-type";

SwiperCore.use([Pagination]);

@Component({
    selector: 'app-feature-selection',
    templateUrl: './feature-selection.component.html',
    styleUrls: ['./feature-selection.component.less']

})
export class FeatureSelectionComponent implements OnInit, OnDestroy {
    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;
    @ViewChild('acc') acc: NgbAccordion;
    featureForm: Array<GroupVo> = new Array<GroupVo>();
    subGroups: Array<GroupVo> = [];
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
    reviewLeaveObservable: any;
    saveTemplateObservable: any;

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
                public dueService: DueService,
                public configService: ConfigService,
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
        this.saveTemplateObservable && this.saveTemplateObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }


    init(): void {
        this.subscribe();
        this.getFeatureSelection();
    }

    subscribe(): void {
        this.initComparisonObservable = this.dueService.initComparisonObservable.subscribe(() => {
            this.getFeatureSelection();
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.saveTemplateSubscribe();
        this.leaveSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.dueService.saveObservable.subscribe((callback) => {
            this.save(callback);
        })
    }

    save(callback?: () => void) {
        callback && callback();
        // let groups = this.featureForm;
        // let props = groups.flatMap(g => g.subList || []).flatMap(g => g.propertyVoList || []).filter(p => p.compChecked)
        // if (this.validSave(props)) {
        //     return;
        // }
        // if (this.saveService.saveCheck(environment.baseURL + `/compare/saveComparisonProperty`)) {
        //     return;
        // }
        // let analyseInfo = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.feature.value);
        // let comparisonProps = props.map(p => {
        //     let prop = new ComparisonPropertyInfo();
        //     prop.essential = p.essential;
        //     prop.shPropertyId = p.id;
        //     prop.shAnalyseId = analyseInfo.shAnalyseId;
        //     prop.shComparisonId = this.dueService.due.id;
        //     return prop;
        // });
        // this.reviewRepository.saveComparisonProperty(comparisonProps).subscribe(res => {
        //     if (res.statusCode != 200) {
        //         this.toastRepository.showDanger(res.msg);
        //         return;
        //     }
        //     callback ? callback() : this.toastRepository.showSuccess('Save successfully.');
        // });
    }

    validSave(props: Array<PropertyVo>): boolean {
        if (props.length == 0) {
            this.toastRepository.showDanger('Please select feature.');
            return true;
        }
        return false;
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.save(() => {
                this.router.navigateByUrl(`/due/feature-comparison/${this.dueService.due.id}`);
            });
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.save(() => {
                this.router.navigateByUrl(`/due/due-setup/${this.dueService.due.id}`);
            });
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.dueService.leaveReviewObservable.subscribe(() => {
            this.router.navigateByUrl('/advice-review/review-list/list-view');
        })
    }

    saveTemplateSubscribe(): void {
        this.saveTemplateObservable = this.dueService.templateObservable.subscribe(() => {
            let groups = this.featureForm;
            let props = groups.flatMap(g => g.subList || []).flatMap(g => g.propertyVoList || []).filter(p => p.compChecked)
            if (this.validSave(props)) {
                return;
            }
            let templateProps = props.map(p => {
                let prop = new TemplatePropertyInfo();
                prop.essential = p.essential;
                prop.propertyId = p.id;
                prop.versionId = this.dueService.due.modelVersionId
                return prop;
            });
            let saveTemplateModalRef = this.modalService.open(SaveTemplateModalComponent);
            saveTemplateModalRef.componentInstance.templateProps = templateProps;
        });
    }

    getFeatureSelection(): void {
        if (!this.dueService.due.id) {
            return
        }
        this.reviewRepository.getFeatureGroupAndProperty(this.dueService.due.id).subscribe(res => {
            this.featureForm = res.data || this.featureForm;
        });
    }

    checkSelectList(props: Array<PropertyVo>): boolean {
        return props.some(p => p.compChecked);
    }

    slideChange(event: any): void {
        this.subGroups = this.featureForm[event.realIndex].subList || [];
        this.ref.detectChanges();
        this.acc && this.acc.expandAll();
        this.currentIndex = event.realIndex;
    }

    selectProp(prop: PropertyVo) {
        prop.compChecked = true;
        this.ref.detectChanges();
        this.selectionProperty(prop.id, true, SelectionType.Property.value, prop.essential);
    }

    unSelectProp(prop: PropertyVo) {
        prop.compChecked = false;
        prop.essential = false;
        this.ref.detectChanges();
        this.selectionProperty(prop.id, false, SelectionType.Property.value, prop.essential);
    }

    essential(prop: PropertyVo, event?: any) {
        event && event.stopPropagation();
        prop.essential = !prop.essential;
        this.ref.detectChanges();
    }

    selectGroupAll(group: GroupVo): void {
        this.selectionProperty(group.id, true, SelectionType.Group.value);
        group.subList.forEach(s => {
            s.propertyVoList.forEach(p => p.compChecked = true);
        });
        this.ref.detectChanges();
    }

    deselectGroupAll(group: GroupVo): void {
        this.ref.detectChanges();
        const modalRef = this.modalService.open(DueTipComponent, {
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
            this.selectionProperty(group.id, false, SelectionType.Group.value);
            group.subList.forEach(s => {
                s.propertyVoList.forEach(p => p.compChecked = false);
            });
        }, (reason) => {
        });
    }

    selectSubGroupAll(subGroup: GroupVo): void {
        this.selectionProperty(subGroup.id, true, SelectionType.SubGroup.value);
        subGroup.propertyVoList.forEach(p => p.compChecked = true);
        this.ref.detectChanges();
    }

    deselectSubGroupAll(subGroup: GroupVo): void {
        this.selectionProperty(subGroup.id, false, SelectionType.SubGroup.value);
        subGroup.propertyVoList.forEach(p => p.compChecked = false);
        this.ref.detectChanges();
    }

    selectionProperty(id: string, flag: boolean, type: string, essential?: boolean) {
        let condition = this.buildSelectionCondition(id, flag, type, essential || false);
        this.reviewRepository.featurePropertySelection(condition).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
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

    buildSelectionCondition(id: string, flag: boolean, type: string, essential: boolean): SelectionCondition {
        let condition = new SelectionCondition();
        let analyse = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.feature.value);
        condition.id = id;
        condition.comparisonId = this.dueService.due.id;
        condition.analyseId = analyse.shAnalyseId;
        condition.essential = essential;
        condition.selectFlag = flag;
        condition.selectionType = type;
        return condition;
    }
}
