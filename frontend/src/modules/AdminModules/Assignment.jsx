import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";

export default class Assignment extends Component {
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
  //retreve data
  componentDidMount() {
    this.retrievePosts();
  }
  //retrieve function
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
        console.log(res.data.deadline);
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
                    <p style={{ color: "black", fontSize: "28px" }}>
                      <b>
                        <u>{assignment.assignment_name}</u>
                      </b>
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Client No - {assignment.client_no}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Allocated On -{assignment.date_of_allocation}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Deadline - {this.state.deadline}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Executive ID - {assignment.execid}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      No of Members - {this.state.l}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Location - {assignment.place_of_engagement}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Distance - {assignment.distance}km
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Progress - {assignment.progress}
                    </p>
                  </center>
                </strong>
              </div>
            ))}

            <br />
            <br />
            <center>
              <h4>
                <u>Employees Assigned and Allowances(Rs)</u>
              </h4>
            </center>
            {this.state.assignment2.map((assignment2, index) => (
              <div>
                <strong>
                  <center>
                    <p style={{ color: "black", fontSize: "20px" }}>
                      Emp No:-{assignment2.employees[0].empno} - Name:-{" "}
                      {assignment2.employees[0].name} - Allowances:-
                      {assignment2.travel_allowance}
                    </p>
                  </center>
                </strong>
              </div>
            ))}
            <center>
              <br />
              <p style={{ color: "black", fontSize: "24px" }}>
                Total Allowance- Rs{this.state.sum}
              </p>
              <br />
              {this.state.assignment.map((assignment, index) => (
                <a href={assignment.scan_invoice_allowance}>
                  <button type="button" class="btn btn-primary">
                    Allowances Document
                  </button>
                </a>
              ))}
            </center>
          </div>
        </div>
      </div>
    );
  }
}
