import { BaseService } from "./base.service";
import { IRegister, ILogin } from "../interfaces/auth/auth.interface";

export class AuthService extends BaseService {
    async login(loginPayload: ILogin) {
        const response = await this.httpClient.post(
            "/auth/login",
            loginPayload
        );
        return response;
    }

    async register(registerPayload: IRegister | FormData) {
        const response = await this.httpClient.post(
            "/auth/register",
            registerPayload
        );
        return response;
    }

    async verifyToken({ token }: { token: string }) {
        const response = await this.httpClient.post(
            "/auth/verify-token",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    }

    setToken({ token }: { token: string }) {
        this.httpClient.setCustomConfigs({
            authentication: {
                token,
            },
        });
    }

    oauthAuthorize({
        response_type,
        client_id,
        redirect_uri,
        token,
    }: Record<
        "response_type" | "client_id" | "redirect_uri" | "token",
        unknown
    >) {
        return this.httpClient.post(
            `/oauth/authorize`,
            {
                response_type,
                client_id,
                redirect_uri,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }
}

export const authService = new AuthService();
