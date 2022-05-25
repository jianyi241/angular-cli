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
import {Constants} from "../../../model/constants";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {Router} from "@angular/router";
import {AdminRepository} from "../../../repository/admin-repository";
import {RoleType} from "../../../model/enums/role-type";
import {ConfigService} from "../../../service/config.service";
import {UserInfo} from "../../../model/po/userInfo";
import {ProductAccessVo} from "../../../model/vo/productAccessVo";
import {PlatformRepository} from "../../../repository/platform-repository";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
    currentUser: CurrentUser = new CurrentUser();
    currentRole: RoleInfo = new RoleInfo();
    accountRoles: Array<RoleInfo> = new Array<RoleInfo>();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    owners: Array<UserInfo> = new Array<UserInfo>();
    products: Array<ProductAccessVo> = new Array<ProductAccessVo>();
    ownerId?: string;
    uploading = false;
    config = {...Constants.EDITOR_CONFIG};

    constructor(public currentUserService: CurrentUserService,
                private storage: LocalStorageObServable,
                private fileRepository: FileRepository,
                private userRepository: UserRepository,
                private toastRepository: ToastRepository,
                private adviceRepository: AdviceRepository,
                private adminRepository: AdminRepository,
                private platformRepository: PlatformRepository,
                private router: Router,
                private configService: ConfigService,
                private saveService: SaveService) {
        this.currentUser = {...this.currentUserService.currentUser()}
        this.currentRole = this.currentUserService.authorities()[0]
    }

    ngOnInit(): void {
        if (!this.currentUserService.isAdminUser()) {
            this.getAccountRoles();
            this.getPracticeRoles();
            this.getTransferUsers();
            if (this.currentUserService.isSupplierUser()) {
                this.getAllSupplierProducts()
            }
        } else {
            this.getAdminRoles();
        }
    }

    getAllSupplierProducts(): void {
        this.platformRepository.getAllProduct(this.currentUser.companyId).subscribe(res => {
            this.products = res.data
        },err => {});
    }

    getAccountRoles(): void {
        this.adviceRepository.getAccountRoles().subscribe(res => {
            this.accountRoles = res.data;
        })
    }

    getAdminRoles(): void {
        this.adminRepository.getAdminRoles().subscribe(res => {
            this.accountRoles = res.data;
        })
    }

    getPracticeRoles(): void {
        this.adviceRepository.getPracticeRoles().subscribe(res => {
            this.practiceRoles = res.data;
        })
    }

    toForgot(): void {
        this.router.navigate(['/forgot'],{queryParams: {email: this.currentUser.email}})
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
                        console.log('currentUser --> ', this.currentUser)
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
            this.toastRepository.showSuccess('Save Successfully.');
            this.storage.setItem(Constants.CURRENT_USER, res.data);
            this.currentUserService.setAuthentication(res.data);
        })
    }

    getTransferUsers(): void {
        this.userRepository.getTransferUsers().subscribe(res => {
            this.owners = res.data.filter(item => item.id != this.currentUser.id)
        },err => {})
    }

    transOwner(): void {
        if (!this.ownerId) {
            this.toastRepository.showDanger('owner is required')
            return
        }
        this.userRepository.transOwnerShip(this.ownerId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'operation failed')
            }
            this.currentUser.owner = false
            this.currentUserService.updatePrincipal(this.currentUser)
            this.toastRepository.showSuccess('Transfer successfully')
        },err => {})
    }

}
