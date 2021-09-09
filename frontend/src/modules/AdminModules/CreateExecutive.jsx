import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
//import "./Review.css";

export default class CreateExecutive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executive: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/executives").then(res => {
      if (res.data.success) {
        this.setState({
          executive: res.data.existingPosts
        });
        console.log(this.state.executive);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/executives/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrievePosts();
    });
  };

  filterData(executive, searchKey) {
    const result = executive.filter(
      executive =>
        executive.exeno.toLowerCase().includes(searchKey) ||
        executive.name.toLowerCase().includes(searchKey) ||
        executive.email.toLowerCase().includes(searchKey) ||
        executive.contact.toLowerCase().includes(searchKey) ||
        executive.dob.toLowerCase().includes(searchKey)
    );
    this.setState({ executive: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/executives").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="adminreview">
          <div className="row">
            <div className="h1 mb-3 mt-5 font-weight-bold">
              User Executive Management Dashboard
            </div>
            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <button className="btn btn-primary btn-lg">
                <a
                  href="/admin"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Reviews
                </a>
              </button>
              <br />
              <br />
              <button class="btn btn-primary btn-lg">
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  Executive Profiles
                </a>
              </button>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <button type="button" class="btn btn-outline-info">
                <a
                  href="/displaymyprofile"
                  style={{ textDecoration: "none", color: "#276678" }}
                >
                  My Personal Profile
                </a>
              </button>
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">All Executives</h1>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
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
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">exeno</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">contact</th>
                <th scope="col">dob</th>
                <th scope="col">gender</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.executive.map((executive, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/executives/${executive._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {executive.exeno}
                    </a>
                  </td>
                  <td>{executive.name}</td>
                  <td>{executive.email}</td>
                  <td>{executive.contact}</td>
                  <td>{executive.dob}</td>
                  <td>{executive.gender}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/edit/${executive._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(executive._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
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
