import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./AttendanceReport.css";
import "./AllPayrolls.css";

export default class SalaryReport extends Component {
  constructor(props) {
    super(props);
    //set the initial states
    this.state = {
      salaries: []
    };
  }

  //Load the attendance data
  componentDidMount() {
    this.retrieveSalaries();
  }

  retrieveSalaries() {
    //end point
    axios.get("http://localhost:5000/salaries").then(res => {
      if (res.data.success) {
        this.setState({
          salaries: res.data.existingSalaries,
          salarycount: res.data.salaryCount
        });

        console.log(this.state.salaries);
        console.log(this.state.salarycount);
      }
    });
  }

  //Generate PDF of loaded details
  generatePDF = () => {
    var content = document.getElementById("SalaryReportContent");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  render() {
    //calculate total basic
    const totalbasic2021 = this.state.salaries.reduce(
      (totalbasic2021, salaries) =>
        (totalbasic2021 += parseInt(salaries.basic, 10)),
      0
    );
    //calculate total netsal
    const totalsalary2021 = this.state.salaries.reduce(
      (totalsalary2021, salaries) =>
        (totalsalary2021 += parseInt(
          salaries.basic +
            (salaries.OT_hrs * 120 +
              salaries.aws +
              salaries.bonus +
              salaries.total_earnings) -
            (salaries.nopay_leaves * 100 + salaries.total_deductions),
          10
        )),
      0
    );

    //count no of employeed who got paid
    const totalpaidcount = this.state.salaries.reduce(
      (totalpaidcount, salaries) => {
        if (salaries.salary_status.toLowerCase() === "recieved") {
          return totalpaidcount + (salaries.basic, 1);
        }
        return totalpaidcount;
      },
      0
    );
    //count no of employeed who did not get paid yet
    const notpaidcount = this.state.salaries.reduce(
      (notpaidcount, salaries) => {
        if (salaries.salary_status.toLowerCase() === "not recieved") {
          return notpaidcount + (salaries.basic, 1);
        }
        return notpaidcount;
      },
      0
    );

    //count no of employeed each month
    const sepPaidcount = this.state.salaries.reduce(
      (sepPaidcount, salaries) => {
        if (
          salaries.salary_status.toLowerCase() === "recieved" &&
          salaries.pay_month.toLowerCase() === "september"
        ) {
          return (sepPaidcount = +salaries.basic);
        }
        return sepPaidcount;
      },
      0
    );
    const sepnotPaidcount = this.state.salaries.reduce(
      (sepnotPaidcount, salaries) => {
        if (
          salaries.salary_status.toLowerCase() === "not recieved" &&
          salaries.pay_month.toLowerCase() === "september"
        ) {
          return sepnotPaidcount + salaries.basic;
        }
        return sepnotPaidcount;
      },
      0
    );
    const augPaidcount = this.state.salaries.reduce(
      (augPaidcount, salaries) => {
        if (
          salaries.salary_status.toLowerCase() === "recieved" &&
          salaries.pay_month.toLowerCase() === "august"
        ) {
          return augPaidcount + salaries.basic;
        }
        return augPaidcount;
      },
      0
    );
    const augnotPaidcount = this.state.salaries.reduce(
      (augnotPaidcount, salaries) => {
        if (
          salaries.salary_status.toLowerCase() === "not recieved" &&
          salaries.pay_month.toLowerCase() === "august"
        ) {
          return augnotPaidcount + salaries.basic;
        }
        return augnotPaidcount;
      },
      0
    );

    return (
      <div className="container dim_main">
        <center>
          <br />
          <h1> Salary Report</h1>&nbsp;
          <br />
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Print:PDF
          </button>
          <div
            id="SalaryReportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <hr></hr>
            <br />
            <Chart
              width={"800px"}
              height={"500px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Month", "Paid", "Not Paid"],
                ["October", 0, 0],
                ["September", sepPaidcount, sepnotPaidcount],
                ["August", augPaidcount, augnotPaidcount]
              ]}
              options={{
                title: "Salary Monthly Distribution Summary(August- October)",
                chartArea: { width: "50%" },
                isStacked: true,
                hAxis: {
                  title: "Salary Amount(Rs)",
                  minValue: 0
                },
                vAxis: {
                  title: "Month"
                }
              }}
              // For tests
              rootProps={{ "data-testid": "3" }}
            />

            {/*   <div class="salaryPie">
                <Chart
                  width={"650px"}
                  height={"500px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Payroll", "Value"],
                    ["Employee% already been paid", totalpaidcount],
                    ["Employee% yet to be paid", notpaidcount],
                   

                  ]}
                  options={{
                    title: "Payroll Summary 2021",
                    // Just add this option
                    is3D: true
                  }}
                  rootProps={{ "data-testid": "2" }}
                />

                {/*<h5> Total Salary Paid: Rs. {totalpaid}.00</h5>
                <h5> Amount Yet to Pay: Rs. {notpaid}.00</h5>
                </div>*/}

            <hr></hr>

            <div class="salaryBarchart">
              <Chart
                width={"700px"}
                height={"400px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Year", "Total Basic", "Total Net Salary"],
                  ["2019(demo values)", 277300, 230000], //demo value
                  ["2020(demo values)", 388000, 230000], //demo value
                  ["2021", totalbasic2021, totalsalary2021],
                  ["2022", 0, 0]
                ]}
                options={{
                  // Material design options
                  chart: {
                    title: "Summary of Salary Distribution",
                    subtitle: "2019-2022"
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
