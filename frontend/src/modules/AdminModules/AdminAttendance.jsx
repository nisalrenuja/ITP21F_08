import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./AllPayrolls.css";

export default class AdminAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //posts will be stated as an array
      attendances: []
    };
  }

  //A method in react life cycle
  componentDidMount() {
    this.retrieveAttendances();
  }

  retrieveAttendances() {
    //end point
    axios.get("http://localhost:5000/attendances").then(res => {
      if (res.data.success) {
        this.setState({
          attendances: res.data.existingAttendances,
          attendancecount: res.data.attendanceCount
        });

        console.log(this.state.attendances);
        console.log(this.state.attendancecount);
      }
    });
  }

  onDelete = id => {
    const confirmBox = window.confirm("Do you really want to delete this?");
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:5000/attendance/delete/${id}`)
        .then(res => {
          alert("Deleted Data Successfully!!");
          this.retrieveAttendances();
        });
    }
  };

  filterData(attendances, searchKey) {
    const result = attendances.filter(
      attendance =>
        attendance.empno
          .toString()
          .toLowerCase()
          .includes(searchKey) ||
        attendance.att_date
          .toString()
          .toLowerCase()
          .includes(searchKey) ||
        attendance.location_type.toLowerCase().includes(searchKey) ||
        attendance.location.toLowerCase().includes(searchKey) ||
        attendance.att_type.toLowerCase().includes(searchKey) ||
        attendance.assignment_name.toLowerCase().includes(searchKey)
    );

    this.setState({ attendances: result });
  }

  handleSearchArea = e => {
    //to check whether this method invokes
    //console.log(e.currentTarget.value);

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/attendances").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingAttendances, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>

        <div className="adminpayroll">
          <div className="row">
            <div class="d-flex justify-content-between">
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold">
                <br />
                <h1 class="ap-topic">Payroll Management</h1>
                <br />
                <h4 class="">Assignment Attendance</h4>
              </div>

              <div>
                <Clock />
              </div>
            </div>

            <hr class="hr-line" />

            <div className="col-lg-9 mt-2 mb-2">
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/admin"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Payroll Details
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-disable">
                <a
                  href="/allattendance"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Attendance
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/allrequests"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Requests
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/allsalary"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Monthly Salary
                </a>
              </button>
              <br></br> <br></br>
              <br></br>
            </div>

            <div class="d-flex">
              <div className="col-lg-9 mt-2 mb-2 ">
                <h2 className="h3 mb-3">
                  Total Attendance Records ( {this.state.attendancecount} )
                </h2>
              </div>

              <div className="col-lg-3 mt-2 mb-2 search-bar">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search.."
                  name="searchQuery"
                  onChange={this.handleSearchArea}
                ></input>
              </div>
            </div>
          </div>

          <table
            className="table table-hover text-center"
            style={{ marginTop: "40px" }}
          >
            <thead class="tblhead">
              <tr class="">
                <th scope="col"> #</th>
                <th scope="col"> Employee ID</th>
                <th scope="col"> Date</th>
                <th scope="col"> Location Type</th>
                <th scope="col"> Assignment</th>
                <th scope="col"> Attendance Type</th>
                <th scope="col"> Time In</th>
                <th scope="col"> Time Out</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.attendances.map((attendances, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <a
                      href={`/displayattendance/${attendances._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {attendances.empno}
                    </a>
                  </td>

                  <td>{attendances.att_date}</td>
                  <td>{attendances.location_type}</td>
                  <td>{attendances.assignment_name}</td>
                  <td style={{ fontWeight: "bold" }}>{attendances.att_type}</td>
                  <td>{attendances.time_in}</td>
                  <td>{attendances.time_out}</td>

                  <td>
                    <a href={`displayattendance/${attendances._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editattendance/${attendances._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(attendances._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addattendance"
              style={{ textDecoration: "none", color: "white" }}
            >
              Mark Attendance
            </a>
          </button>
        </div>
      </div>
    );
  }
}
