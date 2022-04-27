import {Directive, ElementRef, Renderer2} from '@angular/core';
import $ from 'jquery';

@Directive({
  selector: '[appShowMore]'
})
export class ShowMoreDirective {
    maxHeight = 170;
    maxWidth = 198;

  constructor(private renderer: Renderer2,private elementRef: ElementRef) {

      let element = this.elementRef.nativeElement;

      setTimeout(()=> {
          let $1 = $(this.elementRef.nativeElement);
          let text = $1.text();
          let _clientHeight = this.elementRef.nativeElement.clientHeight;
          let _clientWidth = this.elementRef.nativeElement.clientWidth;
          if(text.length > 255 && (_clientHeight > this.maxHeight || _clientWidth > this.maxWidth)){
                this.renderer.addClass(this.elementRef.nativeElement,'detail-content-more');
                $(element).siblings('.more-link').show();
          }
      },10);

  }
}
