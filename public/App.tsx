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
            <div className="channels-panel">
                <div>Current user: {currentUser.name}</div>
                <ChannelsList
                    channels={channels}
                    activeChannel={currentChannel}
                    onSelectChannel={handleSelectChannel}
                />
            </div>
            <div className="messages-panel">
                {currentChannel ? (
                    <MessagesPanel channelId={currentChannel.id} />
                ) : (
                    <EmptyState>Please select Channel</EmptyState>
                )}
            </div>
        </UserContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
