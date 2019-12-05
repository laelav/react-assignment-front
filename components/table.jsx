import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

class Table extends Component {
  state = {};
  mySubmitHandler = event => {
    event.preventDefault();
    const body = {
      query:
        "query {" +
        "events {" +
        "_id " +
        "num1 " +
        "num2 " +
        "addition " +
        "multiply" +
        "}}"
    };
    console.log(body);
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
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <input type="submit" className={this.getButtonBS()} />
      </form>
    );
  }
  getButtonBS() {
    return "btn m-2 btn-dark btn-sm";
  }
}

export default Table;
