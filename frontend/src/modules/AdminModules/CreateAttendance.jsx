import React, { Component } from "react";
import axios from "axios";
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
        //alert("Mark attendance Successfully!");
        //this.props.history.push("/allattendance");
      } else alert("Mark attendance Unsuccessfull!");
    });

    //alert("Mark attendance Successfully!");
    //this.props.history.push("/allattendance"); //==admin
  };

  render() {
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Attendance Management | Mark Attendance : Admin</h1>
        <br />
        <br />

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
          <h2>Assignment Attendance Record</h2>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <div
              className="form-group col-sm-5"
              style={{ marginBottom: "15px" }}
            >
              <label
                for="valid1"
                class="form-label"
                style={{ marginBottom: "5px" }}
              >
                Empoyee ID
              </label>
              <input
                type="number"
                id="valid1"
                className="form-control"
                placeholder="required**"
                name="empno"
                value={this.state.empno}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Date</label>
              <input
                type="date"
                className="form-control"
                name="att_date"
                value={this.state.att_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <hr></hr>
          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Location Type</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="location_type"
            >
              <option value="DEFAULT" disabled>
                Select location type
              </option>
              <option value="in company">In Company</option>
              <option value="assignment location">
                Assignment Assigned Loctation
              </option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group" style={{ marginBottom: "15px" }}>
            <label for="ap-text-box" style={{ marginBottom: "5px" }}>
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
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Assignment Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type participated/allocated assignment name if have"
              name="assignment_name"
              value={this.state.assignment_name}
              onChange={this.handleInputChange}
            />
          </div>

          <hr />
          <div className="form-group col-md-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Mark Attendance</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="att_type"
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
          </div>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Time In</label>
              <input
                type="time"
                className="form-control"
                name="time_in"
                value={this.state.time_in}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Time Out</label>
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
            <button className="btn btn-danger" type="cancel">
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
      </div>
    );
  }
}
