import React, { Component } from "react";
import axios from "axios";
import "./Review.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

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
      dob: "",
      executive: []
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "exeno") {
      if (value.match("^[A-Z]{1}[0-9]{1,4}$")) {
        document.getElementById("errorMessageExID").innerHTML = "";
      } else {
        document.getElementById("errorMessageExID").innerHTML =
          "Please Enter correct type of Executive ID (like E1245)";
      }
    }

    if (name === "name") {
      if (value.match("^[a-zA-Z][a-zA-Z\\s]+$")) {
        document.getElementById("errorMessageName").innerHTML = "";
      } else {
        document.getElementById("errorMessageName").innerHTML =
          "Please Enter correct type of Executive ID (like Nisal Palliyaguru)";
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

    if (name === "contact") {
      if (value.match("^[0-9]{10}$")) {
        document.getElementById("errorMessageContact").innerHTML = "";
      } else {
        document.getElementById("errorMessageContact").innerHTML =
          "Please Enter correct contact number (like 0711111111 )";
      }
    }

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

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get(`http://localhost:5000/checkexeno`).then(res => {
      if (res.data.success) {
        this.setState({
          executive: res.data.exeno
        });
        if (res.data.exeno.length == 0) {
          console.log(res.data.exeno.length);

          this.state.exeno = 2000;
        } else {
          var no = this.state.executive[0].exeno;
          this.state.exeno = no + 1;
          console.log(this.state.exeno);
        }
      }
    });
  }

  DetailsSave = () => {
    toast.success("Details Saved Successfully");
  };

  errorMessageAlert = message => {
    toast.error(message);
  };

  onSubmit = async e => {
    e.preventDefault();
    await axios.get(`http://localhost:5000/checkexeno`).then(res => {
      if (res.data.success) {
        this.setState({
          executive: res.data.exeno
        });
        var no = this.state.executive[0].exeno;
        this.state.exeno = no + 1;
        console.log(this.state.exeno);
      }
    });

    const { exeno, name, email, contact, position, gender, dob } = this.state;

    if (
      name === "" &&
      email === "" &&
      contact === "" &&
      position === "" &&
      gender === "" &&
      dob === ""
    ) {
      this.errorMessageAlert(
        "You can't save anything without entering details"
      );
    } else if (name === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageName").innerHTML =
        "Enter Correct Name";
    } else if (email === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageEmail").innerHTML =
        "Enter Correct Email";
    } else if (contact === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageContact").innerHTML =
        "Enter Correct Contact Number";
      //} //else if (position === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      //document.getElementById("errorMessage").innerHTML = "hello";
      //} //else if (gender === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      // document.getElementById("errorMessage").innerHTML = "hello";
      //} else if (dob === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      //  document.getElementById("errorMessage").innerHTML = "hello";
    } else {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
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
          this.DetailsSave("Details Saved Successfully");
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
    }
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
              type="number"
              id="valid1"
              className="form-control"
              name="exeno"
              value={this.state.exeno}
              onChange={this.handleInputChange}
              required
              disabled
            />
            <span id="errorMessageExID" style={{ color: "red" }}></span>
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
            <span id="errorMessageName" style={{ color: "red" }}></span>
          </div>

          <div className="orm-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Position</label>
            <select
              defaultValue={"Manager"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="Manager" disabled>
                Manager
              </option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Partner">Partner</option>
              <option value="Other">Other</option>
            </select>
            <span id="errorMessageName" style={{ color: "red" }}></span>
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
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <span id="errorMessageEmail" style={{ color: "red" }}></span>
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
                <span id="errorMessageContact" style={{ color: "red" }}></span>
              </div>
              <label style={{ marginBottom: "5px" }}>Gender</label>
              <select
                defaultValue={"Male"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="gender"
                required
              >
                <option value="Male" disabled>
                  Male
                </option>
                <option name="male">Male</option>
                <option name="female">Female</option>
              </select>
              <span id="errorMessageName" style={{ color: "red" }}></span>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            ></div>
          </div>
          <div>
            {/* <label style={{ marginBottom: "5px" }}>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Enter Date of Birth"
              value={this.state.dob}
              onChange={this.handleInputChange}
              required
            /> */}
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Date of Birth"
              name="dob"
              onChange={this.handleInputChange}
              max={moment().format("YYYY-MM-DD")}
            />

            <span id="errorMessageName" style={{ color: "red" }}></span>
          </div>

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
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={"dark"}
              type="success"
            />
            <button className="btn btn-danger" type="cancel">
              <a href="/profilepage" style={{ textDecoration: "none" }}>
                Cancel
              </a>
            </button>
          </div>
          <div />
        </form>

        <br />
      </div>
    );
  }
}
