import React, { Component } from "react";
import axios from "axios";
import "./AllReports.css";

export default class AdminTab2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      finalreport: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
    this.retrievefinalreport();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/review").then(res => {
      if (res.data.success) {
        const acceptedData = res.data.existingPosts.filter(
          x => x.directorStatus === "Accepted" && x.isDirectorApprove === true
        );

        this.setState({
          posts: acceptedData
        });
      }
    });
  }

  retrievefinalreport() {
    axios.get("http://localhost:5000/final_report").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport: res.data.finalreport
        });
        console.log(this.state.finalreport);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/review/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrievePosts();
    });
  };

  //final report delete
  onDeleteanu = id => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/final_report/delete/${id}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrievefinalreport();
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

  handleSearchArea2 = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/review").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  //Search
  filterData(finalreport, searchkey) {
    const result = finalreport.filter(
      finalreport =>
        finalreport.execid_review.toLowerCase().includes(searchkey) ||
        finalreport.report.toLowerCase().includes(searchkey)
    );
    this.setState({ finalreport: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/final_report").then(res => {
      if (res.data.success) {
        this.filterData(res.data.finalreport, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="anumainform">
          <h2 class="anuhead1">Reports Management</h2>
          <hr class="anuline1"></hr>

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

          <div class="anudiv3">
            <input class="anuselect1" type="text" name="searchQuery" />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>

          <h2 class="anutah">Pending Report Reviews</h2>
          <table className="table table-hover anutable1">
            <thead class="anuthead">
              <tr>
                <th scope="col">Review ID</th>
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
                    <a
                      href={`/reports/${posts._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {posts.execid_review}
                    </a>
                  </td>
                  <td>{posts.report}</td>
                  <td>{posts.points}</td>
                  <td>{posts.feedback}</td>
                  <td>{posts.status}</td>
                  <td>
                    <a href="#" onClick={() => this.onDelete(posts._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="anudiv51">
            <input
              class="anuselect1"
              type="text"
              name="searchQuery"
              placeholder="Search by Report ID"
              onChange={this.handleSearchArea}
            />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>

          <h2 class="anutah1">Reviewed Assignment Reports </h2>
          <table className="table table-hover anutable2">
            <thead class="anuthead">
              <tr>
                <th scope="col">Report ID</th>
                <th scope="col">Report Name</th>
                <th scope="col">Published Date</th>
                <th scope="col">Approved User</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="anutbody1">
              {this.state.finalreport.map((finalreport, index) => (
                <tr key={index}>
                  <td>{finalreport.execid_review}</td>
                  <td>
                    <a
                      href={`/DisplayReport/${finalreport._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {finalreport.report}
                    </a>
                  </td>
                  <td>{finalreport.date_and_time_upload}</td>
                  <td>{finalreport.approved_user}</td>
                  <td>{finalreport.status}</td>
                  <td>
                    <a href={finalreport.reportPDF} class="icon-btns">
                      <i class="fas fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/UpdateReport/${finalreport._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      href="#"
                      onClick={() => this.onDeleteanu(finalreport._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;
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
