import './App.css';
import React, { useEffect, useState } from 'react';
import socket from './socket.js';
import { Container } from 'react-bootstrap';
import SimpleChatBody from './Components/SimpleChatBody.tsx';
import SimpleMessageInput from './Components/SimpleMessageInput.tsx';

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
            setIsConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div>
            <h1>Welcome to React with Sockets</h1>
            <p>
                Connection Status:
                {isConnected ? " connected" : " Not connected"}
            </p>
            <Container>
                <h2>Chat Room</h2>
                <Container>
                    <SimpleChatBody socket={socket} />
                </Container>
                <SimpleMessageInput socket={socket} />
            </Container>
        </div>
    );
}

export default App;
