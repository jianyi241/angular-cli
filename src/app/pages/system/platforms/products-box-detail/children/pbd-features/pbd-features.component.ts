import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ConfigService} from "../../../../../../service/config.service";
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
import {ProductPropInfo} from "../../../../../../model/po/productPropInfo";

@Component({
  selector: 'app-pbd-features',
  templateUrl: './pbd-features.component.html',
  styleUrls: ['./pbd-features.component.less']
})
export class PbdFeaturesComponent implements OnInit {
  productId: string
  versionId: string
  platformViewAllInfo: PlatformView<PlatformInformation> = new PlatformView<PlatformInformation>();
  groups: Array<Group> = new Array<Group>();
  propertiesList: Array<ProductPropInfo> = new Array<ProductPropInfo>();
  subGroup: Group = new Group();
  alreadyExpandList: Array<string> = []

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private focusService: FocusService,
              private toastRepository: ToastRepository,
              private versionRepository: VersionRepository,
              private fileRepository: FileRepository,
              private platformRepository: PlatformRepository,
              private ngbModal: NgbModal) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['id']
      this.getAllPlatformView()
    })
  }

  getAllPlatformView(): void{
    console.log('productId ', this.productId, '--- ')
    this.platformRepository.getPlatformViewByTabType<PlatformInformation>(this.productId, TabType.features.value) .subscribe(res => {
      this.platformViewAllInfo = res.data
      this.groups = res.data.groups
      let list = this.groups[0].subGroups[0].properties
      this.propertiesList = list
      this.alreadyExpandList = [this.propertiesList[0].shPropertyId]
      console.log('this.groups  features ===> ', this.groups )
    },err => {})
  }

  expandItem(item: ProductPropInfo): void {
    const idx = this.alreadyExpandList.indexOf(item.shPropertyId)
    if (idx !== -1) {
      this.alreadyExpandList.splice(idx,1)
    } else {
      this.alreadyExpandList.push(item.shPropertyId)
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
    this.propertiesList = group.properties
    if (!this.propertiesList || this.propertiesList.length === 0) {
      this.alreadyExpandList = []
    } else {
      this.alreadyExpandList = [this.propertiesList[0].shPropertyId]
    }
    console.log('properties ', this.propertiesList)
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
