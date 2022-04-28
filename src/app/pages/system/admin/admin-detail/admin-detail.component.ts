import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.less']
})
export class AdminDetailComponent implements OnInit {
  type: string;
  id: string;
  status: number = 1;
  team: TeamInfo = new TeamInfo();
  accountRoles: Array<RoleInfo> = new Array<RoleInfo>();
  practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
  uploading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private saveService: SaveService,
              private fileRepository: FileRepository,
              private toastRepository: ToastRepository,
              private adviceRepository: AdviceRepository) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params ===> ', params)
      this.id = params['id']
      this.type = params['type']
      console.log('this.id ===> ', this.id)
      console.log('this.type ===> ', this.type)
    })
    this.getAccountRoles()
  }

  getTeamDetail(): void {
    this.adviceRepository.teamDetail(this.team.id).subscribe(res => {
      this.team = Object.assign(this.team, res.data);
    })
  }

  getAccountRoles(): void {
    // this.adviceRepository.getAccountRoles().subscribe(res => {
    //   console.log('account roles ===> ', res.data)
    //   this.accountRoles = res.data;
    //   this.team.roleId = this.accountRoles.find(a => a.roleName == RoleType.Adviser.value).id;
    // })
    const arr: Array<RoleInfo> = [
      {
        authority: "user",
        createTime: null,
        createUser: null,
        deleteFlag: false,
        id: "1",
        roleDesc: "Can publish changes made by Suppliers and Administrators. Can create new Administrators",
        roleName: "Super administrator",
        updateTime: null,
        updateUser: null
      },
      {
        authority: "user",
        createTime: null,
        createUser: null,
        deleteFlag: false,
        id: "2",
        roleDesc: "Can review changes from suppliers and make own changes,but cannot publish. Can view and manage Supplier and Adviser users",
        roleName: "Administrator",
        updateTime: null,
        updateUser: null
      },
    ]
    this.accountRoles = arr;
    this.team.roleId = "1"
  }

  getPracticeRoles(): void {
    this.adviceRepository.getPracticeRoles().subscribe(res => {
      console.log('practice roles ===> ', res.data)
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
            console.log('upload img result ===> ', res)
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
    this.toastRepository.showSuccess('New user created and welcome email sent');
    // this.adviceRepository.saveTeam(copyTeam).subscribe(res => {
    //   if (res.statusCode != 200) {
    //     this.toastRepository.showDanger(res.msg);
    //     return;
    //   }
    //   this.toastRepository.showSuccess(this.team.id ? 'Save Successfully' : 'New user created and welcome email sent');
    //   this.team = res.data;
    // });
  }
}
