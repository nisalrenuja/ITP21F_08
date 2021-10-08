import React, { Component } from "react";
import axios from "axios";
import "./CompanyPerformance.css";

export default class CompanyPerfomance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Performances: []
    };
  }

  componentDidMount() {
    this.retrievePerformances();
  }

  retrievePerformances() {
    axios.get("http://localhost:5000/performance").then(res => {
      if (res.data.success) {
        this.setState({
          posts: res.data.Performances
        });
        console.log(this.state.Performances);
      }
    });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/performance").then(res => {
      if (res.data.success) {
        this.filterData(res.data.Performances, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="anumain3">
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

          <div class="anudiv44">
            <input class="anuselect41" type="text" />
            <a className="btn btn-info anusearch">
              <i className="fas fa-search"></i>&nbsp;
            </a>
          </div>

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
                <td></td>
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
                <td></td>
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
