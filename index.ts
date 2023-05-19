import "dotenv/config";
import fastify from "fastify";
import { setup as setupDatabase } from "./db/setup";
import { ping, testDb } from "./routes";

const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS, APP_PORT } = process.env;

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

const server = fastify({ logger: true });

server.get("/ping", ping);

server.get("/test-db", testDb);

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

setupDatabase(String(MONGODB_NAME), String(MONGODB_USER), String(MONGODB_PASS));

server.listen({ port: Number(APP_PORT) }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
