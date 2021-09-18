import React, { Component } from "react";
import axios from "axios";
import "./EmployeePoints.css";

export default class AdminTab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: [],
      TotalCompletedReports: "",
      completions: [],
      pending: [],
      points: []
    };
  }
  componentDidMount() {
    this.retrieveemployee();
  }
  retrieveemployee() {
    axios.get("http://localhost:5000/employeepoints").then(res => {
      if (res.data.success) {
        var completions = [];
        var pending = [];
        var count1 = 0;
        var count2 = 0;
        for (var i = 0; i < res.data.employees.length; i++) {
          count1 = 0;
          count2 = 0;
          for (var j = 0; j < res.data.check.length; j++) {
            if (
              res.data.employees[i].empno === res.data.check[j].emp_no &&
              res.data.check[j].progress === "Completed"
            ) {
              completions[i] = ++count1;
            } else if (
              res.data.employees[i].empno === res.data.check[j].emp_no &&
              (res.data.check[j].progress === "Assigned" ||
                res.data.check[j].progress === "Working")
            ) {
              pending[i] = ++count2;
            } else {
              completions[i] = count1;
              pending[i] = count2;
            }
          }
        }
        this.setState({
          employee: res.data.employees,
          employeecount: res.data.l,
          completions: completions,
          pending: pending
        });
        console.log(this.state.employee);
        console.log(this.state.employeecount);
        console.log(this.state.completions);
        console.log(this.state.pending);
      }
    });
    axios.get("http://localhost:5000/employeepoints2").then(res => {
      if (res.data.success) {
        this.setState({
          points: res.data.points,
          pointscount: res.data.l3
        });
        console.log(this.state.points);
      }
    });
  }
  onDelete = id => {
    axios.delete(`http://localhost:5000/employees/delete/${id}`).then(res => {
      alert("Deleted Succeefully");
      this.retrieveemployee();
    });
  };

  filterData(employees, searchKey) {
    const result = employees.filter(employees =>
      employees.name.toLowerCase().includes(searchKey)
    );
    this.setState({ employee: result });
  }
  filterData2(employees, searchKey) {
    if (searchKey == null) {
      const result1 = employees.filter(employees =>
        employees.name.toLowerCase().includes(searchKey)
      );
      this.setState({ employee: result1 });
    }
    const result = employees.filter(employees => employees.empno == searchKey);
    this.setState({ employee: result });
    console.log(employees.findIndex(result));
  }

  filterData3(employees, searchKey) {
    if (searchKey == null) {
      const result1 = employees.filter(employees =>
        employees.name.toLowerCase().includes(searchKey)
      );
      this.setState({ spemployee: result1 });
    }
    const result = employees.filter(employees => employees.empno == searchKey);
    this.setState({ spemployee: result });
  }
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingemployees, searchKey);
      }
    });
  };

  handleSearchArea2 = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData2(res.data.existingemployees, searchKey);
      }
    });
  };

  handleSearchArea3 = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData3(res.data.existingemployees, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="buddmain">
          <h2 class="heademp">Employee Points</h2>
          <hr class="lineemp"></hr>
          <a href="/AllEmployees">
            <button class="div11">
              <p class="txt11">Employee List</p>
            </button>
          </a>
          <a href="/EmployeePoints">
            <button class="div22">
              <p class="txt22">Employee Points</p>
            </button>
          </a>
          <h2 class="btah1">Employee Points Today </h2>
          <div class="div4">
            <table className="table table-hover btable22">
              <thead class="budthead2">
                <tr>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Total Points</th>
                </tr>
              </thead>
              <tbody class="btbody2">
                {this.state.points.map((points, index) => (
                  <tr key={index}>
                    <td>
                      <a href={``} style={{ textDecoration: "none" }}>
                        {points.empno}
                      </a>
                    </td>
                    <td>
                      <a
                        href={`/PendingAssignments/${points.empno}`}
                        style={{ textDecoration: "none" }}
                      >
                        {points.points}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{
              marginTop: "700px",
              marginLeft: "950px",
              borderRadius: "60px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            }}
            onClick={this.onSubmit}
          >
            <i></i> Save Table
          </button>

          <div class="div33">
            <p class="txt33">Quick Search by</p>
            <input
              placeholder="  Search by ID"
              class="bbuselect1"
              type="number"
              onChange={this.handleSearchArea2}
              hiddenvalue="null"
            />
            <input
              placeholder="  Search by Name"
              class="bbuselect2"
              type="text"
              onChange={this.handleSearchArea}
            />
          </div>
          <h2 class="tah1">Employee Assignments Status</h2>
          <table className="table table-hover table11">
            <thead class="thead">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact Number</th>
                <th scope="col">
                  Total
                  <br />
                  Pending
                  <br />
                  Reports
                </th>
                <th scope="col">
                  {" "}
                  Total
                  <br />
                  Completed
                  <br />
                  Reports
                </th>
              </tr>
            </thead>
            <tbody class="tbody1">
              {this.state.employee.map((employees, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {employees.empno}
                    </a>
                  </td>
                  <td>{employees.name}</td>
                  <td>{employees.email}</td>
                  <td>{employees.contact}</td>
                  <td>
                    <a
                      href={`/PendingAssignments/${employees.empno}`}
                      style={{ textDecoration: "none" }}
                    >
                      {this.state.pending[index]}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/CompletedAssignments/${employees.empno}`}
                      style={{ textDecoration: "none" }}
                    >
                      {this.state.completions[index]}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            &nbsp;
            <tfoot class="tfoot">
              <a href="/InsertEmployee">Add New Employee</a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
