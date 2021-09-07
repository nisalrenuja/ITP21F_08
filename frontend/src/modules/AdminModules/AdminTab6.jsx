/*
const AdminTab6 = () => {
  return <div>Attendance & Payroll content goes here</div>;
};

export default AdminTab6;
*/

import React, { Component } from "react";
import axios from "axios";
import "./AllAssignments.css";

export default class AdminTab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }
  onDelete = name => {
    console.log(name);
    axios
      .delete(`http://localhost:5000/assignments/delete/${name}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrievePosts();
      });
  };
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/assignments/dis").then(res => {
      if (res.data.success) {
        this.setState({
          assignments: res.data.assignmentsassigned
        });
        console.log(this.state.assignments);
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div class="main">
          <h2 class="head1">Work Allocation</h2>
          <hr class="line1"></hr>
          <a href="/allassignments">
            <button class="div1">
              <p class="txt1">Assignments</p>
            </button>
          </a>
          <a href="/laptopallocation">
            <button class="div2">
              <p class="txt2">Allocate Laptops</p>
            </button>
          </a>
          <div class="div3">
            <p class="txt3">Filter by</p>
            <input class="select1" type="text" />
            <a className="btn btn-info search">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>
          <h2 class="tah">Total Assignments</h2>
          <table className="table table-hover table1">
            <thead class="thead">
              <tr>
                <th scope="col">Assignment</th>
                <th scope="col">Client No</th>
                <th scope="col">Deadline</th>
                <th scope="col">Allocated</th>
                <th scope="col">Progress</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="tbody1">
              {this.state.assignments.map((assignments, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {assignments.assignment_name}
                    </a>
                  </td>
                  <td>{assignments.client_no}</td>
                  <td>{assignments.deadline}</td>
                  <td>{assignments.date_of_allocation}</td>

                  <td>{assignments.progress}</td>

                  <td>
                    <a href={`/edit/${assignments._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a
                      href="#"
                      onClick={() => this.onDelete(assignments.assignment_name)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="tfoot">
              <a href="/createassignment">
                <i class="fas fa-plus"></i>&nbsp;New Assignment
              </a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
