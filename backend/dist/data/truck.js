"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTrucks = exports.Truck = void 0;
class Truck {
    constructor(id, name, x, y, angle, color) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
    }
}
exports.Truck = Truck;
exports.allTrucks = [];
