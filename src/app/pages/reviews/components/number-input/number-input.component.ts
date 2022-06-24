import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastRepository} from "../../../../repository/toast-repository";

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
  value: number

  @Output()
  valueChange = new EventEmitter<number>()

  @Input()
  label: string

  @Input()
  showDollar: boolean = true

  @Output()
  blur = new EventEmitter<number>()

  constructor(private toastRepository: ToastRepository,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onBlur() {
    this.blur.emit(this.value)
  }

  input() {
    if (this.value > this.maxValue) {
      // this.toastRepository.showDanger(`The maximum length of ${this.label} cannot exceed ${this.maxLength} digits`)
      this.toastRepository.showDanger(`${this.label} maximum value cannot exceed ${this.maxValue}`)
      this.cdr.detectChanges()
      this.value = Number.parseFloat(this.value.toString().slice(0, this.maxLength))
    } else {
      this.valueChange.emit(this.value)
    }
  }
}
