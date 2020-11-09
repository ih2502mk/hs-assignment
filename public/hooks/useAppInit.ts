import { useState, useEffect } from "react";
import { channelsApi } from "../api/channelsApi";
import Channel from "../../shared/Channel";

export const useAppInit = (): [Channel[], { name: string }] => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [currentUser, setCurrentUser] = useState<{ name: string }>({
        name: "Bob"
    });

    useEffect(() => {
        channelsApi.getAllChannels().then(({ channels: responseChannels }) => {
            setChannels(responseChannels);
        });
    }, []);

    return [channels, currentUser];
};
