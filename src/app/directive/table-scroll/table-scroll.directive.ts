import {Directive, ElementRef, HostListener, Output, Renderer2, EventEmitter, Input} from '@angular/core';
import $ from 'jquery';

@Directive({
  selector: '[appTableScroll]'
})
export class TableScrollDirective {
  @Output() scrollEvent = new EventEmitter<boolean>();
  @Input() maxScrollTop :number;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,) {
  }

  @HostListener('scroll',['$event']) onScroll($event) {
    let scrollTop = $event.target.scrollTop;
    let element = this.elementRef.nativeElement;
    if(scrollTop > this.maxScrollTop){
        $(element).addClass('table-review-fixed');
        this.scrollEvent.emit(true);
    }

    else {
      $(element).removeClass('table-review-fixed');
      this.scrollEvent.emit(false);
    }
  }

}
