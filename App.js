import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./components/form";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import FirstPage from "./pages/firstPage";
import SecondPage from "./pages/secondPage";

class App extends Component {
  render() {
    return <Router>
    <Switch>
    <Route exact path="/" component={FirstPage}/>
    <Route exact path="/FirstPage" component={FirstPage}/>
    <Route exact path="/SecondPage" component={SecondPage}/>
    </Switch>
    </Router>
  }
}
export default App;
