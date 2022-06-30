import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FocusService {
    private focusQueue: Array<number> = [];
    private focusCount: number = 0;

    constructor() {
    }

    //页面统一初始化
    initializationService(): void {
        this.focusQueue = [];
        //初始化页面输入框
        let inputs = document.getElementsByTagName('input');
        let inputIterator = inputs[Symbol.iterator]();
        for (const input of inputIterator) {
            if (input.type != 'text' && input.type != 'number') {
                continue;
            }
            input.onblur = () => {
                this.deleteFocus();
            }
            input.onfocus = () => {
                this.addFocus();
            }
        }
        //初始化页面富文本框
        let iframes = document.getElementsByTagName('iframe');
        let iframeIterator = iframes[Symbol.iterator]();
        for (const iframe of iframeIterator) {
            let body = iframe.contentDocument.body;
            if (!body) {
                continue;
            }
            body.onblur = () => {
                this.deleteFocus();
            };
            body.onfocus = () => {
                this.addFocus();
            }
        }
    }

    addFocus(): void {
        this.focusCount++;
        this.focusQueue.push(this.focusCount);
    }

    deleteFocus(): void {
        this.focusCount--;
        this.focusQueue.splice(this.focusQueue.length - 1, 1);
    }

    hasFocus(): boolean {
        return this.focusQueue.length > 0;
    }

    waitBlur(wait: () => void): void {
        if (!this.hasFocus()) {
            wait();
            return;
        }
        //防止等待时间多次执行
        let lock = 0;
        //等待时间限制
        let time = 0;
        let interval = setInterval(() => {
            if (time === 1000) {
                this.focusQueue = [];
            }
            if (lock === 0 && this.focusQueue.length == 0) {
                lock++;
                wait();
            }
            if (this.focusQueue.length == 0) {
                clearInterval(interval);
            }
            time += 100;
        }, 100);
    }
}
