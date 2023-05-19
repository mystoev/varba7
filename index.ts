import "dotenv/config";
import fastify from "fastify";
import { Schema, connect, model } from "mongoose";

const { MONGODB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;

interface ITestDb {
  name: string;
  age: number;
}

const testDbSchema = new Schema<ITestDb>({
  name: { type: String },
  age: { type: Number },
});

const TestDb = model<ITestDb>("TestDb", testDbSchema, "logs");

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

const server = fastify({ logger: true });

connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.tl0wald.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`
)
  .then(() => server.log.info("MongoDB connected..."))
  .catch((err) => server.log.error(err));

server.get("/ping", async () => "pong\n");

server.get("/test-db", async (req, reply) => {
  const result = await TestDb.create({ name: "test-create", age: 15 });
  console.log(result);
  return result;
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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
