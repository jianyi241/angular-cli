import {Condition} from "../condition";

type Order = {
    asc: boolean, // 是否正序
    column: string // 排序列
}

export class AdviceCondition extends Condition {
    status: string = '';
    queryParam?: string;
    order: Order;
}
