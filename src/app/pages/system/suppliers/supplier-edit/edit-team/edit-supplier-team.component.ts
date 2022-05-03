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

@Component({
    selector: 'app-manage-supplier-users',
    templateUrl: './edit-supplier-team.component.html',
    styleUrls: ['./edit-supplier-team.component.less']
})
export class EditSupplierTeamComponent implements OnInit {
    team: TeamInfo = new TeamInfo();
    supplierRoles: Array<RoleInfo> = new Array<RoleInfo>();
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
                private teamRepository: TeamRepository) {
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

    getTeamDetail(): Observable<HttpResult<TeamInfo>> {
        return this.teamRepository.teamDetail(this.team.id);
        /*.subscribe(res => {
            Object.assign(this.team, res.data);
        });*/
    }

    getAllProduct(): Observable<HttpResult<Array<ProductAccessVo>>> {
        return this.platformRepository.getAllProduct()
    }

    getSupplierRole(): void {
        this.supplierRepository.getSupplierRole().subscribe(res => {
            this.supplierRoles = res.data;
        });
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

    save() {
        if (!this.team.roleId) {
            this.toastRepository.showDanger('Account type is required.');
            return;
        }
        if (!this.team.firstName) {
            this.toastRepository.showDanger('First name is required.');
            return;
        }
        if (!this.team.lastName) {
            this.toastRepository.showDanger('Last name is required.');
            return;
        }
        if (!this.team.email) {
            this.toastRepository.showDanger('Work email is required.');
            return;
        }
        this.team.supplierUserProductVoList = this.products.filter(p => p.checked).map(p => ({
            shProductId: p.id
        }));

        this.teamRepository.saveTeam(this.team).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            if (this.team.id) {
                this.toastRepository.showSuccess('Save Successfully');
            } else  {
                this.toastRepository.showSuccess('New user created and welcome email sent');
            }
            this.router.navigateByUrl(`/supplier/edit-team/${res.data.id}/${res.data.companyId}`);
        })
    }
}
