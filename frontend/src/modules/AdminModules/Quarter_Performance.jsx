import React, { Component } from "react";
import axios from "axios";
import "./Quarter_Performance.css";
import { Redirect } from "react-router";

export default class QuarterPerformance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quarter_name: "",
      year: "",
      quarter_no: "",
      from: "",
      to: "",
      approved_reports: "",
      redirectToReferrer: false
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/performance").then(res => {
      if (res.data.success) {
        this.setState({
          Performances: res.data.staff
        });
        console.log(this.state.quarter_name);
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
      quarter_name,
      year,
      quarter_no,
      from,
      to,
      approved_reports
    } = this.state;

    const data = {
      quarter_name: quarter_name,
      year: year,
      quarter_no: quarter_no,
      from: from,
      to: to,
      approved_reports: approved_reports
      //progress: "Assigned"
    };

    console.log(data);
    axios.post("http://localhost:5000/performance/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          quarter_name: quarter_name,
          year: year,
          quarter_no: quarter_no,
          from: from,
          to: to,
          approved_reports: approved_reports,
          redirectToReferrer: true
        });
        //alert("Employee added to assignment, Enter employee number");
      }
    });
  };
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/Performance" />;
    }
    return (
      <div className="container">
        <div class="anumain3">
          <h1 class="anuhead1c">Reports Management | Quarterly Performance </h1>
          <hr class="anuline1c"></hr>
          <div class="anumain33">
            <form class="anuform">
              <p class="anuic">Quarter :</p>
              <input
                type="text"
                class="anuicc"
                id="quarter_name"
                name="quarter_name"
                value={this.state.quarter_name}
                onChange={this.handleInputChange}
              />
              <p class="anuiic">Year :</p>
              <input
                type="text"
                class="anuiicc"
                id="year"
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
              />

              <p class="anuiiic">Quarter No :</p>
              <input
                type="number"
                class="anuiiicc"
                id="quarter_no"
                name="quarter_no"
                value={this.state.quarter_no}
                onChange={this.handleInputChange}
              />

              <p class="anuvic">From : </p>
              <input
                type="date"
                class="anuvicc"
                id="from"
                name="from"
                value={this.state.from}
                onChange={this.handleInputChange}
              />

              <p class="anujvic">To : </p>
              <input
                type="date"
                class="anujvicc"
                id="to"
                name="to"
                value={this.state.to}
                onChange={this.handleInputChange}
              />

              <p class="anujivic">No. of Approved Reports : </p>
              <input
                type="number"
                class="anujivicc"
                id="approved_reports"
                name="approved_reports"
                value={this.state.approved_reports}
                onChange={this.handleInputChange}
              />

              <button
                className="btn btn-success"
                type="submit"
                style={{
                  marginLeft: "350px",
                  marginTop: "475px",
                  width: "10%"
                }}
                onClick={this.onSubmit}
              >
                <i className="fas fa-save"></i>&nbsp;Save
              </button>

              <a href="/admin">
                <button
                  className="btn btn-secondary"
                  type="submit"
                  style={{
                    marginLeft: "10px",
                    marginTop: "475px",
                    width: "10%",
                    background: "#D11A2A"
                  }}
                >
                  Cancel
                </button>
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
