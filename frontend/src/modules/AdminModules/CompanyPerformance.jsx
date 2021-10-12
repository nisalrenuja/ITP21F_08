import React, { Component } from "react";
import axios from "axios";
import "./CompanyPerformance.css";

export default class CompanyPerfomance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalreport1: [],
      finalreport2: [],
      finalreport3: [],
      finalreport4: []
    };
  }

  //execute the React code
  componentDidMount() {
    this.retrievefinalreport();
  }

  //retrieving the count for the 1st quarter
  retrievefinalreport() {
    axios.get("http://localhost:5000/finalreport1").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport1: res.data.finalreport.length
        });
        console.log(this.state.finalreport1);
      }
    });

    //retrieving the count for the 2nd quarter
    axios.get("http://localhost:5000/finalreport2").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport2: res.data.finalreport.length
        });
        console.log(this.state.finalreport2);
      }
    });

    //retrieving the count for the 3rd quarter
    axios.get("http://localhost:5000/finalreport3").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport3: res.data.finalreport.length
        });
        console.log(this.state.finalreport3);
      }
    });

    //retrieving the count for the 4th quarter
    axios.get("http://localhost:5000/finalreport4").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport4: res.data.finalreport.length
        });
        console.log(this.state.finalreport4);
      }
    });
  }

  //Generate PDF
  generatePDF2 = () => {
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
        <div class="anumain4">
          <h2 class="anuhead41">Reports Management</h2>
          <hr class="anuline41"></hr>

          <a href="/allreports">
            <button class="anudiv41">
              <p class="anutxt41">All Reports</p>
            </button>
          </a>

          <a href="/companyperformance">
            <button class="anudiv42">
              <p class="anutxt42">Company Performance</p>
            </button>
          </a>

          <button type="primary" class="anubtng2" onClick={this.generatePDF2}>
            Print/PDF
          </button>

          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <h1 class="anuhead42">Total Approved Reports - Quarterly</h1>

            <h3 class="anutah43">Records 2021</h3>
            <table className="table table-hover anutable41">
              <thead class="anuthead">
                <tr>
                  <th scope="col">Quarter No.</th>
                  <th scope="col">Quarter</th>
                  <th scope="col">Year</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">No.of Approved Reports</th>
                </tr>
              </thead>

              <tbody class="anutbody1">
                <tr>
                  <td> #1</td>
                  <td> 2021 - Q1 </td>
                  <td> 2021 </td>
                  <td> 1st January </td>
                  <td> 31st March </td>
                  <td> {this.state.finalreport1}</td>
                </tr>

                <tr>
                  <td> #2</td>
                  <td> 2021 - Q2 </td>
                  <td> 2021 </td>
                  <td> 1st April </td>
                  <td> 30th June </td>
                  <td> {this.state.finalreport2}</td>
                </tr>

                <tr>
                  <td> #3</td>
                  <td> 2021 - Q3 </td>
                  <td> 2021 </td>
                  <td> 1st July </td>
                  <td> 30th September</td>
                  <td> {this.state.finalreport3}</td>
                </tr>

                <tr>
                  <td> #4</td>
                  <td> 2021 - Q4 </td>
                  <td> 2021 </td>
                  <td> 1st October</td>
                  <td> 31st December </td>
                  <td> {this.state.finalreport4}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <iframe id="ifmcontentstoprint" style={{ display: "none" }}></iframe>
        </div>
      </div>
    );
  }
}
