import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllPayrolls.css";

export default class EditMSalary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payslipID: "",
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
      total_deductions: "", //other deductions
      net_salary: "",
      salary_status: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  validate = () => {
    let payslipIDError = "";
    let empnoError = "";
    let nameError = "";
    let pay_monthError = "";
    let basicError = "";
    let salary_statusError = "";

    if (!this.state.payslipID) {
      payslipIDError = "Pay slip ID required";
    }
    if (!this.state.empno) {
      empnoError = "Employee no. required";
    }
    if (!this.state.name) {
      nameError = "Employee name required";
    }
    if (!this.state.pay_month) {
      pay_monthError = "Pay slip month required";
    }
    if (!this.state.basic) {
      basicError = "Basic salary required";
    }
    if (!this.state.salary_status) {
      salary_statusError = "Salary status required";
    }

    if (
      payslipIDError ||
      empnoError ||
      nameError ||
      pay_monthError ||
      basicError ||
      salary_statusError
    ) {
      this.setState({
        payslipIDError,
        empnoError,
        nameError,
        pay_monthError,
        basicError,
        salary_statusError
      });
      toast.error("Error while Updating. Please Check Again!!!");
      return false;
    }
    return true;
  };

  handleBackClick = () => {
    this.setState({ redirectToReferrer: true });
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {
      payslipID,
      empno,
      name,
      pay_month,
      basic,
      //OT_rate,
      OT_hrs,
      //total_OT,
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
      payslipID: payslipID,
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

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.payslipID);
      console.log(data);

      axios.put(`http://localhost:5000/salary/update/${id}`, data).then(res => {
        if (res.data.success) {
          this.setState({
            payslipID: "",
            empno: "",
            name: "",
            pay_month: "",
            basic: 0,
            //OT_rate: "",
            OT_hrs: 0,
            //total_OT: "",
            bonus: 0,
            aws: 0,
            //earnings: [{ earn_reason: "", earn_amount : "" }],
            total_earnings: 0,
            //deductions: [{ deduct_reason: "", deduct_amount : "" }],
            nopay_leaves: 0,
            total_deductions: 0,
            net_salary: 0,
            salary_status: ""
          });
          toast.success("Updated Details Successfully!");
        }
      });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/salary/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          payslipID: res.data.salary.payslipID,
          empno: res.data.salary.empno,
          name: res.data.salary.name,
          pay_month: res.data.salary.pay_month,
          basic: res.data.salary.basic,
          //OT_rate: res.data.salary.OT_rate,
          OT_hrs: res.data.salary.OT_hrs,
          //total_OT: res.data.salary.total_OT,
          bonus: res.data.salary.bonus,
          aws: res.data.salary.aws,
          total_earnings: res.data.salary.total_earnings,
          nopay_leaves: res.data.salary.nopay_leaves,
          total_deductions: res.data.salary.total_deductions,
          net_salary: res.data.salary.net_salary,
          salary_status: res.data.salary.salary_status
        });
        console.log(this.state.salary);
      }
    });
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/allsalary" />;
    }

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Attendance Details</h1>
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
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={({ marginBottom: "5px" }, { color: "#1687A7" })}
            >
              Pay Slip No
            </label>
            <input
              type="text"
              id="valid1"
              className="form-control"
              placeholder="auto generated"
              name="payslipID"
              value={this.state.payslipID}
              onChange={this.handleInputChange}
              disabled
            />
            <div className="formValid">{this.state.payslipIDError}</div>
          </div>
          <h4>Employee Details</h4>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={({ marginBottom: "5px" }, { color: "#1687A7" })}
            >
              Employee ID<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="number"
              id="valid1"
              className="form-control"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              required
            />
            <div className="formValid">{this.state.empnoError}</div>
          </div>
          <div className="form-group " style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Name<span style={{ color: "red" }}> *</span>
            </label>
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
            <div className="formValid">{this.state.nameError}</div>
          </div>
          <br />
          <h4>Basic</h4>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <div
              className="form-group  col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Month-Year<span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="pay_month"
                placeholder="Please type mm-yyyy (eg: 01-2021)"
                value={this.state.pay_month}
                onChange={this.handleInputChange}
                required
              />
              <div className="formValid">{this.state.pay_monthError}</div>
            </div>
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "blue" }}>
                Basic Salary<span style={{ color: "red" }}> *</span>
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
              <div className="formValid">{this.state.basicError}</div>
            </div>{" "}
          </div>
          <br />
          <h4>Earnings</h4>
          <hr></hr>
          <p style={{ color: "red" }}>** Current OT Rate/hr = Rs 120.00 **</p>
          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              OT Hours
            </label>
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
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Bonus
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
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
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
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Other Earnings
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
                name="total_earnings"
                placeholder=""
                value={this.state.total_earnings}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>{" "}
          <br />
          <h4>Deductions</h4>
          <hr></hr>
          <div className="form-group col-sm-5" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={({ marginBottom: "5px" }, { color: "#1687A7" })}
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
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Deductions
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
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Did the employee recieved the salary ?
              <span style={{ color: "red" }}> *</span>
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="salary_status"
              placeholder="Select Salary Status"
              required
            >
              <option value="DEFAULT" disabled>
                {this.state.salary_status}
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
            <div className="formValid">{this.state.salary_statusError}</div>
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <button
              className="btn btn-warning"
              type="submit"
              style={{ marginTop: "15px" }}
              onClick={this.onSubmit}
            >
              <i className="fa fa-refresh"></i>&nbsp;Update
            </button>{" "}
            &nbsp;&nbsp;
            <button
              className="btn btn-danger"
              type="cancel"
              style={{ marginTop: "15px" }}
            >
              Cancel
            </button>
          </div>
          <div />
        </form>
        <div class="back">
          <a onClick={this.handleBackClick}>
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Salary List
            </i>
          </a>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          type="success"
        />

        <br />
      </div>
    );
  }
}
