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

  public features: any[] = [
    {
      "title": 'Range of ASX listed securities in super/pension - ASX300',
      "status": 'Essential',
    },
    {
      "title": 'Range of ASX listed securities in super/pension - All ASX',
      "status": 'Essential',
    },
    {
      "title": 'Range of ASX listed securities in IDPS - ASX300',
      "status": 'Essential',
    },
    {
      "title": 'Range of ASX listed securities in IDPS - All ASX',
      "status": 'Essential',
    },
    {
      "title": 'Access to internationally listed securities',
      "status": 'Essential',
    },
    {
      "title": 'Pooled HIN (custodial structure)',
      "status": 'Essential',
    },
    {
      "title": 'Individual HIN',
      "status": 'Essential',
    },
    {
      "title": 'Access to IPOs',
      "status": 'Essential',
    },
    {
      "title": 'Fractional shares',
      "status": 'Essential',
    },
    {
      "title": 'Access to ETFs/LICs/REITs',
      "status": 'Essential',
    },
  ];

}
