import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamInfo} from "../../../../model/po/teamInfo";
import {ToastRepository} from "../../../../repository/toast-repository";
import {SaveService} from "../../../../service/save.service";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../../repository/file-repository";
import {AdminRepository} from "../../../../repository/admin-repository";
import {RoleInfo} from "../../../../model/po/roleInfo";
import {AdminInfo} from "../../../../model/po/adminInfo";
import {Constants} from "../../../../model/constants";
import {ConfigService} from "../../../../service/config.service";
import {UserRepository} from "../../../../repository/user-repository";
import {CurrentUserService} from "../../../../service/current-user.service";

@Component({
    selector: 'app-admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.less']
})
export class AdminDetailComponent implements OnInit {
    type: string;
    team: TeamInfo = new TeamInfo();
    adminInfo: AdminInfo = new AdminInfo();
    adminRoles: Array<RoleInfo> = new Array<RoleInfo>();
    uploading: boolean = false;

    constructor(private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private adminRepository: AdminRepository,
                private userRepository: UserRepository,
                private saveService: SaveService,
                private fileRepository: FileRepository,
                private toastRepository: ToastRepository,
                private router: Router,
                private currentUserService: CurrentUserService
                ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            if (params['id'] !== Constants.NON_ID) {
                this.adminInfo.id = params['id']
            }
            this.type = params['type']
        })
        this.getAdminRoles()
        if (this.type === '1') {
            this.getAdminDetail()
        }
    }

    getStatusCls(): string {
        switch (this.adminInfo.status) {
            case this.configService.userStatus.active:
                return "label-green-light"
                break;
            case this.configService.userStatus.pending:
                return "label-orange"
                break;
            case this.configService.userStatus.disable:
                return "label-red"
        }
        return "";
    }

    getOperateText(): string {
        switch (this.adminInfo.status) {
            case this.configService.userStatus.active:
                return `Disable ${this.adminInfo.firstName} ${this.adminInfo.lastName}`
                break;
            case this.configService.userStatus.pending:
                return "Resend welcome email"
                break;
            case this.configService.userStatus.disable:
                return "Enable"
            default:
                return "Create and send welcome email"
        }
    }

    toForgot(): void {
        // this.router.navigate(['/forgot'],{queryParams: {email: this.adminInfo.email}})
        this.toastRepository.showSuccess(`Reset password link has been sent to ${this.adminInfo.email}.`)
    }

    getAdminDetail(): void {
        this.adminRepository.getAdminInfo(this.adminInfo.id).subscribe(res => {
            this.adminInfo = Object.assign(this.adminInfo, res.data);
        })
    }

    getAdminRoles(): void {
        this.adminRepository.getAdminRoles().subscribe(res => {
            if (res.statusCode === 200) {
                this.adminRoles = res.data
                if (this.type === '0') {
                    this.adminInfo.adviceRoleId = this.adminRoles[1].id
                }
            }
        })
    }

    droppedFile(files: NgxFileDropEntry[]) {
        if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                if (!file.type.includes('image')) {
                    this.toastRepository.showDanger('Unsupported file types');
                    return;
                }
                this.uploading = true;
                this.fileRepository.uploadFile('img', file).then(res => {
                    this.uploading = false;
                    if (res.statusCode == 200) {
                        this.adminInfo.avatar = res.data[0];
                        if (this.type === '1') {
                            this.save()
                        }
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    submit(): void {
        if (this.adminInfo.status === this.configService.userStatus.pending) { // 重发邀请邮件
            this.sendInvite()
            return
        } else if (this.adminInfo.status === this.configService.userStatus.active) {
            this.adminInfo.status = this.configService.userStatus.disable
        } else if (this.adminInfo.status === this.configService.userStatus.disable) {
            this.adminInfo.status = this.configService.userStatus.active
        }
        this.save()
    }

    blurUpdate(): void {
        if (this.type === '1') {
            this.save()
        }
    }

    sendInvite(): void {
        this.userRepository.reSendInviteAdmin(this.adminInfo.openId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return
            }
            this.toastRepository.showSuccess('The invitation email has been sent. Please check your inbox.');
        }, err => {
        })
    }

    save(): void {
        let _adminInfo = {...this.adminInfo};
        if (!_adminInfo.avatar || !_adminInfo.avatar?.visitUrl) {
            this.toastRepository.showDanger('Profile photo is required.');
            return;
        }
        if (!_adminInfo.firstName) {
            this.toastRepository.showDanger('First name is required.');
            return;
        }
        if (!_adminInfo.lastName) {
            this.toastRepository.showDanger('Last name is required.');
            return;
        }
        if (!_adminInfo.email) {
            this.toastRepository.showDanger('Work email is required.');
            return;
        }

        this.adminRepository.updateOrSaveAdmin(this.adminInfo).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            const data = res.data
            Object.assign(this.adminInfo, data)
            if (this.type === '0') {
                this.toastRepository.showSuccess('New user created and welcome email sent');
                return;
            }
            this.toastRepository.showSuccess(res.msg || 'Successful operation');
        })
    }

    disableAccountType(): boolean {
        return this.currentUserService.currentUser().role === this.configService.roles.admin
    }

    showResetPassword(): boolean {
        return this.adminInfo.status === this.configService.userStatus.active
    }
}
