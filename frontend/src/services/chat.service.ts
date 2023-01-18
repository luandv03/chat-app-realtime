import { BaseService } from "./base.service";

export class ChatService extends BaseService {
    async accessChat(userId: string) {
        const response = await this.jwtClient.post("/chat", { userId });
        return response;
    }

    async fetchChat() {
        const response = await this.jwtClient.get("/chat");
        return response;
    }
}

export const chatService = new ChatService();
