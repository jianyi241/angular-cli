import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[toggleClass]'
})
export class ToggleClassDirective {
    @Input('toggleClass')
    toggleClass: string;

    constructor(private renderer: Renderer2,
                private element: ElementRef) {
    }

    @HostListener('click') onClick() {
        if (!this.toggleClass) {
            return;
        }
        let hasClass = this.element.nativeElement.classList.contains(this.toggleClass);
        if (hasClass) {
            this.renderer.removeClass(this.element.nativeElement, this.toggleClass);
        } else {
            this.renderer.addClass(this.element.nativeElement, this.toggleClass);
        }

    }

}
