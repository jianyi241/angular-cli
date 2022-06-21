import { Component, OnInit } from '@angular/core';
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Version} from "../../../../../../model/po/version";
import {Constants} from "../../../../../../model/constants";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {FocusService} from "../../../../../../service/focus.service";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {VersionRepository} from "../../../../../../repository/version-repository";
import {FileRepository} from "../../../../../../repository/file-repository";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import PlatformOverview from "../../../../../../model/po/platformOverview";
import {PlatformFee} from "../../../../../../model/po/platformFee";

@Component({
  selector: 'app-pbd-fees-rates',
  templateUrl: './pbd-fees-rates.component.html',
  styleUrls: ['./pbd-fees-rates.component.less']
})
export class PbdFeesRatesComponent implements OnInit {
  versionId: string;
  productId: string;
  platformOverviewInfo: PlatformOverview = new PlatformOverview();
  product: ProductInfo = new ProductInfo();
  version: Version = new Version();
  fees: Array<PlatformFee> = new Array<PlatformFee>();
  currentIndex: number = 0
  routerSubscription: any;
  activatedRouteSubscription: any;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private focusService: FocusService,
              private toastRepository: ToastRepository,
              private versionRepository: VersionRepository,
              private fileRepository: FileRepository,
              private platformRepository: PlatformRepository) {
  }

  ngOnInit(): void {
    this.subscribe();
    this.init();
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
  }


  init(): void {
    this.parseRouterParam();
    this.getVersion();
    this.getProductPropList();
  }

  subscribe(): void {
    this.routerSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  getProductPropList(): void {
    this.platformRepository.getFeeProducts({productId: this.productId,versionId: this.versionId}).subscribe(res => {
      if (res.statusCode !== 200) {
        this.toastRepository.showDanger(res.msg || 'Get products info failed.')
      }
      this.fees = res.data
    })
  }


  getVersion(): void {
    if (this.version.id === Constants.VERSION) return
    this.versionRepository.versionById(this.version.id).subscribe(res => {
      this.version = res.data || this.version;
      this.configService.currentVersion = res.data || this.version
    });
  }

  getFreezeData(): void {
    this.platformRepository.getPlatformFreezeData(this.productId, 1).subscribe(res => {
      this.platformOverviewInfo = res.data;
    }, err => {
    });
  }

  parseRouterParam(): void {
    this.activatedRoute.params.subscribe(res => {
      this.versionId = res['version']
      this.productId = res['id']
      this.getFreezeData()
    })
  }

  chooseMenu(i: number) {
    this.currentIndex = i
    this.getProductPropList()
  }
}
