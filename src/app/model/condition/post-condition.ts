/**
 * Suitability Hub
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import {Condition} from "../condition";


export class PostCondition extends Condition {
    archived?: boolean;
    companyId?: string;
    groups?: Array<string> = new Array<string>();
    keyword?: string;
    platforms?: Array<string> = new Array<string>();
    status?: Array<string> = new Array();
    types?: Array<string> = new Array<string>();
}

