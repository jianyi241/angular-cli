import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface ICache {
    [key: string]: BehaviorSubject<any>;
}

// tslint:disable-next-line:ban-types
type serializable = object | Object;

@Injectable()
export class LocalStorageObServable {
    private cache: ICache;

    constructor() {
        this.cache = Object.create(null);
    }

    setItem<T extends serializable>(key: string, value: T): BehaviorSubject<T> {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }

        if (this.cache[key]) {
            this.cache[key].next(value);
            return this.cache[key];
        }

        return this.cache[key] = new BehaviorSubject(value);
    }

    getItem<T extends serializable>(key: string): BehaviorSubject<any> {
        if (this.cache[key]) {
            return this.cache[key];
        } else {
            try {
                return this.cache[key] = new BehaviorSubject(JSON.parse(localStorage.getItem(key)));
            } catch (err) {
                return this.cache[key] = new BehaviorSubject(localStorage.getItem(key));
            }
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
        if (this.cache[key]) {
            this.cache[key].next(undefined);
        }
    }
}
