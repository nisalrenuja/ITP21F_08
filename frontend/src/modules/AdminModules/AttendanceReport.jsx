import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./AttendanceReport.css";

export default class AttendanceReport extends Component {
  constructor(props) {
    super(props);
    //set the initial states
    this.state = {
      attendances: [],

      assignments: [],
      ncompleted: [],
      staff: [],
      fstaff: [],
      allowances: [],
      employee1: [],
      employee2: [],
      province: [],
      since: [],
      employeecount1: "",
      employeecount2: "",
      Tranineetotal: "",
      Seniortotal: "",
      seniorM: "",
      seniorF: "",
      traineeM: "",
      traineeF: ""
    };
  }

  //Load the employee data
  componentDidMount() {
    this.retrieveAttendances();
  }

  //Retrieve all the attendance data for charts and tables
  retrieveAttendances() {
    //Get all in company attendance
    axios.get("http://localhost:5000/attendances/incompany").then(res => {
      if (res.data.success) {
        this.setState({
          attend1: res.data.existingAttendances,
          attendcount1: res.data.attendanceCount,
          auditcount: res.data.empAuditCount
        });
      }
    });

    //Get all the employee details in type "Tax"
    axios.get("http://localhost:5000/employees/tax").then(res => {
      if (res.data.success) {
        this.setState({
          attend2: res.data.existingAttendances,
          attendcount2: res.data.attendanceCount,
          Taxcount: res.data.empAuditCount
        });
      }
    });

    //Get the data for PieChart1 for Seniors and Trainees
    axios.get("http://localhost:5000/employees/division").then(res => {
      if (res.data.success) {
        this.setState({
          Seniortotal: res.data.seniorcount,
          Tranineetotal: res.data.traineecount
        });
      }
    });

    //Get the data for PieChart2 for Province
    axios.get("http://localhost:5000/employees/province").then(res => {
      if (res.data.success) {
        this.setState({
          province: res.data.province
        });
      }
    });

    //Get the data for BarChar for Seniors based on gender
    axios.get("http://localhost:5000/employees/senior").then(res => {
      if (res.data.success) {
        this.setState({
          seniorM: res.data.seniorM,
          seniorF: res.data.seniorF
        });
      }
    });

    //Get the data for BarChar for Trainees based on gender
    axios.get("http://localhost:5000/employees/trainee").then(res => {
      if (res.data.success) {
        this.setState({
          traineeM: res.data.traineeM,
          traineeF: res.data.traineeF
        });
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
    var W = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    {
      this.state.province.map(
        (employees, index) => (
          (W[0] = employees.W),
          (W[1] = employees.C),
          (W[2] = employees.S),
          (W[3] = employees.U),
          (W[4] = employees.Sa),
          (W[5] = employees.NW),
          (W[6] = employees.NC),
          (W[7] = employees.N),
          (W[8] = employees.E)
        )
      );
    }

    /*for (var i = 0; i < W.length; i++) {
      if(W[i] != 0){
        W[i] = 0;
      }
    }*/

    console.log(W);
    return (
      <div className="container container222">
        <center>
          <br />
          <h1> Attendance Report 2021</h1>&nbsp;
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Print(PDF)
          </button>
          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <div>
              <h2>Assignment Attendance Records ({this.state.attendcount1})</h2>
              &nbsp;
              <table className="table table-hover bbtable1">
                <thead class="thead">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Assignment</th>
                    <th scope="col">Location</th>
                    <th scope="col">Assignment Type</th>
                    <th scope="col">Time In</th>
                    <th scope="col">Time Out</th>
                  </tr>
                </thead>
                <tbody class="tbody1">
                  {this.state.attendances.map((attendances, index) => (
                    <tr key={index}>
                      <td>
                        <a href={``} style={{ textDecoration: "none" }}>
                          {attendances.empno}
                        </a>
                      </td>
                      <td>{attendances.att_date}</td>
                      <td>{attendances.assignment_name}</td>
                      <td>{attendances.loacation}</td>
                      <td style={{ fontWeight: "bold" }}>
                        {attendances.att_type}
                      </td>
                      <td>{attendances.time_in}</td>
                      <td>{attendances.time_out}</td>
                    </tr>
                  ))}
                  ;
                </tbody>
                &nbsp;
              </table>
              <h2>In Company Records ({this.state.attendcount2})</h2>&nbsp;
              <table className="table table-hover bbtable1">
                <thead class="thead">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Assignment Type</th>
                    <th scope="col">Time In</th>
                    <th scope="col">Time Out</th>
                  </tr>
                </thead>
                <tbody class="tbody1">
                  {this.state.attend2.map((attendances, index) => (
                    <tr key={index}>
                      <td>
                        <a href={``} style={{ textDecoration: "none" }}>
                          {attendances.empno}
                        </a>
                      </td>
                      <td>{attendances.att_date}</td>
                      <td style={{ fontWeight: "bold" }}>
                        {attendances.att_type}
                      </td>
                      <td>{attendances.time_in}</td>
                      <td>{attendances.time_out}</td>
                    </tr>
                  ))}
                </tbody>
                &nbsp;
              </table>
            </div>
            <h1></h1>
            <Chart
              width={"800px"}
              height={"600px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["Seniors", this.state.Seniortotal],
                ["Trainees", this.state.Tranineetotal]
              ]}
              options={{
                title: "Employee Distribution"
              }}
              rootProps={{ "data-testid": "1" }}
            />
            <Chart
              width={"800px"}
              height={"700px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["Western", W[0]],
                ["Cental", W[1]],
                ["Southern", W[2]],
                ["Southern", W[3]],
                ["Sabaragamuwa", W[4]],
                ["North Western", W[5]],
                ["North Central", W[6]],
                ["Northern", W[7]],
                ["Eastern", W[8]]
              ]}
              options={{
                title: "Employee Origin"
              }}
              rootProps={{ "data-testid": "1" }}
            />
            <Chart
              width={"800px"}
              height={"400px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Status", "Male", "Female"],
                ["Seniors", this.state.seniorM, this.state.seniorF],
                ["Trainees", this.state.traineeM, this.state.traineeF]
              ]}
              options={{
                title: "Employee Gender Classification Based on Status",
                chartArea: { width: "50%" },
                hAxis: {
                  title: "Total Employees",
                  minValue: 0
                },
                vAxis: {
                  title: "Status"
                }
              }}
              // For tests
              rootProps={{ "data-testid": "1" }}
            />
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
