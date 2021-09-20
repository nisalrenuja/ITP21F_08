import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";
export default class AdminTab1 extends Component {
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
        const acceptedData = res.data.existingPosts.filter(
          x => x.init_status === "Accepted" && x.isAdminApprove === true
        );

        this.setState({
          posts: acceptedData
        });
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
      <div className="container ">
        <div class="adminpayroll react-bs-table-pagination">
          <div className="row">
            <div className="d-flex justify-content-between">
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold ">
                <br />
                <h1 class="ap-topic">User Executive Management Dashboard</h1>
              </div>
            </div>
            <hr />
            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Review As a
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/managerreview">
                    Manager
                  </a>
                  <a class="dropdown-item" href="/directorreview">
                    Director
                  </a>
                  <a class="dropdown-item" href="/partnerreview">
                    Partner
                  </a>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-lg aptab-btn">
                <a
                  href="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Back to Main Dashboard
                </a>
              </button>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">Manager Reviews</h1>
            </div>
            <div className="col-lg-2 mt-2 mb-2 search-bar">
              <input
                className="form-control"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              ></input>
            </div>
          </div>
          <table
            className="table table-hover text-center"
            style={{ marginTop: "40px" }}
          >
            <thead class="tblhead">
              <tr>
                <th scope="col"></th>
                <th scope="col">Review Id</th>
                <th scope="col">Report Name</th>
                <th scope="col">Report</th>
                <th scope="col">Points</th>
                <th scope="col">Feedback</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((posts, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/post/${posts._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {posts.execid_review}
                    </a>
                  </td>
                  <td>{posts.report}</td>
                  <td>
                    <a
                      href={posts.reportPDF}
                      style={{ textDecoration: "none" }}
                    >
                      View Report
                    </a>
                  </td>
                  <td>{posts.points}</td>
                  <td>{posts.feedback}</td>
                  <td>{posts.managerStatus}</td>
                  <td>
                    <a href={`/post/${posts._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editmanagerreview/${posts._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(posts._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success">
            <a href="/add" style={{ textDecoration: "none", color: "white" }}>
              Create New Review
            </a>
          </button>
        </div>
      </div>
    );
  }
}
