import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Column, Table } from "react-virtualized";

class Table extends Component {
  state = {
    tabletitle1: "Number #1",
    tabletitle2: "Number #2",
    tabletitle3: "Addition (+)",
    tabletitle4: "Multiply (x)",
    list: []
  };
  getData = event => {
    const body = {
      query:
        "query {" +
        "events {" +
        "num1 " +
        "num2 " +
        "addition " +
        "multiply" +
        "}}"
    };
    //console.log(body);
    fetch("https://reactassignmentserver.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.state.list = resData.data.events;
        console.log(JSON.stringify(this.state.list));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.getData()}
      </div>
    );
  }
  getButtonBS() {
    return "btn m-2 btn-dark btn-sm";
  }
}

export default Table;
