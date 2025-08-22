import { Server as SocketIOServer } from 'socket.io';

class Sockets {
    private io: SocketIOServer;

    constructor(io: SocketIOServer) {
        this.io = io;
        this.socketEvents();
    }

    private socketEvents() {
        // On connection
        this.io.on('connection', (socketServer) => {

            // Escuchar evento: mensaje-to-server
            socketServer.on('mensaje-to-server', (data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });
        });
    }
}

export default Sockets;