import { IHttpContext } from "../port/http/IHttp-context";
import { IHttpRequest } from "../port/http/IHttp-request";
import { IHttpResponse } from "../port/http/IHttp-response";

import { FastifyRequest, FastifyReply } from "fastify";

export class FastifyAdapter<T> implements IHttpContext {

    req: any
    res: FastifyReply

    constructor(req: any, res: FastifyReply) {
        this.req = req;
        this.res = res
    }
 
    async getRequest(): Promise<IHttpRequest> {
        const files = await this.req.file()
        const teste = await this.req.parts()
        console.log('teste', files)
     
        const resquest = {
            headers: this.req.raw.headers,
            body: this.req.body,
            params: this.req.params,
            query: this.req.query,
            files: files,
            data: this.req.data
        }

        return resquest
    }

    sendResponse(httpResponse: IHttpResponse<T>) {

        return this.res.status(httpResponse.statusCode).send(httpResponse.body)
    }
}