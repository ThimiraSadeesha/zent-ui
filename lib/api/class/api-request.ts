
import { APIRequestOptions, APIResponse } from "./interfaces";
import { APIRequestResources } from "./enums";
import {buildQueryParams} from "@/lib/utils";
import {ApiConfig} from "@/lib/api/configs/config";


export abstract class APIRequest {
    protected constructor(protected resource: APIRequestResources) {}

    protected async request<T>(
        method: string,
        options: APIRequestOptions,
        body?: unknown,
        isBlob = false
    ): Promise<T> {
        const query = buildQueryParams(options.params);
        const url = `${this.generateUrl(options)}${query ? `?${query}` : ""}`;

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "API request failed");
        }

        return isBlob ? (response.blob() as any) : response.json();
    }

    public get<T>(options: APIRequestOptions) {
        return this.request<APIResponse<T>>("GET", options);
    }

    public post<T>(data: unknown, options: APIRequestOptions) {
        return this.request<APIResponse<T>>("POST", options, data);
    }

    public put<T>(data: unknown, options: APIRequestOptions) {
        return this.request<APIResponse<T>>("PUT", options, data);
    }

    public patch<T>(data: unknown, options: APIRequestOptions) {
        return this.request<APIResponse<T>>("PATCH", options, data);
    }

    public delete<T>(options: APIRequestOptions) {
        return this.request<APIResponse<T>>("DELETE", options);
    }

    public getBlob(options: APIRequestOptions) {
        return this.request<Blob>("GET", options, undefined, true);
    }

    protected generateUrl({ id, resource, endpoint, suffix }: APIRequestOptions) {
        return [
            ApiConfig.baseURL,
            resource ?? this.resource,
            id,
            endpoint,
            suffix,
        ]
            .filter(Boolean)
            .join("/")
            .replace(/([^:]\/)\/+/g, "$1");
    }
}
