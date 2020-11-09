import { API_BASE_URL } from "../../shared/config";
import Channel from "../../shared/Channel";
import Message from "../../shared/Message";

export const messagesApi = {
    async getAllMessagesInChannel(
        channelId: Channel["id"]
    ): Promise<{ status: string; messages: Message[] }> {
        const response = await fetch(
            `${API_BASE_URL}api/messages/${channelId}`
        );
        return response.json();
    },

    async sendMessage(
        message: Message
    ): Promise<{ status: string; id: string }> {
        const response = await fetch(`${API_BASE_URL}api/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        });

        return response.json();
    }
};
