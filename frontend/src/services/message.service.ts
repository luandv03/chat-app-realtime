import { BaseService } from "./base.service";

export class MessageService extends BaseService {
    async fetchMesaages(chatId: string) {
        const response = await this.jwtClient.get(
            "http://localhost:3000/message/" + chatId
        );

        return response;
    }
}

export const messageService = new MessageService();
