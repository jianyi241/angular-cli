import {Injectable} from '@angular/core';
import {ToastRepository} from "../repository/toast-repository";
import * as moment from "moment";

class SaveObj {
    path: string;
    time: Date;

    constructor(name: string) {
        this.path = name;
        this.time = new Date();
    }
}

/**
 * 全局保存标识，防止多次点击保存操作
 * */
@Injectable({
    providedIn: 'root'
})
export class SaveService {
    private saveFlow: Map<string, SaveObj> = new Map<string, SaveObj>();

    constructor(private toastRepository: ToastRepository) {
    }

    saveCheck(path): boolean {
        if (this.has(path)) {
            //safe
            let saveObj = this.get(path);
            let diff = moment(new Date()).diff(saveObj.time, 'ms');
            if (diff >= 1500) {
                this.delete(path);
                return false;
            }
            return true;
        }
        this.add(path);
        return false;
    }

    add(path: string): Map<string, SaveObj> {
        return this.saveFlow.set(path, new SaveObj(path));
    }

    get(path: string): SaveObj {
        return this.saveFlow.get(path);
    }

    has(path: string): boolean {
        return this.saveFlow.has(path);
    }

    delete(path: string): boolean {
        return this.saveFlow.delete(path);
    }

}
