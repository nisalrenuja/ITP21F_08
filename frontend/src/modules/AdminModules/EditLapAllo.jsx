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
      empno: "",
      status: "",
      date_allocated: "",
      date_received: "",
      lapid: "",
      lapassignment: []
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    const p = this.props.dataFromParent;
    console.log(p);

    axios.get(`http://localhost:5000/lapassignment/${p}`).then(res => {
      if (res.data.success) {
        this.setState({
          lapassignment: res.data.lapass,
          date_received: res.data.lapass[0].date_received,
          status: res.data.lapass[0].status
        });
        console.log(res.data.lapass);
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

    const { date_received, status } = this.state;

    const data = {
      date_received: date_received,
      status: status
    };

    console.log(data);
    axios
      .put(
        `http://localhost:5000/lapassignments/update/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            date_received: date_received,
            status: status
          });
          alert("Updated");
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Work Allocation|Edit Laptop Allocation</h1>
          <hr class="line1c"></hr>
          <div class="main3322">
            {this.state.lapassignment.map((assignment, index) => (
              <div>
                <strong>
                  <center>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Assignment Name - {assignment.assignment_name}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Laptop ID - {assignment.lapid}
                    </p>
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Allocated On -{assignment.date_allocated}
                    </p>
                    <br />

                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Due Date - {this.state.date_received}
                    </p>
                    <p class="vic">Change Due Date: </p>
                    <input
                      type="date"
                      class="vicc"
                      id="date_received"
                      name="date_received"
                      value={this.state.date_received}
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <p style={{ color: "#1687a7", fontSize: "30px" }}>
                      Status - {this.state.status}
                    </p>

                    <br />
                    <p class="viic">
                      Change Status
                      <br />
                      (Completed if done):
                    </p>
                    <select
                      type="text"
                      class="viicc"
                      id="status"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleInputChange}
                    >
                      <option value="Assigned">Assigned</option>
                      <option value="Working">Working</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </center>
                </strong>
              </div>
            ))}

            <br />
            <br />
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
          </div>
        </div>
      </div>
    );
  }
}
