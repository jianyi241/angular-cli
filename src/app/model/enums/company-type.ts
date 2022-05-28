import {EnumIdentity} from "../interfaces/EnumIdentity";

export class CompanyType implements EnumIdentity {
    private static AllValues: Array<CompanyType> = new Array<CompanyType>();
    static readonly Practice = new CompanyType(1, "Practice");
    static readonly Supplier = new CompanyType(2, "Supplier");

    private constructor(public readonly value: number, public readonly name: string) {
        CompanyType.AllValues.push(this);
    }

    public static Values(): Array<CompanyType> {
        return CompanyType.AllValues;
    }
}
