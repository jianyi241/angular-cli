import { Component, OnInit } from '@angular/core';
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Version} from "../../../../../../model/po/version";
import {ProductFormVo} from "../../../../../../model/vo/productFormVo";
import {Constants} from "../../../../../../model/constants";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {VersionRepository} from "../../../../../../repository/version-repository";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {TabType} from "../../../../../../model/enums/tab-type";
import {PropertyVo} from "../../../../../../model/vo/PropertyVo";

@Component({
  selector: 'app-ac-overview',
  templateUrl: './ac-overview.component.html',
  styleUrls: ['./ac-overview.component.less']
})

export class AcOverviewComponent implements OnInit {

  product: ProductInfo = new ProductInfo();
  version: Version = new Version();
  overview: ProductFormVo = new ProductFormVo();
  config = {...Constants.EDITOR_CONFIG};
  routerSubscription: any;
  activatedRouteSubscription: any;
  fullNames = []
  desc = ''
  adviserName = ''
  adviserNames = ['name1','name2','name3']
  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private toastRepository: ToastRepository,
              private versionRepository: VersionRepository,
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

  removeNameInput(index: number) {
    this.fullNames.splice(index, 1)
  }

  addNameInput() {
    if (this.fullNames.length < 6) {
      this.fullNames.push({
        name: '',
        id: null
      })
    }
  }

  subscribe(): void {
    this.routerSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  getVersion() {
    if (this.version.id == Constants.VERSION) {
      return;
    }
    this.versionRepository.versionById(this.version.id).subscribe(res => {
      this.version = res.data || this.version;
      this.configService.currentVersion = res.data || this.version
    });
  }

  getProductPropList(): void {
    this.platformRepository.getProductPropList(TabType.overview.value, this.product.id, this.version.id).subscribe(res => {
      this.overview = Object.assign(this.overview, res.data);
    });
  }

  parseRouterParam(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
      this.product.id = res['productId'];
      this.version.id = res[Constants.VERSION];
    })
  }

  saveProp(prop: PropertyVo) {
    let productProp = {...prop.productPropVo};
    productProp.shProductId = this.product.id;
    productProp.shPropertyId = prop.id;
    this.platformRepository.saveProductProp(productProp).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg);
        return;
      }
      prop.productPropVo = res.data;
    })
  }
}
