from datetime import datetime
from websocket_server import socketio, app

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(message):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    message['timestamp'] = timestamp
    print(f'Received message: {message}')
    socketio.emit('message', message)

if __name__ == '__main__':
    socketio.run(app, host="127.0.0.1", port=5000)