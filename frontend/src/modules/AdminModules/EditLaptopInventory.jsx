import React, { Component } from "react";
import "./CreateLaptop.css";
import axios from "axios";

//set id validation
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

export default class EditLaptopInventory extends Component {
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
    let statusS = { ...this.state.statusS };

    switch (name) {
      case "brand":
        formErrors.brand =
          value.length <= 0 ? "**Laptop Brand Cannot Be Empty**" : "";
        break;
      case "model":
        formErrors.model =
          value.length < 4 ? "**Minimum 4 characaters required**" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  onSubmit = e => {
    e.preventDefault();
    const _id = this.props.match.params.id;
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
      axios
        .put(`http://localhost:5000/laptop/update/${_id}`, data)
        .then(res => {
          if (res.data.success) {
            alert("Laptop Update Successfully!");
            this.setState({
              id: "",
              brand: "",
              model: "",
              storage_type: "",
              purchaase_date: "",
              purchase_price: "",
              status: "",
              discarded_reason: "",
              discarded_date: ""
            });
            this.props.history.push("/admin");
          }
        });
    }
  };

  componentDidMount() {
    {
      const id = this.props.match.params.id;
      axios.get(`http://localhost:5000/laptop/${id}`).then(res => {
        if (res.data.success) {
          this.setState({
            id: res.data.laptop.id,
            brand: res.data.laptop.brand,
            model: res.data.laptop.model,
            storage_type: res.data.laptop.storage_type,
            purchaase_date: res.data.laptop.purchaase_date,
            purchase_price: res.data.laptop.purchase_price,
            status: res.data.laptop.status,
            discarded_reason: res.data.laptop.discarded_reason,
            discarded_date: res.data.laptop.discarded_date
          });
        }
      });
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="col-md-6 mt-4 mx-auto">
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
              disabled
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
            {formErrors.brand.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.brand}</span>
            )}
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
            {formErrors.model.length > 0 && (
              <span style={{ color: "red" }}>{formErrors.model}</span>
            )}
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
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Laptop Price</label>

            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  Rs
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                name="purchase_price"
                placeholder="Enter Laptop Price"
                value={this.state.purchase_price}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <h5>Laptop Availabilty Details</h5>
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
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Discarded">Discarded</option>
            </select>
          </div>
          <h5>If laptop discarded :</h5>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Discarded Reason</label>
            <input
              type="text"
              id="discarded_reason"
              className="form-control"
              name="discarded_reason"
              placeholder="Enter Discarded Reason"
              value={this.state.discarded_reason}
              onChange={this.handleInputChange}
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
            Update & Save
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
