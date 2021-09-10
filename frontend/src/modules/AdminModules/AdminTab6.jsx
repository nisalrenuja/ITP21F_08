import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./AllPayrolls.css";

export default class AdminTab1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //posts will be stated as an array
      payrolls: []
    };
  }

  //A method in react life cycle
  componentDidMount() {
    this.retrievePayrolls();
  }

  retrievePayrolls() {
    //end point
    axios.get("http://localhost:5000/payrolls").then(res => {
      if (res.data.success) {
        this.setState({
          payrolls: res.data.existingPayrolls
        });

        console.log(this.state.payrolls);
      }
    });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/payroll/delete/${id}`).then(res => {
      alert("Deleted Successfully!!");
      this.retrievePayrolls();
    });
  };

  filterData(payrolls, searchKey) {
    const result = payrolls.filter(
      payroll =>
        payroll.empno.toLowerCase().includes(searchKey) ||
        payroll.name.toLowerCase().includes(searchKey) ||
        payroll.position.toLowerCase().includes(searchKey) ||
        payroll.basic_salary.includes(searchKey)
    );
    this.setState({ payrolls: result });
  }

  handleSearchArea = e => {
    //to check whether this method invokes
    //console.log(e.currentTarget.value);

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/payrolls").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPayrolls, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>

        <div className="adminpayroll">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2 font-weight-bold">
              <h1>Payroll Management </h1>
              <br></br>
            </div>

            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
              <button class="btn btn-primary btn-lg">
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  Attendance
                </a>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-primary btn-lg">
                <a
                  href="/allleaves"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Leaves
                </a>
              </button>
              <br></br> <br></br>
            </div>

            <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">All Salary Details</h1>
            </div>

            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                name="searchQuery"
                onChange={this.handleSearchArea}
              ></input>
            </div>
          </div>

          <table className="table table-hover" style={{ marginTop: "40px" }}>
            <thead>
              <tr class="bg-info">
                <th scope="col"> #</th>
                <th scope="col"> Employee ID</th>
                <th scope="col"> Name</th>
                <th scope="col"> Position</th>
                <th scope="col"> Basic Salary</th>
                <th scope="col"> Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.payrolls.map((payrolls, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <a
                      href={`/displaypayroll/${payrolls._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {payrolls.empno}
                    </a>
                  </td>
                  <td>{payrolls.name}</td>
                  <td>{payrolls.position}</td>
                  <td>{payrolls.basic_salary}</td>

                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/editpayroll/${payrolls._id}`}
                    >
                      <i className="fas fa-edit"></i> &nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(payrolls._id)}
                    >
                      <i className="fas fa-trash-alt"></i> &nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success">
            <a
              href="/addpayroll"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add New
            </a>
          </button>
        </div>
      </div>
    );
  }
}
