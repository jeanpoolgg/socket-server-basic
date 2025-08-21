import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";


dotenv.config();
const app = express();
const httpServer = createServer(app);

// Configuración de Socket.IO
const io = new Server(httpServer);

// Desplegar el directorio público
// Junta rutas de forma segura (Windows/Linux/Mac)
const publicPath = path.join(__dirname, "..", "public");

console.log("RUTAAA",publicPath);

app.use(express.static(publicPath));

// Eventos de Socket.IO
io.on("connection", () => {
    console.log("Cliente conectado");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
