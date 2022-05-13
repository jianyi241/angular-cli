import {EnumIdentity} from "../interfaces/EnumIdentity";

export class WorkFlowsStatus implements EnumIdentity {
    // 1: Data required, 2: Awaiting approval, 3: Awaiting publish
    private static AllValues: Array<WorkFlowsStatus> = new Array<WorkFlowsStatus>();
    static readonly DataRequired = new WorkFlowsStatus(1, "Data required");
    static readonly AwaitingApproval = new WorkFlowsStatus(2, "Awaiting approval");
    static readonly AwaitingPublish = new WorkFlowsStatus(3, "Awaiting publish");

    private constructor(public readonly value: number, public readonly name: string) {
        WorkFlowsStatus.AllValues.push(this);
    }

    public static Values(): Array<WorkFlowsStatus> {
        return WorkFlowsStatus.AllValues;
    }
}
