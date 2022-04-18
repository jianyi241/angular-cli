import {EnumIdentity} from "../interfaces/EnumIdentity";

export class RoleType implements EnumIdentity {
    private static AllValues: Array<RoleType> = new Array<RoleType>();
    static readonly SuperAdmin = new RoleType("Super Admin", "Super Admin");
    static readonly AccountAdmin = new RoleType('Account administrator', "Account administrator");
    static readonly Adviser = new RoleType('Adviser', "Adviser");
    static readonly Support = new RoleType('Support', "Support");

    private constructor(public readonly value: string, public readonly name: string) {
        RoleType.AllValues.push(this);
    }

    public static Values(): Array<RoleType> {
        return RoleType.AllValues;
    }
}
