import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Column, Table } from "react-virtualized";
import Draggable from "react-draggable";
import "react-virtualized/styles.css";

const TOTAL_WIDTH = 500;
class Table extends Component {
  state = {
    tabletitle1: "Number #1",
    tabletitle2: "Number #2",
    tabletitle3: "Addition (+)",
    tabletitle4: "Multiply (x)",
    list: [],
    widths: {
      num1: 0.25,
      num2: 0.25,
      addition: 0.25,
      multiply: 0.25
    }
  };
  componentDidMount() {
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
        this.setState({ list: events });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.list);

    return (
      <Table
        width={TOTAL_WIDTH}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={this.state.list.length}
        rowGetter={({ index }) => this.state.list[index]}
      >
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="num1"
          label={this.state.tabletitle1}
          width={this.state.widths.num1 * TOTAL_WIDTH}
        />
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="num2"
          label={this.state.tabletitle2}
          width={this.state.widths.num2 * TOTAL_WIDTH}
        />
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="addition"
          label={this.state.tabletitle3}
          width={this.state.widths.addition * TOTAL_WIDTH}
        />
        <Column
          headerRenderer={this.headerRenderer}
          dataKey="multiply"
          label={this.state.tabletitle4}
          width={this.state.widths.multiply * TOTAL_WIDTH}
        />
      </Table>
    );
  }
  headerRenderer = ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
  }) => {
    return (
      <React.Fragment key={dataKey}>
        <div className="ReactVirtualized__Table__headerTruncatedText">
          {label}
        </div>
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            this.resizeRow({
              dataKey,
              deltaX
            })
          }
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className="DragHandleIcon">⋮</span>
        </Draggable>
      </React.Fragment>
    );
  };
  resizeRow = ({ dataKey, deltaX }) =>
    this.setState(prevState => {
      const prevWidths = prevState.widths;
      const percentDelta = deltaX / TOTAL_WIDTH;
      const nextDataKey = "";
      if (dataKey === "num1") {
        nextDataKey = "num2";
      } else if (dataKey === "num2") {
        nextDataKey = "addition";
      } else if (dataKey === "addition") {
        nextDataKey = "multiply";
      }

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] + percentDelta,
          [nextDataKey]: prevWidths[nextDataKey] - percentDelta
        }
      };
    });
  getButtonBS() {
    return "btn m-2 btn-dark btn-sm";
  }
}

export default Table;
