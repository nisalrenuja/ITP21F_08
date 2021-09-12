import React, { Component } from "react";
import axios from "axios";
import "./Review.css";

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exeno: "",
      name: "",
      email: "",
      contact: "",
      position: "",
      gender: "",
      dob: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  /*
    handleInputFileChange = e => {
        var file = e.target.files[0];
        console.log(file);
    };
    */

  onSubmit = e => {
    e.preventDefault();

    const { exeno, name, email, contact, position, gender, dob } = this.state;

    const data = {
      exeno: exeno,
      name: name,
      email: email,
      contact: contact,
      position: position,
      gender: gender,
      dob: dob
    };

    console.log(data);

    axios.post("http://localhost:5000/executive/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          exeno: "",
          name: "",
          email: "",
          contact: "",
          position: "",
          gender: "",
          dob: ""
        });
      }
    });
    this.props.history.push("/profilepage");
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <br />

        <h1>User Executive Management | Add Executive Details</h1>
        <br />
        <br />

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
          <h2>Executive Details</h2>
          <hr></hr>

          <div className="form-group col-sm-4" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={{ marginBottom: "5px" }}
            >
              Executive ID
            </label>
            <input
              type="text"
              id="valid1"
              className="form-control"
              name="exeno"
              value={this.state.exeno}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group " style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter full name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="orm-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Position</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="DEFAULT" disabled>
                Select executive's position
              </option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Partner">Partner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <br />

          <h2>Personal Details</h2>
          <hr></hr>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group " style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group " style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  placeholder="Enter Contact Number"
                  value={this.state.contact}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label style={{ marginBottom: "5px" }}>Gender</label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="gender"
                required
              >
                <option value="DEFAULT" disabled>
                  Select Gender
                </option>
                <option name="male">Male</option>
                <option name="female">Female</option>
              </select>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            ></div>
          </div>

          <label style={{ marginBottom: "5px" }}>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            placeholder="Enter Date of Birth"
            value={this.state.dob}
            onChange={this.handleInputChange}
            required
          />
          <br />

          <div class="d-flex justify-content-center">
            <button
              className="btn btn-info"
              type="submit"
              style={{ backgroundColor: "#1687A7" }}
              onClick={this.onSubmit}
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>{" "}
            &nbsp;&nbsp;
            <button className="btn btn-danger" type="cancel">
              Cancel
            </button>
          </div>
          <div />
        </form>

        <br />
      </div>
    );
  }
}
