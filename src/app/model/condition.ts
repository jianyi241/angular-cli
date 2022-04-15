export class Condition {


    constructor(current: number, size: number) {
        this.current = current;
        this.size = size;
    }

    q = '';
    current = 1;
    records = [];
    pages: number;
    total: number;
    size: number;
}
