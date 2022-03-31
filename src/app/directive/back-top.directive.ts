import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appBackTop]'
})
export class BackTopDirective {

  constructor(private element: ElementRef) {

  }

  @HostListener('click') onClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
