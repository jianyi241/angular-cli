import {EnumIdentity} from "../interfaces/EnumIdentity";

export class GroupStatus implements EnumIdentity {
    private static AllValues: Array<GroupStatus> = new Array<GroupStatus>();
    static readonly Normal = new GroupStatus('Normal', "Normal");
    static readonly Insert = new GroupStatus('Insert', "Insert");
    static readonly Update = new GroupStatus('Update', "Update");
    static readonly Archive = new GroupStatus('Archive', "Archive");

    private constructor(public readonly value: string, public readonly name: string) {
        GroupStatus.AllValues.push(this);
    }

    public static Values(): Array<GroupStatus> {
        return GroupStatus.AllValues;
    }
}
