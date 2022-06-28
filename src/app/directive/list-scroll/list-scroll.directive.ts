import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';
import $ from 'jquery';
@Directive({
  selector: '[appListScroll]'
})
export class ListScrollDirective {

  @Output()
  bottomed = new EventEmitter()

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  @HostListener('scroll',['$event']) onScroll($event) {
    const element = this.elementRef.nativeElement;
    const scrollTop = $event.target.scrollTop;
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    const bottomDistance = element.scrollHeight - (scrollTop + clientHeight)
    // console.log('scrollTop ', scrollTop, '---- ', clientHeight, '-----', scrollHeight, '--- isBottom', bottomDistance)
    if (bottomDistance === 0) {
      this.bottomed.emit()
    }
  }
}
