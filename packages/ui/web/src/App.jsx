import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { BME280Page, HomePage } from "./shared/pages";

console.log(import.meta.env.MODE);
const httpLink = createHttpLink({
  uri: import.meta.env.DEV ? "http://localhost:4000" : import.meta.env.VITE_URL,
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
