"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
// Use a global variable to prevent multiple instances in development
var globalForPrisma = global;
// Create a singleton Prisma client
var prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: ['query'],
});
// Only assign in development to prevent hot reloading issues
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
exports.default = prisma;
