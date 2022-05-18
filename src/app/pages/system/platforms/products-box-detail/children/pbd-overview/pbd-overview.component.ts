import {Component, OnInit} from '@angular/core';
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ActivatedRoute} from "@angular/router";
import PlatformOverview from "../../../../../../model/po/platformOverview";
import {TabType} from "../../../../../../model/enums/tab-type";
import PlatformView from "../../../../../../model/po/platformView";
import PlatformInformation from "../../../../../../model/po/platformInformation";

@Component({
  selector: 'app-pbd-overview',
  templateUrl: './pbd-overview.component.html',
  styleUrls: ['./pbd-overview.component.less']
})
export class PbdOverviewComponent implements OnInit {

  versionId: string
  productId: string
  platformOverviewFreezeInfo: PlatformOverview = new PlatformOverview()
  platformInformationFreezeInfo: PlatformInformation = new PlatformInformation();
  platformViewAllInfo: PlatformView<PlatformOverview> = new PlatformView<PlatformOverview>();
  constructor(private platformRepository: PlatformRepository,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['id']
      this.getFreezeData()
      this.getAllPlatformView()
    })
  }

  getFreezeData() {
    this.platformRepository.getPlatformFreezeData<PlatformOverview>(this.productId,TabType.overview.value).subscribe(res => {
      this.platformOverviewFreezeInfo = res.data;
    },err => {})
    this.platformRepository.getPlatformFreezeData<PlatformInformation>(this.productId,TabType.information.value).subscribe(res => {
      this.platformInformationFreezeInfo = res.data;
    },err => {})
  }

  getAllPlatformView(): void{
    this.platformRepository.getPlatformViewByTabType<PlatformOverview>(this.productId, TabType.overview.value) .subscribe(res => {
      this.platformViewAllInfo = res.data
    },err => {})
  }

}
