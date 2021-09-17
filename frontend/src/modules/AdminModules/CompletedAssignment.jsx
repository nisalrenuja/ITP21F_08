import React, { Component } from "react";
import axios from "axios";
import "./PendingAssignment.css";

export default class PendingAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: []
    };
  }
  componentDidMount() {
    this.retrieveAssignments();
  }
  retrieveAssignments() {
    const p = this.props.dataFromParent;
    console.log(p);

    axios.get(`http://localhost:5000/checkcompleted/${p}`).then(res => {
      if (res.data.success) {
        this.setState({
          assignment: res.data.check
        });
        console.log(this.state.assignment);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div class="main">
          <h2 class="heademp">Completed Assignments</h2>
          <hr class="lineemp"></hr>
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

          <table className="table table-hover budtable1">
            <thead class="thead">
              <tr>
                <th scope="col">
                  Assignment <br /> Name
                </th>
                <th scope="col">
                  Client <br /> Number
                </th>
                <th scope="col">
                  Executive <br /> Number
                </th>
                <th scope="col">
                  Place of <br /> Engagement
                </th>
                <th scope="col">
                  Commencement <br /> Date
                </th>
                <th scope="col">Deadline</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="tbody1">
              {this.state.assignment.map((employees, index) => (
                <tr key={index}>
                  <td>
                    <a
                      href={`/assignment/${employees.assignment_name}`}
                      style={{ textDecoration: "none" }}
                    >
                      {employees.assignment_name}
                    </a>
                  </td>
                  <td>{employees.client_no}</td>
                  <td>{employees.execid}</td>
                  <td>{employees.place_of_engagement}</td>
                  <td>{employees.date_of_allocation}</td>
                  <td>{employees.deadline}</td>
                  <td>
                    <a href={``}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp;
                    <a href={`/EditEmployee/${employees._id}`}>
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
              <a href="/InsertEmployee">
                <i class="fas fa-plus"></i>&nbsp;New Employee
              </a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
