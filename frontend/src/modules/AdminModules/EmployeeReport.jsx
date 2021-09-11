import React, { Component } from "react";
import axios from "axios";
import "./EmployeeReport.css";

export default class EmployeeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      completed: [],
      pendingtotal: "",
      completedtotal: ""
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/review/pecom").then(res => {
      if (res.data.success) {
        this.setState({
          pending: res.data.Pending,
          completed: res.data.Completed,
          pendingtotal: res.data.o,
          completedtotal: res.data.l
        });
        console.log(this.state.pending);
        console.log(this.state.completed);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/review/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      post =>
        post.execid_review.toLowerCase().includes(searchKey) ||
        post.report.toLowerCase().includes(searchKey) ||
        post.points.toLowerCase().includes(searchKey) ||
        post.feedback.toLowerCase().includes(searchKey) ||
        post.status.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/review").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="anumain">
          <h2 class="anuhead1">Reports Upload</h2>
          <hr class="anuline1"></hr>

          <a href="/empreportupload">
            <button class="anudiv4">
              <p class="anutxt4">NEW REPORT +</p>
            </button>
          </a>

          <h2 class="butah1">Pending Reports ({this.state.pendingtotal})</h2>
          <table className="table table-hover butable1">
            <thead class="anuthead">
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
            <tbody class="anutbody1">
              {this.state.pending.map((pending, index) => (
                <tr key={index}>
                  <td>
                    <a href={`/reports/`} style={{ textDecoration: "none" }}>
                      {pending.report}
                    </a>
                  </td>
                  <td>{pending.sub_date}</td>
                  <td>{pending.due_date}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="budiv3">
            <input class="anuselect1" type="text" />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>

          <div class="budiv31">
            <input class="anuselect1" type="text" />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>

          <h2 class="butah2">
            Completed Reports ({this.state.completedtotal})
          </h2>
          <table className="table table-hover butable2">
            <thead class="anuthead">
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
                    <a href={`/reports/`} style={{ textDecoration: "none" }}>
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
      </div>
    );
  }
}
