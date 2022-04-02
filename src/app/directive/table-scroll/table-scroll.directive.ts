import {Directive, ElementRef, HostListener, Output, Renderer2, EventEmitter, Input} from '@angular/core';
import $ from 'jquery';

@Directive({
  selector: '[appTableScroll]'
})
export class TableScrollDirective {
  @Output() scrollEvent = new EventEmitter<boolean>();
  @Input() maxScrollTop :number;
  @Input() footHeight :number = 0;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,) {
  }

  @HostListener('scroll',['$event']) onScroll($event) {

    let scrollTop = $event.target.scrollTop;
    let element_Height =this.elementRef.nativeElement.clientHeight;
    let element_Scroll_Height =this.elementRef.nativeElement.scrollHeight;
    let element = this.elementRef.nativeElement;

    if(element_Scroll_Height < element_Height + this.maxScrollTop){
      return;
    }

    if(scrollTop > this.maxScrollTop ){
      $(element).addClass('table-review-fixed');
      this.scrollEvent.emit(true);
    }
    else {
      $(element).removeClass('table-review-fixed');
      this.scrollEvent.emit(false);
    }
  }
}
