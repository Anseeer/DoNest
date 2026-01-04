import http from 'http'
import { Server } from 'socket.io'
import logger from '../utilities/logger';
import { socketHandler } from '../socket/socket';

export const socketInit = (server: http.Server) => {
    logger.info("Initialize Socket")
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;

        if (!userId) {
            logger.error("Connection rejected: No userId provided");
            return socket.disconnect();
        }
        logger.info(`Socket connected :${socket.id}`)
        socket.join(userId)
        socketHandler(io, socket, userId)
    });

    return io;
}