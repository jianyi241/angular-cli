import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastRepository} from "../../../../repository/toast-repository";
import {FocusService} from "../../../../service/focus.service";
import {fakeAsync} from "@angular/core/testing";

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.less']
})
export class NumberInputComponent implements OnInit {

  @Input()
  onlyInput: boolean = false

  @Input()
  maxValue: number = 99999999

  @Input()
  maxLength: number = 8

  @Input()
  value: any

  @Output()
  valueChange = new EventEmitter<number>()

  @Input()
  label: string

  @Input()
  id: string

  @Input()
  showDollar: boolean = true

  @Output()
  blur = new EventEmitter<number>()

  constructor(private toastRepository: ToastRepository,
              private cdr: ChangeDetectorRef,
              private focusService: FocusService) { }

  ngOnInit(): void {
    if (this.value == 0) {
      this.value = ''
    }
  }

  onBlur() {
    this.focusService.deleteFocus()
    setTimeout(() => {
      this.blur.emit(this.value)
    }, 50)
  }

  onFocus() {
    this.focusService.addFocus();
  }

  onInput() {
    if (this.value > this.maxValue) {
      // this.toastRepository.showDanger(`The maximum length of ${this.label} cannot exceed ${this.maxLength} digits`)
      this.toastRepository.showDanger(`${this.label} maximum value cannot exceed ${this.maxValue}`)
      this.cdr.detectChanges()
      this.value = Number(this.value.toString().slice(0, this.maxLength))
    } else {
      this.valueChange.emit(Number(this.value))
    }
  }
}
