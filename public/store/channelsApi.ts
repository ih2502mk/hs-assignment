import { API_BASE_URL } from '../../shared/config';
import Channel from "../../shared/Channel";

export const channelsApi = {
    async getAllChannels(): Promise<{status: string, channels: Channel[]}> {
        const response = await fetch(`${API_BASE_URL}api/channels`);
        return response.json();
    }
}