/*
import React, { Component } from "react";
import axios from "axios";
import "./CreateLeave.css";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";

export default class CreateLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empno: "",
      name: "",
      leave_type: "",
      leave_start_date: "",
      eave_end_date: "",
      no_of_leaves: "",
      leave_message: "",
      leave_status: ""
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
  } 
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
      empno,
      name,
      leave_type,
      leave_start_date,
      leave_end_date,
      no_of_leaves,
      leave_message,
      leave_status
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      leave_type: leave_type,
      leave_start_date: leave_start_date,
      leave_end_date: leave_end_date,
      no_of_leaves: no_of_leaves,
      leave_message: leave_message,
      leave_status: "Need Approval"
    };

    console.log(data);

    axios.post("http://localhost:5000/leave/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          emp_id: "",
          emp_name: "",
          leave_type: "",
          leave_start_date: "",
          leave_end_date: "",
          no_of_leaves: "",
          leave_message: "",
          leave_status: leave_status
        });
        alert("Your Leave is added for approval!");
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
              <p class="ic">Employee ID: </p>
              <input
                type="text"
                class="icc"
                id="empno"
                name="empno"
                value={this.state.empno}
                onChange={this.handleInputChange}
              />
              
              <p class="iic">Name: </p>
              <input
                type="text"
                class="iicc"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              
              <p class="iiic">Leave Type: </p>
              <input
                type="text"
                class="iiicc"
                id="leave_type"
                name="leave_type"
                value={this.state.leave_type}
                onChange={this.handleInputChange}
              />
            <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>Leave Type</label>
                <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="status"
                >
                <option value="DEFAULT" disabled>
                    Choose the reason to leave
                </option>
                <option value="sick">Sick leave</option>
                <option value="casual">Casual leave</option>
                <option value="religious">Religious holidays</option>
                <option value="maternity">Maternity leave</option>
                <option value="paternity">Paternity leavee</option>
                <option value="breavement">Bereavement leave</option>
                <option value="compensatory">Compensatory leave</option>
                <option value="other">Other</option>
                </select>
            </div>

              <p class="ivc">Leave start from: </p>
              <input
                type="date"
                class="ivcc"
                id="leave_start_date"
                name="leave_start_date"
                value={this.state.leave_start_date}
                onChange={this.handleInputChange}
              />
              <p class="vc">Leave End from: </p>
              <input
                type="date"
                class="vcc"
                id="leave_end_date"
                name="leave_end_date"
                value={this.state.leave_end_date}
                onChange={this.handleInputChange}
              />
              <p class="vic">No of Leaves: </p>
              <input
                type="number"
                class="vicc"
                id="no_of_leaves"
                name="no_of_leaves"
                value={this.state.no_of_leaves}
                onChange={this.handleInputChange}
              />
              <p class="viic">Leave Status: </p>
              <input
                type="text"
                class="viicc"
                id="leave_status"
                name="leave_status"
                value={this.state.leave_status}
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
*/
