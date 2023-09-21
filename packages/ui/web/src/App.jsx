import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { BME280Page, HomePage } from "./shared/pages";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:4000"
      : process.env.REACT_APP_GQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createMemoryRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/bme280",
    element: <BME280Page />,
  },
]);

const App = () => (
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

export default App;
