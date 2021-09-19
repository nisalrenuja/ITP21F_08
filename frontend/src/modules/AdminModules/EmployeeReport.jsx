import React, { Component } from "react";
import axios from "axios";
import "./EmployeeReport.css";

export default class EmployeeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending1: [],
      pending2: [],
      completed: [],
      pendingtotal: "",
      pendingtotal2: "",
      completedtotal: ""
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/review/pe").then(res => {
      if (res.data.success) {
        this.setState({
          pending1: res.data.Pending,
          completed: res.data.Completed,
          pendingtotal: res.data.o,
          completedtotal: res.data.l
        });

        console.log(this.state.pending1);
        console.log(this.state.completed);
      }
    });

    axios.get("http://localhost:5000/pendingassignments").then(res => {
      if (res.data.success) {
        this.setState({
          pending2: res.data.assignmentsassigned,
          pendingtotal2: res.data.count
        });
        console.log(this.state.pending2);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/review/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData1(pending, searchKey) {
    const result = pending.filter(post =>
      post.report.toLowerCase().includes(searchKey)
    );
    this.setState({ pending1: result });
  }

  handleSearchArea1 = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/review/pe").then(res => {
      if (res.data.success) {
        this.filterData1(res.data.Pending, searchKey);
      }
    });
  };

  filterData2(pending, searchKey) {
    const result = pending.filter(post =>
      post.assignment_name.toLowerCase().includes(searchKey)
    );
    this.setState({ pending2: result });
  }

  handleSearchArea2 = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/pendingassignments").then(res => {
      if (res.data.success) {
        this.filterData2(res.data.assignmentsassigned, searchKey);
      }
    });
  };

  filterData3(completed, searchKey) {
    const result = completed.filter(post =>
      post.report.toLowerCase().includes(searchKey)
    );
    this.setState({ completed: result });
  }

  handleSearchArea3 = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/review/pe").then(res => {
      if (res.data.success) {
        this.filterData3(res.data.Completed, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="bumain">
          <h2 class="buhead1">Reports Upload</h2>
          <hr class="buline1"></hr>

          <a href="/empreportupload">
            <button class="budiv4">
              <p class="butxt4">
                <span>NEW REPORT</span>
              </p>
            </button>
          </a>

          <h2 class="butah1">Pending Reports ({this.state.pendingtotal})</h2>
          <div class="butmain">
            <table className="table table-hover butable1">
              <thead class="buthead">
                <tr>
                  <th scope="col">Report Name</th>
                  <th scope="col">Date Submitted</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Current Points</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="butbody1">
                {this.state.pending1.map((pending, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={`/assignment/${pending.report}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pending.report}
                      </a>
                    </td>
                    <td>{pending.sub_date}</td>

                    <td>{pending.deadline}</td>

                    <td>{pending.points}</td>
                    <td>{pending.feedback}</td>
                    <td>{pending.status}</td>
                    <td>
                      <a
                        href={pending.reportPDF}
                        style={{ textDecoration: "none" }}
                      >
                        View Report
                      </a>
                      &nbsp; / &nbsp;
                      <a
                        href={`/empreportedit/${pending._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Edit Report
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="budiv3">
            <input
              class="buselect1"
              type="text"
              onChange={this.handleSearchArea1}
              placeholder="&nbsp;&nbsp;Enter Assignment Name"
            />
            <div className="btn btn-info busearch">Search</div>
          </div>

          <h2 class="butah2">Next Assignments ({this.state.pendingtotal2})</h2>
          <div class="butmain2">
            <table className="table table-hover butable2">
              <thead class="buthead2">
                <tr>
                  <th scope="col">Report Name</th>
                  <th scope="col">Date Submitted</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Current Points</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="butbody1">
                {this.state.pending2.map((pending, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={`/assignment/${pending.assignment_name}`}
                        style={{ textDecoration: "none" }}
                      >
                        {pending.assignment_name}
                      </a>
                    </td>
                    <td>-</td>
                    <td>{pending.deadline}</td>
                    <td>0</td>
                    <td>-</td>
                    <td>{pending.progress}</td>
                    <td>
                      <a
                        href={`/empreportupload`}
                        style={{ textDecoration: "none" }}
                      >
                        Upload Report
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="budiv31">
            <input
              class="buselect1"
              type="text"
              onChange={this.handleSearchArea2}
              placeholder="&nbsp;&nbsp;Enter Assignment Name"
            />
            <div className="btn btn-info busearch">Search</div>
          </div>

          <h2 class="butah3">
            Completed Reports ({this.state.completedtotal})
          </h2>
          <div class="butmain3">
            <table className="table table-hover butable4">
              <thead class="buthead4">
                <tr>
                  <th scope="col" style={{ columnwidth: "px" }}>
                    Report Name
                  </th>
                  <th scope="col">Date Submitted</th>
                  <th scope="col">Reviewed by</th>
                  <th scope="col">Final Points</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="anutbody1">
                {this.state.completed.map((posts, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={`/assignment/${posts.assignment_name}`}
                        style={{ textDecoration: "none" }}
                      >
                        {posts.report}
                      </a>
                    </td>
                    <td>{posts.sub_date}</td>
                    <td>{posts.execid_review}</td>
                    <td>{posts.points}</td>
                    <td>{posts.feedback}</td>
                    <td>{posts.status}</td>
                    <td>
                      <a
                        href={posts.reportPDF}
                        style={{ textDecoration: "none" }}
                      >
                        View Report
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="budiv331">
            <input
              class="buselect1"
              type="text"
              onChange={this.handleSearchArea3}
              placeholder="&nbsp;&nbsp;Enter Assignment Name"
            />
            <div className="btn btn-info busearch">Search</div>
          </div>
        </div>
      </div>
    );
  }
}
