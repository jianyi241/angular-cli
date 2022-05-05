import {EnumIdentity} from "../interfaces/EnumIdentity";

export class AnalysisType implements EnumIdentity {
    private static AllValues: Array<AnalysisType> = new Array<AnalysisType>();
    static readonly feature = new AnalysisType('Feature analysis', "Feature comparison", ['/review/feature-selection', '/review/feature-comparison']);
    static readonly metric = new AnalysisType('Business metric analysis', "Business metric comparison", ['/review/metric-selection', '/review/metric-comparison']);
    static readonly fee = new AnalysisType('Fee analysis', "Fee comparison", ['/review/fee-comparison']);

    private constructor(public readonly value: string, public readonly name: string, public readonly links: string[]) {
        AnalysisType.AllValues.push(this);
    }

    public static parseEnum(value: string): AnalysisType {
        return AnalysisType.AllValues.find(r => r.value == value);
    }

    public static Values(): Array<AnalysisType> {
        return AnalysisType.AllValues;
    }
}
