import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../../model/constants";

@Component({
  selector: 'app-platform-edit',
  templateUrl: './platform-edit.component.html',
  styleUrls: ['./platform-edit.component.less']
})
export class PlatformEditComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};
  constructor(private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.route.navigateByUrl(`/supplier/supplier-tab/overview`);
  }
}
