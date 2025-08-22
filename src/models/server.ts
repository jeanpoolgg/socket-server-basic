import express, { Application } from 'express';
import http, { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import Sockets from './sockets';

class Server {
    private app: Application;
    private port: number;
    private server: HTTPServer;
    private io: SocketIOServer;

    constructor() {

        this.app = express();
        this.port = Number(process.env.PORT) || 3000;

        // Http server
        this.server = http.createServer(this.app);

        // Configuración de sockets
        this.io = new SocketIOServer(this.server, {
            /* opciones */
        });

    }

    private middlewares(): void {
        // Desplegar el directorio público
        this.app.use(express.static(path.join(__dirname, "../../", "public")));
    }

    private sockets(): void {
        new Sockets(this.io);
    }


    public execute(): void {
        // Inicializar Middleware
        this.middlewares();

        // Inicializar sockets
        this.sockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

export default Server;

