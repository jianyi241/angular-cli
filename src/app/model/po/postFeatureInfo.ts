import {BaseModel} from "./baseModel";

export default class PostFeatureInfo extends BaseModel{
    feature?: string;
    group?: string;
    postId?: string;
    prodPropId?: string;
    propId?: string;
    subGroup?: string;
    /**
     * platform_version
     */
    versionId?: string;
}
