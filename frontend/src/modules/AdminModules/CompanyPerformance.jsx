import React, { Component } from "react";
import axios from "axios";
import "./CompanyPerformance.css";

export default class CompanyPerfomance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalreport: []
    };
  }

  componentDidMount() {
    this.retrievefinalreport();
  }

  retrievefinalreport() {
    axios.get("http://localhost:5000/finalreport").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport: res.data.finalreport
        });
        console.log(this.state.finalreport);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div class="anumain4">
          <h2 class="anuhead41">Reports Management</h2>
          <hr class="anuline41"></hr>

          <h3 class="anuhead42">Total Approved Reports - Quaterly</h3>

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

          <h2 class="anutah43">Reports</h2>
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
                <td> </td>
              </tr>

              <tr>
                <td> #2</td>
                <td> 2021 - Q2 </td>
                <td> 2021 </td>
                <td> 1st April </td>
                <td> 30th June </td>
                <td> </td>
              </tr>

              <tr>
                <td> #3</td>
                <td> 2021 - Q3 </td>
                <td> 2021 </td>
                <td> 1st July </td>
                <td> 30th September</td>
                <td></td>
              </tr>

              <tr>
                <td> #4</td>
                <td> 2021 - Q4 </td>
                <td> 2021 </td>
                <td> 1st October</td>
                <td> 31st December </td>
                <td> </td>
              </tr>
              <tfoot class="tfoot">
                <a href="/quarterperformance">
                  <i class="fas fa-plus"></i>&nbsp;New Quarter Performance
                </a>
              </tfoot>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
