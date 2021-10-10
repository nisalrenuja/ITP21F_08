import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./AttendanceReport.css";
import "./AllPayrolls.css";

export default class AttendanceReport extends Component {
  constructor(props) {
    super(props);
    //set the initial states
    this.state = {
      attendances: [],
      attend1: [],
      attend2: [],
      attendcount1: "",
      attendcount2: ""

      /*
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

      */
    };
  }

  //Load the attendance data
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
          incompanycount: res.data.attendlocationCount
        });
      }
    });

    //Get all assignment attendance
    axios.get("http://localhost:5000/attendances/assignlocation").then(res => {
      if (res.data.success) {
        this.setState({
          attend2: res.data.existingAttendances,
          attendcount2: res.data.attendanceCount,
          assignlocationcount: res.data.attendlocationCount
        });
      }
    });
  }

  //Generate PDF of loaded details
  generatePDF = () => {
    var content = document.getElementById("AttReportContent");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  render() {
    return (
      <div className="container dim_main">
        <center>
          <br />
          <h1> Attendance Report 2021</h1>&nbsp;
          <br />
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Print:PDF
          </button>
          <div
            id="AttReportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <div>
              <h2>Assignment Attendance Records ({this.state.attendcount1})</h2>
              &nbsp;
              <table className="table table-hover bbtable1">
                <thead class="thead">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Employee-ID</th>
                    <th scope="col">Assignment-Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Attendance</th>
                    <th scope="col">Time-In</th>
                    <th scope="col">Time-Out</th>
                  </tr>
                </thead>
                <tbody class="tbody1">
                  {this.state.attend1.map((attendances, index) => (
                    <tr key={index}>
                      <td>{attendances.att_date}</td>
                      <td>
                        <a href={``} style={{ textDecoration: "none" }}>
                          {attendances.empno}
                        </a>
                      </td>
                      <td>{attendances.assignment_name}</td>
                      <td>{attendances.loacation}</td>
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
              <hr></hr>
              <h2>In Company Attendance Records ({this.state.attendcount2})</h2>
              &nbsp;
              <table className="table table-hover bbtable1">
                <thead class="thead">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Attendance</th>
                    <th scope="col">Time In</th>
                    <th scope="col">Time Out</th>
                  </tr>
                </thead>
                <tbody class="tbody1">
                  {this.state.attend2.map((attendances, index) => (
                    <tr key={index}>
                      <td>{attendances.att_date}</td>
                      <td>
                        <a href={``} style={{ textDecoration: "none" }}>
                          {attendances.empno}
                        </a>
                      </td>
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
            <hr></hr>
            {/*}
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
            />*/}
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
