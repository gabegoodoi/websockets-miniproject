# Flask & React WebSocket Chat App

A real-time chat application built with Flask (backend) and React (frontend) using WebSockets for bi-directional communication.

## Features
- Real-time messaging with WebSocket.
- User authentication by username.
- Message display with timestamp.
- Filter messages by username.

## Backend (Flask)
- **Flask** is used to serve the WebSocket server.
- **SocketIO** handles WebSocket connections and events.
- Messages are sent with a timestamp and broadcasted to connected clients.