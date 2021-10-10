import React, { Component } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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
    if (name === "username") {
      if (value.match("^[a-zA-Z][a-zA-Z\\s]+$")) {
        document.getElementById("errorMessageName").innerHTML = "";
      } else {
        document.getElementById("errorMessageName").innerHTML =
          "Please Enter correct Username";
      }
    }

    if (name === "email") {
      console.log("Email");
      console.log(value);
      if (value.match("[a-z0-9.]{1,}[@]{1}[a-z]{1,}[.]{1}(com)$")) {
        document.getElementById("errorMessageEmail").innerHTML = "";
      } else {
        document.getElementById("errorMessageEmail").innerHTML =
          "example@gmail.com";
      }
    }

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  UserUpdate = () => {
    toast.success("User Updated Successfully");
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { username, email } = this.state;

    if (username === "" && email === "") {
      this.errorMessageAlert(
        "You can't save anything without entering details"
      );
    } else if (username === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageName").innerHTML =
        "Enter Correct Username";
    } else if (email === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageEmail").innerHTML =
        "Enter Correct Email";
    } else {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
    }

    const data = {
      username: username,

      email: email
    };
    console.log(data);
    axios
      .put(`http://localhost:5000/executives/update/${id}`, data)
      .then(res => {
        if (res.data.success) {
          this.UserUpdate("Details Updated Successfully");
          this.setState({
            username: "",

            email: ""
          });
        }
        this.props.history.push("/createexecutive");
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
        <h1 className="h3 mb-3 font-weight-normal">Edit Current User</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Edit Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <span id="errorMessageName" style={{ color: "red" }}></span>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Edit Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <span id="errorMessageEmail" style={{ color: "red" }}></span>
          </div>

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
        </form>
      </div>
    );
  }
}
