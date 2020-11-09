import React, { FC, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import Message from "../../shared/Message";
import Channel from "../../shared/Channel";
import { MessagesList } from "./MessagesList";
import { MessageForm } from "./MessageForm";
import { messagesReducer, actionType } from "../store/messagesReducer";
import { messagesApi } from "../api/messagesApi";

const Wrapper = styled.div``;

interface MessagesPanelProps {
    channelId: Channel["id"];
    className?: string;
}

export const MessagesPanel: FC<MessagesPanelProps> = ({
    channelId,
    className
}) => {
    const [editedMessage, setEditedMessage] = useState<Message>({
        id: null,
        content: "",
        channelId,
        author: ""
    });
    const [messages, updateMessages] = useReducer(messagesReducer, []);

    useEffect(() => {
        if (channelId) {
            messagesApi
                .getAllMessagesInChannel(channelId)
                .then(handleGetMessages);
        }
    }, [channelId]);

    const handleGetMessages = (messagesResp: { messages: Message[] }) => {
        updateMessages({
            type: actionType.init,
            payload: messagesResp.messages
        });
    };

    const handleSelectMessageForEditing = (message: Message) => {
        setEditedMessage(message);
    };

    return (
        <Wrapper className={className}>
            <MessagesList
                messages={messages}
                onSelectMessage={handleSelectMessageForEditing}
            />
            <MessageForm message={editedMessage} />
        </Wrapper>
    );
};
