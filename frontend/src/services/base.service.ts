import { AxiosInstance } from "axios";
import { API_URL_BASE } from "../configs/routes.config";
import { Http } from "./http.service";
import jwtInterceptor from "../interceptors/jwt.interceptor";

export class BaseService {
    protected httpClient: Http;
    protected jwtClient: AxiosInstance;

    constructor() {
        const httpClient = new Http();
        const jwtClient = jwtInterceptor;

        httpClient.setCustomConfigs({
            withCredentials: true, // Luan add to cookies
            baseUrl: API_URL_BASE,
        });

        this.httpClient = httpClient;
        this.jwtClient = jwtClient;
    }
}

export const baseService = new BaseService();
