import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./AllPayrolls.css";

export default class AdminLeaves extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //posts will be stated as an array
      leaves: []
    };
  }

  //A method in react life cycle
  componentDidMount() {
    this.retrieveLeaves();
  }

  retrieveLeaves() {
    //end point
    axios.get("http://localhost:5000/leaves").then(res => {
      if (res.data.success) {
        this.setState({
          leaves: res.data.existingLeaves,
          leavecount: res.data.leaveCount
        });

        console.log(this.state.leaves);
        console.log(this.state.leavecount);
      }
    });
  }

  onDelete = id => {
    const confirmBox = window.confirm("Do you really want to delete this?");
    if (confirmBox === true) {
      axios.delete(`http://localhost:5000/leave/delete/${id}`).then(res => {
        alert("Deleted Data Successfully!!");
        this.retrieveLeaves();
      });
    }
  };

  filterData(leaves, searchKey) {
    const result = leaves.filter(
      leave =>
        leave.empno
          .toString()
          .toLowerCase()
          .includes(searchKey) ||
        leave.name.toLowerCase().includes(searchKey) ||
        leave.leave_type.toLowerCase().includes(searchKey) ||
        leave.leave_status.toLowerCase().includes(searchKey)
    );

    this.setState({ leaves: result });
  }

  handleSearchArea = e => {
    //to check whether this method invokes
    //console.log(e.currentTarget.value);

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/leaves").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingLeaves, searchKey);
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
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold ">
                <br />
                <h1 class="ap-topic">Payroll Management</h1>
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
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/allattendance"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Attendance
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-disable">
                <a
                  href="/allrequests"
                  style={{ textDecoration: "none", color: "white" }}
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
                  Total Records ( {this.state.leavecount} )
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
                <th scope="col"> Name</th>
                <th scope="col"> Leave Type</th>
                <th scope="col"> No of Leaves</th>
                <th scope="col"> Leave Status</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.leaves.map((leaves, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <a
                      href={`/displayleave/${leaves._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {leaves.empno}
                    </a>
                  </td>
                  <td>{leaves.name}</td>
                  <td>{leaves.leave_type}</td>
                  <td>{leaves.no_of_leaves}</td>
                  <td>{leaves.leave_status}</td>

                  <td>
                    <a href={`displayleave/${leaves._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editleave/${leaves._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(leaves._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addleave"
              style={{ textDecoration: "none", color: "white" }}
            >
              Request New
            </a>
          </button>
        </div>
      </div>
    );
  }
}
