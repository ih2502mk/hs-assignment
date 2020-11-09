import React, { FC, useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import Message from "../../shared/Message";
import Channel from "../../shared/Channel";
import { MessagesList } from "./MessagesList";
import { MessageForm } from "./MessageForm";
import { messagesReducer, actionType } from "../store/messagesReducer";
import { messagesApi } from "../api/messagesApi";

const Wrapper = styled.div``;

const emptyMessage: Message = {
    id: null,
    content: "",
    channelId: "",
    author: ""
};

interface MessagesPanelProps {
    channelId: Channel["id"];
    className?: string;
}

export const MessagesPanel: FC<MessagesPanelProps> = ({
    channelId,
    className
}) => {
    const [editedMessage, setEditedMessage] = useState<Message>({
        ...emptyMessage,
        channelId
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

    const handleSubmitMessage = async (message: Message) => {
        const result = await messagesApi.sendMessage(message);
        if (result.status !== "success") {
            throw new Error("Problem saving message");
        }

        if (message.id) {
            updateMessages({
                type: actionType.updateInList,
                payload: [message]
            });
        } else {
            updateMessages({
                type: actionType.addToList,
                payload: [{ ...message, id: result.id }]
            });
        }

        setEditedMessage({ channelId, ...emptyMessage });
        return message;
    };

    const handleDiscardMessage = () => {
        setEditedMessage({ channelId, ...emptyMessage });
    };

    return (
        <Wrapper className={className}>
            <MessagesList
                messages={messages}
                activeMessage={editedMessage}
                onSelectMessage={handleSelectMessageForEditing}
            />
            <MessageForm
                message={editedMessage}
                onSubmitMessage={handleSubmitMessage}
                onDiscardMessage={handleDiscardMessage}
            />
        </Wrapper>
    );
};
