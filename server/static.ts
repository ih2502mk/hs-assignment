import Bundler from "parcel-bundler";
import serve from "koa-static";
import { createMiddleware } from "koa-parcel-middleware";
import { Middleware } from "koa";
import path from "path";

import { PUBLIC_ROOT, IS_DEV, BASE_PATH } from "../shared/config";

const PUBLIC_DIST = PUBLIC_ROOT + "/_dist";

const serveStatic = serve(PUBLIC_DIST);

let mw: Middleware;

if (IS_DEV) {
    const bundler = new Bundler(PUBLIC_ROOT + "/index.html", {
        outDir: PUBLIC_DIST,
        publicUrl: BASE_PATH,
        target: "browser",
        watch: IS_DEV,
        minify: !IS_DEV,
        scopeHoist: false,
        hmr: IS_DEV,
        detailedReport: IS_DEV,
        sourceMaps: IS_DEV
    });

    bundler.bundle();

    mw = createMiddleware({
        bundler,
        staticMiddleware: serveStatic
    });
} else {
    mw = async (ctx, next) => {
        const pathname = ctx.url;

        if (path.extname(pathname) === "") {
            ctx.url = `index.html`;
        } else {
            ctx.url = pathname.slice(BASE_PATH.length);
        }

        return serveStatic(ctx, next);
    };
}

export { mw as staticMiddleware };
