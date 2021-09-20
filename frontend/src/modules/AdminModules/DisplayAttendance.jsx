import React, { Component } from "react";
import axios from "axios";
import "./AllPayrollDisplays.css";
//import jsPDF from "jspdf";

export default class DisplayAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendance: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/attendance/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          payroll: res.data.attendance
        });

        console.log(this.state.attendance);
      }
    });
  }
  /*
  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#reportContent"), {
      callback: function(doc) {
        doc.save("payslip.pdf");
      }
    });
  };
*/
  render() {
    const {
      empno,
      name,
      position,
      bank,
      bank_branch,
      account_no,
      basic_salary,
      salary_date
    } = this.state.payroll;
    /*
    return (
      <div
        id="ap1-displaypg col text-center "
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h1 className="col-10">Salary Details of Employee ID : {empno} </h1>
        </div>

        <hr />
        <br />
        <div class="ap-displaypg">
          <dl className="row">
            <dt className="col-sm-3">Employee Name</dt>
            <dd className="col-sm-9">{name}</dd>

            <dt className="col-sm-3">Position</dt>
            <dd className="col-sm-9">{position}</dd>
          </dl>
          <br />
          <h6 className="" style={{ textDecoration: "none", color: "#276678" }}>
            <strong>
              Bank Details Related To Depositing The Monthly Salary
            </strong>
          </h6>
          <br />

          <dl className="row">
            <dt className="col-sm-3">Bank Name</dt>
            <dd className="col-sm-9">{bank}</dd>

            <dt className="col-sm-3">Branch</dt>
            <dd className="col-sm-9">{bank_branch}</dd>

            <dt className="col-sm-3">Account No</dt>
            <dd className="col-sm-9">{account_no}</dd>

            <br />
            <br />
            <br />

            <dt className="col-sm-3">Basic Salary</dt>
            <dd className="col-sm-9">Rs. {basic_salary}</dd>

            <dt className="col-sm-3">Pay Date</dt>
            <dd className="col-sm-9">{salary_date}</dd>
          </dl>
        </div>

        <div className="text-center">
          <br />
          <button
            className="btn btn-warning"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick="/editpayroll"
          >
            <i className="fa fa-edit"></i>&nbsp;Update
          </button>{" "}
          &nbsp;&nbsp;
        </div>
      </div>
    );

*/
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <div className="row">
          <h2 class="col-10 topic">
            Salary Details 2021 -- Employee ID : {empno}{" "}
          </h2>
        </div>
        <hr className="hr-line2" />
        <form className="need-validation">
          <div class="box">
            <dl>
              <p class="sub-details">Employee Name: &nbsp;{name}</p>
            </dl>
            <dl>
              <p class="sub-details">Position : &nbsp;{position}</p>
            </dl>
          </div>
          <br />

          <h5>Bank Details Related To Depositing The Monthly Salary</h5>
          <hr />

          <dl>
            <dt>Bank Name :</dt>
            <dd>{bank}</dd>
          </dl>

          <dl>
            <dt>Branch:</dt>
            <dd>{bank_branch}</dd>
          </dl>
          <dl>
            <dt>Account No</dt>
            <dd>{account_no}</dd>
          </dl>

          <hr />
          <br />

          <dl>
            <dt>Basic Salary:</dt>
            <dd>Rs. {basic_salary}</dd>
          </dl>

          <dl>
            <dt>Pay Date:</dt>
            <dd>{salary_date}</dd>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/allpayrolls">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Payrolls List
            </i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
