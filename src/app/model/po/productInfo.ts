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


import {Attachment} from "../attachment";

/**
 * sh_product表
 */
export class ProductInfo {
    attachmentId?: string;
    attachmentVo: Attachment = new Attachment();
    createTime?: string;
    createUser?: string;
    deleteFlag?: boolean;
    description?: string;
    id?: string;
    name?: string;
    updateTime?: string;
    updateUser?: string;
}

