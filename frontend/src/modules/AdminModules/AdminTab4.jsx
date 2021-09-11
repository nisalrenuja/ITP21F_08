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
          assignments: res.data.assignmentsassigned,
          l: res.data.assignmentsassigned.length
        });
        console.log(this.state.assignments);
      }
    });
  }
  filterData(assignmentsassigned, searchKey) {
    console.log(searchKey);
    const result = assignmentsassigned.filter(
      assignmentsassigned =>
        assignmentsassigned.assignment_name.toLowerCase().includes(searchKey) ||
        assignmentsassigned.client_no.toLowerCase().includes(searchKey)
    );
    this.setState({ assignments: result });
  }
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/assignments/dis").then(res => {
      if (res.data.success) {
        console.log(res.data.assignmentsassigned);
        this.filterData(res.data.assignmentsassigned, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main222">
          <h2 class="head1w">Work Allocation</h2>
          <a href="/reportwork" class="btn btn-info reportdiv">
            <i class="fa fa-file fa-2x" aria-hidden="true"></i>&nbsp;
          </a>
          <hr class="line1w"></hr>
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
            <input
              class="select11"
              type="search"
              placeholder="Search..."
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
            <a className="btn btn-info search22">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>
          <h2 class="tah101">Total Assignments({this.state.l})</h2>
          <table className="table table-hover table101">
            <thead class="thead101">
              <tr>
                <th scope="col">Assignment</th>
                <th scope="col">Client No</th>
                <th scope="col">Deadline</th>
                <th scope="col">Allocated</th>
                <th scope="col">Progress</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="tbody101">
              {this.state.assignments.map((assignments, index) => (
                <tr key={index}>
                  <td>
                    <a
                      href={`/assignment/${assignments.assignment_name}`}
                      style={{ textDecoration: "none" }}
                    >
                      {assignments.assignment_name}
                    </a>
                  </td>
                  <td>{assignments.client_no}</td>
                  <td>{assignments.deadline}</td>
                  <td>{assignments.date_of_allocation}</td>

                  <td>
                    <b>{assignments.progress}</b>
                  </td>

                  <td>
                    <a href={`/editassignment/${assignments.assignment_name}`}>
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
            <tfoot class="tfoot101">
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
