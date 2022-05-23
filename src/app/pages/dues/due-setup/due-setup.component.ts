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

    constructor(public dueService: DueService,
                public configService: ConfigService,
                private saveService: SaveService,
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
    }

    subscribe(): void {
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.dueService.saveObservable.subscribe(() => {
            let comparison = Commons.deepCopy(this.dueService.due);
            if (this.validSave(comparison)) {
                return;
            }
            if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComparison`)) {
                return;
            }
            this.dealSaveData(comparison);
            this.reviewRepository.saveDue(comparison).subscribe(res => {
                if (res.statusCode != 200) {
                    this.toastRepository.showDanger(res.msg);
                    return;
                }
                Object.assign(this.dueService.due, res.data);
                this.toastRepository.showSuccess('Save successfully.');
                this.router.navigateByUrl(`/due/due-setup/${this.dueService.due.id}`)
            });
        })
    }

    dealSaveData(comparison) {

    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/feature-selection/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.router.navigateByUrl('/advice-review/review-list/list-view');
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


}
