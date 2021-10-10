import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { storage } from "../../firebase";
//import Progress from "../../component/common/ProgressBar/progress";

export default class EditAttendance extends Component {
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
      toast.warn("Error while Updating. Please Check Again!!!");
      return false;
    }
    return true;
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

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

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.empno);
      console.log(data);

      axios
        .put(`http://localhost:5000/attendance/update/${id}`, data)
        .then(res => {
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
            toast.success("Attendance Updated Successfully!");
          }
        });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/attendance/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.attendance.empno,
          att_date: res.data.attendance.att_date,
          att_type: res.data.attendance.att_type,
          location_type: res.data.attendance.location_type,
          location: res.data.attendance.location,
          time_in: res.data.attendance.time_in,
          time_out: res.data.attendance.time_out,
          assignment_name: res.data.attendance.assignment_name
        });
        console.log(this.state.attendance);
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
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/allattendance" />;
    }

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Attendance Details</h1>
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
                {this.state.location_type}
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
                {this.state.att_type}
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
              className="btn btn-warning"
              type="submit"
              style={{ marginTop: "15px" }}
              onClick={this.onSubmit}
            >
              <i className="fa fa-refresh"></i>&nbsp;Update
            </button>{" "}
            &nbsp;&nbsp;
            <button
              className="btn btn-danger"
              type="cancel"
              style={{ marginTop: "15px" }}
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
