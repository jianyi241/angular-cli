import {Component, OnInit} from '@angular/core';
import {TeamRepository} from "../../../../../repository/team-repository";
import {SupplierService} from "../../../../../service/supplier.service";
import {Page} from "../../../../../model/vo/page";
import {TeamInfo} from "../../../../../model/po/teamInfo";
import {TeamCondition} from "../../../../../model/condition/team-condition";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../../../model/constants";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {ConfigService} from "../../../../../service/config.service";

@Component({
    selector: 'app-supplier-team',
    templateUrl: './supplier-team.component.html',
    styleUrls: ['./supplier-team.component.less']
})
export class SupplierTeamComponent implements OnInit {
    teamPage: Page<TeamInfo> = new Page<TeamInfo>();
    condition: TeamCondition = new TeamCondition(1, 10);

    constructor(private teamRepository: TeamRepository,
                private supplierService: SupplierService,
                public configService: ConfigService,
                private router: Router,
                private toastRepository: ToastRepository,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.condition.companyId = params['id'];
            this.getTeamList();
        })
    }

    getTeamList(): void {
        this.teamRepository.teamList(this.condition).subscribe(res => {
            Object.assign(this.teamPage, res.data);
        });
    }

    pageChange(current: number) {
        this.condition.current = current;
        this.getTeamList();
    }

    save(team?: TeamInfo) {
        this.router.navigateByUrl(`/supplier/edit-team/${team?.id || Constants.NON_ID}/${this.condition.companyId}/${team?.openId || Constants.NON_ID}`);
    }

    resend(team: TeamInfo): void {
        this.teamRepository.resendSupplierInvite(team.openId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('The invitation email has been sent. Please check your inbox.');
        })
    }

    searchTeamPage(type?: string | boolean) {
        if (!type) {
            this.condition.accountType = '';
            this.condition.owner = false;
        }
        if (typeof type == 'string') {
            this.condition.accountType = type;
            this.condition.owner = false;
        }
        if (typeof type == 'boolean') {
            this.condition.owner = type;
            this.condition.accountType = '';
        }
        this.getTeamList();
    }
}
