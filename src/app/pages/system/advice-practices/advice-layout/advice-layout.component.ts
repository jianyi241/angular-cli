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
import {ConfigService} from "../../../../service/config.service";

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
                private adviceRepository: AdviceRepository,
                public configService: ConfigService) {
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
        modalRef.componentInstance.title = `${this.practiceService.practice.archiveFlag ? 'Unarchive' : 'Archive'} the practice?`;
        modalRef.componentInstance.info = `${this.practiceService.practice.archiveFlag ? 'Unarchiving' : 'Archiving'} a practice will ${this.practiceService.practice.archiveFlag ? 'bring back' : 'remove'} the access of this practice from all users. ${this.practiceService.practice.archiveFlag ? '' : 'Only the admin can access archived practices.'} Are you sure to ${this.practiceService.practice.archiveFlag ? 'unarchive' : 'archive'} this practice?`;
        modalRef.componentInstance.btnText = `Yes,  ${this.practiceService.practice.archiveFlag ? 'unarchive' : 'archive'} it`;
        const msg = `${this.practiceService.practice.name} has been ${this.practiceService.practice.archiveFlag ? 'unarchived' : 'archived'}`
        modalRef.result.then((result) => {
            this.practiceService.practice.archiveFlag = !this.practiceService.practice.archiveFlag;
            this.save(false, msg);
        }, (reason) => {
        });
    }

    onDisable(): void {
        console.log('thisRouterUrl ', this.router.url)
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        const isDisabled = this.practiceService.practice.status === this.configService.practiceStatus.disable
        modalRef.componentInstance.title = `${isDisabled ? 'Enable' : 'Disable'} the practice?`
        modalRef.componentInstance.info = `${isDisabled ? 'Enabling' : 'Disabling'} a practice will freeze it from being changed.Are you sure to ${isDisabled ? 'enable' : 'disable'} this practice?`;
        modalRef.componentInstance.btnText = `Yes, ${isDisabled ? 'enable' : 'disable'} it`
        const msg = `${this.practiceService.practice.name} has been ${isDisabled ? 'enabled' : 'disabled'}`
        modalRef.result.then((result) => {
            if (isDisabled) {
                this.practiceService.practice.status = PracticeStatus.Active.value;
            } else {
                this.practiceService.practice.status = PracticeStatus.Disable.value;
            }
            this.save(false, msg);
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
                this.practiceService.refreshTeam()
                this.toastRepository.showDanger(msg);
                // this.router.navigateByUrl()
            }
            this.practiceService.practice = res.data;
            this.practiceService.practice.signDate = moment(res.data.signDate).toDate();
            this.practiceService.practice.billingDate = moment(res.data.billingDate).toDate();
        })
    }


}
