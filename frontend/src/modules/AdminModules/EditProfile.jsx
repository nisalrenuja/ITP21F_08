import React, { Component } from "react";
import axios from "axios";

export default class EditExecutive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: ""
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
    const { username, email } = this.state;
    const data = {
      username: username,

      email: email
    };
    console.log(data);
    axios
      .put(`http://localhost:5000/executives/update/${id}`, data)
      .then(res => {
        if (res.data.success) {
          alert("User Updated Successfully");
          this.setState({
            username: "",

            email: ""
          });
        }
      });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/executives/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          username: res.data.executives.username,

          email: res.data.executives.email
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
              name="username"
              placeholder="Edit Review Id"
              value={this.state.username}
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

          <button
            className="btn btn-info mb-2"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fas fa-sync"></i>&nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}
