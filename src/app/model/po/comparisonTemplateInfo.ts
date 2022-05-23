import {BaseModel} from "./baseModel";
import {TemplatePropertyInfo} from "./templatePropertyInfo";

export class ComparisonTemplateInfo extends BaseModel {
    name?: string;
    notes?: string
}


export class ComparisonSaveTemplateInfo extends BaseModel{
    name?: string;
    notes?: string;
    overwrite?: boolean;
    templateProperties?: Array<TemplatePropertyInfo>;
}
