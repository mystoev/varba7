import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Link, RouterProvider, createMemoryRouter } from "react-router-dom";

import Home from "./shared/components/home";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
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
