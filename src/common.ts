type Type = 'form' | 'api';

export interface InfluxTypes {
    type: Type
    body?: string
    queryParams?: string
    action: string
    method: string
    headers?: HeadersInit
    pathParams?: string
}