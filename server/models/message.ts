import { db, nanoid, DB_ID_LO, DB_ID_HI } from "../db";
import Message from "../../shared/Message";

export class MessageModel implements Message {
    id: string;
    channelId: string;
    content: string;
    author: string;
    created?: Date;
    updated?: Date;

    constructor({ id, channelId, content, author, created }: Message) {
        Object.assign(this, { id, channelId, content, author, created });
    }

    async save() {
        const now = new Date();
        if (this.id === null) {
            this.id = nanoid();
            this.created = now;
        }

        this.updated = now;

        await db.put(`${this.channelId}:${this.id}`, {
            content: this.content,
            author: this.author,
            created: this.created,
            updated: this.updated
        });

        return this.id;
    }

    static async allInChannel(channelId: Message["channelId"]) {
        return new Promise((resolve, reject) => {
            const messagesIterator = db.iterator({
                gte: `${channelId}:${DB_ID_LO}`,
                lte: `${channelId}:${DB_ID_HI}`
            });

            const messages: Message[] = [];

            const walker = (
                err: Error,
                key: string,
                value: Pick<
                    Message,
                    "content" | "author" | "created" | "updated"
                >
            ) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (typeof key === "undefined") {
                    messagesIterator.end(endErr => {
                        if (endErr) reject(endErr);
                        resolve(
                            messages.sort((a, b) => {
                                if (a.created > b.created) return 1;
                                if (a.created < b.created) return -1;
                                return 0;
                            })
                        );
                    });
                    return;
                }

                const [_, id] = key.toString().split(":");

                messages.push({
                    id,
                    channelId,
                    ...value
                });
                messagesIterator.next(walker);
            };

            messagesIterator.next(walker);
        });
    }

    static async destroyMessage({
        id,
        channelId
    }: Pick<Message, "id" | "channelId">) {
        await db.del(`${channelId}:${id}`);
    }
}
