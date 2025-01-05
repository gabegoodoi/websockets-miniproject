import React, { useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';

type SimpleMessageInputProps = {
    socket: any;
};

const SimpleMessageInput: React.FC<SimpleMessageInputProps> = ({ socket }) => {
    const [messageText, setMessageText] = useState("");
    const [username, setUsername] = useState("");

    const sendMessage = () => {
        if (username.trim() === "") {
            alert("Please enter your username before sending a message.");
            return;
        }

        if (messageText.trim() === "") {
            alert("Please enter a message before sending.");
            return;
        }

        const message = {
            username,
            text: messageText,
        };
        socket.emit("message", message);
        setMessageText("");
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Container>
            <Form>
                {/* Username Input */}
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        autoComplete="off"
                    />
                </Form.Group>

                {/* Message Input */}
                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleEnterKey}
                        placeholder="Type your message"
                        autoComplete="off"
                    />
                </Form.Group>

                {/* Send Button */}
                <Button variant="primary" type="button" onClick={sendMessage}>
                    Send
                </Button>
            </Form>
        </Container>
    );
};

export default SimpleMessageInput;