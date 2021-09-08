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
    axios.get("http://localhost:5000/assignments/allowances").then(res => {
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
  }

  render() {
    return (
      <div className="container container222">
        <center>
          <br />
          <h1>Reports on Assignments and Staff</h1>
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
            <h4>Total Allowances of the Month on Assignments</h4>
            <Chart
              width={550}
              height={400}
              marginLeft={20}
              chartType="Gauge"
              loader={<div>Loading Chart</div>}
              data={[
                ["Label", "Value"],
                ["Rs", this.state.total]
              ]}
              options={{
                redFrom: 200000,
                redTo: 300000,
                yellowFrom: 10000,
                yellowTo: 200000,
                max: 300000,
                minorTicks: 5
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </center>
      </div>
    );
  }
}
