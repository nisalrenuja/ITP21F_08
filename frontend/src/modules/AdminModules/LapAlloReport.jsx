import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./WorkReport.css";

export default class WorkReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      l: [],
      l2: [],
      l3: [],
      l4: []
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/lapsassigned/").then(res => {
      if (res.data.success) {
        this.setState({
          l: res.data.l
        });
        console.log(this.state.l);
      }
    });
    axios.get("http://localhost:5000/laps/ass").then(res => {
      if (res.data.success) {
        this.setState({
          l2: res.data.laps.length
        });
        console.log(this.state.l2);
      }
    });
    axios.get("http://localhost:5000/lapsassigned/").then(res => {
      if (res.data.success) {
        this.setState({
          l3: res.data.l
        });
        console.log(this.state.l3);
      }
    });
    axios.get("http://localhost:5000/lapscomp/").then(res => {
      if (res.data.success) {
        this.setState({
          l4: res.data.l
        });
        console.log(this.state.l4);
      }
    });
  }
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
      <div className="container container222">
        <center>
          <br />
          <h1>Statistical Reports on Laptop Allocation on Assignments</h1>
          <br />
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Print/PDF
          </button>

          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "5px", paddingRight: "5px" }}
          >
            <div>
              <Chart
                width={"950px"}
                height={"800px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Lptops", "Number"],
                  ["Laptops Allocated for Assignments", this.state.l],
                  ["Laptops Free", this.state.l2 - this.state.l]
                ]}
                options={{
                  title: "Laptops Allocated for Assignments and Laptops Free",
                  // Just add this option
                  pieHole: 0.6
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </div>
            <div>
              <Chart
                width={"950px"}
                height={"800px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Laptops", "Number"],
                  ["Assignments Completed and Laptops Returned", this.state.l4],
                  [
                    "Working/Assigned on Assignments and Laptops yet to be Returned",
                    this.state.l3
                  ]
                ]}
                options={{
                  title:
                    "Laptops Allocated for Assignments to be Returned and Completed Returning ",
                  // Just add this option
                  pieHole: 0.6
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </div>
          </div>
        </center>
        <br />
        <div>
          <iframe id="ifmcontentstoprint" style={{ display: "none" }}></iframe>
        </div>
      </div>
    );
  }
}
