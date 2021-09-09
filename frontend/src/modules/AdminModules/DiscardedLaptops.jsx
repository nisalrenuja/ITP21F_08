import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

const DiscardedLaptop = () => {
  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Inventory Management</h1>
      <hr></hr>

      <div class="searchFilter">
        <p class="txt"> Filter by</p>
        <input class="select" type="text" />
        <a className="btn btn-info search">
          <i className="fas fa-search"></i>&nbsp;Search
        </a>
      </div>

      <table className="table table-hover table1">
        <thead className="thead">
          <tr>
            <th scope="col">Laptop ID</th>
            <th scope="col">Laptop Brand</th>
            <th scope="col">Discarded Reason</th>
            <th scope="col">Discarded Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              <a href={`./laptop`} style={{ textDecoration: "none" }}></a>
            </td>
          </tr>
        </tbody>
        <tfoot class="tfoot"></tfoot>
      </table>
    </div>
  );
};

export default DiscardedLaptop;
