import {Condition} from "../condition";

type Order = {
    asc: boolean, // 是否正序
    column: string // 排序列
}
export class SupplierCondition extends Condition{
    archived?: Boolean = null
    queryParam?: string
    order?: Order
}
