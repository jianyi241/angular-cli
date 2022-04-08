import {Injectable} from '@angular/core';
import {ToastRepository} from "../repository/toast-repository";

class SaveObj {
    path: string;

    constructor(name: string) {
        this.path = name;
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
            // this.toastRepository.showDanger("Click limit.");
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
