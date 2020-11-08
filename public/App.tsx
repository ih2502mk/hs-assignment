import React, { FC, useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChannelList } from "./components/ChannelsList";
import Channel from "../shared/Channel";

const App: FC = () => {
    const channels:Channel[] = [];

    const [currentChannel, setCurrentChannel] = useState('');

    const handleSelectChannel = ({id}:Pick<Channel, "id">) => {
        setCurrentChannel(id);
    }
    
    return (
        <>
            <ChannelList
                channels={channels}
                onSelectChannel={handleSelectChannel}
            />

            <MessagesPanel
                channel={currentChannel}
            />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
