import {EnumIdentity} from "../interfaces/EnumIdentity";

export class PracticeStatus implements EnumIdentity {
    private static AllValues: Array<PracticeStatus> = new Array<PracticeStatus>();
    static readonly Active = new PracticeStatus('Active', "Active");
    static readonly Disable = new PracticeStatus('Disable', "Disable");

    private constructor(public readonly value: string, public readonly name: string) {
        PracticeStatus.AllValues.push(this);
    }

    public static Values(): Array<PracticeStatus> {
        return PracticeStatus.AllValues;
    }
}
