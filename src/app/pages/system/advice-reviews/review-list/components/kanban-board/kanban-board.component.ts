import { Component, OnInit } from '@angular/core';
import {ProductCondition} from "../../../../../../model/condition/product-condition";
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Router} from "@angular/router";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ConfigService} from "../../../../../../service/config.service";
import {CurrentUserService} from "../../../../../../service/current-user.service";
import {Constants} from "../../../../../../model/constants";
import {TabType} from "../../../../../../model/enums/tab-type";

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.less']
})
export class KanbanBoardComponent implements OnInit {


  productCondition: ProductCondition =new ProductCondition(1,2);
  productList: Array<ProductInfo> = new Array<ProductInfo>();

  constructor(private router: Router,
              private platformRepository: PlatformRepository,
              public configService: ConfigService,
              public currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.getProductList()
  }

  // ddd
  addPlatform(): void {
    console.log('begin add platform')
    this.platformRepository.addPlatform().subscribe(res => {
      this.router.navigateByUrl(`/platform/product-tab/overview/${res.data.id}/${Constants.VERSION}`);
    },err => {
      console.log(err,'err')
    })
  }

  getProductList() {
    console.log('search params ', this.productCondition)
    this.productCondition.order = {
      asc: true,
      column: 'name'
    }
    this.platformRepository.getProductList(this.productCondition).subscribe(res => {
      console.log('res ', res);
      this.productList = res.data
    },err => {
    })
  }

  toView(product: ProductInfo): void {
    this.router.navigateByUrl(`/platform/product-box-detail/overview/${product.id}/${product.versionId || Constants.VERSION}/${TabType.overview.value}`)
  }

}
