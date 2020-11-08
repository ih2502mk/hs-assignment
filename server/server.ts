import Koa from "koa";
import logger from "koa-logger";

import { staticMiddleware } from "./static";
import { routes } from "./router";
import { PORT } from "../shared/config";

export const app = new Koa();

app.use(logger());

app.use(routes);

app.use(staticMiddleware);

if (!module.parent) {
    app.listen(3000);
    console.log(`Server running on port ${PORT}`);
}
