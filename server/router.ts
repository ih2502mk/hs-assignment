import { Context } from "koa";
import Router from "koa-router";
import koaBody from "koa-body";

import { MessageModel } from "./models/message";
import { ChannelModel } from "./models/channel";

const router = new Router();

router
    .get("/api/channels", async (ctx: Context) => {
        const channels = await ChannelModel.allChannels();
        ctx.body = JSON.stringify({ status: "success", channels });
    })

    .get("/api/messages/:channel_id", koaBody(), async (ctx: Context) => {
        try {
            const messages = await MessageModel.allInChannel(
                ctx.params.channel_id
            );
            ctx.body = JSON.stringify({ status: "success", messages });
        } catch (e) {
            ctx.throw(e);
        }
    })

    .post("/api/message", koaBody(), async (ctx: Context) => {
        const bodyMessage = ctx.request.body;
        const message = new MessageModel(bodyMessage);

        try {
            const savedId = await message.save();
            ctx.body = JSON.stringify({ status: "success", id: savedId });
        } catch (e) {
            ctx.throw(e);
        }
    })

    .del("/api/message/:message_id/:channel_id", async (ctx: Context) => {
        const { message_id: id, channel_id: channelId } = ctx.params;

        try {
            await MessageModel.destroyMessage({ id, channelId });
            ctx.body = JSON.stringify({ status: "success" });
        } catch (e) {
            ctx.throw(e);
        }
    });

export const routes = router.routes();
