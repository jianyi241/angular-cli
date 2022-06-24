import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamInfo} from "../../../../model/po/teamInfo";
import {Page} from "../../../../model/vo/page";
import {TeamCondition} from "../../../../model/condition/team-condition";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {Constants} from "../../../../model/constants";
import {ToastRepository} from "../../../../repository/toast-repository";
import {TeamRepository} from "../../../../repository/team-repository";
import {PracticeService} from "../../../../service/practice.service";

@Component({
    selector: 'app-advice-team',
    templateUrl: './advice-team.component.html',
    styleUrls: ['./advice-team.component.less']
})
export class AdviceTeamComponent implements OnInit,OnDestroy {
    practiceRefreshObservable: any
    teamPage: Page<TeamInfo> = new Page<TeamInfo>();
    condition: TeamCondition = new TeamCondition(1, 10);

    constructor(private teamRepository: TeamRepository,
                public configService: ConfigService,
                private router: Router,
                private toastRepository: ToastRepository,
                private activatedRoute: ActivatedRoute,
                private practiceService: PracticeService) {
    }

    ngOnInit(): void {
        this.subscribe()
        this.activatedRoute.params.subscribe(params => {
            this.condition.companyId = params['id'];
        })
        this.getTeamList();
    }

    ngOnDestroy() {
        this.practiceRefreshObservable && this.practiceRefreshObservable.unsubscribe()
    }

    getTeamList(): void {
        this.teamRepository.teamList(this.condition).subscribe(res => {
            this.teamPage = Object.assign(this.teamPage, res.data);
        });
    }

    pageChange(current: number) {
        this.condition.current = current;
        this.getTeamList();
    }

    save(team?: TeamInfo) {
        this.router.navigateByUrl(`/advice-practices/edit-team/${team?.id || Constants.NON_ID}/${this.condition.companyId}`);
    }

    resend(team: TeamInfo): void {
        this.teamRepository.resendAdviceInvite(team.openId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('The invitation email has been sent. Please check your inbox.');
        })
    }

    subscribe() {
        this.refreshTeamSubscribe()
    }

    refreshTeamSubscribe(): void {
        this.practiceRefreshObservable = this.practiceService.refreshTeamObservable.subscribe(res => {
            this.getTeamList()
        })
    }
}
