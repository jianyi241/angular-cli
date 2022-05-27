import { Component, OnInit } from '@angular/core';
import PlatformInformation from "../../../../../../model/po/platformInformation";
import PlatformOverview from "../../../../../../model/po/platformOverview";
import {TabType} from "../../../../../../model/enums/tab-type";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ActivatedRoute} from "@angular/router";
import PlatformView from "../../../../../../model/po/platformView";
import {ProductPropInfo} from "../../../../../../model/po/productPropInfo";

@Component({
  selector: 'app-pbd-information',
  templateUrl: './pbd-information.component.html',
  styleUrls: ['./pbd-information.component.less']
})
export class PbdInformationComponent implements OnInit {

  productId: string
  versionId: string
  platformViewAllInfo: PlatformView<PlatformInformation> = new PlatformView<PlatformInformation>();
  properties: Array<ProductPropInfo> = new Array<ProductPropInfo>();

  constructor(private platformRepository: PlatformRepository,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['id']
      this.getAllPlatformView()
    })
  }

  getAllPlatformView(): void{
    this.platformRepository.getPlatformViewByTabType<PlatformInformation>(this.productId, TabType.information.value) .subscribe(res => {
      this.platformViewAllInfo = res.data
      let properties = res.data.groups.flatMap(item => {
        return item.properties
      })
      this.properties = properties
    },err => {})
  }

}
