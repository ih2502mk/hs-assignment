import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { ChannelsList } from "./components/ChannelsList";
import { MessagesPanel } from "./components/MessagesPanel";

import { useAppInit } from "./hooks/useAppInit";

import Channel from "../shared/Channel";
import { EmptyState } from "./components/EmptyState";

const App: FC = () => {
    const [channels, currentUser] = useAppInit();
    const [currentChannel, setCurrentChannel] = useState<Channel>(null);

    const handleSelectChannel = (id: string) => {
        setCurrentChannel(channels.find(c => c.id === id));
    };

    return (
        <>
            <ChannelsList
                className="channels-panel"
                channels={channels}
                onSelectChannel={handleSelectChannel}
            />
            {currentChannel ? (
                <MessagesPanel
                    className="messages-panel"
                    channelId={currentChannel.id}
                />
            ) : (
                <EmptyState>Please select Channel</EmptyState>
            )}
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
