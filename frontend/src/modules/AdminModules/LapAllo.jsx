import React, { Component } from "react";
import axios from "axios";
import "./LapAllo.css";

const LapAllo = () => {
  return (
    <div className="container">
      <div class="main2">
        <h2 class="head1">Laptop Allocation</h2>
        <hr class="line1"></hr>
        <a href="/allassignments">
          <button class="div11">
            <p class="txt11">Assignments</p>
          </button>
        </a>
        <a href="/laptopallocation">
          <button class="div22">
            <p class="txt22">Allocate Laptops</p>
          </button>
        </a>
        <div class="div3">
          <p class="txt3">Filter by</p>
          <input class="select121" type="text" />
          <a className="btn btn-info search121">
            <i className="fas fa-search"></i>&nbsp;Search
          </a>
        </div>
        <h2 class="tah121">Total Laptop Allocations</h2>
        <table className="table table-hover table121">
          <thead class="thead121">
            <tr>
              <th scope="col">Assignment Name</th>
              <th scope="col">Staff ID</th>
              <th scope="col">Laptop ID</th>
              <th scope="col">Allocated Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <a href={`/allocation`} style={{ textDecoration: "none" }}>
                  abds
                </a>
              </td>
            </tr>
            <tr>
              <td>abds</td>
            </tr>
          </tbody>
          <tfoot class="tfoot121">
            <a href="/createlapallocation">
              <i class="fas fa-plus"></i>&nbsp;New Allocation
            </a>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LapAllo;
