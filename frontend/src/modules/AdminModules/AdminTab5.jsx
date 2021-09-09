import React, { Component } from "react";
import axios from "axios";
import "./AllNotices.css";

export default class AdminTab5 extends Component {
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
        <div class="senmain">
          <h2 class="senhead1">Notice Management</h2>
          <hr class="senline1"></hr>
          <a href="/CreateNotice">
            <button class="sendiv4">
              <p class="sentxt4">NEW NOTICE +</p>
            </button>
          </a>

          <div class="sendiv3">
            <p class="sentxt3">Filter by</p>
            <input class="senselect1" type="text" />
            <a className="btn btn-info sensearch">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>
          <h2 class="sentah">Recent Notices</h2>
          <table className="table table-hover sentable1">
            <thead class="senthead">
              <tr>
                <th scope="col">Notice ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Notice Topic</th>
                <th scope="col">Published Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="sentbody1">
              {this.state.assignments.map((notices, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {notices.assignment_name}
                    </a>
                  </td>
                  <td>{notices.notice_id}</td>

                  <td>{notices.progress}</td>
                  <td>{notices.deadline}</td>

                  <td>
                    <a href={`/edit/${notices._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a
                      href="#"
                      onClick={() => this.onDelete(notices.assignment_name)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="tfoot"></tfoot>
          </table>

          <h2 class="sentah1">Previous Notices</h2>

          <div class="sendiv31">
            <p class="sentxt3"></p>
            <input class="senselect1" type="text" />
            <a className="btn btn-info sensearch1">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>

          <table className="table table-hover sentable2">
            <thead class="senthead">
              <tr>
                <th scope="col">Notice ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Notice Topic</th>
                <th scope="col">Published Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="sentbody1">
              {this.state.assignments.map((notices, index) => (
                <tr key={index}>
                  <td>
                    <a href={``} style={{ textDecoration: "none" }}>
                      {notices.assignment_name}
                    </a>
                  </td>
                  <td>{notices.notice_id}</td>

                  <td>{notices.progress}</td>
                  <td>{notices.deadline}</td>

                  <td>
                    <a href={`/edit/${notices._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a
                      href="#"
                      onClick={() => this.onDelete(notices.assignment_name)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
