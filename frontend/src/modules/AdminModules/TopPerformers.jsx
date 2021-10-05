import React, { Component } from "react";
import axios from "axios";
import "./TopPerformers.css";
import { Redirect } from "react-router";

export default class TopPerformers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: "",
      rank1: "",
      top_empid1: "",
      top_empname1: "",
      total_points1: "",
      rank2: "",
      top_empid2: "",
      top_empname2: "",
      total_points2: "",
      rank3: "",
      top_empid3: "",
      top_empname3: "",
      total_points3: "",
      existingTopPerformers: []
    };
  }

  onDelete = id => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/TopPerformers/delete/${id}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrieveexistingTopPerformers();
      });
  };

  componentDidMount() {
    this.retrieveexistingTopPerformers();
  }
  retrieveexistingTopPerformers() {
    axios.get("http://localhost:5000/TopPerformers").then(res => {
      if (res.data.success) {
        this.setState({
          existingTopPerformers: res.data.existingTopPerformers
        });
        console.log(this.state.existingTopPerformers);
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
      year,
      month,
      rank1,
      top_empid1,
      top_empname1,
      total_points1,
      rank2,
      top_empid2,
      top_empname2,
      total_points2,
      rank3,
      top_empid3,
      top_empname3,
      total_points3
    } = this.state;

    const data = {
      year: year,
      month: month,
      rank1: rank1,
      top_empid1: top_empid1,
      top_empname1: top_empname1,
      total_points1: total_points1,
      rank2: rank2,
      top_empid2: top_empid2,
      top_empname2: top_empname2,
      total_points2: total_points2,
      rank3: rank3,
      top_empid3: top_empid3,
      top_empname3: top_empname2,
      total_points3: total_points3
    };

    console.log(data);
    axios.post("http://localhost:5000/TopPerformers/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          year: year,
          month: month,
          rank1: rank1,
          top_empid1: top_empid1,
          top_empname1: top_empname1,
          total_points1: total_points1,
          rank2: rank2,
          top_empid2: top_empid2,
          top_empname2: top_empname2,
          total_points2: total_points2,
          rank3: rank3,
          top_empid3: top_empid3,
          top_empname3: top_empname2,
          total_points3: total_points3,
          redirectToReferrer: true
        });
        //alert("Employee added to assignment, Enter employee number");
      }
    });
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AdminTab5" />;
    }
    return (
      <div className="container">
        <div class="senmain">
          <h2 class="senhead1">Top Performers</h2>
          <hr class="senline1"></hr>
          <a href="">
            <button class="sendiv4">
              <p class="sentxt4">Retrieve</p>
            </button>
          </a>

          <div>
            <h2 class="sentahss">Current Top Performers</h2>

            <form>
              <p class="ketchup">Year:</p>
              <input
                type="number"
                class="sauce"
                id="year"
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
              />

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <p class="berry">Month:</p>
                <select
                  defaultValue={"DEFAULT"}
                  class="cherry"
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

            <table className="table table-hover sentable1">
              <thead class="senthead">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Emp ID</th>
                  <th scope="col">Emp Name</th>
                  <th scope="col">Total Points</th>
                </tr>
              </thead>
              <tbody class="sentbody1">
                {this.state.existingTopPerformers.map(
                  (existingTopPerformers, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href={`/DisplayTopPerformer/${existingTopPerformers._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {existingTopPerformers.rank1}
                        </a>
                      </td>
                      <td>{existingTopPerformers.top_empid1}</td>

                      <td>{existingTopPerformers.top_empname1}</td>
                      <td>{existingTopPerformers.total_points1}</td>
                    </tr>
                  )
                )}
              </tbody>

              <tbody class="sentbody1">
                {this.state.existingTopPerformers.map(
                  (existingTopPerformers, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href={`/DisplayTopPerformer/${existingTopPerformers._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {existingTopPerformers.rank2}
                        </a>
                      </td>
                      <td>{existingTopPerformers.top_empid2}</td>

                      <td>{existingTopPerformers.top_empname2}</td>
                      <td>{existingTopPerformers.total_points2}</td>
                    </tr>
                  )
                )}
              </tbody>

              <tbody class="sentbody1">
                {this.state.existingTopPerformers.map(
                  (existingTopPerformers, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href={`/DisplayTopPerformer/${existingTopPerformers._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {existingTopPerformers.rank3}
                        </a>
                      </td>
                      <td>{existingTopPerformers.top_empid3}</td>

                      <td>{existingTopPerformers.top_empname3}</td>
                      <td>{existingTopPerformers.total_points3}</td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot class="tfoot"></tfoot>
            </table>
          </div>

          <div>
            <a href="">
              <button class="amandi" type="submit" onClick={this.onSubmit}>
                <p class="banana">Accepted</p>
              </button>
            </a>
          </div>

          <div>
            <table className="table table-hover sentable2">
              <thead class="senthead">
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Month</th>
                  <th scope="col">Rank 1</th>
                  <th scope="col">Rank 2</th>
                  <th scope="col">Rank 3</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody class="sentbody1">
                {this.state.existingTopPerformers.map(
                  (existingTopPerformers, index) => (
                    <tr key={index}>
                      <td>{existingTopPerformers.year}</td>
                      <td>
                        <a
                          href={`/AllTopPerformers/${existingTopPerformers._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {existingTopPerformers.month}
                        </a>
                      </td>
                      <td>{existingTopPerformers.top_empid1}</td>

                      <td>{existingTopPerformers.top_empid2}</td>
                      <td>{existingTopPerformers.top_empid3}</td>

                      <td>
                        <a href={existingTopPerformers._id} class="icon-btns">
                          <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;
                        </a>
                        &nbsp;
                        <a
                          href="#"
                          onClick={() =>
                            this.onDelete(existingTopPerformers._id)
                          }
                        >
                          <i className="far fa-trash-alt"></i>&nbsp;
                        </a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot class="tfoot"></tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
