
export abstract class GenericController {

    constructor() { }

    protected createSuccessResponse(body: any, statusCode?: number, headers?: string[]) {

        if (statusCode && headers) {
            return {
                headers,
                body,
                statusCode,
            }
        }
        
        if (statusCode) {
            return {
                headers: null,
                body,
                statusCode,
            };
        }

        if (headers) {
            return {
                headers,
                body,
                statusCode: 200,
            };
        }

        return {
            headers: null,
            body,
            statusCode: 200,
        };
    }

    protected createErrorResponse(error: any, statusCode?: number, headers?: string[]) {

        if (statusCode) {
            return {
                headers: null,
                body: error,
                statusCode,
            };
        }

        if (headers) {
            return {
                headers,
                body: error,
                statusCode: 200,
            };
        }

        if (statusCode && headers) {
            return {
                headers,
                body: error,
                statusCode,
            }
        }

        return {
            headers: null,
            body: error,
            statusCode: 400,
        };
    }
}


