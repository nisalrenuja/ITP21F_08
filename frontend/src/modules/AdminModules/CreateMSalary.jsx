import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllPayrolls.css";

export default class CreateMSalary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //salaryno: "",
      empno: "",
      name: "",
      pay_month: "",
      basic: "",
      //OT_rate: "",
      OT_hrs: "",
      //total_OT: "",
      bonus: "",
      aws: "",
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings: "",
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      nopay_leaves: "",
      total_deductions: "",
      net_salary: "",
      salary_status: ""
    };
  }

  demo = e => {
    e.preventDefault();
    this.setState({
      empno: "1008",
      name: "Sahani Anjana",
      pay_month: "10-2021",
      basic: "37000",
      OT_hrs: "11",
      bonus: "2300",
      aws: "700",
      total_earnings: "0", //other_earnings
      nopay_leaves: "2",
      total_deductions: "3100", //other deductions
      net_salary: "", //(auto calculated)
      salary_status: "Pending"
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  /*
    handleInputFileChange = e => {
        var file = e.target.files[0];
        console.log(file);
    };
    */

  onSubmit = e => {
    e.preventDefault();

    const {
      //salaryno,
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
    } = this.state;

    const data = {
      //salaryno: salaryno,
      empno: empno,
      name: name,
      pay_month: pay_month,
      basic: basic,
      //OT_rate: OT_rate,
      OT_hrs: OT_hrs,
      //total_OT: total_OT,
      bonus: bonus,
      aws: aws,
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings: total_earnings,
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      nopay_leaves: nopay_leaves,
      total_deductions: total_deductions,
      net_salary: net_salary,
      salary_status: salary_status
    };

    console.log(data);

    axios.post("http://localhost:5000/salary/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          empno: "",
          name: "",
          pay_month: "",
          basic: "",
          //OT_rate: "",
          OT_hrs: "",
          //total_OT: "",
          bonus: "",
          aws: "",
          //earnings: [{ earn_reason: "", earn_amount : "" }],
          total_earnings: "",
          //deductions: [{ deduct_reason: "", deduct_amount : "" }],
          nopay_leaves: "",
          total_deductions: "",
          net_salary: "",
          salary_status: ""
        });
      }
    });
    //alert("Save Details Successful!");
    //this.props.history.push("/allsalary");
  };

  render() {
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Calculate Monthly Salary</h1>
        <br />
        <br />

        <form
          className="need-validation2"
          noValidate
          style={{
            backgroundColor: "#F6F5F5",
            border: "5px solid eastern blue",
            padding: "30px",
            borderRadius: "15px"
          }}
        >
          <h5>Employee Details</h5>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={{ marginBottom: "5px" }}
            >
              Employee ID
            </label>
            <input
              type="number"
              id="valid1"
              className="form-control"
              placeholder="required**"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group " style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="required**"
              placeholder="Enter full name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br />
          <h5>Basic</h5>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <div
              className="form-group  col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Month-Year</label>
              <input
                type="text"
                className="form-control"
                name="pay_month"
                placeholder="Please type mm-yyyy (eg: 01-2021)"
                value={this.state.pay_month}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "blue" }}>
                Basic Salary
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    Rs
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="basic"
                  placeholder=""
                  value={this.state.basic}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
          </div>
          <br />
          <h5>Earnings</h5>
          <hr></hr>
          <p style={{ color: "red" }}>** Current OT Rate/hr = Rs 120.00 **</p>
          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>OT Hours</label>
            <div class="input-group">
              <input
                type="number"
                className="form-control"
                name="OT_hrs"
                placeholder=""
                value={this.state.OT_hrs}
                onChange={this.handleInputChange}
                required
              />
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  hr
                </span>
              </div>
            </div>
          </div>{" "}
          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Bonus</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    Rs
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="bonus"
                  placeholder=""
                  value={this.state.bonus}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>
                AWS (Annual Wage Supplements)
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    Rs
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="aws"
                  placeholder=""
                  value={this.state.aws}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
          </div>
          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Other Earnings</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  Rs
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                name="total_earnings"
                placeholder=""
                value={this.state.total_earnings}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>{" "}
          <br />
          <h5>Deductions</h5>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={{ marginBottom: "5px" }}
            >
              Number of No Pay Leaves
            </label>
            <input
              type="number"
              id="valid1"
              className="form-control"
              name="nopay_leaves"
              value={this.state.nopay_leaves}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Deductions</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend">
                  Rs
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                name="total_deductions"
                placeholder=""
                value={this.state.total_deductions}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>{" "}
          <br />
          <hr></hr>
          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Did the employee recieved the salary ?
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="salary_status"
              required
            >
              <option value="DEFAULT" disabled>
                Select Salary Status
              </option>
              <option value="Pending" class="alertyellow">
                Pending
              </option>
              <option value="Recieved" class="alertgreen">
                Recieved
              </option>
              <option value="Not Recieved" class="alertred">
                Not Recieved
              </option>
              <option value="No Pay" class="alertblue">
                No Pay
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <button
              className="btn btn-info"
              type="submit"
              style={{ backgroundColor: "#1687A7" }}
              onClick={this.onSubmit}
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>{" "}
            &nbsp;&nbsp;
            <button className="btn btn-danger" type="cancel">
              Cancel
            </button>
          </div>
          <div />
        </form>
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
