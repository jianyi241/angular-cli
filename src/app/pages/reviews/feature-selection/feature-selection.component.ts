import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from "swiper";
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-feature-selection',
  templateUrl: './feature-selection.component.html',
  styleUrls: ['./feature-selection.component.less']

})
export class FeatureSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config = {
    slidesPerView: 4,
    spaceBetween: 8,
    navigation: true,
    centeredSlides: true,
    loop: true,
    pagination: true,
  };

}
