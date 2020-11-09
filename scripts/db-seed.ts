import { db, nanoid } from "../server/db";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

interface BatchJob {
    type: "put" | "del";
    key: string;
    value: {} | [];
}

// init batch
const batch: BatchJob[] = [];

// Create 3 channels w/ id ch{n} and name Channel {n}
const channels = [...Array(3)].map((_, i) => ({
    id: `ch${i + 1}`,
    name: `Channel ${i + 1}`
}));

// Add job for putting channels
batch.push({
    type: "put",
    key: "channels",
    value: channels
});

// Create authors
const authors = ["Alice", "Bob", "Eve", "Grace", "Walter"];

// Add jobs for messages 20 per channel by random authors
channels.reduce((acc, ch) => {
    for (let i = 0; i < 20; i++) {
        const date = new Date(Date.now() - 10000 * i);
        acc.push({
            type: "put",
            key: `${ch.id}:${nanoid()}`,
            value: {
                content: lorem.generateSentences(1),
                author: authors[Math.floor(Math.random() * 5)],
                created: date,
                updated: date
            }
        });
    }

    return acc;
}, batch);

db.clear().then(() => {
    db.batch(batch, (err: Error) => {
        if (err) {
            console.error(err);
        }
        console.log("Database seeded!");
    });
});
