import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../model/constants";

@Component({
  selector: 'app-comparison-setup',
  templateUrl: './comparison-setup.component.html',
  styleUrls: ['./comparison-setup.component.less']
})
export class ComparisonSetupComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};
  constructor() { }

  ngOnInit(): void {
  }

}
