import { io } from "socket.io-client"

export const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
    autoConnect: false,
    withCredentials: true
});

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
});

socket.on("disconnect", (reason) => {
    console.warn("Socket disconnected:", reason);
});
