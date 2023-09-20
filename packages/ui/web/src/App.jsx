import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import Badge_BME280 from "./shared/components/badge-bme280";
import Badge_SDS011 from "./shared/components/badge-sds011";

const client = new ApolloClient({
  uri: "http://192.168.50.184:4000/",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Badge_BME280 />
    <Badge_SDS011 />
  </ApolloProvider>
);

export default App;
