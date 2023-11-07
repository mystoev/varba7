import { GraphQLScalarType, Kind, ValueNode } from "graphql";

const validateTimestampScalar = (value: unknown) => {
  if (typeof value === "string" && !isNaN(+value)) {
    return +value;
  }

  if (typeof value === "number") {
    return Math.trunc(value);
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string" && !isNaN(new Date(value).getTime())) {
    return new Date(value).getTime();
  }

  throw Error(
    "GraphQL Timestamp Scalar serializer expected String, Number or Date"
  );
};

export const Timestamp = new GraphQLScalarType({
  name: "Timestamp",
  description: "A number filter representing a timestamp",
  parseValue: validateTimestampScalar,
  serialize: validateTimestampScalar,
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    } else if (ast.kind === Kind.STRING && !isNaN(+ast.value)) {
      return +ast.value;
    }

    throw Error(
      "GraphQL Timestamp Scalar serializer expected String, Number or Date"
    );
  },
});
