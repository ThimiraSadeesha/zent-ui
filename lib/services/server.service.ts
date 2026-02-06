import {APIRequestResources} from "@/lib/api/class/enums";
import {APIRequest} from "@/lib/api/class/api-request";


export class ServerService extends APIRequest {
    constructor() {
        super(APIRequestResources.SERVER);
    }

    login(payload: {
        host: string;
        username: string;
        password: string;
        port: number;
    }) {
        return this.post(payload, {
            endpoint: "login",
        });
    }

    logout() {
        return this.get({
            endpoint: "logout",
        });
    }
}

export const serverAPI = new ServerService();
