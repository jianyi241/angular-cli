import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamInfo} from "../../../../model/po/teamInfo";
import {Constants} from "../../../../model/constants";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {RoleInfo} from "../../../../model/po/roleInfo";
import {ToastRepository} from "../../../../repository/toast-repository";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../../repository/file-repository";
import {TeamRepository} from "../../../../repository/team-repository";

@Component({
    selector: 'app-edit-team',
    templateUrl: './edit-team.component.html',
    styleUrls: ['./edit-team.component.less']
})
export class EditTeamComponent implements OnInit {
    practiceId: string;
    team: TeamInfo = new TeamInfo();
    accountRoles: Array<RoleInfo> = new Array<RoleInfo>();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    uploading = false;

    constructor(private activatedRoute: ActivatedRoute,
                private saveService: SaveService,
                private fileRepository: FileRepository,
                private toastRepository: ToastRepository,
                private adviceRepository: AdviceRepository,
                private teamRepository: TeamRepository) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.practiceId = params['practiceId'];
            this.team.companyId = this.practiceId;
            if (params['id'] != Constants.NON_ID) {
                this.team.id = params['id'];
                this.getTeamDetail();
            }
        })
        this.getAccountRoles();
        this.getPracticeRoles();
    }

    getTeamDetail(): void {
        this.teamRepository.teamDetail(this.team.id).subscribe(res => {
            this.team = Object.assign(this.team, res.data);
        })
    }

    getAccountRoles(): void {
        this.adviceRepository.getAccountRoles().subscribe(res => {
            this.accountRoles = res.data;
            this.team.roleId = this.accountRoles[0].id;
        })
    }

    getPracticeRoles(): void {
        this.adviceRepository.getPracticeRoles().subscribe(res => {
            this.practiceRoles = res.data;
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
                        this.team.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    save(): void {
        let copyTeam = {...this.team};
        if (!copyTeam.firstName) {
            this.toastRepository.showDanger('First name is required.');
            return;
        }
        if (!copyTeam.lastName) {
            this.toastRepository.showDanger('Last name is required.');
            return;
        }
        if (!copyTeam.email) {
            this.toastRepository.showDanger('Work email is required.');
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + '/advice/saveOrUpdateTeamMember')) {
            return;
        }
        this.teamRepository.saveTeam(copyTeam).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess(this.team.id ? 'Save Successfully' : 'New user created and welcome email sent');
            this.team = res.data;
        });
    }
}
