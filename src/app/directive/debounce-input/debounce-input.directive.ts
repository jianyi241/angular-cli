import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import { debounceTime } from 'rxjs/operators';
@Directive({
  selector: '[appDebounceInput]'
})
export class DebounceInputDirective {

  @Input() debounceTime = 1000; // 时间参数，默认1秒
  @Output() debounceInput = new EventEmitter();
  private inputs = new Subject<any>();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.inputs.pipe(debounceTime(this.debounceTime)) // 防抖
        .subscribe(e => this.debounceInput.emit(e)); // 发射事件
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // 取消订阅
  }

  // 绑定宿主事件
  @HostListener('input', ['$event']) onInput($event: UIEvent) {
    // 阻止浏览器的默认行为和事件冒泡
    $event.preventDefault();
    $event.stopPropagation();
    this.inputs.next($event); // 此处产生流
  }

}
