import levelup from "levelup";
import leveldown from "leveldown";
import encode from "encoding-down";
import { customAlphabet } from "nanoid/non-secure";
import { DB_PATH } from "../../shared/config";
import Message from "../../shared/Message";

const db = levelup(encode(leveldown(DB_PATH), { valueEncoding: "json" }));

const DB_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz1234567890";
const DB_ID_HI = "~";
const DB_ID_LO = "!";
const DB_ID_LENGTH = 10;
const nanoid = customAlphabet(DB_ID_ALPHABET, DB_ID_LENGTH);

export class MessageModel implements Message {
    id: string;
    channelId: string;
    content: string;
    created?: Date;
    updated?: Date;

    constructor({ id, channelId, content }: Message) {
        Object.assign(this, { id, channelId, content });
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
            created: this.created,
            updated: this.updated
        });

        return this.id;
    }

    static async allInChannel({ channelId }: Pick<Message, "channelId">) {
        return new Promise((resolve, reject) => {
            const messagesIterator = db.iterator({
                gte: `${channelId}:${DB_ID_LO}`,
                lte: `${channelId}:${DB_ID_HI}`
            });

            const messages: Message[] = [];

            const walker = (
                err: Error,
                key: string,
                value: Pick<Message, "content" | "created" | "updated">
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

                const [id, _] = key.toString().split(":");

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
