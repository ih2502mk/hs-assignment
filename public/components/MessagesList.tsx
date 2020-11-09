import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Message from "../../shared/Message";
import { UserContext } from "../context";

const df = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
});

const List = styled.ul`
    height: calc(100vh - 300px);
    overflow-y: scroll;
`;

const MessageEntry = styled.li`
    margin: 0.6rem 0;
    border: 3px solid #eee;
    border-radius: 6px;
    padding: 0.72rem;

    &.active {
        background-color: lightyellow;
    }
`;

const MessageInfoSection = styled.div`
    font-size: 0.7rem;
    color: grey;
    padding: 0 0 0.3rem 0;
    display: flex;
    align-items: baseline;

    b {
        font-weight: bold;
        margin-right: auto;
    }

    span {
        margin-left: 0.6rem;
    }
`;

const MessageActionBtn = styled.button`
    border: none;
    background: none;
    font-size: 0.7rem;
    color: rgb(117, 190, 255);
    text-decoration: underline;
    margin: 0 0.3rem 0 0;
    width: 32px;

    :hover {
        cursor: pointer;
    }
`;

interface MessagesListProps {
    messages: Message[];
    activeMessage: Message;
    onSelectMessage: (message: Message) => void;
}

export const MessagesList: FC<MessagesListProps> = ({
    messages,
    activeMessage,
    onSelectMessage
}) => {
    const user = useContext(UserContext);
    const listEl = useRef(null);

    useEffect(() => {
        listEl.current.scrollTo(
            0,
            listEl.current.scrollHeight - listEl.current.clientHeight
        );
    }, [messages]);

    return (
        <List ref={listEl}>
            {messages.map(m => (
                <MessageEntry
                    key={m.id}
                    className={
                        activeMessage && m.id === activeMessage.id
                            ? "active"
                            : ""
                    }
                >
                    <MessageInfoSection>
                        <b>{m.author}</b>
                        {user.name === m.author ? (
                            <>
                                <MessageActionBtn
                                    onClick={() => onSelectMessage(m)}
                                >
                                    Edit
                                </MessageActionBtn>
                                <MessageActionBtn>Delete</MessageActionBtn>
                            </>
                        ) : null}
                        <span>on {df.format(m.created)}</span>
                    </MessageInfoSection>
                    <div>{m.content}</div>
                </MessageEntry>
            ))}
        </List>
    );
};
