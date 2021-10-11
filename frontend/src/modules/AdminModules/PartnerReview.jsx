import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
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
          x => x.directorStatus === "Accepted" && x.isDirectorApprove === true
        );
        this.setState({
          posts: acceptedData
        });
        console.log(this.state.posts);
      }
    });
  }

  notify = () => {
    toast.success("Deleted Successfully !!!");
  };

  onDelete = id => {
    axios.delete(`http://localhost:5000/review/delete/${id}`).then(res => {
      this.retrievePosts();
      this.notify();
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      post =>
        post.execid_review.toLowerCase().includes(searchKey) ||
        post.report.toLowerCase().includes(searchKey) ||
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
        <div class="adminreview react-bs-table-pagination">
          <div className="row">
            <div className="ap-topic">User Executive Management Dashboard</div>
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
              <h1 className="h3 mb-3 font-weight-normal">Partner Reviews</h1>
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
            style={{ marginTop: "30px" }}
          >
            <thead className="tblhead">
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
                  {posts.partnerStatus === "Accepted" && (
                    <td>
                      <a
                        href={`/editpartnerreview/${posts._id}`}
                        style={{ textDecoration: "none" }}
                        data-tip
                        data-for="EditPar"
                      >
                        <b style={{ color: "green" }}>Accepted</b>
                      </a>
                    </td>
                  )}
                  {posts.partnerStatus === "Rejected" && (
                    <td>
                      <a
                        href={`/editpartnerreview/${posts._id}`}
                        style={{ textDecoration: "none" }}
                        data-tip
                        data-for="EditPar"
                      >
                        <b style={{ color: "red" }}>Rejected</b>
                      </a>
                    </td>
                  )}
                  {posts.partnerStatus === "Pending" && (
                    <td>
                      <a
                        href={`/editpartnerreview/${posts._id}`}
                        style={{ textDecoration: "none" }}
                        data-tip
                        data-for="EditPar"
                      >
                        <b style={{ color: "blue" }}>Pending</b>
                      </a>
                    </td>
                  )}
                  {/* <td>
                    <a
                      href={`/editpartnerreview/${posts._id}`}
                      style={{ textDecoration: "none" }}
                      data-tip
                      data-for="EditPar"
                    >
                      {posts.partnerStatus}
                    </a>
                    <ReactTooltip id="EditPar" place="top">
                      <span>Edit Partner Review</span>
                    </ReactTooltip>
                  </td> */}
                  <td>
                    <a href={`/post/${posts._id}`} data-tip data-for="ViewPar">
                      <i class="far fa-eye"></i>
                    </a>
                    <ReactTooltip id="ViewPar" place="top">
                      <span>View Partner Review</span>
                    </ReactTooltip>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      href={`/editpartnerreview/${posts._id}`}
                      data-tip
                      data-for="EditPar"
                    >
                      <i class="far fa-edit"></i>
                    </a>
                    <ReactTooltip id="EditPar" place="top">
                      <span>Edit Partner Review</span>
                    </ReactTooltip>
                    &nbsp; &nbsp; &nbsp;
                    <a
                      href="#"
                      data-tip
                      data-for="DeletePar"
                      onClick={() =>
                        confirmAlert({
                          title: "Confirm to Delete",
                          message: "Are you sure to do this ?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => this.onDelete(posts._id)
                            },
                            {
                              label: "No",
                              onClick: () => window.close
                            }
                          ]
                        })
                      }
                    >
                      <i class="far fa-trash-alt"></i>
                    </a>
                    <ReactTooltip id="DeletePar" place="top">
                      <span>Delete Partner Review</span>
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button className="btn btn-success">
            <a href="/add" style={{ textDecoration: "none", color: "white" }}>
              Create New Review
            </a>
          </button> */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"dark"}
            type="success"
          />
        </div>
      </div>
    );
  }
}
