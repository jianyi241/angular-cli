import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../model/constants";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-information-section-edit',
  templateUrl: './information-section-edit.component.html',
  styleUrls: ['./information-section-edit.component.less']
})
export class InformationSectionEditComponent implements OnInit {

  config = {...Constants.EDITOR_CONFIG};
  constructor(private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.route.navigateByUrl(`/supplier/supplier-tab/information`);
  }
}
