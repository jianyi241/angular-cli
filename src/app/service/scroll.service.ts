import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  isScrollFixed: boolean = false;
  constructor() { }

  setScrollFixed(isScroll: boolean) {
    this.isScrollFixed = isScroll;
  }

  getScrollFixed():boolean {
    return this.isScrollFixed;
  }
}
