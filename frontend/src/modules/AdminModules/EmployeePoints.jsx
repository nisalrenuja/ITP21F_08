import React, { Component } from "react";
import axios from "axios";
import "./EmployeePoints.css";

export default class AdminTab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: []
    };
  }
  componentDidMount() {
    this.retrieveStaff();
  }
  retrieveStaff() {
    axios.get("http://localhost:5000/staffs").then(res => {
      if (res.data.success) {
        this.setState({
          staff: res.data.existingStaffs,
          staffcount: res.data.staffCount
        });
        console.log(this.state.staff);
        console.log(this.state.staffcount);
      }
    });
  }
  onDelete = id => {
    axios.delete(`http://localhost:5000/staffs/delete/${id}`).then(res => {
      alert("Deleted Succeefully");
      this.retrieveStaff();
    });
  };

  filterData(staffs, searchKey) {
    const result = staffs.filter(
      staffs =>
        staffs.name.toLowerCase().includes(searchKey) ||
        staffs.empno.includes(searchKey)
    );
    this.setState({ staff: result });
  }
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/staffs").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingStaffs, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="main">
          <h2 class="head1">Employees Points</h2>
          <hr class="line1"></hr>
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
          <div class="div4">
            <p class="txt4">Employee ID</p>
            <input class="select3" />
            <p class="txt5">Employee Name</p>
            <span class="box1"></span>
            <a className="btn btn-info search">
              <i></i>&nbsp;Calculate Current Points
            </a>
            <p class="txt6">Employee Joined Date</p>
            <span class="box2"></span>
            <p class="txt7">Current Date</p>
            <span class="box3"></span>
            <p class="txt8">Total Approved Reports</p>
            <span class="box4"></span>
            <p class="txt9">Current Total Points Recevied</p>
            <span class="box5"></span>
          </div>

          <div class="div33">
            <p class="txt33">Quick Search by</p>
            <input
              placeholder="  Search by ID"
              class="select1"
              type="integer"
              onChange={this.handleSearchArea}
            />
            <input
              placeholder="  Search by Name"
              class="select2"
              type="text"
              onChange={this.handleSearchArea}
            />
          </div>
          <h2 class="tah1">Total Employees ( {this.state.staffcount} )</h2>
          <table className="table table-hover table11">
            <thead class="thead">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined Date</th>
                <th scope="col">
                  Total
                  <br />
                  Approved
                  <br />
                  Reports
                </th>
                <th scope="col">Total Points</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="tbody1">
              {this.state.staff.map((staffs, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {staffs.empno}
                    </a>
                  </td>
                  <td>{staffs.name}</td>
                  <td>{staffs.email}</td>
                  <td>{staffs.commencement_date}</td>
                  <td>1</td>
                  <td>1</td>

                  <td>
                    <a href={``}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp;
                    <a href={``}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(staffs._id)}>
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
