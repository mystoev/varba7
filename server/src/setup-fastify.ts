import cors from "@fastify/cors";
import "dotenv/config";
import fastify, { FastifyRequest } from "fastify";
import { latest, stats } from "./routes";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
  methods: ["GET"],
});

server.get("/ping", async () => "pong\n");

server.get(
  "/stats",
  async (
    request: FastifyRequest<{
      Querystring: { month: string };
    }>
  ) => {
    const { month } = request.query;
    return stats(month);
  }
);

server.get("/latest", latest);

export const setupFastify = (address: string, port: string) => {
  server.listen({ host: address, port: Number(port) }, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });
};
