import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const httpServer = createServer(app);

// Configuración de Socket.IO
const io = new Server(httpServer);

// Eventos de Socket.IO
io.on("connection", () => {
    console.log("Cliente conectado");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
