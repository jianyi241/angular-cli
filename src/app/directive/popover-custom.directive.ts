import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import $ from 'jquery'

@Directive({
    selector: '[appPopoverCustom]'
})
export class PopoverCustomDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer2,) {
        let element = this.elementRef.nativeElement;

    }

    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
        let element = this.elementRef.nativeElement;
        let pop = $(element).siblings('.popover-custom');
        $('.popover-custom').hide();
        pop.click(e => {
            e.stopPropagation();
        })
        let offsetTop = element.offsetTop + 7.5 - pop.height() / 2;
        pop.css('transform', `translate(${element.offsetLeft + 15}px, ${offsetTop}px)`)
        pop.show();
        pop.find('.icon-close').click(function ($event) {
            $event.stopPropagation();
            $(this).parents('.popover-custom').hide();
        })
        $(document).one('click', (e) => {
            e.stopPropagation();
            pop.hide();
        })

    }

}
