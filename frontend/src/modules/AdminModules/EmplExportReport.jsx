import React, { Component } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import "./EmpExportReport.css";

export default class WorkReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      ncompleted: [],
      staff: [],
      fstaff: [],
      allowances: [],
      employee: []
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/employees").then(res => {
      if (res.data.success) {
        this.setState({
          employee: res.data.existingemployees,
          employeecount: res.data.employeeCount,
          auditcount: res.data.empAuditCount
        });
        console.log(this.state.employee);
        console.log(this.state.employeecount);
      }
    });
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
          <h1> Report On All Employees</h1>&nbsp;
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Print/PDF
          </button>
          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <div>
              <table className="table table-hover bbtable1">
                <thead class="thead">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody class="tbody1">
                  {this.state.employee.map((employees, index) => (
                    <tr key={index}>
                      <td>
                        <a href={``} style={{ textDecoration: "none" }}>
                          {employees.empno}
                        </a>
                      </td>
                      <td>{employees.name}</td>
                      <td>{employees.email}</td>
                      <td>{employees.contact}</td>
                      <td>{employees.status}</td>
                    </tr>
                  ))}
                </tbody>
                &nbsp;
              </table>
            </div>
            <h1></h1>
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
