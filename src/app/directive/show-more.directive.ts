import {Directive, ElementRef, Renderer2} from '@angular/core';
import $ from 'jquery';

@Directive({
  selector: '[appShowMore]'
})
export class ShowMoreDirective {
    maxHeight = 136;

  constructor(private renderer: Renderer2,private elementRef: ElementRef) {

      let element = this.elementRef.nativeElement;

      setTimeout(()=> {
          let _clientHeight = this.elementRef.nativeElement.clientHeight;
          if(_clientHeight > this.maxHeight){
                this.renderer.addClass(this.elementRef.nativeElement,'detail-content-more');
                $(element).siblings('.more-link').show();
          }
      },10);

  }

}
