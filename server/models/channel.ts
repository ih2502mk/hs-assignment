import { db } from "../db";

export class ChannelModel {
    static async allChannels() {
        return await db.get("channels");
    }
}
