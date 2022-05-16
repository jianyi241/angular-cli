import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";
import {CurrentUserService} from "../../../../service/current-user.service";
import PlatformOverview from "../../../../model/po/platformOverview";

@Component({
  selector: 'app-products-box-detail',
  templateUrl: './products-box-detail.component.html',
  styleUrls: ['./products-box-detail.component.less']
})
export class ProductsBoxDetailComponent implements OnInit {


  productId: string
  versionId: string
  platformOverviewInfo: PlatformOverview = new PlatformOverview()
  tabs = [
    {
      name: 'Overview',
      path: 'platform/product-box-detail/overview',
      type: TabType.overview.value
    },
    {
      name: 'Information',
      path: 'platform/product-box-detail/information',
      type: TabType.information.value
    },
    {
      name: 'ESG',
      path: 'platform/product-box-detail/esg',
      type: TabType.esg.value
    },
    {
      name: 'Features',
      path: 'platform/product-box-detail/features',
      type: TabType.features.value
    },
    {
      name: 'Fees & rates',
      path: 'platform/product-box-detail/fees-rates',
      type: TabType.feesAndRates.value
    },
    {
      name: 'Find BDM',
      path: 'platform/product-box-detail/find-bdm',
      type: 9
    }
  ]
  constructor(public configService: ConfigService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private platformRepository: PlatformRepository,
              public currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.firstChild.snapshot.params['id'];
    this.versionId = this.activatedRoute.firstChild.snapshot.params['version'];
    this.getFreezeData()
  }

  getFreezeData() {
    this.platformRepository.getPlatformFreezeData(this.productId,1).subscribe(res => {
      console.log('get freezeData ===> ',res)
      this.platformOverviewInfo = res.data;
    },err => {})
  }

  chooseTab(tab) {
    const {path,name,type} = tab
    // if (name === 'Fees & rates') {
    //   return
    // }
    this.router.navigateByUrl(`${path}/${this.productId}/${this.versionId}/${type}`);
  }

  editProduct() : void{
    console.log('versionid produtid ' + this.productId)
    console.log('versionid produtid ' + this.versionId)
    this.router.navigateByUrl(`/platform/product-tab/overview/${this.productId}/${this.versionId || Constants.VERSION}`);
  }
}
