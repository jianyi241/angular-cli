import {EnumIdentity} from "../interfaces/EnumIdentity";

export class PropType implements EnumIdentity {
    private static AllValues: Array<PropType> = new Array<PropType>();
    static readonly longText = new PropType(1, "Long Text");
    static readonly shortText = new PropType(2, "Short Text");
    static readonly boolean = new PropType(3, "Boolean");
    static readonly integer = new PropType(4, "Integer");
    static readonly attachment = new PropType(5, "Attachment");
    // static readonly date = new PropType(6, "Date");

    private constructor(public readonly value: number, public readonly name: string) {
        PropType.AllValues.push(this);
    }

    public static parseEnum(data: string | number): PropType {
        if (isNaN(Number(data)) && 'string' == typeof data) {
            return PropType.AllValues.find(t => t.name == data);
        } else {
            return PropType.AllValues.find(t => t.value == data);
        }
    }

    public static Values(): Array<PropType> {
        return PropType.AllValues;
    }
}
