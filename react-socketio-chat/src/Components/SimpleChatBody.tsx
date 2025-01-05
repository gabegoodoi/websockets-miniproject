import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

type SimpleChatBodyProps = {
    socket: any;
};

type Message = {
    username: string;
    text: string;
    timestamp?: string;
};

const SimpleChatBody: React.FC<SimpleChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        const messageListener = (message: Message) => {
            // Append timestamp locally if not provided by the server
            const newMessage = {
                ...message,
                timestamp: message.timestamp || new Date().toLocaleTimeString(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("message", messageListener);

        return () => {
            socket.off("message", messageListener);
        };
    }, [socket]);

    const filteredMessages = filter
        ? messages.filter((msg) =>
            msg.username.toLowerCase().includes(filter.toLowerCase())
        )
        : messages;

    return (
        <Container
            style={{
                marginTop: "40px",
                background: "lightblue",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            {/* Filter Section */}
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                <label style={{ marginRight: "10px" }}>Filter by Username:</label>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Enter username"
                    style={{
                        flex: "1",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            </div>

            {/* Messages */}
            {filteredMessages.map((message, index) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Title>
                            <strong>{message.username}</strong>
                            <span style={{ float: "right", fontSize: "0.9em", color: "gray" }}>
                                {message.timestamp}
                            </span>
                        </Card.Title>
                        <Card.Text>{message.text}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default SimpleChatBody;