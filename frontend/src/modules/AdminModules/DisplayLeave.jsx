import React, { Component } from "react";
import axios from "axios";
import "./CreateLeave.css";

export default class DisplayLeave extends Component {
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
      empno: "",
      sum: ""
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
        var sum = 0;
        for (var i = 0; i < res.data.ass2.length; i++) {
          if (res.data.ass2[i].travel_allowance == null) {
            res.data.ass2[i].travel_allowance = 0;
          }
          sum = sum + res.data.ass2[i].travel_allowance;
        }
        this.setState({
          assignment: res.data.ass,
          deadline: res.data.ass[0].deadline,
          progress: res.data.ass[0].progress,
          assignment2: res.data.ass2,
          l: res.data.ass2.length,
          sum: sum
        });
        console.log(res.data.ass2.length);
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
          <h1 class="head1c">Work Allocation | Assignment</h1>
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
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Executive ID - {assignment.execid}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      No of Members - {this.state.l}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Location - {assignment.place_of_engagement}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Distance - {assignment.distance}km
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Progress - {assignment.progress}
                    </p>
                  </center>
                </strong>
              </div>
            ))}

            <br />
            <br />
            <center>
              <h3>Employees and Allowances(Rs)</h3>
            </center>
            {this.state.assignment2.map((assignment2, index) => (
              <div>
                <strong>
                  <center>
                    <p style={{ color: "#1687a7", fontSize: "20px" }}>
                      Emp No:- {assignment2.emp_no} - Allowances:-{" "}
                      {assignment2.travel_allowance}
                    </p>
                  </center>
                </strong>
              </div>
            ))}
            <center>
              <br />
              <p style={{ color: "#1687a7", fontSize: "24px" }}>
                Total Allowance- Rs{this.state.sum}
              </p>
              <br />
            </center>
          </div>
        </div>
      </div>
    );
  }
}
