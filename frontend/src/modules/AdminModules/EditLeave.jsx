import React, { Component } from "react";
import axios from "axios";
//import { storage } from "../../firebase";
//import Progress from "../../component/common/ProgressBar/progress";

export default class EditLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empno: "",
      name: "",
      leave_type: "",
      leave_start_date: "",
      leave_end_date: "",
      no_of_leaves: "",
      leave_message: "",
      leave_status: ""
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
      name,
      leave_type,
      leave_start_date,
      leave_end_date,
      no_of_leaves,
      leave_message,
      leave_status
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      leave_type: leave_type,
      leave_start_date: leave_start_date,
      leave_end_date: leave_end_date,
      no_of_leaves: no_of_leaves,
      leave_message: leave_message,
      leave_status: leave_status
    };

    console.log(data);
    axios.put(`http://localhost:5000/leave/update/${id}`, data).then(res => {
      if (res.data.success) {
        alert("Updated Successfully");

        this.setState({
          empno: "",
          name: "",
          leave_type: "",
          leave_start_date: "",
          leave_end_date: "",
          no_of_leaves: "",
          leave_message: "",
          leave_status: ""
        });
      }
    });
    this.props.history.push("/allrequests");
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/leave/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.leave.empno,
          name: res.data.leave.name,
          leave_type: res.data.leave.leave_type,
          leave_start_date: res.data.leave.leave_start_date,
          leave_end_date: res.data.leave.leave_end_date,
          no_of_leaves: res.data.leave.no_of_leaves,
          leave_message: res.data.leave.leave_message,
          leave_status: res.data.leave.leave_status
        });
        console.log(this.state.leave);
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
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Response to Leave Requests</h1>
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
          <h2>Employee Details</h2>
          <hr></hr>

          <div className="form-group col-sm-4" style={{ marginBottom: "15px" }}>
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
          </div>

          <h2>Leaving Details</h2>
          <hr></hr>

          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Leave Type</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="leave_type"
              required
            >
              <option value="DEFAULT" disabled>
                {this.state.leave_type}
              </option>
              <option value="Annual leave">Annual leave</option>
              <option value="Sick leave">Sick leave</option>
              <option value="Casual leave">Casual leave</option>
              <option value="Religious holidays">Religious holidays</option>
              <option value="Maternity leave">Maternity leave</option>
              <option value="Quarantine Leave">Quarantine Leave</option>
              <option value="Half Pay Leave">Half Pay Leave</option>
              <option value="No Pay Leave">No Pay Leave</option>
            </select>
          </div>
          <br />

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
                Start From
              </label>
              <input
                type="date"
                id="valid1"
                className="form-control"
                name="leave_start_date"
                value={this.state.leave_start_date}
                onChange={this.handleInputChange}
              />
            </div>
            <div
              className="form-group col-sm-5"
              style={{ marginBottom: "15px" }}
            >
              <label
                for="valid1"
                class="form-label"
                style={{ marginBottom: "5px" }}
              >
                End
              </label>
              <input
                type="date"
                id="valid1"
                className="form-control"
                name="leave_end_date"
                value={this.state.leave_end_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Number of Leaves</label>
            <input
              type="number"
              className="form-control"
              name="no_of_leaves"
              placeholder=""
              value={this.state.no_of_leaves}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div class="form-group" style={{ marginBottom: "15px" }}>
            <label for="ap-text-box" style={{ marginBottom: "5px" }}>
              Leave Reason briefly
            </label>
            <textarea
              class="form-control"
              id="ap-text-box"
              rows="4"
              placeholder="Type"
              name="leave_message"
              value={this.state.leave_message}
              onChange={this.handleInputChange}
            ></textarea>
          </div>

          <hr></hr>

          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Leave Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="leave_status"
              required
            >
              <option value="DEFAULT" disabled>
                {this.state.leave_status}
              </option>
              <option name="pending">Pending</option>
              <option value="Approved" name="approve">
                Approve
              </option>
              <option value="Rejected" name="reject">
                Reject
              </option>
            </select>
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
        </form>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
