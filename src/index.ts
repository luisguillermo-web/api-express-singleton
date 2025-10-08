import { Server } from './core/Server';

const PORT = 3000;
const serverInstance = Server.getInstance();

// Iniciamos la aplicación.
serverInstance.start(PORT);