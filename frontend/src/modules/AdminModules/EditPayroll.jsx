import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { storage } from "../../firebase";
//import Progress from "../../component/common/ProgressBar/progress";

export default class EditPayroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empno: "",
      name: "",
      position: "",
      bank: "",
      bank_branch: "",
      account_no: "",
      basic_salary: "",
      salary_date: "",
      last_paid: ""
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
    let empnoError = "";
    let nameError = "";
    let positionError = "";
    let bankError = "";
    let bank_branchError = "";
    let account_noError = "";
    let basic_salaryError = "";

    if (!this.state.empno) {
      empnoError = "Employee no. required";
    }
    if (!this.state.name) {
      nameError = "Employee name required";
    }
    if (!this.state.position) {
      positionError = "Position required";
    }
    if (!this.state.bank) {
      bankError = "Bank name required";
    }
    if (!this.state.bank_branch) {
      bank_branchError = "Branch required";
    }
    if (!this.state.account_no) {
      account_noError = "Account no. required";
    }
    if (!this.state.basic_salary) {
      basic_salaryError = "Basic salary required";
    }

    if (
      empnoError ||
      nameError ||
      positionError ||
      bankError ||
      bank_branchError ||
      account_noError ||
      basic_salaryError
    ) {
      this.setState({
        empnoError,
        nameError,
        positionError,
        bankError,
        bank_branchError,
        account_noError,
        basic_salaryError
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
      empno,
      name,
      position,
      bank,
      bank_branch,
      account_no,
      basic_salary,
      salary_date,
      last_paid
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      position: position,
      bank: bank,
      bank_branch: bank_branch,
      account_no: account_no,
      basic_salary: basic_salary,
      salary_date: salary_date,
      last_paid: last_paid
    };

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.empno);
      console.log(data);

      axios
        .put(`http://localhost:5000/payroll/update/${id}`, data)
        .then(res => {
          if (res.data.success) {
            this.setState({
              empno: "",
              name: "",
              position: "",
              bank: "",
              bank_branch: "",
              account_no: "",
              basic_salary: "",
              salary_date: "",
              last_paid: ""
            });
            toast.success("Updated Details Successfully!");
          }
        });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/payroll/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.payroll.empno,
          name: res.data.payroll.name,
          position: res.data.payroll.position,
          bank: res.data.payroll.bank,
          bank_branch: res.data.payroll.bank_branch,
          account_no: res.data.payroll.account_no,
          basic_salary: res.data.payroll.basic_salary,
          salary_date: res.data.payroll.salary_date,
          last_paid: res.data.payroll.last_paid
        });
        console.log(this.state.payroll);
      }
    });
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/admin" />;
    }

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Payroll Details</h1>
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
          <h4>Employee Details</h4>
          <hr></hr>

          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={({ marginBottom: "5px" }, { color: "#1687A7" })}
            >
              Payroll ID
            </label>
            <input
              type="text"
              id="valid1"
              className="form-control"
              placeholder="automatically generated"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              disabled
            />
            <div className="formValid">{this.state.empnoError}</div>
          </div>

          <div className="form-group " style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Full Name<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <div className="formValid">{this.state.nameError}</div>
          </div>

          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Position<span style={{ color: "red" }}> *</span>
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="DEFAULT" placeholder="Select" disabled>
                {this.state.position}
              </option>
              <option name="Manager" value="Manager">
                Manager
              </option>
              <option value="Senior">Senior Staff</option>
              <option value="Trainee">Trainee</option>
              <option value="Other">Other</option>
            </select>
            <div className="formValid">{this.state.positionError}</div>
          </div>
          <br />

          <h4>Bank Details</h4>
          <hr></hr>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Bank <span style={{ color: "red" }}> *</span>
              </label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                onChange={this.handleInputChange}
                name="bank"
                required
              >
                <option value="DEFAULT" disabled>
                  {this.state.bank}
                </option>
                <option name="boc">Bank of Ceylon</option>
                <option name="commercial">Commercial Bank</option>
                <option name="dfcc">DFCC Bank PLC</option>
                <option name="hatton">Hatton National Bank</option>
                <option name="hdfc">HDFC Bank</option>
                <option name="nations">Nations Trust Bank</option>
                <option name="ndb">NDB Bank</option>
                <option name="panasia">PAN Asia Bank</option>
                <option name="peoples">Peoples Bank</option>
                <option name="sampath">Sampath Bank</option>
                <option name="seylan">Seylan Bank</option>
                <option name="union">Union Bank-Colombo</option>
              </select>
              <div className="formValid">{this.state.bankError}</div>
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Branch <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="bank_branch"
                value={this.state.bank_branch}
                onChange={this.handleInputChange}
              />
              <div className="formValid">{this.state.bank_branchError}</div>
            </div>
          </div>

          <div className="form-group col-md-6" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Account No <span style={{ color: "red" }}> **</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="account_no"
              placeholder="Type the correctly (unique*)"
              value={this.state.account_no}
              onChange={this.handleInputChange}
            />
            <div className="formValid">{this.state.account_noError}</div>
          </div>
          <hr></hr>

          <div class="d-flex justify-content-around">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
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
                  name="basic_salary"
                  value={this.state.basic_salary}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="formValid">{this.state.basic_salaryError}</div>
            </div>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
                Pay Date
              </label>
              <input
                type="date"
                className="form-control"
                name="salary_date"
                placeholder="Enter the pay day"
                value={this.state.salary_date}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group col-md-5" style={{ marginBottom: "15px" }}>
            <label style={({ marginBottom: "5px" }, { color: "#1687A7" })}>
              Last Paid Month
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="last_paid"
            >
              <option value="DEFAULT" disabled>
                {this.state.last_paid}
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
