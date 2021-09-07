import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";

export default class CreateLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leave_id: "",
      emp_id: "",
      emp_name: "",
      leave_type: "",
      leave_date: "",
      no_of_leaves: "",
      leave_message: "",
      staff: []
    };
  }
  /*componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/staff/ass").then((res) => {
      if (res.data.success) {
        
        this.setState({
          staff: res.data.staff,
          
        });
        console.log(this.state.staff);
        
       
        
      }
    });
  } */
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      leave_id,
      emp_id,
      emp_name,
      leave_type,
      leave_date,
      no_of_leaves,
      leave_message
    } = this.state;

    const data = {
      leave_id: leave_id,
      emp_id: emp_id,
      emp_name: emp_name,
      leave_type: leave_type,
      leave_date: leave_date,
      no_of_leaves: no_of_leaves,
      leave_message: leave_message,
      leave_status: "Approved"
    };

    console.log(data);
    axios.post("http://localhost:5000/leave/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          leave_id: leave_id,
          emp_id: "",
          emp_name: "",
          leave_type: leave_type,
          leave_date: leave_date,
          no_of_leaves: no_of_leaves,
          leave_message: leave_message
        });
        alert("Your Leave ss added for approval!");
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Attendance & Payroll | Request Leave</h1>
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
                  {"\n"}
                  {this.state.staff.map((staff, index) => (
                    <p>
                      {staff.empno}
                      {"\t"}
                      {staff.name}
                    </p>
                  ))}
                </center>
              </div>
              <p class="viiic">Employee No(Staff): </p>
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
                  style={{ marginTop: "795px" }}
                  onClick={this.onSubmit}
                >
                  <i className="fas fa-save"></i>&nbsp;Save
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
