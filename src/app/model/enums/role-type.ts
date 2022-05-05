import {EnumIdentity} from "../interfaces/EnumIdentity";

export class RoleType implements EnumIdentity {
    //type: 1 -> Admin User, 2 -> Advice User, 3 -> Supplier User
    private static AllValues: Array<RoleType> = new Array<RoleType>();
    static readonly AdminUser = new RoleType(1, "Admin User");
    static readonly AdviceUser = new RoleType(2, "Advice User");
    static readonly SupplierUser = new RoleType(3, "Supplier User");

    private constructor(public readonly value: number, public readonly name: string) {
        RoleType.AllValues.push(this);
    }

    public static Values(): Array<RoleType> {
        return RoleType.AllValues;
    }
}
