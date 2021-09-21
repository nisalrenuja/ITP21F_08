import React, { Component } from "react";
import axios from "axios";
import "./DisplayMSalary.css";
//import jsPDF from "jspdf";

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
      <div className="col-md-6 mt-4 mx-auto">
        <div className="">
          <h2 class="col-10 topic">Monthly Salary - {pay_month}</h2>
          <br></br>
        </div>
        <hr className="hr-line2" />
        <form className="need-validation">
          <div class="threerowbox">
            <dl>
              <p class="sub-details" style={{ color: "blue" }}>
                Pay Slip No - MS{empno}-{pay_month}
              </p>
            </dl>
            <dl>
              <p class="sub-details">Employee ID: &nbsp;{empno}</p>
            </dl>
            <dl>
              <p class="sub-details">Name: &nbsp;{name}</p>
            </dl>
          </div>
          <br />

          <hr />

          <dl>
            <dt>Basic :</dt>
            <dd>Rs {basic}</dd>
          </dl>
          <hr />
          <dl>
            <dt>OT Rate:</dt>
            <dd>Rs 120 /hr</dd>
          </dl>
          <dl>
            <dt>OT Hours:</dt>
            <dd>{OT_hrs}</dd>
          </dl>

          <dl>
            <dt>Total OT Amount:</dt>
            <dd>{OT_hrs * 120}</dd>
          </dl>
          <dl>
            <dt>Bonus:</dt>
            <dd>{bonus}</dd>
          </dl>
          <dl>
            <dt>AWS (Annual Wage S)</dt>
            <dd>{aws}</dd>
          </dl>
          <dl>
            <dt>Other Earnings:</dt>
            <dd>{total_earnings}</dd>
          </dl>
          <dl>
            <dt>Total Earnings:</dt>
            <dd>{OT_hrs * 120 + aws + bonus + total_earnings}</dd>
          </dl>
          <hr />
          <dl>
            <dt>Number of No Pay Leaves</dt>
            <dd>{nopay_leaves}</dd>
          </dl>
          <dl>
            <dt>Other Deductions:</dt>
            <dd>{total_deductions}</dd>
          </dl>
          <dl>
            <dt>Total Deductions:</dt>
            <dd>{nopay_leaves * 100 + total_deductions}</dd>
          </dl>
          <hr />
          <dl style={{ color: "green" }}>
            <dt>Net Salary:</dt>
            <dd>
              {basic +
                (OT_hrs * 120 + aws + bonus + total_earnings) -
                (nopay_leaves * 100 + total_deductions)}
            </dd>
          </dl>
        </form>
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
