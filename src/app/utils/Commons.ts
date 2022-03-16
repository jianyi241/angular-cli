import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Commons {
    static IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    public static checkFileType(file: File, types): boolean {
        const type = file ? file.type : undefined;

        if (type && types.indexOf(type) > -1) {
            return true;
        } else {
            return false;
        }
    }

    public static copy<T, U>(t: T, u?: U): T {
        if (u) {
            return Object.assign(t, u);
        } else {
            return Object.assign({}, t);
        }
    }
}
