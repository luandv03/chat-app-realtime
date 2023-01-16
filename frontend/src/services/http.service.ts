import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface IHttpRequestConfig extends AxiosRequestConfig {
    isPrivateAPI?: boolean;
}

interface IHttpConfig extends IHttpRequestConfig {
    handleBeforeRequestSend?: (
        value: IHttpRequestConfig
    ) => IHttpRequestConfig | Promise<IHttpRequestConfig>;
}

interface IHttpCustomConfigs {
    withCredentials?: boolean; // Luan add to service for cookies
    baseUrl: string;
    authentication: {
        token: string;
    };
}

const initialHttpCustomConfigs: IHttpCustomConfigs = {
    baseUrl: "",
    authentication: {
        token: "",
    },
};

export class Http {
    private instance: AxiosInstance;

    private customConfigs: IHttpCustomConfigs = initialHttpCustomConfigs;

    private handleBeforeRequestSend = (config: IHttpRequestConfig) => {
        const { isPrivateAPI, ...otherConfig } = config;

        const token = this.customConfigs.authentication.token;

        if (isPrivateAPI && otherConfig.headers) {
            Object.assign(otherConfig.headers, {
                Authorization: `Bearer ${token}`,
            });
        }

        return otherConfig;
    };

    constructor(config?: IHttpConfig) {
        const { handleBeforeRequestSend = this.handleBeforeRequestSend } =
            config || {};

        const instance = axios.create();

        instance.interceptors.request.use(handleBeforeRequestSend);
        this.instance = instance;
    }

    async get<T>(url: string, config?: IHttpRequestConfig) {
        const { instance } = this;
        instance.interceptors.request.use(this.handleBeforeRequestSend);
        const response = await instance.get<T>(url, config);
        return response;
    }

    async post<T>(url: string, data?: T, config?: IHttpRequestConfig) {
        const { instance } = this;
        const response = await instance.post<T>(url, data, config);
        return response;
    }

    async put<T>(url: string, data: T, config?: IHttpRequestConfig) {
        const { instance } = this;
        const response = await instance.put(url, data, config);
        return response;
    }

    async delete(url: string, config?: IHttpRequestConfig) {
        const { instance } = this;
        const response = await instance.delete(url, config);
        return response;
    }

    getToken() {
        return this.customConfigs.authentication.token;
    }

    setCustomConfigs(configs: Partial<IHttpCustomConfigs>) {
        if (configs.baseUrl) {
            this.instance.defaults.withCredentials = configs.withCredentials; // Luan add to cookies
            this.instance.defaults.baseURL = configs.baseUrl;
        }

        this.customConfigs = Object.assign(initialHttpCustomConfigs, configs);
    }
}
