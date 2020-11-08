import React, { FC } from "react";
import styled from "styled-components";
import Message from "../../shared/Message";
import Channel from "../../shared/Channel";
import { MessagesList } from "./MessagesList";
import { MessageForm } from "./MessageForm";

const Wrapper = styled.div`

`;

interface MessagesPanelProps {
    channelId: Channel["id"];
    className?: string;
}

export const MessagesPanel: FC<MessagesPanelProps> = ({ channelId, className }) => {
    const messages: Message[] = [];

    const editedMessage: Message = {
        content: "",
        author: "",
        id: null,
        channelId,
        created: new Date(),
        updated: new Date()
    };

    return (
        <Wrapper className={className}>
            <MessagesList messages={messages} />
            <MessageForm message={editedMessage} />
        </Wrapper>
    );
};
