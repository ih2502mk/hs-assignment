import levelup from "levelup";
import leveldown from "leveldown";
import encode from "encoding-down";
import { DB_PATH } from "../shared/config";

const db = levelup(encode(leveldown(DB_PATH), { valueEncoding: "json" }));

db.batch([], (err?: any) => {
    if (err) {
        console.log(err);
    }
});
