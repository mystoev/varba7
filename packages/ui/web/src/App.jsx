import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Link, RouterProvider, createMemoryRouter } from "react-router-dom";

import Home from "./shared/components/home";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:4000"
      : process.env.REACT_APP_GQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
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

const HomePage = () => {
  return (
    <>
      <Home />
    </>
  );
};

const TestPage = () => {
  return (
    <>
      <p>Test Page</p>
      <Link to="/">Back Home</Link>
    </>
  );
};

const router = createMemoryRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

const App = () => (
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

export default App;
