import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamInfo} from "../../../../model/po/teamInfo";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {RoleInfo} from "../../../../model/po/roleInfo";
import {ToastRepository} from "../../../../repository/toast-repository";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../../repository/file-repository";
import {AdminRepository} from "../../../../repository/admin-repository";
import {AdminRole} from "../../../../model/po/adminRole";
import {AdminInfo} from "../../../../model/po/adminInfo";

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.less']
})
export class AdminDetailComponent implements OnInit {
  type: string;
  status: number = 1;
  team: TeamInfo = new TeamInfo();
  adminInfo: AdminInfo = new AdminInfo();
  adminRoles: Array<AdminRole> = new Array<AdminRole>();
  uploading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private adminRepository: AdminRepository,
              private saveService: SaveService,
              private fileRepository: FileRepository,
              private toastRepository: ToastRepository) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params ===> ', params)
      this.adminInfo.id = params['id']
      this.type = params['type']
      console.log('this.id ===> ', this.adminInfo.id)
      console.log('this.type ===> ', this.type)
    })
    this.getAdminRoles()
    this.getAdminDetail()
  }

  getStatusCls(status: string): string {
    switch (status) {
      case "Active":
          return "label-green-light"
        break;
      case "Pending":
        return "label-orange"
      break;
      case "Disable":
        return "label-default"
    }
    return "";
  }

  getAdminDetail(): void {
    this.adminRepository.getAdminInfo(this.adminInfo.id).subscribe(res => {
      this.adminInfo = Object.assign(this.adminInfo, res.data);
      console.log('admin detail ===> ', this.adminInfo)
    })
  }

  getAdminRoles(): void {
    this.adminRepository.getAdminRoles().subscribe(res => {
      if (res.statusCode === 200) {
        this.adminRoles = res.data
      }
      console.log('admin roles ===> ', this.adminRoles)
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
            console.log('this.adminInfo.avatar ===> ', this.adminInfo.avatar)
          }
        });
      });
    } else {
      this.toastRepository.showDanger('Unsupported file types');
    }
  }

  save(): void {
    let _adminInfo = {...this.adminInfo};
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
    if (this.saveService.saveCheck(environment.baseURL + '/advice/saveOrUpdateTeamMember')) {
      return;
    }
    // this.toastRepository.showSuccess('New user created and welcome email sent');

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
