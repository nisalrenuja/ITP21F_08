import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./AllPayrolls.css";
//import Payrolljs from "../../assets/payrollJS/index";

export default class AdminTab6 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //posts will be stated as an array
      payrolls: []
    };
  }

  //A method in react life cycle
  componentDidMount() {
    this.retrievePayrolls();
  }

  retrievePayrolls() {
    //end point
    axios.get("http://localhost:5000/payrolls").then(res => {
      if (res.data.success) {
        this.setState({
          payrolls: res.data.existingPayrolls,
          payrollcount: res.data.payrollCount
        });

        console.log(this.state.payrolls);
        console.log(this.state.payrollcount);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/payroll/delete/${id}`).then(res => {
      alert("Deleted Successfully!!");
      this.retrievePayrolls();
    });
  };

  filterData(payrolls, searchKey) {
    const result = payrolls.filter(
      payroll =>
        payroll.empno.toLowerCase().includes(searchKey) ||
        payroll.name.toLowerCase().includes(searchKey) ||
        payroll.position.toLowerCase().includes(searchKey) ||
        payroll.basic_salary.includes(searchKey)
    );
    this.setState({ payrolls: result });
  }

  handleSearchArea = e => {
    //to check whether this method invokes
    //console.log(e.currentTarget.value);

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/payrolls").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPayrolls, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>

        <div className="adminpayroll react-bs-table-pagination">
          <div className="row">
            <div class="d-flex justify-content-between">
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold ">
                <br />
                <h1 class="ap-topic">Payroll Management </h1>
              </div>
              <div>
                <Clock />
              </div>
            </div>

            <hr />

            <div className="col-lg-9 mt-2 mb-2">
              <button disabled class="btn btn-lg aptab-disable">
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Salary Details
                </a>
              </button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Attendance
                </a>
              </button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/allleaves"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Leaves
                </a>
              </button>
              <br></br> <br></br>
              <br></br>
            </div>

            <div class="d-flex">
              <div className="col-lg-9 mt-2 mb-2 ">
                <h2 className="h3 mb-3">
                  Total Salary Records ( {this.state.salarycount} )
                </h2>
              </div>

              <div className="col-lg-3 mt-2 mb-2 search-bar">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search..."
                  name="searchQuery"
                  aria-label="Search"
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
                <th scope="col"> Position</th>
                <th scope="col"> Basic Salary</th>
                <th scope="col"> Bank</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.payrolls.map((payrolls, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <a
                      href={`/displaypayroll/${payrolls._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {payrolls.empno}
                    </a>
                  </td>
                  <td>{payrolls.name}</td>
                  <td>{payrolls.position}</td>
                  <td>{payrolls.basic_salary}</td>
                  <td>{payrolls.bank}</td>

                  <td>
                    <a href={`displaypayroll/${payrolls._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editpayroll/${payrolls._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(payrolls._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addpayroll"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add New
            </a>
          </button>
        </div>
      </div>
    );
  }
}
