import React, { Component } from "react";
import axios from "axios";

export default class EditExecutive extends Component {
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

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
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
    axios
      .put(`http://localhost:5000/executives/update/${id}`, data)
      .then(res => {
        if (res.data.success) {
          alert("Post Updated Successfully");
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

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/executives/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          exeno: res.data.executives.exeno,
          name: res.data.executives.name,
          email: res.data.executives.email,
          contact: res.data.executives.contact,
          dob: res.data.executives.dob,
          gender: res.data.executives.gender
        });
      }
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit Review</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Review Id</label>
            <input
              type="text"
              className="form-control"
              name="exeno"
              placeholder="Edit Review Id"
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
              placeholder="Edit Report Name"
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
              placeholder="Edit Report Name"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Feedback</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Edit Feedback"
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
              placeholder="Edit Feedback"
              value={this.state.gender}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            className="btn btn-success mb-2"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fa fa-check-square"></i>&nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}
