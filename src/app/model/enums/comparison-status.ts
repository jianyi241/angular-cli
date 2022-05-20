import {EnumIdentity} from "../interfaces/EnumIdentity";

export class ComparisonStatus implements EnumIdentity {
    private static AllValues: Array<ComparisonStatus> = new Array<ComparisonStatus>();
    static readonly InProgress = new ComparisonStatus('In progress', "In progress");
    static readonly Completed = new ComparisonStatus('Completed', "Completed");

    private constructor(public readonly value: string, public readonly name: string) {
        ComparisonStatus.AllValues.push(this);
    }

    public static Values(): Array<ComparisonStatus> {
        return ComparisonStatus.AllValues;
    }
}
