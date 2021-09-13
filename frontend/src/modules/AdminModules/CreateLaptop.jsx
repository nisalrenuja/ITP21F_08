import React, { Component } from "react";
import axios from "axios";
import "./CreateLaptop.css";
//create laptop inventory
export default class CreateLaptop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      brand: "",
      model: "",
      storage_type: "",
      purchaase_date: "",
      purchase_price: "",
      status: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    //(e) --> method invoke
    e.preventDefault();

    const {
      id,
      brand,
      model,
      storage_type,
      purchaase_date,
      purchase_price,
      status
    } = this.state;
    const data = {
      id: id,
      brand: brand,
      model: model,
      storage_type: storage_type,
      purchaase_date: purchaase_date,
      purchase_price: purchase_price,
      status: status
    };
    console.log(data);
    axios.post("http://localhost:5000/laptop/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          id: id,
          brand: brand,
          model: model,
          storage_type: storage_type,
          purchaase_date: purchaase_date,
          purchase_price: purchase_price,
          status: status
        });
        alert("Save Successful!");
      }
    });
  };

  render() {
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <h1>Inventory Management</h1>

        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <h5>Laptop Details</h5>
            <hr />

            <label style={{ marginBottom: "5px" }}>Laptop ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              placeholder="Enter Laptop ID"
              value={this.state.id}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              placeholder="Enter Brand"
              value={this.state.brand}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Model</label>
            <input
              type="text"
              className="form-control"
              name="model"
              placeholder="Enter Model"
              value={this.state.model}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Storage Size</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="storage_type"
            >
              <option value="DEFAULT" disabled>
                Storage Type : {this.state.storage_type}
              </option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Laptop Price</label>
            <input
              type="text"
              className="form-control"
              name="purchase_price"
              placeholder="Enter Laptop Price"
              value={this.state.purchase_price}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Purchase Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="purchaase_date"
              placeholder="DD/MM/YY"
              value={this.state.purchaase_date}
              onChange={this.handleInputChange}
            />
          </div>
          <h5>Laptop Assign Details</h5>
          <hr></hr>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="status"
            >
              <option value="DEFAULT" disabled>
                Status : {this.state.status}
              </option>
              <option value="Assign">Assign</option>
              <option value="Not Assign">Not Assign</option>
            </select>
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
          <a href="/admin">
            <i class="fas fa-angle-double-left fa-2x">
              &nbsp;Back To The Laptop Inventory Details
            </i>
          </a>
        </div>
      </div>
    );
  }
}
//laptopss
