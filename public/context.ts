import { createContext } from "react";

export const UserContext = createContext<{ name: string }>({ name: "" });
