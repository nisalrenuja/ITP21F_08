import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab6 from "../../modules/AdminModules/AdminTab6";
import CreateLeave from "../../modules/AdminModules/CreateLeave";
import EditLeave from "../../modules/AdminModules/EditLeave";
import DisplayLeave from "../../modules/AdminModules/DisplayLeave";

export default class LeavesPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/leaveshome" exact component={AdminTab6}></Route>
          <Route path="/addleave" exact component={CreateLeave}></Route>
          <Route
            path="/editleave/:leave_id"
            exact
            component={EditLeave}
          ></Route>
          <Route
            path="/postleave/:leave_id"
            exact
            component={DisplayLeave}
          ></Route>
        </div>
      </BrowserRouter>
    );
  }
}
