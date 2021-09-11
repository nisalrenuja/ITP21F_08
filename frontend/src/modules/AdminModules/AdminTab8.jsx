import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";

export default class AdminTab8 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    this.retrieveClients();
  }

  retrieveClients() {
    axios.get("http://localhost:5000/clients").then(res => {
      if (res.data.success) {
        this.setState({
          clients: res.data.existingClients
        });

        console.log(this.state.clients);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/client/delete/${id}`).then(res => {
      alert("Deleted Successfully..!!");
      this.retrieveClients();
    });
  };

  filterData(clients, searchKey) {
    const result = clients.filter(
      client =>
        client.clientID.toLowerCase().includes(searchKey) ||
        client.company_name.toLowerCase().includes(searchKey) ||
        client.position.toLowerCase().includes(searchKey) ||
        client.audit_fee.includes(searchKey) ||
        client.added_date.includes(searchKey)
    );
    this.setState({ clients: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/clients").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingClients, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>

        <div class="adminclient">
          <div className="row">
            <div className="h1 mb-3 mt-5 font-weight-bold">
              Client Management
            </div>

            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
              <button class="btn btn-primary btn-lg">
                <a
                  href="/createclient"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Client Fees
                </a>
              </button>
            </div>
            <div className="col-lg-3 mt-2 mb-2"></div>
          </div>
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">Client Profile</h1>
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
              <tr class="bg-info">
                <th scope="col">#</th>
                <th scope="col">Client Id</th>
                <th scope="col">Company Name</th>
                <th scope="col">Position</th>
                <th scope="col">Audit Fee</th>
                <th scope="col">Added Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clients.map((clients, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/displayclient/${clients._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {clients.clientID}
                    </a>
                  </td>
                  <td>{clients.company_name}</td>
                  <td>{clients.position}</td>
                  <td>{clients.audit_fee}</td>
                  <td>{clients.added_date}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/editclient/${clients._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(clients._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addclient"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create New Client
            </a>
          </button>
        </div>
      </div>
    );
  }
}
