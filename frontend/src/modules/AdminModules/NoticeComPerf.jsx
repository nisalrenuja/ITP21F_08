import React, { Component } from "react";
import axios from "axios";
import "./NoticeComPerf.css";
import { Redirect } from "react-router";

export default class CreateNotice extends Component {
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
        alert("Assigned to " + res.data.l + " assignment/s!");
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

    console.log(data);
    axios.post("http://localhost:5000/assignments/save/", data).then(res => {
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
  };
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/allassignments" />;
    }
    return (
      <div className="container">
        <div class="senamain3">
          <h1 class="senahead1c">Top Performers</h1>
          <hr class="senaline1c"></hr>
          <div class="senamain33">
            <form>
              <p class="senaic">Notice ID:</p>
              <input
                type="text"
                class="senaicc"
                id="assignment_name"
                name="assignment_name"
                value={this.state.assignment_name}
                onChange={this.handleInputChange}
              />
              <p class="senaiic">Emp ID:</p>
              <input
                type="text"
                class="senaiicc"
                id="client_no"
                name="client_no"
                value={this.state.client_no}
                onChange={this.handleInputChange}
              />

              <p class="senaiiic">Emp Name:</p>
              <input
                type="text"
                class="senaiiicc"
                id="execid"
                name="execid"
                value={this.state.execid}
                onChange={this.handleInputChange}
              />
              <p class="senaivc">Notice Topic:</p>
              <input
                type="text"
                class="senaivcc"
                id="place_of_engagement"
                name="place_of_engagement"
                value={this.state.place_of_engagement}
                onChange={this.handleInputChange}
              />
              <p class="senavc">Content:</p>
              <input
                type="number"
                class="senavcc"
                id="distance"
                name="distance"
                value={this.state.distance}
                onChange={this.handleInputChange}
              />
              <p class="senavcattach">Attachments:</p>
              <input
                type="number"
                class="senavccattach"
                id="distance"
                name="distance"
                value={this.state.distance}
                onChange={this.handleInputChange}
              />
              <p class="senavic">Publishing Date: </p>
              <input
                type="date"
                class="senavicc"
                id="date_of_allocation"
                name="date_of_allocation"
                value={this.state.date_of_allocation}
                onChange={this.handleInputChange}
              />
              <p class="senaviic">Delete Notice on: </p>
              <input
                type="date"
                class="senaviicc"
                id="deadline"
                name="deadline"
                value={this.state.deadline}
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
                    Cancel
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
