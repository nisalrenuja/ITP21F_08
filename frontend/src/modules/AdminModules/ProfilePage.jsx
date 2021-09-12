import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";
export default class AdminTab1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executive: []
    };
  }

  componentDidMount() {
    this.retrieveexecutive();
  }

  retrieveexecutive() {
    axios.get("http://localhost:5000/executive").then(res => {
      if (res.data.success) {
        this.setState({
          executive: res.data.existingexecutive
        });
        console.log(this.state.executive);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/executive/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrieveexecutive();
    });
  };

  // filterData(posts, searchKey) {
  //   const result = posts.filter(
  //      (post) =>
  //       post.execid_review.toLowerCase().includes(searchKey) ||
  //      post.report.toLowerCase().includes(searchKey) ||
  //       post.points.toLowerCase().includes(searchKey) ||
  //       post.feedback.toLowerCase().includes(searchKey) ||
  //       post.status.toLowerCase().includes(searchKey)
  //   );
  //   this.setState({ posts: result });
  // }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/executive").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingexecutive, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container ">
        <div class="adminreview react-bs-table-pagination">
          <div className="row">
            <div className="ap-topic">
              User Executive Management | Executive Profiles
            </div>

            <hr />
            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/managerreview"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Manager Review
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/profilepage"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Executive Board Profiles
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-lg aptab-btn">
                <a
                  href="/createexecutive"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Current Users
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
              <h1 className="h3 mb-3 font-weight-normal">Profiles</h1>
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
          <table className="table table-hover" style={{ marginTop: "30px" }}>
            <thead className="tblhead">
              <tr class="">
                <th scope="col"></th>
                <th scope="col">Executive Id</th>
                <th scope="col">Executive Name</th>
                <th scope="col">Position</th>
                <th scope="col">Email</th>
                <th scope="col">Contact Number</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.executive.map((executive, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{executive.exeno}</td>
                  <td>{executive.name}</td>
                  <td>{executive.position}</td>
                  <td>{executive.email}</td>
                  <td>{executive.contact}</td>
                  <td>
                    <a href={`/postprofile/${executive._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editprofile/${executive._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(executive._id)}>
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success">
            <a
              href="/createprofile"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create New Review
            </a>
          </button>
        </div>
      </div>
    );
  }
}
