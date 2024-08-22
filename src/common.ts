type Type = 'form' | 'api';

type Method = 'POST' | 'PUT' | 'GET' | 'DELETE';

export interface InfluxTypes {
    type: Type
    body: string
    queryParams?: string
    action: string
    method: Method
    headers?: HeadersInit
    pathParams?: string
}