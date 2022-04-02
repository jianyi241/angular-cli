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

    spaceBetween: 8,
    navigation: true,
    centeredSlides: true,
    loop: true,
    pagination: true,
    breakpoints: {
      1440: {
        slidesPerView: 4,
        spaceBetween: 8,

      },
      991: {
        centeredSlides: true,
        slidesPerView: 4,
        spaceBetween: 8,

      },
      768: {
        centeredSlides: true,
        slidesPerView: 2,
        spaceBetween: 8,
      },
      375: {
        centeredSlides: true,
        slidesPerView: 2,
        spaceBetween: 8,
      },

    },
  };

}
