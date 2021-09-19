import React, { Component } from "react";
import axios from "axios";
import "./TopPerformers.css";
import { Redirect } from "react-router";

export default class TopPerformers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: "",
      year: "",
      rank: "",
      top_empid: "",
      top_empname: "",
      designation: "",
      total_points: "",
      //TopPerformers[],
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
      month,
      year,
      rank,
      top_empid,
      top_empname,
      designation,
      total_points
    } = this.state;

    const data = {
      month: month,
      year: year,
      rank: rank,
      top_empid: top_empid,
      top_empname: top_empname,
      designation: designation,
      total_points: total_points
    };

    console.log(data);
    axios.post("http://localhost:5000/assignments/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          month: month,
          year: year,
          rank: rank,
          top_empid: top_empid,
          top_empname: top_empname,
          designation: designation,
          total_points: total_points,
          redirectToReferrer: true
        });
        // alert("Employee added to assignment, Enter employee numbers to add more employees!");
      }
    });
  };
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/Notices" />;
    }
    return (
      <div className="container">
        <div class="senamain3">
          <h1 class="senahead1c">Top Performers</h1>
          <hr class="senaline1c"></hr>
          <div class="senamain33">
            <a href="">
              <button class="tsendiv4">
                <p class="sentxt4">Calculate Top Performers</p>
              </button>
            </a>

            <form>
              <p class="tsenaic">Year:</p>
              <input
                type="text"
                class="tsenaicc"
                id="year"
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
              />

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <p class="ttsenaic">Month:</p>
                <select
                  defaultValue={"DEFAULT"}
                  class="ttsenaicc"
                  aria-label="Default select example"
                  name="month"
                  onChange={this.handleInputChange}
                >
                  <option value="DEFAULT" disabled></option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </form>
            <hr class="tsenaline1c"></hr>
            <form>
              <p class="senaic">RANK:</p>
              <select
                defaultValue={"DEFAULT"}
                class="senaicc"
                aria-label="Default select example"
                name="rank"
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="01">01</option>
              </select>

              <p class="topsenaic">Emp ID:</p>
              <input
                type="text"
                class="topsenaicc"
                id="top_empid"
                name="top_empid"
                value={this.state.top_empid}
                onChange={this.handleInputChange}
              />

              <p class="senaiiic">Emp Name:</p>
              <input
                type="text"
                class="senaiiicc"
                id="top_empname"
                name="top_empname"
                value={this.state.top_empname}
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
