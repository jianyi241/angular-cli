import {Directive, ElementRef, HostListener, Output, Renderer2, EventEmitter, Input, OnInit} from '@angular/core';
import $ from 'jquery';
import {Observable} from "rxjs";

@Directive({
  selector: '[appTableScroll]'
})
export class TableScrollDirective implements OnInit  {
  @Output() scrollEvent = new EventEmitter<boolean>();
  // @Input() maxScrollTop :number;
  // @Input() footHeight :number = 0;

  safe_scroll_height =197;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,) {
  }

  ngOnInit() {

  }

  @HostListener('window:resize',['$event']) onResize($event){
     this.renderer.removeClass(this.elementRef.nativeElement, 'table-review-fixed');
  }


  @HostListener('scroll',['$event']) onScroll($event) {

    let scrollTop = $event.target.scrollTop;
    let table_content_height =this.elementRef.nativeElement.clientHeight;
    let table_scroll_height =this.elementRef.nativeElement.scrollHeight;
    let element = this.elementRef.nativeElement;
    let maxScrollTop = $(element).find('.sub-head-review').outerHeight();
    let table_height = $(element).find('.table-container').outerHeight();

    if(table_scroll_height < table_content_height + maxScrollTop){
      return;
    }

    if(scrollTop > maxScrollTop ){
      if(table_content_height > table_height - this.safe_scroll_height  ){
        return;
      }

      else {
        $(element).addClass('table-review-fixed');
        this.scrollEvent.emit(true);
      }
    }
    else {
      $(element).removeClass('table-review-fixed');
      this.scrollEvent.emit(false);
    }

  }
}
