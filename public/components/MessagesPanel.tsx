import React, { FC } from "react";
import Message from "../../shared/Message";
import Channel from "../../shared/Channel";
import { MessagesList } from "./MessagesList";
import { MessageForm } from "./MessageForm";

interface MessagesPanelProps {
    channelId: Channel["id"];
}

export const MessagesPanel: FC<MessagesPanelProps> = ({ channelId }) => {
    const messages: Message[] = [];

    const editedMessage: Message = {
        content: "",
        id: null,
        channelId,
        created: new Date(),
        updated: new Date()
    };

    return (
        <>
            <MessagesList messages={messages} />
            <MessageForm message={editedMessage} />
        </>
    );
};
