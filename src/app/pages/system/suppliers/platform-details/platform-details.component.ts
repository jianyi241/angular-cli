import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.less']
})
export class PlatformDetailsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goEdit(): void{
    this.route.navigateByUrl(`/supplier/edit-platform`);
  }
}
