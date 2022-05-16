import { Component, OnInit } from '@angular/core';
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ActivatedRoute} from "@angular/router";
import PlatformOverview from "../../../../../../model/po/platformOverview";
import PlatformInformation from "../../../../../../model/po/platformInformation";
import PlatformEsg from "../../../../../../model/po/platformEsg";

@Component({
  selector: 'app-pbd-overview',
  templateUrl: './pbd-overview.component.html',
  styleUrls: ['./pbd-overview.component.less']
})
export class PbdOverviewComponent implements OnInit {

  versionId: string
  productId: string
  platformOverviewFreezeInfo: PlatformOverview | PlatformInformation | PlatformEsg = new PlatformOverview()
  constructor(private platformRepository: PlatformRepository,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['productId']
      console.log('versionId ', this.versionId)
      console.log('productId ', this.productId)
      this.getFreezeData()
    })
  }

  getFreezeData() {
    this.platformRepository.getPlatformFreezeData(this.productId,1).subscribe(res => {
      console.log('get freezeData ===> ',res)
      this.platformOverviewFreezeInfo = res.data;
    },err => {})
  }

}
