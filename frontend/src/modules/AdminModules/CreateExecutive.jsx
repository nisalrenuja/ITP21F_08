import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
export default class CreateExecutive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executives: []
    };
  }
  componentDidMount() {
    this.retrieveexecutives();
    console.log("hello");
  }

  retrieveexecutives() {
    axios
      .get("http://localhost:5000/executives", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjQ0OGJiYmFmNjM0MDIwYzhjODNmOSIsImlhdCI6MTYzMzk2MjE3NiwiZXhwIjoxNjY1NDk4MTc2fQ.qgMYNjDmXA43zcr2vg4gXvQm-o0p4KnBDpRFOJPCeo8"
        }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            executives: res.data.existingexecutives
          });
          console.log(this.state.executives);
        }
      });
  }

  notify = () => {
    toast.success("Deleted Successfully !!!");
  };

  onDelete = id => {
    axios.delete(`http://localhost:5000/executives/delete/${id}`).then(res => {
      this.retrieveexecutives();
      this.notify();
    });
  };

  // filterData(executives, searchKey) {
  //  const result = executives.filter(
  //      (executives) =>
  //        executives.username.toLowerCase().includes(searchKey) ||
  //        executives.email.toLowerCase().includes(searchKey)
  //    );
  //    this.setState({ executives: result });
  // }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/executives").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingexecutives, searchKey);
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
                <h1 class="ap-topic">User Management Dashboard </h1>
              </div>
            </div>
            <hr />
            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
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
              <h1 className="h3 mb-3 font-weight-normal">All Users</h1>
            </div>
          </div>
          <table
            className="table table-hover text-center"
            style={{ marginTop: "40px" }}
          >
            <thead class="tblhead">
              <tr>
                <th scope="col"></th>
                <th scope="col">User Number</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.executives.map((executives, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/displayexecutive/${executives._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {executives.exeno}
                    </a>
                  </td>
                  <td>{executives.username}</td>
                  <td>{executives.email}</td>

                  <td>
                    <a
                      href={`/editexecutive/${executives._id}`}
                      data-tip
                      data-for="EditUser"
                    >
                      <i class="far fa-edit"></i>
                    </a>
                    <ReactTooltip id="EditUser" place="top">
                      <span>Edit Current User</span>
                    </ReactTooltip>
                    &nbsp; &nbsp; &nbsp;
                    <a
                      href="#"
                      data-tip
                      data-for="DeleteUser"
                      onClick={() =>
                        confirmAlert({
                          title: "Confirm to Delete",
                          message: "Are you sure to do this ?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => this.onDelete(executives._id)
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
                    <ReactTooltip id="DeleteUser" place="top">
                      <span>Delete Current User</span>
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
