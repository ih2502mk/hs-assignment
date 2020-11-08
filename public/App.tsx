import React, { FC, useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChannelsList } from "./components/ChannelsList";
import Channel from "../shared/Channel";
import { MessagesPanel } from "./components/MessagesPanel";

const App: FC = () => {
    const channels: Channel[] = [];

    const [currentChannelId, setCurrentChannelId] = useState("");

    const handleSelectChannel = (id: Channel["id"]) => {
        setCurrentChannelId(id);
    };

    return (
        <>
            <ChannelsList
                channels={channels}
                onSelectChannel={handleSelectChannel}
            />

            <MessagesPanel channelId={currentChannelId} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
