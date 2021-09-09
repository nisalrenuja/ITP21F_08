import React, { Component } from "react";
import axios from "axios";
import "./AllReports.css";

export default class AdminTab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/review").then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });
        console.log(this.state.posts);
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

          <h2 class="anutah">Pending Report Reviews</h2>
          <table className="table table-hover anutable1">
            <thead class="anuthead">
              <tr>
                <th scope="col">Report Name</th>
                <th scope="col">Points</th>
                <th scope="col">Feedback</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="anutbody1">
              {this.state.posts.map((posts, index) => (
                <tr key={index}>
                  <td>
                    <a href={`/reports/`} style={{ textDecoration: "none" }}>
                      {posts.report}
                    </a>
                  </td>
                  <td>{posts.points}</td>
                  <td>{posts.feedback}</td>
                  <td>{posts.status}</td>
                  <td>
                    <a href={`/edit/${posts.report}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a href="#" onClick={() => this.onDelete(posts.report)}>
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
              <tfoot class="tfoot">
                <a href="/createassignment">
                  <i class="fas fa-plus"></i>&nbsp;New Report
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

          <div class="anudiv31">
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
