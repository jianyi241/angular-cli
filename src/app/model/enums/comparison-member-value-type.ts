import {EnumIdentity} from "../interfaces/EnumIdentity";

export class ComparisonMemberValueType implements EnumIdentity {
    private static AllValues: Array<ComparisonMemberValueType> = new Array<ComparisonMemberValueType>();
    static readonly idps = new ComparisonMemberValueType('IDPS', "IDPS");
    static readonly super = new ComparisonMemberValueType('Super', "Super");

    private constructor(public readonly value: string, public readonly name: string) {
        ComparisonMemberValueType.AllValues.push(this);
    }

    public static Values(): Array<ComparisonMemberValueType> {
        return ComparisonMemberValueType.AllValues;
    }
}
