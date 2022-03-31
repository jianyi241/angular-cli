import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../model/constants";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview-product',
  templateUrl: './overview-product.component.html',
  styleUrls: ['./overview-product.component.less']
})
export class OverviewProductComponent implements OnInit {

  config = {...Constants.EDITOR_CONFIG};
  constructor(private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goBack(): void {
    // this.route.navigateByUrl(`/supplier/supplier-tab/overview`);
  }

}
