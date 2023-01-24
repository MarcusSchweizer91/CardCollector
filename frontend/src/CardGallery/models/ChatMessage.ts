export interface ChatMessage{
    id: string
    senderUsername: string
    receiverUsername: string
    message: string
    timestamp: Date
}

export interface NewChatMessage{
    receiverUsername: string
    message: string
}