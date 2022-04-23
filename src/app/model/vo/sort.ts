export class Sort {


    constructor(currentId: string, currentIndex: number, targetId: string, targetIndex: number) {
        this.currentId = currentId;
        this.currentIndex = currentIndex;
        this.targetId = targetId;
        this.targetIndex = targetIndex;
    }

    currentId: string;
    currentIndex: number;
    targetId: string;
    targetIndex: number;
}
