import React, { Component } from "react";
import axios from "axios";
//import jsPDF from "jspdf";

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
      <div
        id="payslip"
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h3 className="col-10">Salary Details of {name} </h3>
        </div>

        <hr />
        <dl className="row">
          <dt className="col-sm-3">Employee ID</dt>
          <dd className="col-sm-9">{empno}</dd>

          <dt className="col-sm-3">Salary Depositing Bank</dt>
          <dd className="col-sm-9">{bank}</dd>

          <dt className="col-sm-3">Branch</dt>
          <dd className="col-sm-9">{bank_branch}</dd>

          <dt className="col-sm-3">Account No</dt>
          <dd className="col-sm-9">{account_no}</dd>

          <dt className="col-sm-3">Basic Salary</dt>
          <dd className="col-sm-9">{basic_salary}</dd>

          <dt className="col-sm-3">Salary Date</dt>
          <dd className="col-sm-9">{salary_date}</dd>
        </dl>
      </div>
    );
  }
}
