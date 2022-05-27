import { Component, OnInit } from '@angular/core';
import PlatformInformation from "../../../../../../model/po/platformInformation";
import PlatformView from "../../../../../../model/po/platformView";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ActivatedRoute} from "@angular/router";
import {TabType} from "../../../../../../model/enums/tab-type";
import PlatformEsg from "../../../../../../model/po/platformEsg";

@Component({
  selector: 'app-pbd-esg',
  templateUrl: './pbd-esg.component.html',
  styleUrls: ['./pbd-esg.component.less']
})
export class PbdEsgComponent implements OnInit {

  productId: string
  versionId: string
  platformViewAllInfo: PlatformView<PlatformEsg> = new PlatformView<PlatformEsg>();
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
    this.platformRepository.getPlatformViewByTabType<PlatformEsg>(this.productId, TabType.esg.value) .subscribe(res => {
      this.platformViewAllInfo = res.data
    },err => {})
  }
}
