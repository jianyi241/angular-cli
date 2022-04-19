import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../service/current-user.service";
import {CurrentUser} from "../../../model/vo/currentUser";
import {AdviceRepository} from "../../../repository/advice-repository";
import {RoleInfo} from "../../../model/po/roleInfo";
import {SaveService} from "../../../service/save.service";
import {UserRepository} from "../../../repository/user-repository";
import {environment} from "../../../../environments/environment";
import {ToastRepository} from "../../../repository/toast-repository";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../repository/file-repository";

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
                private saveService: SaveService,
                private fileRepository: FileRepository,
                private userRepository: UserRepository,
                private toastRepository: ToastRepository,
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
                        this.currentUser.avatar = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    saveProfile() {
        if (!this.currentUser.firstName) {
            this.toastRepository.showDanger("First name is required.");
            return;
        }
        if (!this.currentUser.lastName) {
            this.toastRepository.showDanger("Last name is required.");
            return;
        }
        if (!this.currentUser.email) {
            this.toastRepository.showDanger("Email is required.");
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + `/user/v1/updateUserInfo`)) {
            return;
        }
        let copyUser = {...this.currentUser};
        this.userRepository.updateProfile(copyUser).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.currentUserService.setAuthentication(res.data);
        })
    }
}
