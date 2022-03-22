/**
 * 1:overview 2:information 3:esg 4:features 5:fees&rates 6:find a Bdm 7:change History
 */
import {EnumIdentity} from "../interfaces/EnumIdentity";

export class TabType implements EnumIdentity {
    private static AllValues: Array<TabType> = new Array<TabType>();
    static readonly overview = new TabType(1, "Overview");
    static readonly information = new TabType(2, "Information");
    static readonly esg = new TabType(3, "ESG");
    static readonly features = new TabType(4, "Features");
    static readonly feesAndRates = new TabType(5, "Fees & rates");
    static readonly changeHistory = new TabType(7, "Change history");

    private constructor(public readonly value: number, public readonly name: string) {
        TabType.AllValues.push(this);
    }

    public static parseEnum(data: string | number): TabType {
        if (isNaN(Number(data)) && 'string' == typeof data) {
            return TabType.AllValues.find(t => t.name == data);
        } else {
            return TabType.AllValues.find(t => t.value == data);
        }
    }

    public static Values(): Array<TabType> {
        return TabType.AllValues;
    }
}
