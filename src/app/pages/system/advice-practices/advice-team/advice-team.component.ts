import {Component, OnInit} from '@angular/core';
import {TeamInfo} from "../../../../model/po/teamInfo";
import {Page} from "../../../../model/vo/page";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {TeamCondition} from "../../../../model/condition/team-condition";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {Constants} from "../../../../model/constants";

@Component({
    selector: 'app-advice-team',
    templateUrl: './advice-team.component.html',
    styleUrls: ['./advice-team.component.less']
})
export class AdviceTeamComponent implements OnInit {
    teamPage: Page<TeamInfo> = new Page<TeamInfo>();
    condition: TeamCondition = new TeamCondition(1, 10);

    constructor(private adviceRepository: AdviceRepository,
                public configService: ConfigService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.condition.practiceId = params['id'];
        })
        this.getTeamList();
    }

    getTeamList(): void {
        this.adviceRepository.teamList(this.condition).subscribe(res => {
            this.teamPage = Object.assign(this.teamPage, res.data);
        });
    }

    pageChange(current: number) {
        this.condition.current = current;
        this.getTeamList();
    }

    save(team?: TeamInfo) {
        this.router.navigateByUrl(`/advice-practices/edit-team/${team?.id || Constants.NON_ID}/${this.condition.practiceId}`);
    }
}
