import React, { FC } from "react";
import Channel from "../../shared/Channel";

interface ChannelsListProps {
    channels: Channel[];
    onSelectChannel: (id: Channel["id"]) => void;
}

export const ChannelsList: FC<ChannelsListProps> = ({
    channels,
    onSelectChannel
}) => {
    return (
        <ul>
            {channels.map(({ name, id }) => (
                <li key={id}>
                    <button onClick={() => onSelectChannel(id)}>{name}</button>
                </li>
            ))}
        </ul>
    );
};
