import levelup from "levelup";
import leveldown from "leveldown";
import encode from "encoding-down";
import { customAlphabet } from "nanoid/non-secure";
import { DB_PATH } from "../shared/config";

export const DB_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz1234567890";
export const DB_ID_LENGTH = 10;
export const DB_ID_HI = "~";
export const DB_ID_LO = "!";

export const db = levelup(
    encode(leveldown(DB_PATH), { valueEncoding: "json" })
);
export const nanoid = customAlphabet(DB_ID_ALPHABET, DB_ID_LENGTH);
