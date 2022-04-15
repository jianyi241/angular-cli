export class Page<T> {
    current?: number;
    hitCount?: boolean;
    pages?: number;
    records?: Array<T> = new Array<T>();
    searchCount?: boolean;
    size?: number;
    total?: number;
}
