import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "./Employees.css";

export default class AdminTab3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: []
    };
  }
  componentDidMount() {
    this.retrieveemployee();
  }
  retrieveemployee() {
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.setState({
          employee: res.data.existingemployees,
          employeecount: res.data.employeeCount,
          auditcount: res.data.empAuditCount
        });
        console.log(this.state.employee);
        console.log(this.state.employeecount);
      }
    });
    axios.get("http://localhost:5000/employees/counts").then(res => {
      if (res.data.success) {
        this.setState({
          audit: res.data.auditcount,
          tax: res.data.taxcount
        });
      }
    });
  }
  notify = () => {
    toast.success("Deleted Successfully ! 👌");
  };
  onDelete = id => {
    axios.delete(`http://localhost:5000/employees/delete/${id}`).then(res => {
      this.retrieveemployee();
      this.notify();
    });
  };

  filterData(employees, searchKey) {
    const result = employees.filter(employees =>
      employees.name.toLowerCase().includes(searchKey)
    );
    this.setState({ employee: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingemployees, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="budmain">
          <h2 class="heademp">Employees</h2>
          <hr class="lineemp"></hr>
          <a href="/AllEmployees">
            <button class="bbbdiv1" style={{ paddingTop: "11px" }}>
              <p class="txt1">Employee List</p>
            </button>
          </a>
          <a href="/EmployeePoints">
            <button class="bbbdiv2" style={{ paddingTop: "11px" }}>
              <p class="txt2">Employee Points</p>
            </button>
          </a>
          <a href="/EmployeeReport">
            <button class="btn btn-outline-dark" style={{ paddingTop: "15px" }}>
              <p>Employee Report Portal</p>
            </button>
          </a>

          <a href="/empexportreport" class="btn btn-info reportdiv">
            <i class="fa fa-file fa-2x" aria-hidden="true"></i>&nbsp;
          </a>
          <div class="buddiv3">
            <p class="budtxt3">Search by</p>
            <input
              class="budselect1"
              type="text"
              onChange={this.handleSearchArea}
              placeholder="&nbsp;&nbsp;Enter Employee Name"
            />
          </div>
          <h2 class="butah">
            Total Employees ( {this.state.employeecount} ) : &nbsp; Audit (
            {this.state.audit}) &nbsp; Tax({this.state.tax})
          </h2>
          <table className="table table-hover table1">
            <thead class="thead">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined Date</th>
                <th scope="col">Status</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="tbody1">
              {this.state.employee.map((employees, index) => (
                <tr key={index}>
                  <td>
                    <a
                      href={`/empprofile/${employees._id}`}
                      style={{ textDecoration: "none" }}
                      data-tip
                      data-for="profileTip"
                    >
                      {employees.empno}
                    </a>
                    <ReactTooltip id="profileTip" place="top">
                      <span>Show Employee Profile</span>
                    </ReactTooltip>
                  </td>
                  <td>{employees.name}</td>
                  <td>{employees.email}</td>
                  <td>{employees.commencement_date}</td>
                  <td>{employees.status}</td>
                  <td>{employees.type}</td>
                  <td>
                    <a
                      href={`/empprofile/${employees._id}`}
                      data-tip
                      data-for="profileTip"
                    >
                      <i class="far fa-eye"></i>
                    </a>
                    <ReactTooltip id="profileTip" place="top">
                      <span>Show Employee Profile</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
                    <a
                      href={`/EditEmployee/${employees._id}`}
                      data-tip
                      data-for="EditTip"
                    >
                      <i class="far fa-edit"></i>
                    </a>
                    <ReactTooltip id="EditTip" place="top">
                      <span>Edit Employee Profile</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
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
                              onClick: () => this.onDelete(employees._id)
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
                      <span>Delete Employee Profile</span>
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
            &nbsp;
            <tfoot class="tfoot">
              <a href="/InsertEmployee">Add New Employee</a>
            </tfoot>
          </table>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
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
