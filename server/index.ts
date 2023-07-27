import cors from "@fastify/cors";
import "dotenv/config";
import fastify, { FastifyRequest } from "fastify";
import { setup as setupDatabase } from "./src/db/setup";
import { ping, stats, testDb } from "./src/routes";

const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS, APP_PORT } = process.env;

interface IQuerystring {
  username: string;
  password: string;
}

type MyRequest = FastifyRequest<{
  Querystring: { month: string };
}>;

interface IHeaders {
  "h-Custom": string;
}

const server = fastify({ logger: true });

server.register(cors, {
  origin: "http://localhost:5173",
});

server.get("/ping", ping);

server.get("/test-db", testDb);

server.get("/stats", async (request: MyRequest) => {
  const { month } = request.query;
  return stats(month);
});

server.get<{ Querystring: IQuerystring; Headers: IHeaders }>(
  "/auth",
  {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(username !== "admin" ? new Error("Must be admin") : undefined);
    },
  },
  async (request, reply) => {
    const { username, password } = request.query;
    const customHeader = request.headers["h-Custom"];

    return "logged in (уж)";
  }
);

setupDatabase(
  MONGODB_NAME as string,
  MONGODB_USER as string,
  MONGODB_PASS as string
);

server.listen({ port: Number(APP_PORT) }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
