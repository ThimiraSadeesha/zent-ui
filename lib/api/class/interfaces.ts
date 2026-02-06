import {APIRequestResources} from "@/lib/api/class/enums";

export interface APIResponse<T> {
    status: T;
    data: T;
}

export interface APIRequestOptions {
    id?: string;
    resource?: APIRequestResources;
    endpoint?: string;
    suffix?: string;
    params?: Record<string, string | string[] | number | boolean>;
    headers?: Record<string, string>;
}