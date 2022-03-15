import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit, Output,
    PipeTransform,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CurrencyPipe, DOCUMENT} from "@angular/common";

export const CUSTOM_NUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FloatInputComponent),
    multi: true
};

@Component({
    selector: 'app-float-input',
    templateUrl: './float-input.component.html',
    styleUrls: ['./float-input.component.less'],
    providers: [CUSTOM_NUMBER_VALUE_ACCESSOR],
})

export class FloatInputComponent implements OnInit, ControlValueAccessor {

    @Input()
    public type: "text" | "password" | "number" | "email" = "text";

    @Input()
    public displayPipe: PipeTransform;

    @Input()
    public labelText: string = "title";

    @Output()
    public blurEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild("inputElement")
    private inputElement: ElementRef<HTMLInputElement>;

    public hasFocus = false;

    public hasValue = false;

    public _onChange: (value) => void;

    public _onTouch: () => void;

    public valueFormatted = null;

    constructor(@Inject(DOCUMENT) public document: Document) {
    }

    ngOnInit(): void {
        if (this.type == "password" && this.displayPipe == null) {
            this.displayPipe = new class implements PipeTransform {
                transform(value: any, ...args: any[]): any {
                    if (value == null) {
                        return value;
                    }
                    let passwordArray = new Array(value.length);
                    return passwordArray.fill('·').join('');
                }
            }
        }
    }

    selectMe() {
        this.inputElement.nativeElement.focus();
    }

    inputBlur() {
        this.hasFocus = false;
        this.checkHasValue();
        this._onChange(this.inputElement.nativeElement.value);
        this.formatter(this.inputElement.nativeElement.value);
        this.blurEvent?.emit(this.inputElement.nativeElement.value);
    }

    checkHasValue() {
        if (this.inputElement == null) {
            return false;
        }
        let val = this.inputElement.nativeElement.value;
        this.hasValue = val != null && val.trim().length != 0;
    }

    formatter(obj) {
        if (obj == null || obj.trim().length == 0) {
            this.valueFormatted = null;
            return;
        }
        if (this.displayPipe) {
            this.valueFormatted = this.displayPipe.transform(obj);
            return;
        }
        this.valueFormatted = obj;
    }

    inputFocus() {
        this.hasFocus = true;
    }

    hasFloat() {
        return this.hasFocus;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.inputElement.nativeElement.disabled = isDisabled;
        this.hasFocus = false;
    }

    writeValue(obj: any): void {
        obj = typeof obj == 'undefined' ? null : obj;
        if (this.inputElement) {
            this.inputElement.nativeElement.value = obj;
            this.checkHasValue();
            this.formatter(obj);
        }
    }

}
