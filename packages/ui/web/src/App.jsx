import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import Badge from "./shared/components/badge";

const client = new ApolloClient({
  uri: "http://192.168.50.184:4000/",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Badge />
  </ApolloProvider>
);

export default App;
