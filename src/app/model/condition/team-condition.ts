import {Condition} from "../condition";

export class TeamCondition extends Condition{
    companyId?: string;
    accountType?: string = '';
    status?: string;
    owner?: boolean;
}
