import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products-box-detail',
  templateUrl: './products-box-detail.component.html',
  styleUrls: ['./products-box-detail.component.less']
})
export class ProductsBoxDetailComponent implements OnInit {

  productId: string
  tabs = [
    {
      name: 'Overview',
      path: 'platform/product-box-detail/overview'
    },
    {
      name: 'Information',
      path: 'platform/product-box-detail/information'
    },
    {
      name: 'ESG',
      path: 'platform/product-box-detail/esg'
    },
    {
      name: 'Features',
      path: 'platform/product-box-detail/features'
    },
    {
      name: 'Fees & rates',
      path: 'platform/product-box-detail/fees-rates'
    },
    {
      name: 'Find BDM',
      path: 'platform/product-box-detail/find-bdm'
    }
  ]
  constructor(public configService: ConfigService,public router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.firstChild.snapshot.params['id'];
  }

  chooseTab(tab) {
    const {path,name} = tab
    // if (name === 'Fees & rates') {
    //   return
    // }
    this.router.navigateByUrl(`${path}/${this.productId}`);
  }
}
