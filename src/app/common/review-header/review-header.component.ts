import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-header',
  templateUrl: './review-header.component.html',
  styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {

  public  isScrollFixed :boolean;

  constructor() {
  }

  ngOnInit(): void {

  }


}
