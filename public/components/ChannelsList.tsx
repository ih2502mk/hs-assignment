import React, { FC } from "react";
import Channel from "../../shared/Channel";
import styled from 'styled-components';

const List = styled.ul`
    padding: 12px;
`;

interface ChannelsListProps {
    channels: Channel[];
    onSelectChannel: (id: Channel["id"]) => void;
    className?: string;
}

export const ChannelsList: FC<ChannelsListProps> = ({
    channels,
    onSelectChannel,
    className
}) => {
    return (
        <List className={className}>
            {channels.map(({ name, id }) => (
                <li key={id}>
                    <button onClick={() => onSelectChannel(id)}>{name}</button>
                </li>
            ))}
        </List>
    );
};
