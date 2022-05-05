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


import {ComparisonAnalyseInfo} from "./comparisonAnalyseInfo";
import {ComparisonProductInfo} from "./comparisonProductInfo";

/**
 * sh_comparison表
 */
export class ComparisonInfo {
    adviserName?: string;
    analyseVoList?: Array<ComparisonAnalyseInfo>;
    companyId?: string;
    comparisonProductVoList?: Array<ComparisonProductInfo>;
    copyId?: string;
    createTime?: string;
    createUser?: string;
    deleteFlag?: boolean;
    id?: string;
    mainPlatformId?: string;
    mainVersionId?: string;
    modelVersionId?: string;
    name?: string;
    objectives?: string;
    practiceName?: string;
    productName?: string;
    updateTime?: string;
    updateUser?: string;
    userId?: string;
    userName?: string;
}

