import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";

const NewLapAllo = () => {
  return (
    <div className="container">
      <div class="main3">
        <h1 class="head1c">Laptop Allocation|Create Laptop Allocation</h1>
        <hr class="line1c"></hr>
        <div class="main33">
          <p class="ic">Assignment Name: </p>
          <input type="text" class="icc"></input>
          <p class="iic">Staff ID: </p>
          <input type="text" class="iicc"></input>
          <p class="iiic">Exec ID: </p>
          <input type="text" class="iiicc"></input>
          <p class="ivc">Client No: </p>
          <input type="text" class="ivcc"></input>
          <p class="vc">Date Allocated: </p>
          <input type="date" class="vcc"></input>
        </div>
      </div>
    </div>
  );
};

export default NewLapAllo;
