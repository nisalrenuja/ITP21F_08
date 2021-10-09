import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "./EmployeePoints.css";

export default class AdminTab3 extends Component {
  constructor(props) {
    super(props);
    //set the initial states
    this.state = {
      employee: [],
      TotalCompletedReports: "",
      completions: [],
      pending: [],
      points: []
    };
  }
  //Load the employee points and the employees assignments table
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
        //count the number of completed and pending assignments per employee
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
    //retrieve the total points accumulated in reviews per employee
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

  //Method triggered when save button is clicked
  onSubmit = e => {
    e.preventDefault();

    const { points } = this.state;

    const data = {
      points: points
    };
    console.log(data);

    //save the points table
    axios.post("http://localhost:5000/points/save", points).then(res => {
      if (res.data.success) {
        this.setState({
          points: points
        });
        alert("Points till Today are Saved!");
      }
    });
  };

  //Filter method used in search box for employee name
  filterData(employees, searchKey) {
    const result = employees.filter(employees =>
      employees.name.toLowerCase().includes(searchKey)
    );
    this.setState({ employee: result });
  }
  //Filter method used in search box for employeeID
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

  //Handle input Employee Name change in the search box
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingemployees, searchKey);
      }
    });
  };
  //Handle input EmployeeID change in the search box
  handleSearchArea2 = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.filterData2(res.data.existingemployees, searchKey);
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
              <p class="txt11" style={{ paddingTop: "11px" }}>
                Employee List
              </p>
            </button>
          </a>
          <a href="/EmployeePoints">
            <button class="div22" style={{ paddingTop: "11px" }}>
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
                      <a
                        href={`/empprofile/${points._id}`}
                        style={{ textDecoration: "none" }}
                      >
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
                  <td>{employees.contact}</td>
                  <td>
                    <a
                      href={`/PendingAssignments/${employees.empno}`}
                      style={{ textDecoration: "none" }}
                      data-tip
                      data-for="pendingTip"
                    >
                      {this.state.pending[index]}
                    </a>
                    <ReactTooltip id="pendingTip" place="top">
                      <span>Click to Show Pending Assignments</span>
                    </ReactTooltip>
                  </td>
                  <td>
                    <a
                      href={`/CompletedAssignments/${employees.empno}`}
                      style={{ textDecoration: "none" }}
                      data-tip
                      data-for="completedTip"
                    >
                      {this.state.completions[index]}
                    </a>
                    <ReactTooltip id="completedTip" place="top">
                      <span>Click to Show Completed Assignments</span>
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
        </div>
      </div>
    );
  }
}
