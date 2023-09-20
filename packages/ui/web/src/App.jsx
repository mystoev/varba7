import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Home from "./shared/components/home";

const client = new ApolloClient({
  uri: "http://192.168.50.184:4000/",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
