import React, { Component } from "react";
import axios from "axios";
import "./DisplayMSalary.css";
import jsPDF from "jspdf";

export default class DisplaySalary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salary: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/salary/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          salary: res.data.salary
        });

        console.log(this.state.salary);
      }
    });
  }

  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector("#payslipContent"), {
      callback: function(doc) {
        doc.save("payslip.pdf");
      }
    });
  };

  render() {
    const {
      empno,
      name,
      pay_month,
      basic,
      OT_rate,
      OT_hrs,
      total_OT,
      bonus,
      aws,
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings,
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      nopay_leaves,
      total_deductions,
      net_salary,
      salary_status
    } = this.state.salary;

    return (
      <div className="payslipContainer">
        <br />
        <div className="row">
          <h2 class="col-8 topic">Monthly Salary 2021</h2>
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Download Pay Slip
          </button>
        </div>
        <hr className="hr-line2" /> <br />
        <div id="payslipContent" className="col-md-7">
          <form>
            <div className="need-validation4">
              <br />
              <h4 class="col-10 topic payslip-topic">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Pay Slip for {pay_month}
              </h4>
              <br />
              <div class="">
                <dl className="d-data">
                  <p className="ps-data" style={{ color: "black" }}>
                    Pay Slip No - MS{empno}-{pay_month}
                  </p>
                </dl>
                <dl className="d-data">
                  <p className="ps-data" style={{ color: "black" }}>
                    Employee ID: &nbsp;{empno}
                  </p>
                </dl>
                <dl>
                  <p className="ps-data" style={{ color: "black" }}>
                    Name: &nbsp;{name}
                  </p>
                </dl>
              </div>

              <hr className="ps-hr" />

              <dt class="">Basic</dt>
              <dd class="">Rs {basic}</dd>

              <hr className="ps-hr" />
              {/*<dl>
            <dt class="ps-dt">OT Rate:</dt>
            <dd>Rs 120 /hr</dd>
          </dl>
          <dl>
            <dt class="ps-dt">OT Hours:</dt>
            <dd>{OT_hrs}</dd>
          </dl>*/}

              <dt class="ps-dt">Total OT Amount:</dt>
              <dd>Rs. {OT_hrs * 120}</dd>

              <dt class="ps-dt">Bonus:</dt>
              <dd>Rs. {bonus}</dd>

              <dl className="d-data">
                <dt class="ps-dt">AWS (Annual Wage Supplements:)</dt>
                <dd>Rs. {aws}</dd>
              </dl>
              <dl className="d-data">
                <dt class="ps-dt">Other Earnings:</dt>
                <dd>Rs. {total_earnings}</dd>
              </dl>
              <dl className="d-data">
                <dt class="">Total Earnings </dt>
                <dd>Rs. {OT_hrs * 120 + aws + bonus + total_earnings}</dd>
              </dl>
              <hr className="ps-hr" />
              <dl className="d-data">
                <dt class="ps-dt">No Pay Leaves:</dt>
                <dd>Rs. {nopay_leaves * 100}</dd>
              </dl>
              <dl className="d-data">
                <dt class="ps-dt">Other Deductions:</dt>
                <dd>Rs. {total_deductions}</dd>
              </dl>
              <dl className="d-data">
                <dt class="">Total Deductions </dt>
                <dd>Rs. {nopay_leaves * 100 + total_deductions}</dd>
              </dl>
              <hr className="ps-hr" />
              <dl className="d-data">
                <dt>Net Salary </dt>
                <dd style={{ fontWeight: "bolder" }}>
                  Rs.
                  {basic +
                    (OT_hrs * 120 + aws + bonus + total_earnings) -
                    (nopay_leaves * 100 + total_deductions)}
                </dd>
              </dl>
            </div>
          </form>
        </div>
        &nbsp;
        <div class="back">
          <a href="/allsalary">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Salary List
            </i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
