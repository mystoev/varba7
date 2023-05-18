import fastify from "fastify";

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

const server = fastify();

server.get("/ping", async () => "pong\n");

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
