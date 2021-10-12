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
      total_deductions: "",
      net_salary: "",
      salary_status: ""
    };
  }

  demo = e => {
    e.preventDefault();
    this.setState({
      empno: "1008",
      name: "Sahani Kavindi",
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

  componentDidMount() {
    this.retrieveSalaries();
  }

  retrieveSalaries() {
    axios.get(`http://localhost:5000/salaries/checkPayslipID`).then(res => {
      if (res.data.success) {
        this.setState({
          salary: res.data.payslipID
        });
        if (res.data.payslipID.length == 0) {
          console.log(res.data.staffs.length);

          this.state.payslipID = 4000;
        } else {
          var no = this.state.salary[0].payslipID;
          this.state.payslipID = no + 1;
          console.log(this.state.payslipID);
        }
      }
    });
  }

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
      toast.warn("Invalid Form. Please Check Again!!!");
      return false;
    }
    return true;
  };

  handleBackClick = () => {
    this.setState({ redirectToReferrer: true });
  };

  onSubmit = async e => {
    e.preventDefault();

    await axios
      .get(`http://localhost:5000/salaries/checkPayslipID`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            salary: res.data.payslipID
          });
          var no = this.state.salary[0].payslipID;
          this.state.payslipID = no + 1;
          console.log(this.state.payslipID);
        } else {
        }
      });

    const {
      payslipID,
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

      axios.post("http://localhost:5000/salary/save", data).then(res => {
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
          toast.success("Saved Details Successfully!");
        }
      });
    }

    //alert("Save Details Successful!");
    //this.props.history.push("/allsalary");
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/allsalary" />;
    }

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Calculate Monthly Salary</h1>
        <br />
        <br />
        <button
          type="button"
          class="btn btn-warning"
          onClick={this.demo}
          style={{
            marginTop: "0px",
            marginBottom: "30px",
            borderRadius: "40px",
            filter: "drop-shadow(0px 4px 4px rgba (0, 0, 0, 0.2))"
          }}
        >
          Demo
        </button>

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
            <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Month
              </label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="pay_month"
              >
                <option value="DEFAULT" disabled>
                  {this.state.pay_month}
                </option>
                <option name="jan">January</option>
                <option name="feb">February</option>
                <option name="mar">March</option>
                <option name="apr">April</option>
                <option name="may">May</option>
                <option name="jun">June</option>
                <option name="jul">July</option>
                <option name="aug">August</option>
                <option name="sep">September</option>
                <option name="oct">October</option>
                <option name="nov">November</option>
                <option name="dec">December</option>
              </select>
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
     salary         <option value="Not Recieved" class="alertred">
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
          <a onClick={this.handleBackClick}>
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Salary List
            </i>
          </a>
        </div>

        <br />
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
      </div>
    );
  }
}
