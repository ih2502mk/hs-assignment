declare interface Message {
    content: string;
    id: string | null;
    channelId: string;
    created?: Date;
    updated?: Date;
}

export default Message;
