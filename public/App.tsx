import React, { createContext, FC, useState } from "react";
import ReactDOM from "react-dom";
import { ChannelsList } from "./components/ChannelsList";
import { MessagesPanel } from "./components/MessagesPanel";
import { useAppInit } from "./hooks/useAppInit";
import Channel from "../shared/Channel";
import { EmptyState } from "./components/EmptyState";
import { UserContext } from "./context";

const App: FC = () => {
    const [channels, currentUser] = useAppInit();
    const [currentChannel, setCurrentChannel] = useState<Channel>(null);

    const handleSelectChannel = (id: string) => {
        setCurrentChannel(channels.find(c => c.id === id));
    };

    return (
        <UserContext.Provider value={currentUser}>
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
        </UserContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
