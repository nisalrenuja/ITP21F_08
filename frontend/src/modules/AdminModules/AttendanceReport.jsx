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

    };
  }

 //A method in react life cycle
 componentDidMount() {
  this.retrieveAttendances();
}

retrieveAttendances() {
  //end point
  axios.get("http://localhost:5000/attendances").then(res => {
    if (res.data.success) {
      this.setState({
        attendances: res.data.existingAttendances,
        attendancecount: res.data.attendanceCount,

      });

      console.log(this.state.attendances);
      console.log(this.state.attendancecount);
    }
  });
}

  //Retrieve all the attendance data for charts and tables
 
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

  render() {/*
    //count no of employeed who did not get paid yet
    const notpaidcount = this.state.salaries.reduce((notpaidcount, salaries) => {
      if (salaries.salary_status.toLowerCase() === 'not recieved') {
        return notpaidcount + (salaries.basic, 1);
      } 
      return notpaidcount;
    }, 0);*/
  
           //count no of employeed each month
           const presentcountA = this.state.attendances.reduce((presentcountA, attendances) => {
            if (attendances.att_type.toLowerCase() === 'present' && attendances.location_type.getMonth().toLowerCase() === 'assignment-location' ) {
                return presentcountA =+ (attendances.empno, 1);
            } 
            return presentcountA;
        }, 0);
          const absentcountA = this.state.attendances.reduce((absentcountA, attendances) => {
            if (attendances.att_type.toLowerCase() === 'absent' && attendances.location_type.getMonth().toLowerCase() === 'assignment-location' ) {
                return absentcountA =+ (attendances.empno, 1);
            } 
            return absentcountA;
        }, 0);
        const paidleavecountA = this.state.attendances.reduce(( paidleavecountA, attendances) => {
          if (attendances.att_type.toLowerCase() === 'on paid leave' && attendances.location_type.getMonth().toLowerCase() === 'assignment-location' ) {
              return  paidleavecountA =+ (attendances.empno, 1);
          } 
          return  paidleavecountA;
      }, 0);
        const unpaidleavecountA = this.state.attendances.reduce(( unpaidleavecountA, attendances) => {
          if (attendances.att_type.toLowerCase() === 'on unpaid leave' && attendances.location_type.getMonth().toLowerCase() === 'assignment-location' ) {
              return  unpaidleavecountA =+ (attendances.empno, 1);
          } 
          return  unpaidleavecountA;
      }, 0);
        const holidaycountA = this.state.attendances.reduce(( holidaycountA, attendances) => {
          if (attendances.att_type.toLowerCase() === 'holiday' && attendances.location_type.getMonth().toLowerCase() === 'assignment-location' ) {
              return  holidaycountA =+ (attendances.empno, 1);
          } 
          return  holidaycountA;
      }, 0);






    return (
      <div className="container container222 ">
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
          <hr></hr>

          <div
            id="AttReportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <div>
              <h2>Assignment Attendance Records ( {this.state.attendancecount} )</h2>
              <hr></hr>
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
                  {this.state.attendances.map((attendances, index) => (
                    <tr key={index}>
                      <td>{attendances.att_date}</td>
                      <td>
                          {attendances.empno}   
                      </td>
                      <td>{attendances.assignment_name}</td>
                      <td>{attendances.location}</td>
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




              <Chart
                width={'100%'}
                height={'500px'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [ 'Type',
                    'Present',
                    'Absent',
                    'On Paid Leave',
                    'On Unpaid Leave',
                    'Holiday',
                  ],
                  ['In Company(Demo Values)', 25, 8, 2, 8, 0 ],// demo values
                  ['Assignments', presentcountA, absentcountA, paidleavecountA, unpaidleavecountA, holidaycountA],
                ]}
                options={{
                  title: 'Attendance Summary',
                  vAxis: { title: 'Attendance Count' },
                  hAxis: { title: 'Attendance Type' },
                  seriesType: 'bars',
                  series: { 5: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
              />

/*
              <div class="assignPie">
                <Chart
                  width={"650px"}
                  height={"500px"}
                  chartType="PieChart"
                  loader={<div>Loading Assignments Chart</div>}
                  data={[
                    ["Attendance", "Value"],
                    ["Present", 11],
                    ["Absent", 2],
                    ["On Paid Leave", 2],
                    ["On Unpaid Leave", 2],
                    ["Holiday", 7],
                    ["Other", 2]
                  ]}
                  options={{
                    title: "Assignment Attendance Summary",
                    // Just add this option
                    is3D: true
                  }}
                  rootProps={{ "data-testid": "2" }}
                />
              </div>
            </div>

            <hr></hr>

      
            <br/>


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
