import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab8 from "../../modules/AdminModules/AdminTab8";
import CreateClient from "../../modules/AdminModules/CreateClient";
import EditClient from "../../modules/AdminModules/EditClient";
import DisplayClient from "../../modules/AdminModules/DisplayClient";

export default class ClientsRoutesPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={AdminTab8}></Route>
          <Route path="/addclient" exact component={CreateClient}></Route>
          <Route
            path="/displayclient/:id"
            exact
            component={DisplayClient}
          ></Route>
          <Route path="/editclient/:id" exact component={EditClient}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
