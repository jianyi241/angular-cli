import {EnumIdentity} from "../interfaces/EnumIdentity";

export class UserStatus implements EnumIdentity {
    private static AllValues: Array<UserStatus> = new Array<UserStatus>();
    static readonly Active = new UserStatus('Active', "Active");
    static readonly Disable = new UserStatus('Disable', "Disable");
    static readonly Pending = new UserStatus('Pending', "Pending");

    private constructor(public readonly value: string, public readonly name: string) {
        UserStatus.AllValues.push(this);
    }

    public static Values(): Array<UserStatus> {
        return UserStatus.AllValues;
    }
}
