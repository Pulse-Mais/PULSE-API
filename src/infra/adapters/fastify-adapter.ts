import { IHttpContext } from "../port/http/IHttp-context";
import { IHttpRequest } from "../port/http/IHttp-request";
import { IHttpResponse } from "../port/http/IHttp-response";

import { FastifyRequest, FastifyReply } from "fastify";

export class FastifyAdapter<T> implements IHttpContext {

    req: FastifyRequest
    res: FastifyReply

    constructor(req: FastifyRequest, res: FastifyReply) {
        this.req = req;
        this.res = res
    }

    getRequest(): IHttpRequest {
        
        const resquest = {
            headers: this.req.raw.headers,
            body: this.req.body,
            params: this.req.params,
            query: this.req.query
        }

        return resquest
    }

    sendResponse(httpResponse: IHttpResponse<T>) {

        return this.res.status(httpResponse.statusCode).send(httpResponse.body)
    }
}