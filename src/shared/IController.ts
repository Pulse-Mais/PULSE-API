import { IHttpResponse } from "../infra/port/http/IHttp-response";


interface IController {

    createSuccessResponse: (body: any) => IHttpResponse
    createErrorResponse: (error: any) => IHttpResponse
    
}