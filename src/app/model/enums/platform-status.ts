import {EnumIdentity} from "../interfaces/EnumIdentity";

export class PlatformStatus implements EnumIdentity {
    private static AllValues: Array<PlatformStatus> = new Array<PlatformStatus>();
    static readonly Active = new PlatformStatus('Active', "Active");
    static readonly Disabled = new PlatformStatus('Disabled', "Disabled");
    static readonly Pending = new PlatformStatus('Pending', "Pending");

    private constructor(public readonly value: string, public readonly name: string) {
        PlatformStatus.AllValues.push(this);
    }

    public static Values(): Array<PlatformStatus> {
        return PlatformStatus.AllValues;
    }
}
