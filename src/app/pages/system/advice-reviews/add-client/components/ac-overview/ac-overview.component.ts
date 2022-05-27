import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Version} from "../../../../../../model/po/version";
import {ProductFormVo} from "../../../../../../model/vo/productFormVo";
import {Constants} from "../../../../../../model/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ClientDetailVo} from "../../../../../../model/vo/clientDetailVo";
import {UserRepository} from "../../../../../../repository/user-repository";
import { RoleEnum } from "../../../../../../model/enums/role-enum";
import {UserInfo} from "../../../../../../model/po/userInfo";
import {ClientRepository} from "../../../../../../repository/client-repository";
import {RejectModalComponent} from "../../../../platforms/modal/reject-modal/reject-modal.component";
import {VersionStatus} from "../../../../../../model/enums/version-status";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DisableModalComponent} from "../../../modal/disable-modal/disable-modal.component";

@Component({
  selector: 'app-ac-overview',
  templateUrl: './ac-overview.component.html',
  styleUrls: ['./ac-overview.component.less']
})

export class AcOverviewComponent implements OnInit {

  client: ClientDetailVo = new ClientDetailVo();
  adviserUsers: Array<UserInfo> = new Array<UserInfo>();
  product: ProductInfo = new ProductInfo();
  version: Version = new Version();
  overview: ProductFormVo = new ProductFormVo();
  config = {...Constants.EDITOR_CONFIG};

  @Input() clientId?: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private toastRepository: ToastRepository,
              private userRepository: UserRepository,
              private clientRepository: ClientRepository,
              private ngbModal: NgbModal) {
  }

  ngOnInit(): void {
    this.init();
  }


  init(): void {
    this.parseRouterParam();
    this.getAdviserUsers();
    if (this.clientId != Constants.NON_ID) {
      this.client.id = this.clientId
      this.getClientInfo()
    }
  }

  removeNameInput(index: number) {
    this.client.clientMembers.splice(index, 1)
  }

  addNameInput() {
    if (this.client.clientMembers.length < 6) {
      this.client.clientMembers.push({
        name: ''
      })
    }
  }

  getAdviserUsers(): void {
    this.userRepository.getUsersByType(RoleEnum.Adviser.type).subscribe(res => {
      this.adviserUsers = res.data
    },err => {})
  }

  getClientInfo(): void {
    this.clientRepository.getDetail(this.client.id).subscribe(res => {
      this.client = res.data
    })
  }

  save(): void {
    if (!this.client.firstName) {
      this.toastRepository.showDanger('First name is required')
      return
    }
    if (!this.client.lastName) {
      this.toastRepository.showDanger('Last name is required')
      return
    }
    if (!this.client.email) {
      this.toastRepository.showDanger('email is required')
      return
    }
    if (!this.client.userId) {
      this.toastRepository.showDanger('Adviser name is required')
      return
    }
    this.clientRepository.save(this.client).subscribe(res => {
      if (res.statusCode === 200 ) {
        this.toastRepository.showSuccess('Save successfully')
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([`/advice-review/add-client/overview/${res.data?.id || Constants.NON_ID}`])
        })
      } else {
        this.toastRepository.showDanger(res.msg || 'Save failed')
      }
    })
  }

  updateStatus(status: string) {
    this.client.status = status
    if (status === 'Disable') {
      this.disableConfig()
    }
  }

  disableConfig(): void {
    const modalRef = this.ngbModal.open(DisableModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.result.then(res => {
      console.log('confirm')
      this.save()
    }, err => {
      console.log('cancel')
    })
  }

  parseRouterParam(): void {
    this.activatedRoute.params.subscribe(res => {
    })
  }
}

