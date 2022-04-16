import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import $ from 'jquery'

@Directive({
    selector: '[customLinkActive]'
})
export class CustomLinkActiveDirective implements OnInit, OnDestroy {
    /**
     * 待实现
     * */
    @Input()
    linkOption: any;
    @Input()
    customLinkActive: string;
    @Input()
    link: string[];
    private routerObservable: any;

    constructor(private router: Router, private element: ElementRef) {

    }

    ngOnInit(): void {
        this.activeClass();
        this.routerObservable = this.router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                this.activeClass();
            }
        });
    }

    activeClass(): void {
        let some = this.link.some(l => this.router.isActive(l, false));
        if (some) {
            let hasClass = $(this.element.nativeElement).hasClass(this.customLinkActive);
            if (!hasClass) {
                $(this.element.nativeElement).addClass(this.customLinkActive);
            }
        } else {
            $(this.element.nativeElement).removeClass(this.customLinkActive);
        }
    }


    ngOnDestroy(): void {
        this.routerObservable.unsubscribe();
    }


}
