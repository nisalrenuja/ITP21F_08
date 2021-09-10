import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab6 from "../../modules/AdminModules/AdminTab6";
import CreatePayroll from "../../modules/AdminModules/CreatePayroll";
import EditPayroll from "../../modules/AdminModules/EditPayroll";
import DisplayPayroll from "../../modules/AdminModules/DisplayPayroll";

export default class PayrollPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={AdminTab6}></Route>
          <Route path="/addpayroll" exact component={CreatePayroll}></Route>
          <Route
            path="/displaypayroll/:id"
            exact
            component={DisplayPayroll}
          ></Route>
          <Route path="/editpayroll/:id" exact component={EditPayroll}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
