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
  componentDidMount(){
    this.getData();
  }
  getData = event => {
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
        const events = resData.data.events;
        this.setState({list: events})
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    const eventList = this.state.list.map(event=>{
      return <li key={event._id}className="events_list-item">{event.num1}</li>;
    })
    return (
      <div>
      <ul className="events_list">
      {eventList}
      </ul>

      </div>
    );
  }
  getButtonBS() {
    return "btn m-2 btn-dark btn-sm";
  }
}

export default Table;
