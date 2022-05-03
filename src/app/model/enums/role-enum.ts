import {EnumIdentity} from "../interfaces/EnumIdentity";
import {RoleType} from "./role-type";

export class RoleEnum implements EnumIdentity {
    //type: 1 -> Admin User, 2 -> Supplier User, 3 -> Advice User
    private static AllValues: Array<RoleEnum> = new Array<RoleEnum>();
    static readonly SuperAdmin = new RoleEnum("SuperAdmin", "SuperAdmin", RoleType.AdminUser.value);
    static readonly Admin = new RoleEnum("Admin", "admin", RoleType.AdminUser.value);
    static readonly AccountAdmin = new RoleEnum('Account administrator', "Account administrator", RoleType.AdviceUser.value);
    static readonly Adviser = new RoleEnum('Adviser', "Adviser", RoleType.AdviceUser.value);
    static readonly Support = new RoleEnum('Support', "Support", RoleType.AdviceUser.value);
    static readonly Owner = new RoleEnum('Owner', "Owner", RoleType.SupplierUser.value);
    static readonly Administrator = new RoleEnum('Administrator', "Administrator", RoleType.SupplierUser.value);
    static readonly PremiumUser = new RoleEnum('Premium user', "Premium user", RoleType.SupplierUser.value);
    static readonly BusinessDevelopmentManager = new RoleEnum('Business development manager', "Business development manager", RoleType.SupplierUser.value);

    private constructor(public readonly value: string, public readonly name: string, public readonly type: number) {
        RoleEnum.AllValues.push(this);
    }

    public static parseEnum(value: string): RoleEnum {
        return RoleEnum.AllValues.find(r => r.value == value);
    }

    public static Values(): Array<RoleEnum> {
        return RoleEnum.AllValues;
    }
}
