import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goSectionEdit(): void {
    this.route.navigateByUrl(`/supplier/edit-section`);
  }

}
