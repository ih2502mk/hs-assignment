import React, { FC } from "react";
import Channel from "../../shared/Channel";
import styled from "styled-components";

const List = styled.ul`
    padding: 12px;
`;

const ChannelBtn = styled.button`
    width: 100%;
    background: none;
    margin: 0.6rem 0;
    padding: 0.3rem 0.6rem;
    border: none;
    font-weight: bold;

    &.active {
        text-decoration: underline;
    }

    :hover {
        cursor: pointer;
    }
`;

interface ChannelsListProps {
    channels: Channel[];
    activeChannel: Channel;
    onSelectChannel: (id: Channel["id"]) => void;
    className?: string;
}

export const ChannelsList: FC<ChannelsListProps> = ({
    channels,
    activeChannel,
    onSelectChannel,
    className
}) => {
    return (
        <List className={className}>
            {channels.map(({ name, id }) => (
                <li key={id}>
                    <ChannelBtn
                        onClick={() => onSelectChannel(id)}
                        className={
                            activeChannel && activeChannel.id === id
                                ? "active"
                                : ""
                        }
                    >
                        {name}
                    </ChannelBtn>
                </li>
            ))}
        </List>
    );
};
