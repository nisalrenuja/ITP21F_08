import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";

export default class EditAssignments extends Component {
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
      progress: "",
      assignment: [],
      assignment2: [],
      travel_allowance: "",
      empno: ""
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    const p = this.props.dataFromParent;
    console.log(p);

    axios.get(`http://localhost:5000/assignment/${p}`).then(res => {
      if (res.data.success) {
        this.setState({
          assignment: res.data.ass,
          deadline: res.data.ass[0].deadline,
          progress: res.data.ass[0].progress,
          assignment2: res.data.ass2
        });
        console.log(res.data.ass2);
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
  handleInputChange2 = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { deadline, progress } = this.state;

    const data = {
      deadline: deadline,

      progress: progress
    };

    console.log(data);
    axios
      .put(
        `http://localhost:5000/assignments/update/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            deadline: deadline,
            progress: progress
          });
          alert("Updated");
        }
      });
  };
  onSubmit2 = e => {
    e.preventDefault();

    const { empno, travel_allowance } = this.state;

    const data = {
      empno: empno,

      travel_allowance: travel_allowance
    };

    console.log(data);
    axios
      .put(
        `http://localhost:5000/assignments/updateallo/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            empno: "",
            travel_allowance: ""
          });
          alert("Updated Allowance");
          this.retrievePosts();
        }
      });
  };
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Work Allocation | Edit Assignment</h1>
          <hr class="line1c"></hr>
          <div class="main332">
            {this.state.assignment.map((assignment, index) => (
              <div>
                <strong>
                  <center>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Assignment Name - {assignment.assignment_name}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Client No - {assignment.client_no}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Allocated On -{assignment.date_of_allocation}
                    </p>
                    <br />

                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Deadline - {this.state.deadline}
                    </p>
                    <p class="vic">Change Deadline: </p>
                    <input
                      type="date"
                      class="vicc"
                      id="deadline"
                      name="deadline"
                      value={this.state.deadline}
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Progress - {this.state.progress}
                    </p>

                    <br />
                    <p class="viic">Change Progress: </p>
                    <input
                      type="text"
                      class="viicc"
                      id="progress"
                      name="progress"
                      value={this.state.progress}
                      onChange={this.handleInputChange}
                    />
                  </center>
                </strong>
              </div>
            ))}

            <br />
            <button
              className="btn btn-success"
              type="submit"
              style={{ marginTop: "135px", marginLeft: "700px" }}
              onClick={this.onSubmit}
            >
              <i className="fas fa-save"></i>&nbsp;Save
            </button>
            <br />
            <br />
            <br />
            <center>
              <h3>Allowances to Employees(Rs)</h3>
            </center>
            {this.state.assignment2.map((assignment2, index) => (
              <div>
                <strong>
                  <center>
                    <p style={{ color: "#1687a7", fontSize: "20px" }}>
                      {assignment2.emp_no} :- {assignment2.travel_allowance}
                    </p>
                  </center>
                </strong>
              </div>
            ))}
            <br />
            <h4>Edit Allowances to Employees(Rs)(Enter one by one)</h4>
            <input
              type="text"
              id="empno"
              name="empno"
              placeholder="Enter empno"
              value={this.state.empno}
              onChange={this.handleInputChange2}
            />
            <input
              type="text"
              id="travel_allowance"
              name="travel_allowance"
              placeholder="Enter allowance"
              value={this.state.travel_allowance}
              onChange={this.handleInputChange2}
            />
            <br />
            <button
              className="btn btn-success"
              type="submit"
              onClick={this.onSubmit2}
            >
              Set
            </button>
          </div>
        </div>
      </div>
    );
  }
}
