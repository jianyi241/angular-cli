import {EnumIdentity} from "../interfaces/EnumIdentity";

export class RoleType implements EnumIdentity {
    //type: 1 -> Admin User, 2 -> Supplier User, 3 -> Advice User
    private static AllValues: Array<RoleType> = new Array<RoleType>();
    static readonly AdminUser = new RoleType(1, "Admin User");
    static readonly SupplierUser = new RoleType(2, "Supplier User");
    static readonly AdviceUser = new RoleType(3, "Advice User");

    private constructor(public readonly value: number, public readonly name: string) {
        RoleType.AllValues.push(this);
    }

    public static Values(): Array<RoleType> {
        return RoleType.AllValues;
    }
}
