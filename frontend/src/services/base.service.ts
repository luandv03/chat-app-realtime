import { API_URL_BASE } from "../configs/routes.config";
import { Http } from "./http.service";

export class BaseService {
    protected httpClient: Http;

    constructor() {
        const httpClient = new Http();

        httpClient.setCustomConfigs({
            baseUrl: API_URL_BASE,
        });

        this.httpClient = httpClient;
    }
}

export const baseService = new BaseService();
