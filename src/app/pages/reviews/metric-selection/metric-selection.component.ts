import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {TabVo} from "../../../model/vo/compareMetircVo";
import {TabType} from "../../../model/enums/tab-type";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {environment} from "../../../../environments/environment";
import {ComparisonPropertyInfo} from "../../../model/po/comparisonPropertyInfo";
import {ToastRepository} from "../../../repository/toast-repository";
import {SaveService} from "../../../service/save.service";

@Component({
    selector: 'app-business-metric-comparison',
    templateUrl: './metric-selection.component.html',
    styleUrls: ['./metric-selection.component.less']
})
export class MetricSelectionComponent implements OnInit, OnDestroy {
    metricSelections: Array<TabVo> = new Array<TabVo>();
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;

    constructor(private reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private toastRepository: ToastRepository,
                private saveService: SaveService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getBmGroupAndProperty();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.initComparisonObservable = this.reviewService.initComparisonObservable.subscribe(() => {
            this.getBmGroupAndProperty();
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe(() => {
            let props: Array<PropertyVo> = [];
            this.metricSelections.forEach(selection => {
                if (selection.tabType == TabType.information.value) {
                    props = props.concat(selection.groupVoList.flatMap(g => g.propertyVoList || []).filter(p => p.compChecked))
                } else {
                    props = props.concat(selection.propertyVoList.filter(p => p.compChecked));
                }
            })
            if (this.validSave(props)) {
                return;
            }
            if (this.saveService.saveCheck(environment.baseURL + `/compare/saveComparisonProperty`)) {
                return;
            }
            let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.metric.value);
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
            this.router.navigateByUrl(`/review/metric-comparison/${this.reviewService.comparison.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.reviewService.preStep(AnalysisType.metric);
        })
    }


    getBmGroupAndProperty(): void {
        if (!this.reviewService.comparison.id) {
            return
        }
        this.reviewRepository.getBmGroupAndProperty(this.reviewService.comparison.id).subscribe(res => {
            this.metricSelections = res.data || this.metricSelections;
        });
    }




    getSelectionName(selection: TabVo): string {
        return TabType.parseEnum(selection.tabType).name;
    }

    selectProp(prop: PropertyVo) {
        prop.compChecked = !prop.compChecked;
    }

    deselectAll(selection: TabVo): void {
        if (selection.tabType == TabType.information.value) {
            selection.groupVoList.flatMap(g => g.propertyVoList || []).forEach(p => p.compChecked = false);
        } else {
            selection.propertyVoList.forEach(p => p.compChecked = false);
        }
    }

    selectAll(selection: TabVo): void {
        if (selection.tabType == TabType.information.value) {
            selection.groupVoList.flatMap(g => g.propertyVoList || []).forEach(p => p.compChecked = true);
        } else {
            selection.propertyVoList.forEach(p => p.compChecked = true);
        }
    }

    hasSelect(selection: TabVo): boolean {
        if (selection.tabType == TabType.information.value) {
            return selection.groupVoList.flatMap(g => g.propertyVoList || []).some(p => p.compChecked);
        } else {
            return selection.propertyVoList.some(p => p.compChecked);
        }
    }

    getCurrentAnaStep(): number {
        return this.reviewService.comparison.analyseVoList.findIndex(a => a.name == AnalysisType.metric.value) + 2;
    }


}
