import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LayoutObservable {

    private layoutState: BehaviorSubject<boolean> = new BehaviorSubject(false);

    setLayout(layout: boolean): void {
        // this.layoutState = new BehaviorSubject(layout);
        this.layoutState.next(layout);
    }

    getLayout(): any {
        return this.layoutState;
    }
}
