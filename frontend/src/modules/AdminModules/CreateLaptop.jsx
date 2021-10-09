import React, { Component, useState } from "react";
import axios from "axios";
import "./CreateLaptop.css";
//create laptop inventory

//set id validation
const idRegex = RegExp(/^[A-Z]+[0-9]*$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

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
      formErrors: {
        id: "",
        brand: "",
        model: "",
        status: "",
        discarded_reason: "",
        discarded_date: ""
      }
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    //validation checking
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "id":
        formErrors.id = idRegex.test(value)
          ? ""
          : "**Please Use Only Correct Way [Eg: LP1090]**";

        break;
      case "brand":
        formErrors.brand =
          value.length <= 0 ? "**Laptop Brand Cannot Be Empty**" : "";
        break;
      case "model":
        formErrors.model =
          value.length < 4 ? "**Minimum 4 characaters required**" : "";
        break;
      case "status":
        if (
          this.state.status == "Available" ||
          this.state.status == "Occupied"
        ) {
          document.getElementById("discarded_date").disabled = false;
          document.getElementById("discarded_reason").disabled = false;
        } else {
          document.getElementById("discarded_reason").disabled = true;
          document.getElementById("discarded_date").disabled = true;
        }
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit = e => {
    //(e)  method invoke
    e.preventDefault();

    if (formValid(this.state)) {
      const {
        id,
        brand,
        model,
        storage_type,
        purchaase_date,
        purchase_price,
        status,
        discarded_reason,
        discarded_date
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
        discarded_date: discarded_date
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
            status: status,
            discarded_reason: discarded_reason,
            discarded_date: discarded_date
          });
          alert("Save Successful!");
          this.props.history.push("/admin");
        }
      });
      console.log("Submitting");
    } else {
      console.error("Form invalid");
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <h1>Inventory Management</h1>

        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <h5>Laptop Details</h5>
            <hr />

            <label style={{ marginBottom: "5px" }}>Laptop ID</label>
            <input
              ref="id"
              type="text"
              required
              className="form-control"
              name="id"
              placeholder="Enter Laptop ID"
              value={this.state.id}
              onChange={this.handleInputChange}
            />
            {formErrors.id.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.id}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Brand</label>
            <input
              ref="brand"
              type="text"
              required
              className="form-control"
              name="brand"
              placeholder="Enter Brand"
              value={this.state.brand}
              onChange={this.handleInputChange}
            />
            {formErrors.brand.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.brand}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Model</label>
            <input
              ref="model"
              required
              type="text"
              className="form-control"
              name="model"
              placeholder="Enter Model"
              value={this.state.model}
              onChange={this.handleInputChange}
            />
            {formErrors.model.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.model}</span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Storage Size</label>
            <select
              ref="storage_type"
              defaultValue={"DEFAULT"}
              className="form-control"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="storage_type"
              type="select"
              noValidate
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
              ref="purchase_price"
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
              ref="date"
              type="date"
              id="date"
              className="form-control"
              name="purchaase_date"
              placeholder="DD/MM/YY"
              value={this.state.purchaase_date}
              onChange={this.handleInputChange}
            />
          </div>
          <h5>Laptop Availability Details</h5>
          <hr></hr>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-control"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="status"
            >
              <option value="DEFAULT" disabled>
                Status : {this.state.status}
              </option>
              <option status="Available">Available</option>
              <option status="Occupied">Occupied</option>
              <option status="Discarded">Discarded</option>
            </select>
          </div>
          <h5>If laptop discarded :</h5>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Discarded Reason</label>
            <input
              onChange={this.handleInputChange}
              id="discarded_reason"
              type="text"
              className="form-control"
              name="discarded_reason"
              placeholder="Enter Discarded Reason"
              value={this.state.discarded_reason}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Discarded Date</label>
            <input
              type="date"
              id="discarded_date"
              className="form-control"
              name="discarded_date"
              placeholder="DD/MM/YY"
              value={this.state.discarded_date}
              onChange={this.handleInputChange}
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
