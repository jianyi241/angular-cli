import {EnumIdentity} from "../interfaces/EnumIdentity";

export class VersionType implements EnumIdentity {
    private static AllValues: Array<VersionType> = new Array<VersionType>();
    static readonly Publish = new VersionType('Publish,,', "Publish");
    static readonly Draft = new VersionType('Draft', "Draft");
    static readonly History = new VersionType('History', "History");

    private constructor(public readonly value: string, public readonly name: string) {
        VersionType.AllValues.push(this);
    }

    public static Values(): Array<VersionType> {
        return VersionType.AllValues;
    }
}
