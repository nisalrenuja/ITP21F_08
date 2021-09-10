import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab6 from "../../modules/AdminModules/AdminTab6";
import CreatePayroll from "../../modules/AdminModules/CreatePayroll";
//import EditReview from "../../modules/AdminModules/EditReview";
//import DisplayReview from "../../modules/AdminModules/DisplayReview";

export default class PayrollPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={AdminTab6}></Route>
          <Route path="/addpayroll" exact component={CreatePayroll}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
