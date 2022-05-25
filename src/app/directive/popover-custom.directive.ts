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
        $(element).siblings('.popover-custom').click(e => {
            e.stopPropagation();
        })
        $(element).siblings('.popover-custom').show();

        $(element).siblings('.popover-custom').find('.icon-close').click(function ($event) {
            $event.stopPropagation();
            $(this).parents('.popover-custom').hide();
        })

        $(document).one('click', (e) => {
            e.stopPropagation();
            $(element).siblings('.popover-custom').hide();
        })

    }

}
