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
import {BaseModel} from "./baseModel";


export class UserInfo extends BaseModel{
    email?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    openId?: string;
    role?: string;
    status?: string;
    practiceId?: string;
    receiveNewsFlag?: boolean;
    arn?: string;
}

