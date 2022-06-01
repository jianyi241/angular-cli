import {EnumIdentity} from "../interfaces/EnumIdentity";

export class SelectionType implements EnumIdentity {
    private static AllValues: Array<SelectionType> = new Array<SelectionType>();
    static readonly Group = new SelectionType("group", "group");
    static readonly SubGroup = new SelectionType("subGroup", "subGroup");
    static readonly Property = new SelectionType("property", "property");

    private constructor(public readonly value: string, public readonly name: string) {
        SelectionType.AllValues.push(this);
    }

    public static Values(): Array<SelectionType> {
        return SelectionType.AllValues;
    }
}
