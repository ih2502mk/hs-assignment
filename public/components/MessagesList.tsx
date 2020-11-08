import React, { FC } from "react";
import Message from "../../shared/Message";

interface MessagesListProps {
    messages: Message[];
}

export const MessagesList: FC<MessagesListProps> = ({ messages }) => {
    return (
        <ul>
            {messages.map(({ content, id }) => (
                <li key={id}>{content}</li>
            ))}
        </ul>
    );
};
