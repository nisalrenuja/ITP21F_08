import React, { Component } from "react";
import axios from "axios";
import "./CreateLaptop.css";
//createLaptop
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
      status: "",
      discarded_reason: "",
      discarded_date: "",
      update_partner_id: ""
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
      status,
      discarded_reason,
      discarded_date,
      update_partner_id
    } = this.state;
    const data = {
      id: id,
      brand: brand,
      model: model,
      storage_type: storage_type,
      purchaase_date: purchaase_date,
      purchase_price: purchase_price,
      status: status,
      discarded_reason: discarded_reason,
      discarded_date: discarded_date,
      update_partner_id: update_partner_id
    };
    console.log(data);
    axios.post("http://localhost:5000/createlaptop/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          id: id,
          brand: brand,
          model: model,
          storage_type: storage_type,
          purchaase_date: purchaase_date,
          purchase_price: purchase_price,
          status: status,
          discarded_reason: discarded_reason,
          discarded_date: discarded_date,
          update_partner_id: update_partner_id
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Inventory Management</h1>
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
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label
              for="selectFormControl"
              style={{ marginBottom: "5px" }}
              data-toggle="dropdown"
            >
              Storage Size &nbsp;{" "}
            </label>
            <select
              class="form-control"
              id="selections"
              defaultValue={this.state.storage_type}
              onChange={this.handleInputChang}
            >
              <option value="16gb"> 16GB</option>
              <option value="32gb"> 32GB</option>
              <option value="64gb"> 64GB</option>
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
          <h2>Laptop Assign Details</h2>
          <hr></hr>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label
              for="selectFormControl"
              style={{ marginBottom: "5px" }}
              data-toggle="dropdown"
            >
              Status &nbsp;{" "}
            </label>
            <select
              class="form-control"
              id="selections"
              defaultValue={this.state.status}
              onChange={this.handleInputChange}
            >
              <option value="Assign"> Assign</option>
              <option value="Not Assign"> Not Assign</option>
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
      </div>
    );
  }
}
