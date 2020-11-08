declare interface Message {
    content: string,
    id: string | null,
    channelId: string,
    timestamp: Date,
}

export default Message;