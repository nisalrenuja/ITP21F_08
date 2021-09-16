import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";
import { Redirect } from "react-router";

export default class CreateAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment_name: "",
      client_no: "",
      execid: "",
      place_of_engagement: "",
      distance: "",
      date_of_allocation: "",
      deadline: "",
      emp_no: "",
      staff: [],
      redirectToReferrer: false
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/staff/ass").then(res => {
      if (res.data.success) {
        this.setState({
          staff: res.data.staff
        });
        console.log(this.state.staff);
      }
    });
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  onCheck = name => {
    console.log(name);
    axios.get(`http://localhost:5000/checkassigned/${name}`).then(res => {
      if (res.data.success) {
        alert("Employee is Assigned to " + res.data.l + " Assignment/s!");
      }
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const {
      assignment_name,
      client_no,
      execid,
      place_of_engagement,
      distance,
      date_of_allocation,
      deadline,
      emp_no
    } = this.state;

    console.log(emp_no);
    const data = {
      assignment_name: assignment_name,
      client_no: client_no,
      execid: execid,
      place_of_engagement: place_of_engagement,
      distance: distance,
      date_of_allocation: date_of_allocation,
      deadline: deadline,
      emp_no: emp_no,
      progress: "Assigned"
    };

    axios.get(`http://localhost:5000/staff/check/${emp_no}`).then(res => {
      if (res.data.success) {
        if (res.data.staffs.length !== 0) {
          axios
            .post("http://localhost:5000/assignments/save/", data)
            .then(res => {
              if (res.data.success) {
                this.setState({
                  assignment_name: assignment_name,
                  client_no: client_no,
                  execid: execid,
                  place_of_engagement: place_of_engagement,
                  distance: distance,
                  date_of_allocation: date_of_allocation,
                  deadline: deadline,
                  emp_no: "",
                  redirectToReferrer: true
                });
                alert(
                  "Employee added to assignment, Enter employee numbers to add more employees!"
                );
              }
            });
        } else {
          alert("Invalid Employee Number, Please enter again!");
        }
      }
    });
  };
  filterData(staff, searchKey) {
    console.log(searchKey);
    const result = staff.filter(staff =>
      staff.name.toLowerCase().includes(searchKey)
    );
    this.setState({ staff: result });
  }
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/staff/ass").then(res => {
      if (res.data.success) {
        this.filterData(res.data.staff, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Work Allocation | Create Assignment</h1>
          <hr class="line1c"></hr>
          <div class="main33">
            <form>
              <p class="ic">Assignment Name: </p>
              <input
                type="text"
                class="icc"
                id="assignment_name"
                name="assignment_name"
                value={this.state.assignment_name}
                onChange={this.handleInputChange}
              />
              <p class="iic">Client No: </p>
              <input
                type="text"
                class="iicc"
                id="client_no"
                name="client_no"
                value={this.state.client_no}
                onChange={this.handleInputChange}
              />
              <p class="iiic">Executive ID: </p>
              <input
                type="text"
                class="iiicc"
                id="execid"
                name="execid"
                value={this.state.execid}
                onChange={this.handleInputChange}
              />
              <p class="ivc">Location: </p>
              <input
                type="text"
                class="ivcc"
                id="place_of_engagement"
                name="place_of_engagement"
                value={this.state.place_of_engagement}
                onChange={this.handleInputChange}
              />
              <p class="vc">Distance(km): </p>
              <input
                type="number"
                class="vcc"
                id="distance"
                name="distance"
                value={this.state.distance}
                onChange={this.handleInputChange}
              />
              <p class="vic">Date Allocating: </p>
              <input
                type="date"
                class="vicc"
                id="date_of_allocation"
                name="date_of_allocation"
                value={this.state.date_of_allocation}
                onChange={this.handleInputChange}
              />
              <p class="viic">Deadline: </p>
              <input
                type="date"
                class="viicc"
                id="deadline"
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleInputChange}
              />
              <div class="staff">
                <center>
                  <h4>Click on staff to check status</h4>
                  <input
                    type="text"
                    placeholder="Search Name"
                    name="searchQuery"
                    onChange={this.handleSearchArea}
                  />
                  {"\n"}
                  <ul>
                    {this.state.staff.map((staff, index) => (
                      <li style={{ backgroundColor: "#c4c4c4" }}>
                        {" "}
                        <strong>Emp No-</strong>
                        {staff.empno}
                        {"\t"} <strong>Name-</strong>
                        {staff.name}
                        {"\t"}
                        <a
                          href="#"
                          onClick={() => this.onCheck(staff.empno)}
                          style={{
                            backgroundColor: "#1687a7",
                            paddingRight: "5px",
                            color: "white"
                          }}
                        >
                          Check
                        </a>
                      </li>
                    ))}
                  </ul>
                </center>
              </div>
              <p class="viiic">Employee No(Staff): </p>
              <p class="ix">
                (Enter Employee numbers and save employees one by one, click
                Done after assigning all)
              </p>

              <input
                type="text"
                class="viiicc"
                id="emp_no"
                name="emp_no"
                value={this.state.emp_no}
                onChange={this.handleInputChange}
              />
              <center>
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ marginTop: "795px", width: "20%" }}
                  onClick={this.onSubmit}
                >
                  <i className="fas fa-save"></i>&nbsp;Save
                </button>
                <a href="/admin">
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    style={{ marginTop: "795px", width: "20%" }}
                  >
                    Done
                  </button>
                </a>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
