export interface ChatMessage{
    id: string
    senderUsername: string
    receiverUsername: string
    message: string
    timestamp: Date
}

export interface NewChatMessage{
    senderUsername: string
    receiverUsername: string
    message: string
}