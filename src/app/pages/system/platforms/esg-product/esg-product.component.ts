import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../model/constants";

@Component({
  selector: 'app-esg-product',
  templateUrl: './esg-product.component.html',
  styleUrls: ['./esg-product.component.less']
})
export class EsgProductComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};
  constructor() { }

  ngOnInit(): void {
  }

}
