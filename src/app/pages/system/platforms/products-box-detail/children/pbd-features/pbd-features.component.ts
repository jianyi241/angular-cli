import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Constants} from "../../../../../../model/constants";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ConfigService} from "../../../../../../service/config.service";
import {Version} from "../../../../../../model/po/version";
import {ProductFormVo} from "../../../../../../model/vo/productFormVo";
import {VersionRepository} from "../../../../../../repository/version-repository";
import {FileRepository} from "../../../../../../repository/file-repository";
import {PropStatus} from "../../../../../../model/enums/prop-status";
import {FocusService} from "../../../../../../service/focus.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PreviewImageModalComponent} from "../../../modal/preview-image-modal/preview-image-modal.component";
import PlatformView from "../../../../../../model/po/platformView";
import PlatformInformation from "../../../../../../model/po/platformInformation";
import {TabType} from "../../../../../../model/enums/tab-type";
import {Group} from "../../../../../../model/po/platformView";

@Component({
  selector: 'app-pbd-features',
  templateUrl: './pbd-features.component.html',
  styleUrls: ['./pbd-features.component.less']
})
export class PbdFeaturesComponent implements OnInit, OnDestroy {
  subGroup: Group = new Group();
  alreadyExpandList: Array<number> = []

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private focusService: FocusService,
              private toastRepository: ToastRepository,
              private versionRepository: VersionRepository,
              private fileRepository: FileRepository,
              private platformRepository: PlatformRepository,
              private ngbModal: NgbModal,) {
  }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['id']
      this.getAllPlatformView()
    })
  }

  productId: string
  versionId: string
  platformViewAllInfo: PlatformView<PlatformInformation> = new PlatformView<PlatformInformation>();
  groups: Array<Group> = new Array<Group>();

  getAllPlatformView(): void{
    console.log('productId ', this.productId, '--- ')
    this.platformRepository.getPlatformViewByTabType<PlatformInformation>(this.productId, TabType.features.value) .subscribe(res => {
      this.platformViewAllInfo = res.data
      this.groups = res.data.groups
      console.log('this.groups  features ===> ', this.groups )
    },err => {})
  }

  expandItem(item: number): void {
    const idx = this.alreadyExpandList.indexOf(item)
    if (idx !== -1) {
      this.alreadyExpandList.splice(idx,1)
    } else {
      this.alreadyExpandList.push(item)
    }
  }

  groupDotFlag(group: Group): boolean {
    if (!group.subGroups || group.subGroups.length == 0) {
      return false;
    }
    for (const subGroup of group.subGroups) {
      if (this.subGroupDotFlag(subGroup)) {
        return true;
      }
    }
    return false;
  }

  subGroupDotFlag(subGroup: Group): boolean {
    if (!subGroup.properties || subGroup.properties.length == 0) {
      return false;
    }
    return subGroup.properties.some(p => p.status != PropStatus.Normal.value);
  }


  chooseSubGroup(group: Group) {
    console.log('group ', group)
    this.subGroup = group;
  }

  previewImage(imgUrl: string): void {
    const modalRef = this.ngbModal.open(PreviewImageModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.imgUrl = imgUrl
  }
}
