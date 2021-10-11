import React, { Component } from "react";
import axios from "axios";
import "./CreateLaptop.css";

export default class EditLaptopRepair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      repair_reason: "",
      repair_cost: "",
      repair_date: ""
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
    e.preventDefault();
    const _id = this.props.match.params.id;
    const { id, repair_reason, repair_cost, repair_date } = this.state;
    const data = {
      id: id,
      repair_reason: repair_reason,
      repair_cost: repair_cost,
      repair_date: repair_date
    };
    console.log(data);
    axios
      .put(`http://localhost:5000/laptop_repair/update/${_id}`, data)
      .then(res => {
        if (res.data.success) {
          alert("Update successfully!");
          this.setState({
            id: "",
            repair_reason: "",
            repair_cost: "",
            repair_date: ""
          });
          this.props.history.push("/repairinglaptop");
        }
      });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/laptop_repair/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          id: res.data.laptopRepair.id,
          repair_reason: res.data.laptopRepair.repair_reason,
          repair_cost: res.data.laptopRepair.repair_cost,
          repair_date: res.data.laptopRepair.repair_date
        });
      }
    });
  }

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
              disabled
              className="form-control"
              name="id"
              placeholder="Enter Laptop ID"
              value={this.state.id}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair Reason</label>
            <input
              type="text"
              className="form-control"
              name="repair_reason"
              placeholder="Enter Repair Reason"
              value={this.state.repair_reason}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repair Price</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  Rs
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                name="repair_cost"
                placeholder="Enter Laptop Repair Price"
                value={this.state.repair_cost}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repairing Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="repair_date"
              placeholder="DD/MM/YY"
              value={this.state.repair_date}
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
