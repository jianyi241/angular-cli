import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveService} from "../../../../../service/save.service";
import {FileRepository} from "../../../../../repository/file-repository";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {TeamRepository} from "../../../../../repository/team-repository";
import {SupplierRepository} from "../../../../../repository/supplier-repository";
import {TeamInfo} from "../../../../../model/po/teamInfo";
import {ConfigService} from "../../../../../service/config.service";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {PlatformRepository} from "../../../../../repository/platform-repository";
import {RoleInfo} from "../../../../../model/po/roleInfo";
import {ProductAccessVo} from "../../../../../model/vo/productAccessVo";
import {forkJoin, Observable} from "rxjs";
import {HttpResult} from "../../../../../model/common/http-result";
import {ConfirmModalComponent} from "../../../modal/confirm-modal/confirm-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrentUserService} from "../../../../../service/current-user.service";
import {UserRepository} from "../../../../../repository/user-repository";
import {Commons} from "../../../../../utils/Commons";

@Component({
    selector: 'app-manage-supplier-users',
    templateUrl: './edit-supplier-team.component.html',
    styleUrls: ['./edit-supplier-team.component.less']
})
export class EditSupplierTeamComponent implements OnInit {
    team: TeamInfo = new TeamInfo();
    supplierRoles: Array<RoleInfo> = new Array<RoleInfo>();
    jobTitles: Array<RoleInfo> = new Array<RoleInfo>();
    products: Array<ProductAccessVo> = new Array<ProductAccessVo>();
    uploading = false;
    config = {...Constants.EDITOR_CONFIG};

    accountType: string = 'BusinessDevelopmentManager';

    constructor(private activatedRoute: ActivatedRoute,
                private saveService: SaveService,
                private router: Router,
                private fileRepository: FileRepository,
                private toastRepository: ToastRepository,
                private supplierRepository: SupplierRepository,
                private platformRepository: PlatformRepository,
                public configService: ConfigService,
                private teamRepository: TeamRepository,
                private ngbModal: NgbModal,
                private currentUser: CurrentUserService,
                private userRepository: UserRepository) {
        this.team.companyType = 2;
    }

    ngOnInit(): void {
        let obsArr: Observable<HttpResult<any>>[] = [];
        this.activatedRoute.params.subscribe(params => {
            this.team.companyId = params['companyId'];
            if (params['id'] != Constants.NON_ID) {
                this.team.id = params['id'];
                let teamDetail = this.getTeamDetail();
                obsArr.push(teamDetail);
            } else {
                obsArr.push(Observable.create(function (observer) {
                    observer.next(null);
                    observer.complete();
                }));
            }
        })
        let allProduct = this.getAllProduct();
        this.getSupplierRole();
        this.getJobTitles();
        obsArr.push(allProduct);
        forkJoin(obsArr).subscribe(res => {
            this.team = res[0]?.data ? Object.assign(this.team, res[0].data) : this.team;
            this.products = res[1].data;
            if (this.team.supplierUserProductVoList.length == 0 || this.products.length == 0) {
                return;
            }
            this.products.forEach(product => {
                product.checked = this.team.supplierUserProductVoList.some(sp => sp.shProductId == product.id);
            })
        });
    }

    isShowResendInvite(): boolean {
        return this.team.openId !== Constants.NON_ID && this.team.status === this.configService.userStatus.pending
    }

    updateStatus(): void {
        const _team = Commons.deepCopy(this.team)
        if (_team.status === this.configService.userStatus.active) {
            _team.status = this.configService.userStatus.disable
        } else {
            _team.status = this.configService.userStatus.active
        }
        this.save(_team)
    }

    showPermissions(): boolean {
        const role = this.supplierRoles.find(item => item.id === this.team.roleId)
        return role && role.roleName === this.configService.roles.administrator || role.roleName === this.configService.roles.premiumUser
    }

    getTeamDetail(): Observable<HttpResult<TeamInfo>> {
        return this.teamRepository.teamDetail(this.team.id);
        /*.subscribe(res => {
            Object.assign(this.team, res.data);
        });*/
    }

    getAllProduct(): Observable<HttpResult<Array<ProductAccessVo>>> {
        return this.platformRepository.getAllProduct(this.team.companyId);
    }

    getSupplierRole(): void {
        this.supplierRepository.getSupplierRole().subscribe(res => {
            this.supplierRoles = res.data;
            this.team.roleId = this.supplierRoles[0].id
        });
    }

    getJobTitles(): void {
        this.supplierRepository.getJobTitles().subscribe(res => {
            this.jobTitles = res.data;
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
                        console.log('upload img result ===> ', res)
                        this.team.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    save(team: TeamInfo) {
        if (!team.attachmentVo || !team.attachmentVo?.visitUrl) {
            this.toastRepository.showDanger('Profile photo is required.');
            return;
        }
        if (!team.roleId) {
            this.toastRepository.showDanger('Account type is required.');
            return;
        }
        if (!team.firstName) {
            this.toastRepository.showDanger('First name is required.');
            return;
        }
        if (!team.lastName) {
            this.toastRepository.showDanger('Last name is required.');
            return;
        }
        if (!team.email) {
            this.toastRepository.showDanger('Work email is required.');
            return;
        }
        if (!team.jobTitle) {
            this.toastRepository.showDanger('Job title is required.');
            return;
        }
        if (!team.mobile) {
            this.toastRepository.showDanger('Contact number is required.');
            return;
        }

        team.supplierUserProductVoList = this.products.filter(p => p.checked).map(p => ({
            shProductId: p.id
        }));

        this.teamRepository.saveTeam(team).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            if (team.id) {
                this.toastRepository.showSuccess('Save Successfully');
            } else {
                this.toastRepository.showSuccess('New user created and welcome email sent');
            }
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([`/supplier/edit-team/${res.data.id}/${res.data.companyId}`]);
            })
        })
    }

    archivedConfirm(): void {
        const modalRef = this.ngbModal.open(ConfirmModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.modal.title = 'Archive this user?'
        modalRef.componentInstance.modal.text = 'Archiving the user will disable their access to SuitabilityHub. Are you sure?'
        modalRef.componentInstance.modal.cancelText = 'No, do nothing'
        modalRef.componentInstance.modal.confirmText = 'Yes, archive'
        modalRef.result.then(res => {
            alert('confirm archived')
        }, err => {
            console.log('cancel')
        })
    }

    resend(): void {
        this.teamRepository.resendSupplierInvite(this.team.openId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('The invitation email has been sent. Please check your inbox.');
        })
    }

    transOwner() {
        console.log('teamid ', this.team.id, '---- ', this.currentUser.currentUser().id)
        // this.userRepository.transOwnerShip(this.team.id).subscribe(res => {
        //     if (res.statusCode != 200) {
        //         this.toastRepository.showDanger(res.msg || 'operation failed')
        //     }
        //     this.team.owner = true
        //     if (this.team.id === this.currentUser.currentUser().id) {
        //         this.currentUser.updatePrincipal(this.currentUser)
        //     }
        //     this.toastRepository.showSuccess('Transfer successfully')
        // },err => {})
    }
}
