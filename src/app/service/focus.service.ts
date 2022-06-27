import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FocusService {
    private focusQueue: Array<any> = new Array<any>();
    private focusCount: number = 0;

    constructor() {
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
        console.log('focusQueue ', this.focusQueue)
        return this.focusQueue.length > 0;
    }

    waitBlur(wait: () => void): void {
        if (!this.hasFocus()) {
            wait();
            return;
        }
        let count = 0;
        let interval = setInterval(() => {
            if (count == 0 && this.focusQueue.length == 0) {
                count++;
                wait();
            }
            if (this.focusQueue.length == 0) {
                clearInterval(interval);
            }
        }, 100);
    }
}
