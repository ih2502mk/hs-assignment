import React, { FC } from "react";
import Channel from "../../shared/Channel";

interface ChannelListProps {
    channels: Channel[]
    onSelectChannel: ({id}:Pick<Channel, "id">) => void
}

export const ChannelList: FC<ChannelListProps> = ({ 
    channels,
    onSelectChannel
}) => {
    return <ul>
        {channels.map(({name, id}) => <li key={id}>
            <button 
                onClick={() => {onSelectChannel({id})}}
            >
                {name}
            </button>
        </li>)}
    </ul>;
}