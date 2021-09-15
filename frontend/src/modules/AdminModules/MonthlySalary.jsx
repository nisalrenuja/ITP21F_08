import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./AllPayrolls.css";

export default class MonthlySalary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //posts will be stated as an array
      salaries: []
    };
  }

  //A method in react life cycle
  componentDidMount() {
    this.retrieveSalaries();
  }

  retrieveSalaries() {
    //end point
    axios.get("http://localhost:5000/salaries").then(res => {
      if (res.data.success) {
        this.setState({
          salaries: res.data.existingSalaries,
          salarycount: res.data.salaryCount
        });

        console.log(this.state.salaries);
        console.log(this.state.salarycount);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/salary/delete/${id}`).then(res => {
      alert("Deleted Monthly Salary Successfully!!");
      this.retrieveSalaries();
    });
  };

  filterData(salaries, searchKey) {
    const result = salaries.filter(
      salary =>
        salary.salaryno.toLowerCase().includes(searchKey) ||
        salary.empno
          .toString()
          .toLowerCase()
          .includes(searchKey) ||
        salary.pay_month.toLowerCase().includes(searchKey) ||
        salary.salary_status.toLowerCase().includes(searchKey)
    );

    this.setState({ salaries: result });
  }

  handleSearchArea = e => {
    //to check whether this method invokes
    //console.log(e.currentTarget.value);

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/salaries").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingSalaries, searchKey);
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
                <h1 class="ap-topic">Payroll Management | Monthly Salary</h1>
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
              <button disabled class="btn btn-lg aptab-disable">
                <a
                  href="/allsalary"
                  style={{ textDecoration: "none", color: "white" }}
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
                  Total Salary Records ( {this.state.salarycount} )
                </h2>
              </div>

              <div className="col-lg-3 mt-2 mb-2 search-bar">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
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
                <th scope="col"> Payslip ID</th>
                <th scope="col"> Employee ID</th>
                <th scope="col"> Month-Year</th>
                <th scope="col"> Net Salary</th>
                <th scope="col"> Salary Status</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.salaries.map((salaries, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td scope="row">
                    <a
                      href={`/displaysalary/${salaries._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      MS{index + 1000}
                    </a>
                  </td>

                  <td>{salaries.empno}</td>
                  <td>{salaries.pay_month}</td>
                  <td>{salaries.net_salary}</td>
                  <td>{salaries.salary_status}</td>

                  <td>
                    <a href={`displaysalary/${salaries._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editsalary/${salaries._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(salaries._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addsalary"
              style={{ textDecoration: "none", color: "white" }}
            >
              New Pay Slip
            </a>
          </button>
        </div>
      </div>
    );
  }
}
