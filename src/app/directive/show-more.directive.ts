import {Directive, ElementRef, Renderer2} from '@angular/core';
import $ from 'jquery';

@Directive({
    selector: '[appShowMore]'
})
export class ShowMoreDirective {
    maxHeight = 170;
    maxWidth = 198;

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {

        let element = this.elementRef.nativeElement;

        setTimeout(() => {
            // @ts-ignore
            new Cuttr(element, {
                //options here
                truncate: 'characters',
                length: 550,
                readMoreBtnPosition: 'inside',
                ending: '<span class="more-link" style="color: #4640de;font-weight: 700;font-family: \'Epilogue\'; font-size: 12px; line-height: 17px; letter-spacing: -0.04em;cursor: pointer;height: 18px;">...More</span>'
            });
            $(element).find('.more-link').click(e => {
                e.stopPropagation();
                $(element).siblings('.popover-custom').click(e => {
                    e.stopPropagation();
                })
                let pop = $(element).siblings('.popover-custom');
                $('.popover-custom').hide();
                let offsetTop = e.target.offsetTop + 9 - 5 - pop.height() / 2;
                pop.css('transform', `translate(${e.target.offsetLeft + 40}px, ${offsetTop}px)`)
                pop.show();
                pop.find('.icon-close').click(function ($event) {
                    $(this).parents('.popover-custom').hide();
                })
                $(document).one('click', (e) => {
                    e.stopPropagation();
                    $(element).siblings('.popover-custom').hide();
                })
            })
        }, 10);

    }
}
