import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from "../../../model/constants";
import {ReviewRepository} from "../../../repository/review-repository";
import {TeamInfo} from "../../../model/po/teamInfo";
import {ConfigService} from "../../../service/config.service";
import {Router} from "@angular/router";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonVo} from "../../../model/vo/comparisonVo";
import {SaveService} from "../../../service/save.service";
import {environment} from "../../../../environments/environment";
import {Commons} from "../../../utils/Commons";
import {RoleType} from "../../../model/enums/role-type";
import {ClientInfo} from "../../../model/po/clientInfo";
import {ClientRepository} from "../../../repository/client-repository";
import {ComparisonTemplateInfo} from "../../../model/po/comparisonTemplateInfo";
import {DueService} from "../../../service/due.service";
import {AddClientModalComponent} from "../../system/advice-reviews/modal/add-client-modal/add-client-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-comparison-setup',
    templateUrl: './due-setup.component.html',
    styleUrls: ['./due-setup.component.less']
})
export class DueSetupComponent implements OnInit, OnDestroy {
    config = {...Constants.EDITOR_CONFIG};
    adviserUsers: Array<TeamInfo> = new Array<TeamInfo>();
    clients: Array<ClientInfo> = new Array<ClientInfo>();
    templates: Array<ComparisonTemplateInfo> = new Array<ComparisonTemplateInfo>();
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
    reviewLeaveObservable: any;

    constructor(public dueService: DueService,
                public configService: ConfigService,
                private saveService: SaveService,
                private modalService: NgbModal,
                private router: Router,
                private toastRepository: ToastRepository,
                private reviewRepository: ReviewRepository,
                private clientRepository: ClientRepository) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getAdviserUsers();
        this.getClients();
        this.getTemplates();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.dueService.initComparisonObservable.subscribe(() => {
            this.dueService.cacheCurrentStepSaveData(this.buildCacheSaveData());
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.leaveSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.dueService.saveObservable.subscribe((callback) => {
            this.save(callback);
        })
    }

    private save(callback?: () => void) {
        let comparison = Commons.deepCopy(this.dueService.due);
        if (this.validSave(comparison)) {
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/due/save`)) {
            return;
        }
        this.dealSaveData(comparison);
        this.reviewRepository.saveDue(comparison).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            Object.assign(this.dueService.due, res.data);
            if (callback) {
                callback();
            } else {
                this.toastRepository.showSuccess('Save successfully.');
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([`/due/due-setup/${this.dueService.due.id}`]);
                })
            }
        });
    }

    dealSaveData(comparison) {

    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.save(() => {
                this.router.navigateByUrl(`/due/feature-selection/${this.dueService.due.id}`);
            })
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.dueService.dealLeave(this.buildCacheSaveData());
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.dueService.leaveReviewObservable.subscribe(() => {
            this.dueService.dealLeave(this.buildCacheSaveData());
        })
    }


    validSave(comparison: ComparisonVo): boolean {
        if (!comparison.userId) {
            this.toastRepository.showDanger('Adviser is required.');
            return true;
        }
        if (!comparison.clientId) {
            this.toastRepository.showDanger('Client is required.');
            return true;
        }
        if (!comparison.name) {
            this.toastRepository.showDanger('Name of review is required.');
            return true;
        }
        if (!comparison.objectives) {
            this.toastRepository.showDanger('Current situation and needs is required.')
            return true;
        }
        return false;
    }

    buildCacheSaveData(): any[] {
        let due = this.dueService.due;
        return [due.userId, due.clientId, due.name, due.objectives, due.templateId]
    }

    getAdviserUsers() {
        this.reviewRepository.getUsersByType(RoleType.AdviceUser.value).subscribe(res => {
            this.adviserUsers = res.data;
        })
    }

    getClients() {
        this.clientRepository.getList().subscribe(res => {
            this.clients = res.data;
        })
    }

    getTemplates() {
        this.reviewRepository.getTemplates().subscribe(res => {
            this.templates = res.data;
        })
    }


    addClient() {
        const modal = this.modalService.open(AddClientModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        })
        modal.result.then(res => {
            this.getClients();
        }).catch(res => {
        })

    }
}
