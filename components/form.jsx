import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class Form extends Component {
  state = {
    num1: "",
    num2: ""
  };

  mySubmitHandler = event => {
    event.preventDefault();
    if (this.state.num1 == "" || this.state.num2 == "") {
      event.preventDefault();
      alert("You must enter a number in all fields!");
    } else {
      const body = {
        query:
          "mutation{" +
          "createEvent(eventInput:{num1:" +
          '"' +
          this.state.num1.toString() +
          '"' +
          ",num2:" +
          '"' +
          this.state.num2.toString() +
          '"' +
          "}){" +
          "_id " +
          "num1 " +
          "num2 " +
          "addition " +
          "multiply" +
          "}}"
      };
      /*
      url += this.state.num1 + "/" + this.state.num2;
      var request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader("Content-Type", "text/plain");

      request.send();
*/

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
      event.target.num1.value = "";
      event.target.num2.value = "";
      this.setState({ [event.target.num1.name]: "" });
      this.setState({ [event.target.num2.name]: "" });
    }
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value.trim();
    if (nam === "num1" || nam === "num2") {
      if (!Number(val) && val != "") {
        event.target.value = val.substring(0, val.length - 1);
        this.setState({ [nam]: val.substring(0, val.length - 1) });
        event.preventDefault();
        alert("You must enter a number");
      } else {
        event.target.value = val;
        this.setState({ [nam]: val.trim() });
      }
    }
  };
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <br />
        <p className={this.getBadgeBS()}>Number #1: </p>
        <input
          className={this.getTextBS()}
          type="text"
          name="num1"
          onChange={this.myChangeHandler}
        />
        <br />
        <p className={this.getBadgeBS()}>Number #2: </p>
        <input
          className={this.getTextBS()}
          type="text"
          name="num2"
          onChange={this.myChangeHandler}
        />
        <br />
        <input
          type="submit"
          disabled={!(this.state.num1 && this.state.num2)}
          className={this.getButtonBS()}
        />
      </form>
    );
  }

  getBadgeBS() {
    return "badge m-2 badge-info";
  }
  getTextBS() {
    return "text m-2 badge-white";
  }
  getButtonBS() {
    return "btn m-2 btn-dark btn-sm";
  }
}

export default Form;
