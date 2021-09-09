import React, { Component } from "react";
import axios from "axios";
export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exeno: "",
      name: "",
      email: "",
      contact: "",
      dob: "",
      gender: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  onSubmit = e => {
    e.preventDefault();

    const { exeno, name, email, contact, dob, gender } = this.state;
    const data = {
      exeno: exeno,
      name: name,
      email: email,
      contact: contact,
      dob: dob,
      gender: gender
    };
    console.log(data);
    axios.post("http://localhost:5000/executives/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          exeno: "",
          name: "",
          email: "",
          contact: "",
          dob: "",
          gender: ""
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create New Review</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Topic</label>
            <input
              type="text"
              className="form-control"
              name="exeno"
              placeholder="Enter Executive Id"
              value={this.state.exeno}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Report Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Report Name"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Enter Report Name"
              value={this.state.contact}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ marginBottom: "5px" }}>Repairing Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              name="dob"
              placeholder="DD/MM/YY"
              value={this.state.dob}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Feedback</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              placeholder="Enter Feedback"
              value={this.state.gender}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fa fa-check-square"></i>&nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
