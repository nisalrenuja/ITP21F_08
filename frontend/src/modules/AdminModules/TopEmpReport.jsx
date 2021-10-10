import React, { Component } from "react";
import axios from "axios";
import "./TopEmpReport.css";
import { Redirect } from "react-router";

export default class TopEmpReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: "",
      rank1: "",
      top_empid1: "",
      total_points1: "",
      rank2: "",
      top_empid2: "",
      total_points2: "",
      rank3: "",
      top_empid3: "",
      total_points3: "",
      empno: "",
      points: "",
      existingTopPerformers: []
    };
  }

  //Load Top Performers
  componentDidMount() {
    this.retrieveexistingTopPerformers();
  }

  //Reteiving new top performers
  retrieveexistingTopPerformers() {
    axios.get("http://localhost:5000/TopPerformersTable").then(res => {
      if (res.data.success) {
        this.setState({
          existingTopPerformers: res.data.existingTopPerformers
        });
        console.log(this.state.existingTopPerformers);
      }
    });
  }

  //Generate PDF of loaded details
  generatePDF = () => {
    var content = document.getElementById("reportContent");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  render() {
    return (
      <div className="container">
        <div class="senmain">
          <h2 class="senhead1">Notice Management | Top Performers</h2>
          <hr class="senline1"></hr>
          <button type="primary" className="cat" onClick={this.generatePDF}>
            Print/PDF
          </button>
          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          ></div>

          <div>
            <h2 class="mouse">Company Top Performers</h2>
            <table className="table table-hover sentable9384">
              <thead class="senthead">
                <tr>
                  <th scope="col">Year</th>
                  <th scope="col">Month</th>
                  <th scope="col">Emp ID : Rank 1</th>
                  <th scope="col">Emp ID : Rank 2</th>
                  <th scope="col">Emp ID : Rank 3</th>
                </tr>
              </thead>
              <tbody class="sentbody1">
                {this.state.existingTopPerformers.map(
                  (existingTopPerformers, index) => (
                    <tr key={index}>
                      <td>{existingTopPerformers.year}</td>
                      <td>{existingTopPerformers.month}</td>
                      <td>{existingTopPerformers.top_empid1}</td>

                      <td>{existingTopPerformers.top_empid2}</td>
                      <td>{existingTopPerformers.top_empid3}</td>
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
