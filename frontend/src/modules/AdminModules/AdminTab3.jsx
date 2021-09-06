import React, { Component } from "react";
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
          employeecount: res.data.employeeCount
        });
        console.log(this.state.employee);
        console.log(this.state.employeecount);
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
        <div class="main">
          <h2 class="head1">Employees</h2>
          <hr class="line1"></hr>
          <a href="/AllEmployees">
            <button class="div1">
              <p class="txt1">Employee List</p>
            </button>
          </a>
          <a href="/EmployeePoints">
            <button class="div2">
              <p class="txt2">Employee Points</p>
            </button>
          </a>
          <div class="div3">
            <p class="txt3">Filter by</p>
            <input
              class="select1"
              type="text"
              onChange={this.handleSearchArea}
            />
            <a className="btn btn-info search2">
              <i className="fas fa-search2"></i>&nbsp;Search
            </a>
          </div>
          <h2 class="tah">Total Employees ( {this.state.employeecount} )</h2>
          <table className="table table-hover table1">
            <thead class="thead">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
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
                  <td>{employees.commencement_date}</td>
                  <td>{employees.status}</td>
                  <td>
                    <a href={``}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp;
                    <a href={``}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(employees._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            &nbsp;
            <tfoot class="tfoot">
              <a href="/createassignment">
                <i class="fas fa-plus"></i>&nbsp;New Employee
              </a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
