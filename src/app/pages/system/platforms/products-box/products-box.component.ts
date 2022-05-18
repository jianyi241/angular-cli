import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductCondition} from "../../../../model/condition/product-condition";
import {ProductInfo} from "../../../../model/po/productInfo";
import {ConfigService} from "../../../../service/config.service";
import {CurrentUserService} from "../../../../service/current-user.service";
import {Constants} from "../../../../model/constants";
import {TabType} from "../../../../model/enums/tab-type";
import {environment} from "../../../../../environments/environment";
import {SaveService} from '../../../../service/save.service';
import {ToastRepository} from "../../../../repository/toast-repository";
@Component({
  selector: 'app-products-box',
  templateUrl: './products-box.component.html',
  styleUrls: ['./products-box.component.less']
})
export class ProductsBoxComponent implements OnInit {

  productCondition: ProductCondition =new ProductCondition(1,2);
  productList: Array<ProductInfo> = new Array<ProductInfo>();

  constructor(private router: Router,
              private platformRepository: PlatformRepository,
              public configService: ConfigService,
              public currentUserService: CurrentUserService,
              private saveService: SaveService,
              private toastRepository: ToastRepository) { }

  ngOnInit(): void {
    this.getProductList()
  }

  addPlatform(): void {
    this.platformRepository.addPlatform().subscribe(res => {
      // this.router.navigateByUrl(`/platform/product-tab/overview/${res.data.id}/${Constants.VERSION}`);
      if (res.statusCode === 200) {
        this.editProductInfo(res.data.id);
      }
    },err => {
      console.log(err,'err')
    })
  }

  editProductInfo(productId: string): void {
    if (this.saveService.saveCheck(environment.baseURL + `/product/editProduct/${productId}`)) {
      return;
    }
    this.platformRepository.editProduct(productId).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg);
        return;
      }
      // this.getProjectButtonFlag()
      this.router.navigateByUrl(`/platform/product-tab/overview/${productId}/${res.data.id}`)
    });
  }

  searchList() {
    this.productCondition.current = 1
    this.getProductList()
  }

  getProductList() {
    this.productCondition.order = {
      asc: true,
      column: 'platform_name'
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
