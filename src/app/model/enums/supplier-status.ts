import {EnumIdentity} from "../interfaces/EnumIdentity";

export class SupplierStatus implements EnumIdentity {
    private static AllValues: Array<SupplierStatus> = new Array<SupplierStatus>();
    static readonly Active = new SupplierStatus('Active', "Active");
    static readonly Disable = new SupplierStatus('Disable', "Disable");

    private constructor(public readonly value: string, public readonly name: string) {
        SupplierStatus.AllValues.push(this);
    }

    public static Values(): Array<SupplierStatus> {
        return SupplierStatus.AllValues;
    }
}
