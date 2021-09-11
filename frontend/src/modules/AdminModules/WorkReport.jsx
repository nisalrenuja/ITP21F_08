import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./WorkReport.css";

export default class WorkReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      ncompleted: [],
      staff: [],
      fstaff: [],
      allowances: []
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/assignments/count").then(res => {
      if (res.data.success) {
        this.setState({
          assignments: res.data.assignmentsassigned,
          l: res.data.assignmentsassigned.length,
          ncompleted: res.data.assignmentsassigned2,
          l2: res.data.assignmentsassigned2.length
        });
        console.log(this.state.l2);
      }
    });
    axios.get("http://localhost:5000/assignments/staffcount").then(res => {
      if (res.data.success) {
        this.setState({
          staff: res.data.staffw,
          fstaff: res.data.staff,
          sl: res.data.staffw.length,
          sll: res.data.staff.length
        });
        console.log(this.state.sll);
      }
    });
    axios.get("http://localhost:5000/assignments/allowances1").then(res => {
      if (res.data.success) {
        var total = 0;
        for (var i = 0; i < res.data.posts.length; i++) {
          if (res.data.posts[i].travel_allowance == null) {
            res.data.posts[i].travel_allowance = 0;
          }
          total = total + res.data.posts[i].travel_allowance;
        }
        this.setState({
          allowances: res.data.posts,
          total: total
        });
        console.log(this.state.total);
      }
    });
    axios.get("http://localhost:5000/assignments/allowances2").then(res => {
      if (res.data.success) {
        var total2 = 0;
        for (var i = 0; i < res.data.posts.length; i++) {
          if (res.data.posts[i].travel_allowance == null) {
            res.data.posts[i].travel_allowance = 0;
          }
          total2 = total2 + res.data.posts[i].travel_allowance;
        }
        this.setState({
          allowances: res.data.posts,
          total2: total2
        });
        console.log(this.state.total2);
      }
    });
    axios.get("http://localhost:5000/assignments/allowances3").then(res => {
      if (res.data.success) {
        var total3 = 0;
        for (var i = 0; i < res.data.posts.length; i++) {
          if (res.data.posts[i].travel_allowance == null) {
            res.data.posts[i].travel_allowance = 0;
          }
          total3 = total3 + res.data.posts[i].travel_allowance;
        }
        this.setState({
          allowances: res.data.posts,
          total3: total3
        });
        console.log(this.state.total3);
      }
    });
    axios.get("http://localhost:5000/assignments/allowances4").then(res => {
      if (res.data.success) {
        var total4 = 0;
        for (var i = 0; i < res.data.posts.length; i++) {
          if (res.data.posts[i].travel_allowance == null) {
            res.data.posts[i].travel_allowance = 0;
          }
          total4 = total4 + res.data.posts[i].travel_allowance;
        }
        this.setState({
          allowances: res.data.posts,
          total4: total4
        });
        console.log(this.state.total4);
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
          <h1>Statistical Reports on Assignments and Staff</h1>
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
                  ["Assignments", "Number"],
                  ["Assignments yet to complete", this.state.l],
                  ["Completed", this.state.l2]
                ]}
                options={{
                  title: "Assignments and Completed Assignments",
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
                  ["Staff", "Number"],
                  [
                    "Staff Free of Work Assignments",
                    this.state.sll - this.state.sl
                  ],
                  ["Staff Working/Assigned on Assignments", this.state.sl]
                ]}
                options={{
                  title: "Staff and Staff Working",
                  // Just add this option
                  pieHole: 0.6
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </div>
            <div>
              <Chart
                width={"850px"}
                height={"700px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Month", "Allowances(Rs)"],
                  [new Date().getMonth() - 2, this.state.total4],
                  [new Date().getMonth() - 1, this.state.total3],
                  [new Date().getMonth(), this.state.total2],
                  [new Date().getMonth() + 1, this.state.total]
                ]}
                options={{
                  // Material design options
                  chart: {
                    title: "Total Allowances",
                    subtitle: "Total Allowances for Last Four Months"
                  }
                }}
                // For tests
                rootProps={{ "data-testid": "2" }}
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
