import React, { Component } from "react";
import axios from "axios";
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
      time_out: ""
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

    const {
      empno,
      att_date,
      att_type,
      location_type,
      location,
      time_in,
      time_out
    } = this.state;

    const data = {
      empno: empno,
      att_date: att_date,
      att_type: att_type,
      location_type: location_type,
      location: location,
      time_in: time_in,
      time_out: time_out
    };

    console.log(data);
    axios
      .put(`http://localhost:5000/attendance/update/${id}`, data)
      .then(res => {
        if (res.data.success) {
          alert("Attendance Updated Successfully");

          this.setState({
            empno: "",
            att_date: "",
            att_type: "",
            location_type: "",
            location: "",
            time_in: "",
            time_out: ""
          });
        }
      });
    this.props.history.push("/allattendance");
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
          time_out: res.data.attendance.time_out
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
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Attendance Details</h1>
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
          <h2>Attendance Record</h2>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
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
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div class="d-flex justify-content-between">
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

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Mark Attendance</label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="att_type"
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
            </div>
          </div>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Location Type</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="location_type"
            >
              <option value="DEFAULT" disabled>
                {this.state.location_type}
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

        <br />
      </div>
    );
  }
}
