import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab7 from "../../modules/AdminModules/AdminTab7";
import CreateLaptop from "../../modules/AdminModules/CreateLaptop";
import EditLaptopInventory from "../../modules/AdminModules/EditLaptopInventory";
import PostLaptop from "../../modules/AdminModules/PostLaptop";
//laptops
export default class LaptopPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-laptop">
          <Route path="/" exact component={AdminTab7}></Route>
          <Route path="/createlaptop" component={CreateLaptop} exact />
          <Route
            exact
            path="/editlaptop/:id"
            component={EditLaptopInventory}
          ></Route>
          <Route exact path="/viewlaptop/:id" component={PostLaptop}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
