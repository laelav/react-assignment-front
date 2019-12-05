import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class Table extends Component {
  state = {};

  render() {
    return <div />;
  }
}

export default Table;
