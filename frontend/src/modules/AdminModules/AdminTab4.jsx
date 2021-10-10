import React, { Component } from "react";
import axios from "axios";
import "./AllAssignments.css";
import { confirmAlert } from "react-confirm-alert"; // Imports for confirm alert
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactTooltip from "react-tooltip"; // Imports for tooltip

export default class AdminTab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }
  //delete function
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
  //retrieve function
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
  //search filter
  filterData(assignmentsassigned, searchKey) {
    console.log(searchKey);
    const result = assignmentsassigned.filter(
      assignmentsassigned =>
        assignmentsassigned.assignment_name.toLowerCase().includes(searchKey) ||
        assignmentsassigned.client_no.toLowerCase().includes(searchKey)
    );
    this.setState({ assignments: result });
  }
  //search function
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
            <button class="div111">
              <p class="txt111" style={{ paddingTop: "11px" }}>
                Assignments
              </p>
            </button>
          </a>
          <a href="/laptopallocation">
            <button class="div222">
              <p class="txt222" style={{ paddingTop: "11px" }}>
                Allocate Laptops
              </p>
            </button>
          </a>
          <center>
            <div class="div34">
              <p class="txt34">Filter by</p>
              <input
                class="select11"
                type="search"
                placeholder="Search..."
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </center>
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
                      data-tip
                      data-for="assignmentTip"
                    >
                      {assignments.assignment_name}
                    </a>
                    <ReactTooltip id="assignmentTip" place="top">
                      <span>Show Assignment</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
                  </td>
                  <td>{assignments.client_no}</td>
                  <td>{assignments.deadline}</td>
                  <td>{assignments.date_of_allocation}</td>

                  <td>
                    <b>{assignments.progress}</b>
                  </td>

                  <td>
                    <a
                      href={`/editassignment/${assignments.assignment_name}`}
                      data-tip
                      data-for="assignmentEditTip"
                    >
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <ReactTooltip id="assignmentEditTip" place="top">
                      <span>Edit Assignment</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
                    <a
                      href="#"
                      onClick={() =>
                        confirmAlert({
                          title: "Confirm to Delete",
                          message: "Are you sure to delete ?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () =>
                                this.onDelete(assignments.assignment_name)
                            },
                            {
                              label: "No",
                              onClick: () => window.close
                            }
                          ]
                        })
                      }
                      data-tip
                      data-for="assignmentDeleteTip"
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                    <ReactTooltip id="assignmentDeleteTip" place="top">
                      <span>Delete Assignment</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
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
