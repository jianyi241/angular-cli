import { Injectable, TemplateRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Toast {
    classname: string;
    delay: number;
    textOrTpl: any;
}


@Injectable({
    providedIn: 'root'
})
export class ToastRepository {

    loading: boolean;

    toasts: Toast[] = [];

    constructor(private http: HttpClient) {

    }

    showLoading(loading = false): void {
        if (this.loading === loading) {
            return;
        }
        this.loading = loading;
        console.log(this.loading);
    }

    isTemplate(toast): any {
        return toast.textOrTpl instanceof TemplateRef;
    }

    show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    showInfo(text): void {
        this.show(text);
    }

    showSuccess(text, customClass?): void {
        this.show(text, { classname: `bg-success ${customClass}`, delay: 3000 });
    }

    showDanger(dangerTpl, customClass?): void {
        this.show(dangerTpl, { classname: `bg-danger ${customClass}`, delay: 3000 });
    }

}
