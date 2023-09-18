import { start as startApollo } from "./setup-apollo";
import { connect as connectToMongo } from "./setup-mongo";

connectToMongo();
startApollo();
