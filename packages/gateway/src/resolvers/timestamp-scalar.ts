import { GraphQLScalarType } from "graphql";

const validateTimestampScalar = (value: unknown) => {
  if (typeof value === "string" && !isNaN(+value)) {
    return +value;
  }

  if (typeof value === "number") {
    return value;
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
  parseValue(inputValue: unknown) {
    return validateTimestampScalar(inputValue);
  },
  parseLiteral(inputValue) {
    return validateTimestampScalar(inputValue);
  },
  serialize(outputValue: unknown) {
    return validateTimestampScalar(outputValue);
  },
});
