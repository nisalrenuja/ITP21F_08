import React, { Component } from "react";
import axios from "axios";
import "./CreateLaptop.css";
//createLaptopRepair
export default class CreateLaptopRepair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      repair_reason: "",
      repair_cost: "",
      reapir_date: ""
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/laptop_reapir/repair").then(res => {
      if (res.data.success) {
        this.setState({
          LaptopsRepair: res.data.existingLaptopsRepair
        });
        console.log(this.state.LaptopsRepair);
      }
    });
  }

  handleInputchange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onCheck = id => {
    console.log(id);
    axios.get(`http://localhost:5000/checkLaptoprepair/${id}`).then(res => {
      if (res.data.success) {
        alert();
      }
    });
  };
  onSubmit = e => {
    e.preventdefault();

    const { id, repair_reason, repair_cost, reapir_date } = this.state;

    const data = {
      id: id,
      repair_reason: repair_reason,
      repair_cost: repair_cost,
      reapir_date: reapir_date
    };

    console.log(data);
    axios.post("http://localhost:5000/laptop_repair/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          id: "",
          repair_reason: "",
          repair_cost: "",
          reapir_date: ""
        });
        alert("Successfull!");
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
          Inventory Management | Laptop Repairing
        </h1>
        <hr></hr>
        <form
          className="need-validation"
          noValidate
          style={{
            backgroundColor: "#F6F5F5",
            border: "5px solid eastern blue",
            padding: "30px",
            borderRadius: "15px"
          }}
        >
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <h2>Laptop Details</h2>
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
            <label style={{ marginBottom: "5px" }}>Reapir</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              placeholder="Enter Brand"
              value={this.state.repair_reason}
              onChange={this.handleInputchange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair Price</label>
            <input
              type="text"
              className="form-control"
              name="purchase_price"
              placeholder="Enter Laptop Repair Price"
              value={this.state.repair_cost}
              onChange={this.handleInputchange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repairing Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="purchaase_date"
              placeholder="DD/MM/YY"
              value={this.state.reapir_date}
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
      </div>
    );
  }
}
