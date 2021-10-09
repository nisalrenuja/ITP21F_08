import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllPayrolls.css";

export default class CreateAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empno: "",
      att_date: "",
      att_type: "",
      location_type: "",
      location: "",
      time_in: "",
      time_out: "",
      assignment_name: ""
    };
  }

  demo = e => {
    e.preventDefault();
    this.setState({
      empno: "1008",
      att_date: "2021-10-13",
      att_type: "Present",
      location_type: "Assignment Location",
      location: "Helix Pvt.Ltd",
      time_in: "07:10",
      time_out: "13:30",
      assignment_name: "Assignment7"
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  validate = () => {
    let empnoError = "";
    let att_dateError = "";
    let att_typeError = "";
    let location_typeError = "";
    let locationError = "";
    let time_inError = "";
    let time_outError = "";
    let assignment_nameError = "";

    if (!this.state.empno) {
      empnoError = "Employee no. required";
    }
    if (!this.state.att_date) {
      att_dateError = "Date required";
    }
    if (!this.state.location_type) {
      location_typeError = "Location type required";
    }

    if (!this.state.att_type) {
      att_typeError = "Attendance type required";
    }

    if (
      empnoError ||
      att_dateError ||
      att_typeError ||
      location_typeError ||
      locationError ||
      time_inError ||
      time_outError ||
      assignment_nameError
    ) {
      this.setState({
        empnoError,
        att_dateError,
        att_typeError,
        location_typeError,
        locationError,
        time_inError,
        time_outError,
        assignment_nameError
      });
      toast.warn("Invalid Form. Please Check Again!!!");
      return false;
    }
    return true;
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      empno,
      att_date,
      att_type,
      location_type,
      location,
      time_in,
      time_out,
      assignment_name
    } = this.state;

    const data = {
      empno: empno,
      att_date: att_date,
      att_type: att_type,
      location_type: location_type,
      location: location,
      time_in: time_in,
      time_out: time_out,
      assignment_name: assignment_name
    };

    console.log(data);
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.empno);
      console.log(data);

      axios.post("http://localhost:5000/attendance/save", data).then(res => {
        if (res.data.success) {
          this.setState({
            empno: "",
            att_date: "",
            att_type: "",
            location_type: "",
            location: "",
            time_in: "",
            time_out: "",
            assignment_name: ""
          });
          toast.success("Mark attendance Successfully!");
          //alert("Mark attendance Successfully!");
          //this.props.history.push("/allattendance");
        } else {
          toast.error("Mark attendance Unsuccessfull!");
          //alert("Mark attendance Unsuccessfull!");
        }
      });

      //alert("Mark attendance Successfully!");
      //this.props.history.push("/allattendance"); //==admin
    }
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/allattendance" />;
    }

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Attendance Management | Mark Attendance : Admin</h1>
        <br />
        <br />
        <button
          type="button"
          class="btn btn-warning"
          onClick={this.demo}
          style={{
            marginTop: "0px",
            marginBottom: "30px",
            borderRadius: "40px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"
          }}
        >
          Demo
        </button>

        <form
          className="need-validation2"
          noValidate
          style={{
            backgroundColor: "#F6F5F5",
            border: "5px solid eastern blue",
            padding: "30px",
            borderRadius: "15px"
          }}
        >
          <h2>Record Assignment Attendance</h2>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <div
              className="form-group col-sm-5"
              style={{ marginBottom: "15px" }}
            >
              <label
                for="valid1"
                class="form-label"
                style={({ marginBottom: "5px" }, { color: "#1687A7" })}
              >
                Empoyee ID <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="number"
                id="valid1"
                className="form-control"
                name="empno"
                value={this.state.empno}
                onChange={this.handleInputChange}
                required
              />
              <div className="formValid">{this.state.empnoError}</div>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Date <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="att_date"
                value={this.state.att_date}
                onChange={this.handleInputChange}
                required
              />
              <div className="formValid">{this.state.att_dateError}</div>
            </div>
          </div>

          <hr></hr>
          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Location Type <span style={{ color: "red" }}> *</span>
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="location_type"
              required
            >
              <option value="DEFAULT" disabled>
                Select location type
              </option>
              <option value="In Company">In Company</option>
              <option value="Assignment Loctation">Assignment Loctation</option>
              <option value="other">Other</option>
            </select>
            <div className="formValid">{this.state.location_typeError}</div>
          </div>

          <div class="form-group" style={{ marginBottom: "15px" }}>
            <label
              for="ap-text-box"
              style={({ marginBottom: "5px" }, { color: "#1687A7" })}
            >
              If location is not "in company"
            </label>
            <textarea
              class="form-control"
              id="ap-text-box"
              rows="4"
              placeholder="Type Address correctly"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
            ></textarea>
            <div className="formValid">{this.state.locationError}</div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Assignment Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type participated/allocated assignment name if have"
              name="assignment_name"
              value={this.state.assignment_name}
              onChange={this.handleInputChange}
            />
            <div className="formValid">{this.state.assignment_nameError}</div>
          </div>

          <hr />
          <div className="form-group col-md-6" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Mark Attendance<span style={{ color: "red" }}> **</span>
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="att_type"
              required
            >
              <option value="DEFAULT" disabled>
                Select attendance type to mark
              </option>
              <option name="present">Present</option>
              <option name="absent">Absent</option>
              <option name="paidleave">On Paid Leave</option>
              <option name="unpaidleave">On Unpaid Leave</option>
              <option name="holiday">Holiday</option>
              <option name="other">Other</option>
            </select>
            <div className="formValid">{this.state.att_typeError}</div>
          </div>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Time In
              </label>
              <input
                type="time"
                className="form-control"
                name="time_in"
                value={this.state.time_in}
                onChange={this.handleInputChange}
              />
              <div className="formValid">{this.state.time_inError}</div>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Time Out
              </label>
              <input
                type="time"
                className="form-control"
                name="time_out"
                value={this.state.time_out}
                onChange={this.handleInputChange}
              />
            </div>
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
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-danger"
              type="cancel"
              onClick={this.handleCancelClick}
            >
              Cancel
            </button>
          </div>
          <div />
        </form>

        <div class="back">
          <a href="/allattendance">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Attendance List
            </i>
          </a>
        </div>

        <br />
        <ToastContainer
          position="top-center"
          autoClose={3000}
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
      </div>
    );
  }
}
