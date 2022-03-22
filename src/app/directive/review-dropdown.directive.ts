import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import $ from 'jquery'

@Directive({
    selector: '[reviewDropdown]'
})
export class ReviewDropdownDirective implements OnInit{
    @Input("panel")
    panelRef: HTMLElement;
    @Input('content-prefix')
    prefix: string
    @Input('content-tag')
    tag: string



    constructor(private elementRef: ElementRef,
                private renderer: Renderer2,) {
    }

    ngOnInit(): void {
    }


    @HostListener('click') onClick() {
        let element = this.elementRef.nativeElement;
        let hasOpen = element.classList.contains('review-content-open');
        let sugGroupTitle = $(this.panelRef).find(`${this.tag}[class=${this.prefix}]`).find('.sub-group-title');
        if (hasOpen) {
            $(this.panelRef).find(`${this.tag}[class^=${this.prefix}]`).hide();
            sugGroupTitle.addClass('review-content-close')
            sugGroupTitle.removeClass('review-content-open')
            this.renderer.addClass(element, 'review-content-close');
            this.renderer.removeClass(element, 'review-content-open');
        } else {
            $(this.panelRef).find(`${this.tag}[class^=${this.prefix}]`).show();
            sugGroupTitle.addClass('review-content-open')
            sugGroupTitle.removeClass('review-content-close')
            this.renderer.addClass(element, 'review-content-open');
            this.renderer.removeClass(element, 'review-content-close');
        }
    }



}
