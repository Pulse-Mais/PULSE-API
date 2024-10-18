import { IHttpResponse } from "./IHttp-response";
import { IHttpRequest } from "./IHttp-request";

export interface IHttpContext {
    getRequest: () => Promise<IHttpRequest>; 
    sendResponse: (httpResponse: IHttpResponse<any>) => any
}