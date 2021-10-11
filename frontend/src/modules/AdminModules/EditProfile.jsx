import React, { Component } from "react";
import axios from "axios";
//import { storage } from "../../firebase";
//import Progress from "../../component/common/ProgressBar/progress";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//import moment from "moment";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exeno: "",
      name: "",
      position: "",
      email: "",
      contact: "",
      gender: "",
      dob: ""
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

  DetailsUpdate = () => {
    toast.success("Details Updated Successfully");
  };

  errorMessageAlert = message => {
    toast.error(message);
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const { exeno, name, position, email, contact, gender, dob } = this.state;

    if (
      exeno === "" &&
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
    } else if (exeno === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageExID").innerHTML =
        "Enter Correct Executive ID";
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

        position: position,
        email: email,
        contact: contact,

        gender: gender,
        dob: dob
      };

      console.log(data);
      axios
        .put(`http://localhost:5000/executive/update/${id}`, data)
        .then(res => {
          if (res.data.success) {
            this.DetailsUpdate("Details Updated Successfully");
            this.setState({
              exeno: "",
              name: "",
              position: "",
              email: "",
              contact: "",

              gender: "",
              dob: ""
            });
          }
        });
      this.props.history.push("/profilepage");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/executive/${id}`).then(res => {
      if (res.data.success) {
        console.log(res.data.executive.exeno);

        this.setState({
          exeno: res.data.executive.exeno,
          name: res.data.executive.name,
          position: res.data.executive.position,
          email: res.data.executive.email,
          contact: res.data.executive.contact,

          gender: res.data.executive.gender,
          dob: res.data.executive.dob
        });
        console.log(this.state.executive);
      }
    });
  }
  /*
  uploadPDF(e) {
    if (e.target.files[0] !== null) {
      const uploadTask = storage
        .ref(`users/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ uploadPercentage: progress });
        },
        error => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("users")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then(url => {
              this.setState({ reportPDF: url });
              console.log("Hello " + url);
            });
        }
      );
    } else {
    }
  }
  */
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
              required
              id="valid1"
              className="form-control"
              name="exeno"
              value={this.state.exeno}
              onChange={this.handleInputChange}
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
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="DEFAULT" disabled>
                {this.state.position}
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
                  type="text"
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
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="gender"
                required
              >
                <option value="DEFAULT" disabled>
                  {this.state.gender}
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

          <label style={{ marginBottom: "5px" }}>Date of Birth</label>
          {/* <input
            type="date"
            className="form-control"
            name="dob"
            id="date"
            placeholder="DD/MM/YY"
            value={this.state.dob}
            onChange={this.handleInputChange}
            required
          /> */}
          <input
            type="date"
            id="date"
            className="form-control"
            name="dob"
            placeholder="DD/MM/YY"
            value={this.state.dob}
            onChange={this.handleInputChange}
          />

          <span id="errorMessageName" style={{ color: "red" }}></span>
          <br />

          <div class="d-flex justify-content-center">
            <button
              className="btn btn-warning"
              type="submit"
              style={{ marginTop: "15px" }}
              onClick={this.onSubmit}
            >
              <i className="fa fa-refresh"></i>&nbsp;Update
            </button>{" "}
            &nbsp;&nbsp;
            <ToastContainer />
            <button
              className="btn btn-danger"
              type="cancel"
              style={{ marginTop: "15px" }}
            >
              Cancel
            </button>
          </div>
        </form>

        <br />
      </div>
    );
  }
}
