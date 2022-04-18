import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../service/current-user.service";
import {CurrentUser} from "../../../model/vo/currentUser";
import {AdviceRepository} from "../../../repository/advice-repository";
import {RoleInfo} from "../../../model/po/roleInfo";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
    currentUser: CurrentUser = new CurrentUser();
    accountRoles: Array<RoleInfo> = new Array<RoleInfo>();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    uploading = false;

    constructor(public currentUserService: CurrentUserService,
                private adviceRepository: AdviceRepository) {
        this.currentUser = {...this.currentUserService.currentUser()}
    }

    ngOnInit(): void {
        if (!this.currentUserService.isAdmin()) {
            this.getAccountRoles();
            this.getPracticeRoles();
        }
    }

    getAccountRoles(): void {
        this.adviceRepository.getAccountRoles().subscribe(res => {
            this.accountRoles = res.data;
            this.currentUser.adviceRoleId = this.currentUserService.adviceRole()?.id;
        })
    }

    getPracticeRoles(): void {
        this.adviceRepository.getPracticeRoles().subscribe(res => {
            this.practiceRoles = res.data;
        })
    }

    fullName(): string {
        if (!this.currentUser) {
            return '';
        }
        let names = [this.currentUser.firstName, this.currentUser.lastName];
        return names.filter(n => n).join(' ');
    }

}
