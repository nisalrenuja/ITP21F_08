import React, { Component } from "react";
import axios from "axios";
import "./AllReports.css";

export default class CompanyPerfomance extends Component {
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
        <div class="anumain">
          <h2 class="anuhead1">Reports Management</h2>
          <hr class="anuline1"></hr>

          <a href="/newreport">
            <button class="anudiv4">
              <p class="anutxt4">NEW REPORT +</p>
            </button>
          </a>

          <a href="/allreports">
            <button class="anudiv1">
              <p class="anutxt1">All Reports</p>
            </button>
          </a>

          <a href="/companyperformance">
            <button class="anudiv2">
              <p class="anutxt2">Company Performance</p>
            </button>
          </a>

          <h2 class="anutah">Reports</h2>
          <table className="table table-hover anutable1">
            <thead class="anuthead">
              <tr>
                <th scope="col">Quarter</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">No.of Approved Reports</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="anutbody1">
              {this.state.assignments.map((assignments, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {assignments.assignment_name}
                    </a>
                  </td>
                  <td>{assignments.client_no}</td>
                  <td>{assignments.deadline}</td>
                  <td>{assignments.deadline}</td>
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
              <tfoot class="tfoot">
                <a href="/createassignment">
                  <i class="fas fa-plus"></i>&nbsp;New Record Calculation
                </a>
              </tfoot>
            </tbody>
          </table>

          <div class="anudiv3">
            <input class="anuselect1" type="text" />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>
        </div>
      </div>
    );
  }
}
