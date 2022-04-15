import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import $ from 'jquery'

@Directive({
  selector: '[appTogglePwd]'
})
export class TogglePwdDirective {

  public isOpen:boolean =false;

  constructor(private elementRef: ElementRef,private renderer: Renderer2,) { }

  @HostListener('click',['$event']) onClick($event){
    this.isOpen = !this.isOpen;
    let element = this.elementRef.nativeElement;
    $(element).siblings('.form-control').attr('type',this.isOpen ? 'text' :'password');
    $(element).toggleClass('icon-eye-off');

  }
}
