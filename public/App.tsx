import React, { FC, useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChannelsList } from "./components/ChannelsList";
import { MessagesPanel } from "./components/MessagesPanel";
import { useAppInit } from './hooks/useAppInit';

import Channel from "../shared/Channel";

const App: FC = () => {
    const [ channels, currentUser ] = useAppInit();
    const [ currentChannel, setCurrentChannel ] = useState<Channel>(null)

    const handleSelectChannel = (id:string) => {
        setCurrentChannel(channels.find(c => c.id === id))
    }

    return (
        <>
            <ChannelsList
                className="channels-panel"
                channels={channels}
                onSelectChannel={handleSelectChannel}
            />
            { currentChannel ?
                <MessagesPanel
                    className="messages-panel"
                    channelId={currentChannel.id} 
                />
                : <div>Please select Channel</div>
            }   
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
