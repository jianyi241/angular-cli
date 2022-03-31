import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../model/constants";

@Component({
  selector: 'app-information-product',
  templateUrl: './information-product.component.html',
  styleUrls: ['./information-product.component.less']
})
export class InformationProductComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};
  config_DataSecurityPolicy= {...Constants.EDITOR_CONFIG};
  constructor() {
    this.config_DataSecurityPolicy.editorplaceholder='What security measures are in place, e.g. ISO 27001 certification';
  }

  ngOnInit(): void {
  }

}
