export interface IHttpResponse<T> {
    headers: any
    body: T;  
    statusCode: number;  
}
