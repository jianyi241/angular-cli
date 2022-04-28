import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../../model/constants";

@Component({
  selector: 'app-supplier-overview',
  templateUrl: './supplier-overview.component.html',
  styleUrls: ['./supplier-overview.component.less']
})
export class SupplierOverviewComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};
  constructor() { }

  ngOnInit(): void {
  }

}
