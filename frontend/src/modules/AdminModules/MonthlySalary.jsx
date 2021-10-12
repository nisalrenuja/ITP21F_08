import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
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

  notify = () => {
    toast.success("Deleted Salary Successfully! 👌");
  };

  onDelete = id => {
    axios.delete(`http://localhost:5000/salary/delete/${id}`).then(res => {
      this.notify();
      this.retrieveSalaries();
    });
  };

  filterData(salaries, searchKey) {
    const result = salaries.filter(
      salary =>
        salary.payslipID
          .toString()
          .toLowerCase()
          .includes(searchKey) ||
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
      <div className="container dim_main">
        <br></br>

        <div className="adminpayroll">
          <div className="row">
            <div class="d-flex">
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold ">
                <br />
                <h1 class="ap-topic">Payroll Management</h1>
              </div>

              <div className="p-2">
                <a href="/salaryreport" class="btn btn-info att-reportbtn">
                  Salary &nbsp;
                  <i class="fa fa-file fa-2x" aria-hidden="true"></i>
                </a>
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
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/allrequests"
                  style={{ textDecoration: "none", color: "#1687A7" }}
                >
                  Requests
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
                <th scope="col"> Pay Slip ID</th>
                <th scope="col"> Employee Name</th>
                <th scope="col"> Month-Year</th>
                <th scope="col"> Basic</th>
                <th scope="col"> Total Earnings</th>
                <th scope="col"> Total Deductions</th>
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
                      data-tip
                      data-for="showTip"
                    >
                      {salaries.payslipID}-{salaries.empno}
                    </a>
                    <ReactTooltip id="showTip" place="top">
                      <span>View pay slip</span>
                    </ReactTooltip>
                  </td>

                  <td>{salaries.name}</td>
                  <td>{salaries.pay_month}</td>
                  <td>{salaries.basic}</td>
                  <td>
                    {salaries.OT_hrs * 120 +
                      salaries.aws +
                      salaries.bonus +
                      salaries.total_earnings}
                  </td>
                  <td>
                    {salaries.nopay_leaves * 100 + salaries.total_deductions}
                  </td>
                  <td class="netsal-data" style={{ color: "#c9184a" }}>
                    {salaries.basic +
                      (salaries.OT_hrs * 120 +
                        salaries.aws +
                        salaries.bonus +
                        salaries.total_earnings) -
                      (salaries.nopay_leaves * 100 + salaries.total_deductions)}
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {salaries.salary_status}
                  </td>

                  <td>
                    <a
                      href={`displaysalary/${salaries._id}`}
                      data-tip
                      data-for="showTip"
                    >
                      <i class="far fa-eye"></i>
                    </a>
                    <ReactTooltip id="showTip" place="top">
                      <span>View pay slip</span>
                    </ReactTooltip>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      href={`/editsalary/${salaries._id}`}
                      data-tip
                      data-for="EditTip"
                    >
                      <i class="far fa-edit"></i>
                    </a>
                    <ReactTooltip id="EditTip" place="top">
                      <span>Edit pay slip</span>
                    </ReactTooltip>
                    &nbsp; &nbsp; &nbsp;
                    <a
                      href="#"
                      data-tip
                      data-for="DeleteTip"
                      onClick={() =>
                        confirmAlert({
                          title: "Confirm to Delete",
                          message: "Are you sure to do this ?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => this.onDelete(salaries._id)
                            },
                            {
                              label: "No",
                              onClick: () => window.close
                            }
                          ]
                        })
                      }
                    >
                      <i class="far fa-trash-alt"></i>
                    </a>
                    <ReactTooltip id="DeleteTip" place="top">
                      <span>Delete pay slip</span>
                    </ReactTooltip>
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

          <ToastContainer
            position="bottom-center"
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
      </div>
    );
  }
}
