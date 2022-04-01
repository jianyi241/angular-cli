import {EnumIdentity} from "../interfaces/EnumIdentity";

export class PropStatus implements EnumIdentity {
    private static AllValues: Array<PropStatus> = new Array<PropStatus>();
    static readonly Normal = new PropStatus('Normal', "Normal");
    static readonly Insert = new PropStatus('Insert', "Insert");
    static readonly Update = new PropStatus('Update', "Update");
    static readonly Archive = new PropStatus('Archive', "Archive");

    private constructor(public readonly value: string, public readonly name: string) {
        PropStatus.AllValues.push(this);
    }

    public static Values(): Array<PropStatus> {
        return PropStatus.AllValues;
    }
}
