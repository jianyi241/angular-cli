import {Injectable} from '@angular/core';

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

    public static deepCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    // public static distinct(arr: [], func: (a) => boolean) {
    //     Enumerable.from(arr).distinct(a => a.id);
    //     arr.filter(a => {
    //         func(a)
    //     })
    // }
}

