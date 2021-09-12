import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminTab1 from "../../modules/AdminModules/AdminTab1";
import CreateReview from "../../modules/AdminModules/CreateReview";
import EditReview from "../../modules/AdminModules/EditReview";
import DisplayReview from "../../modules/AdminModules/DisplayReview";
import CreateClient from "../../modules/AdminModules/CreateClient";

export default class ReviewPage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={AdminTab1}></Route>
          <Route path="/add" exact component={CreateReview}></Route>
          <Route path="/edit/:id" exact component={EditReview}></Route>
          <Route path="/post/:id" exact component={DisplayReview}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
