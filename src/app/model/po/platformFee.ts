import {BaseModel} from "./baseModel";

class FeeProperties extends BaseModel {
    calculationKey?: string;
    defaultNa?: string;
    idps?: string;
    name?: string;
    productId?: string;
    propValue?: string;
    sectionId?: string;
    subProductId?: string;
    superPension?: string;
    type?: string;
    versionId?: string;
}

class FeeProduct extends BaseModel{
    name?: string;
    productId?: string;
    subProductId?: string;
    type?: string;
    versionId?: string;
    properties?: Array<FeeProperties> = new Array<FeeProperties>();
}

export class PlatformFee extends BaseModel{
    name?: string;
    others?: Array<FeeProduct> = new Array<FeeProduct>();
    sections?: Array<FeeProduct> = new Array<FeeProduct>();
    shProductId?: string;
    versionId?: string;
}
