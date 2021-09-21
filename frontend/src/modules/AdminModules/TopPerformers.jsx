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
                type="number"
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
              <p class="rank1">RANK:</p>
              <select
                defaultValue={"DEFAULT"}
                class="rank1val"
                aria-label="Default select example"
                name="rank"
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="01">01</option>
              </select>

              <p class="rank1id">Emp ID:</p>
              <input
                type="text"
                class="rank1idval"
                id="top_empid"
                name="top_empid"
                value={this.state.top_empid}
                onChange={this.handleInputChange}
              />

              <p class="rank1points">Total Points:</p>
              <input
                type="number"
                class="rank1pointsval"
                id="total_points"
                name="total_points"
                value={this.state.total_points}
                onChange={this.handleInputChange}
              />

              <p class="rank1name">Emp Name:</p>
              <input
                type="text"
                class="rank1nameval"
                id="top_empname"
                name="top_empname"
                value={this.state.top_empname}
                onChange={this.handleInputChange}
              />

              <p class="rank1des">Designation:</p>
              <input
                type="text"
                class="rank1desval"
                id="designation"
                name="designation"
                value={this.state.designation}
                onChange={this.handleInputChange}
              />

              <hr class="rank1divider"></hr>

              <p class="rank2">RANK:</p>
              <select
                defaultValue={"DEFAULT"}
                class="rank2val"
                aria-label="Default select example"
                name="rank"
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="01">01</option>
                <option value="02">02</option>
              </select>

              <p class="rank2id">Emp ID:</p>
              <input
                type="text"
                class="rank2idval"
                id="top_empid"
                name="top_empid"
                value={this.state.top_empid}
                onChange={this.handleInputChange}
              />

              <p class="rank2points">Total Points:</p>
              <input
                type="number"
                class="rank2pointsval"
                id="total_points"
                name="total_points"
                value={this.state.total_points}
                onChange={this.handleInputChange}
              />

              <p class="rank2name">Emp Name:</p>
              <input
                type="text"
                class="rank2nameval"
                id="top_empname"
                name="top_empname"
                value={this.state.top_empname}
                onChange={this.handleInputChange}
              />

              <p class="rank2des">Designation:</p>
              <input
                type="text"
                class="rank2desval"
                id="designation"
                name="designation"
                value={this.state.designation}
                onChange={this.handleInputChange}
              />

              <hr class="rank2divider"></hr>

              <p class="rank3">RANK:</p>
              <select
                defaultValue={"DEFAULT"}
                class="rank3val"
                aria-label="Default select example"
                name="rank"
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </select>

              <p class="rank3id">Emp ID:</p>
              <input
                type="text"
                class="rank3idval"
                id="top_empid"
                name="top_empid"
                value={this.state.top_empid}
                onChange={this.handleInputChange}
              />

              <p class="rank3points">Total Points:</p>
              <input
                type="number"
                class="rank3pointsval"
                id="total_points"
                name="total_points"
                value={this.state.total_points}
                onChange={this.handleInputChange}
              />

              <p class="rank3name">Emp Name:</p>
              <input
                type="text"
                class="rank3nameval"
                id="top_empname"
                name="top_empname"
                value={this.state.top_empname}
                onChange={this.handleInputChange}
              />

              <p class="rank3des">Designation:</p>
              <input
                type="text"
                class="rank3desval"
                id="designation"
                name="designation"
                value={this.state.designation}
                onChange={this.handleInputChange}
              />

              <center>
                <div class="senara998">
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "795px", width: "20%" }}
                    onClick={this.onSubmit}
                  >
                    <i class="senara2" className="fas fa-save"></i>&nbsp;Save
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
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
