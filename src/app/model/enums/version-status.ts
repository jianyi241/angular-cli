import {EnumIdentity} from "../interfaces/EnumIdentity";

export class VersionStatus implements EnumIdentity {
    private static AllValues: Array<VersionStatus> = new Array<VersionStatus>();
    static readonly Normal = new VersionStatus('Normal', "Normal");
    static readonly Wait = new VersionStatus('Wait', "Wait");
    static readonly Frozen = new VersionStatus('Frozen', "Frozen");
    static readonly Rejected = new VersionStatus('Rejected', "Rejected");

    private constructor(public readonly value: string, public readonly name: string) {
        VersionStatus.AllValues.push(this);
    }

    public static Values(): Array<VersionStatus> {
        return VersionStatus.AllValues;
    }
}
