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
app.use(express.static(publicPath));

// Eventos de Socket.IO
io.on("connection", (socketServer) => {
  
  // Escuchar el evento 
  socketServer.on('mensaje-to-server', (data) => {
    console.log(data);
    socketServer.emit('mensaje-from-server', data);
  });


  // socketServer.emit('mensaje-bienvenida', {
  //   msg: 'Bienvenido al server',
  //   fecha: new Date()
  // });

  // socketServer.on('mensaje-cliente', (data) => {
  //   console.log(data)
  // })
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
