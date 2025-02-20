"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const truck_1 = require("./data/truck");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    let truck = new truck_1.Truck(socket.id, "New", 0, 0, 0, "#000000");
    truck_1.allTrucks.push(truck);
    io.emit('allTrucks', truck_1.allTrucks);
    // Handle new bids
    socket.on('moveTruck', (data) => {
        let truck = truck_1.allTrucks.find((truck) => truck.id === data.id);
        if (!truck) {
            truck = new truck_1.Truck(data.id, data.name, data.x, data.y, data.angle, data.color);
            truck_1.allTrucks.push(truck);
        }
        truck.x = data.x;
        truck.y = data.y;
        truck.color = data.color;
        truck.name = data.name;
        truck.angle = data.angle;
        io.emit('allTrucks', truck_1.allTrucks);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        let index = truck_1.allTrucks.findIndex((truck) => truck.id === socket.id);
        truck_1.allTrucks.splice(index, 1);
        console.log(truck_1.allTrucks);
        io.emit('allTrucks', truck_1.allTrucks);
    });
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
