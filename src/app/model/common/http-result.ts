export interface HttpResult<T> {

    statusCode: number | boolean;

    data?: T;

    msg?: string;

}