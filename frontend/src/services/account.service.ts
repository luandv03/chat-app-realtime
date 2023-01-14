import { BaseService } from "./base.service";

export class AccountsService extends BaseService {
    async getAccounts() {
        const response = await this.httpClient.get("/accounts?limit=50", {
            isPrivateAPI: true,
        });

        return response;
    }

    async updateAccount({
        accountId,
        updateAccountPayload,
    }: {
        accountId: string;
        updateAccountPayload: Partial<
            Record<"fullName" | "email" | "role", string>
        >;
    }) {
        const response = await this.httpClient.post(
            `/accounts/${accountId}`,
            updateAccountPayload,
            {
                isPrivateAPI: true,
            }
        );

        return response;
    }

    async deleteAccount({ accountId }: { accountId: string }) {
        const response = await this.httpClient.delete(
            `/accounts/${accountId}`,
            {
                isPrivateAPI: true,
            }
        );

        return response;
    }
}

export const accountsService = new AccountsService();
