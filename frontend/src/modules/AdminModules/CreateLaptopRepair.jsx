import React, { Component } from "react";
import axios from "axios";
import "./CreateLaptop.css";
//createlaptop inventory

export default class CreateLaptopRepair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      repair_reason: "",
      repair_date: "",
      repair_cost: ""
    };
  }

  handleInputchange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { id, repair_reason, repair_date, repair_cost } = this.state;
    const data = {
      id: id,
      repair_reason: repair_reason,
      repair_date: repair_date,
      repair_cost: repair_cost
    };
    console.log(data);
    axios.post("http://localhost:5000/laptop_repair/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          id: id,
          repair_reason: repair_reason,
          repair_date: repair_cost,
          repair_cost: repair_cost
        });
        alert("Save Successful!");
      }
    });
  };

  render() {
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
          Inventory Management | Laptop Repairing
        </h1>

        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <h5>Laptop Details</h5>
            <hr></hr>
            <label style={{ marginBottom: "5px" }}>Laptop ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              placeholder="Enter Laptop ID"
              value={this.state.id}
              onChange={this.handleInputchange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair</label>
            <input
              type="text"
              className="form-control"
              name="repair_reason"
              placeholder="Enter Repair Reason"
              value={this.state.repair_reason}
              onChange={this.handleInputchange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="repair_date"
              placeholder="DD/MM/YY"
              value={this.state.repair_date}
              onChange={this.handleInputchange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair Price</label>
            <input
              type="text"
              className="form-control"
              name="repair_cost"
              placeholder="Enter Laptop Repair Price"
              value={this.state.repair_cost}
              onChange={this.handleInputchange}
            />
          </div>
          <button
            className="btn btn-info"
            type="submit"
            style={{ backgroundColor: "#1687A7" }}
            onClick={this.onSubmit}
          >
            Save
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            type="Cancel"
            onClick={this.onSubmit}
          >
            Cancel
          </button>
        </form>
        <div class="back">
          <a href="/repairinglaptop">
            <i class="fas fa-angle-double-left fa-2x">
              &nbsp;Back To The Laptop Repair Inventory Details
            </i>
          </a>
        </div>
      </div>
    );
  }
}
//laptops
