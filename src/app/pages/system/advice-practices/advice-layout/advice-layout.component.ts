import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TipModalComponent} from "../tip-modal/tip-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {PracticeInfo} from "../../../../model/po/practiceInfo";
import {Constants} from "../../../../model/constants";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {PracticeService} from "../../../../service/practice.service";
import * as moment from "moment";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PracticeStatus} from "../../../../model/enums/practice-status";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {CurrentUserService} from "../../../../service/current-user.service";

@Component({
    selector: 'app-advice-layout',
    templateUrl: './advice-layout.component.html',
    styleUrls: ['./advice-layout.component.less']
})
export class AdviceLayoutComponent implements OnInit, OnDestroy {
    constructor(private modalService: NgbModal,
                private saveService: SaveService,
                private activatedRoute: ActivatedRoute,
                public currentUserService: CurrentUserService,
                private toastRepository: ToastRepository,
                public practiceService: PracticeService,
                private router: Router,
                private adviceRepository: AdviceRepository) {
        this.practiceService.practice = new PracticeInfo();
    }

    ngOnInit(): void {
        this.practiceService.practice.id = this.activatedRoute?.firstChild?.snapshot?.params['id'];
        if (this.practiceService.practice.id && this.practiceService.practice.id != Constants.NON_ID) {
            this.adviceRepository.practiceDetail(this.practiceService.practice.id).subscribe(res => {
                this.practiceService.practice = Object.assign(this.practiceService.practice, res.data);
                this.practiceService.practice.signDate = moment(res.data.signDate).toDate();
                this.practiceService.practice.billingDate = moment(res.data.billingDate).toDate();
            });
        }
    }

    ngOnDestroy(): void {
        this.practiceService.practice = null;
    }


    has(): boolean {
        return this.practiceService.practice.id && this.practiceService.practice.id != Constants.NON_ID;
    }

    back(): void {
        if (this.currentUserService.isAdminUser()) {
            this.router.navigateByUrl('/advice-practices');
        }
    }

    onArchive(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Archive the practice?';
        modalRef.componentInstance.info = 'Archiving a practice will remove the access of this practice from all users. Only the admin can access archived practices. \n' +
            'Are you sure to archive this practice?';
        modalRef.componentInstance.btnText = 'Yes, archive it';
        modalRef.result.then((result) => {
            this.practiceService.practice.archiveFlag = true;
            this.save(false, `${this.practiceService.practice.name} has been archived`);
        }, (reason) => {
        });
    }

    onDisable(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Disable the practice?';
        modalRef.componentInstance.info = 'Disabling a practice will freeze it from being changed.Are you sure to disable this practice?';
        modalRef.componentInstance.btnText = 'Yes, disable it';
        modalRef.result.then((result) => {
            this.practiceService.practice.status = PracticeStatus.Disable.value;
            this.save(false, `${this.practiceService.practice.name} has been disabled`);
        }, (reason) => {
        });
    }

    save(tip: boolean = true, msg?: string) {
        let copyPractice = {...this.practiceService.practice};
        if (!copyPractice.attachmentVo || !copyPractice.attachmentVo?.visitUrl) {
            this.toastRepository.showDanger('Practice logo is required.');
            return;
        }
        if (!copyPractice.name) {
            this.toastRepository.showDanger('Practice name is required.');
            return;
        }
        if (!copyPractice.signDate) {
            this.toastRepository.showDanger('Sign up date is required.');
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + '/advice/saveOrUpdatePractice')) {
            return;
        }
        copyPractice.id = copyPractice.id == Constants.NON_ID ? '' : copyPractice.id;
        copyPractice.signDate = moment(copyPractice.signDate).format('YYYY-MM-DD HH:mm:ss');
        copyPractice.billingDate = moment(copyPractice.billingDate).format('YYYY-MM-DD HH:mm:ss');
        this.adviceRepository.savePractice(copyPractice).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            if (tip) {
                this.toastRepository.showSuccess(msg || 'Save Successfully.')
            } else {
                //Disable, Archive
                this.toastRepository.showDanger(msg);
                // this.router.navigateByUrl()
            }
            this.practiceService.practice = res.data;
            this.practiceService.practice.signDate = moment(res.data.signDate).toDate();
            this.practiceService.practice.billingDate = moment(res.data.billingDate).toDate();
        })
    }


}
