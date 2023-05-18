"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.get("/ping", async () => "pong\n");
server.get("/auth", {
    preValidation: (request, reply, done) => {
        const { username, password } = request.query;
        done(username !== "admin" ? new Error("Must be admin") : undefined);
    },
}, async (request, reply) => {
    const { username, password } = request.query;
    const customHeader = request.headers["h-Custom"];
    return "logged in (уж)";
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
