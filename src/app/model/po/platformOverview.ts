import {Attachment} from "../attachment";


export default class PlatformOverview {
    platformLogo?: Attachment = new Attachment();
    platformBanner?: Attachment = new Attachment();
    platformName?: string;
    platformWebsite?: string;
    description?: string;
    targetMarket?: string;
    dateOfLaunch?: string;
    history?: string;
    ownership?: string;
    netFlows?: string;
    fundsUnder?: string;
    marketShare?: string;
    numberOfClients?: string;
    numberOfAuthorised?: string;
    parentCompany?: string;
    platformOperations?: string;
}