import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReviewHeaderComponent} from "../review-header/review-header.component";

@Component({
  selector: 'app-review-layout',
  templateUrl: './review-layout.component.html',
  styleUrls: ['./review-layout.component.less']
})
export class ReviewLayoutComponent implements OnInit,AfterViewInit {
  @ViewChild(ReviewHeaderComponent)
   public viewHead:ReviewHeaderComponent;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.viewHead)
  }

}
