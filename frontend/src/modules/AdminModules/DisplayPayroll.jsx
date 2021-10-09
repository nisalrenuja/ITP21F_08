import React, { Component } from "react";
import axios from "axios";
import "./AllPayrollDisplays.css";
import jsPDF from "jspdf";

export default class DisplayPayroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payroll: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/payroll/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          payroll: res.data.payroll
        });

        console.log(this.state.payroll);
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
          <a href="/admin">
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
