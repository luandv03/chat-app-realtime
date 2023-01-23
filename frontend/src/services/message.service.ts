import { BaseService } from "./base.service";

export class MessageService extends BaseService {
    async fetchMesaages(chatId: string) {
        const response = await this.jwtClient.get("/message/" + chatId);
        return response;
    }

    async sendMessage(payload: { chatId: string; content: string }) {
        const response = await this.jwtClient.post("/message", payload);
        return response;
    }
}

export const messageService = new MessageService();
