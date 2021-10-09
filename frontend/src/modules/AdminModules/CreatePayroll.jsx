import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllPayrolls.css";

export default class CreatePayroll extends Component {
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
  demo = e => {
    e.preventDefault();
    this.setState({
      name: "Sahani Kulari",
      position: "Manager",
      bank: "Peoples Bank",
      bank_branch: "Malabe",
      account_no: "23778001",
      basic_salary: "37000",
      salary_date: "2021-10-13",
      last_paid: "Sep"
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

  componentDidMount() {
    this.retrievePayrolls();
  }

  retrievePayrolls() {
    axios.get(`http://localhost:5000/payrolls/checkEmpNo`).then(res => {
      if (res.data.success) {
        this.setState({
          payroll: res.data.empno
        });
        if (res.data.empno.length == 0) {
          console.log(res.data.staffs.length);

          this.state.empno = 1000;
        } else {
          var no = this.state.payroll[0].empno;
          this.state.empno = no + 1;
          console.log(this.state.empno);
        }
      }
    });
  }

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
      toast.warn("Invalid Form. Please Check Again!!!");
      return false;
    }
    return true;
  };

  handleCancelClick = () => {
    this.setState({ redirectToReferrer: true });
  };

  onSubmit = async e => {
    e.preventDefault();
    await axios.get(`http://localhost:5000/payrolls/checkEmpNo`).then(res => {
      if (res.data.success) {
        this.setState({
          payroll: res.data.empno
        });
        var no = this.state.payroll[0].empno;
        this.state.empno = no + 1;
        console.log(this.state.empno);
      } else {
      }
    });

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
        .get(`http://localhost:5000/payroll/checkAccountNo/${account_no}`)
        .then(res => {
          if (res.data.success) {
            if (res.data.staffs.length == 0) {
              console.log(res.data.staffs.length);

              axios
                .post("http://localhost:5000/payroll/save", data)
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
                    toast.success("Save Details Successfully!");
                  }
                });
            } else {
              toast.error("Account number already exists, Please check again!");
            }
          }
        });

      //this.props.history.push("/admin");
    }
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Add Payroll Details</h1>
        <br />
        <button
          type="button"
          class="btn btn-warning"
          onClick={this.demo}
          style={{
            marginTop: "0px",
            marginBottom: "30px",
            borderRadius: "40px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"
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
              <option value="DEFAULT" disabled>
                Select position
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
                  Select Bank Name
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
              <div className="formValid">{this.state.branchError}</div>
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
                <div className="formValid">{this.state.basic_salaryError}</div>
              </div>
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
                Select Month
              </option>
              <option name="jan">Jan</option>
              <option name="feb">Feb</option>
              <option name="mar">Mar</option>
              <option name="apr">Apr</option>
              <option name="may">May</option>
              <option name="jun">Jun</option>
              <option name="jul">Jul</option>
              <option name="aug">Aug</option>
              <option name="sep">Sep</option>
              <option name="oct">Oct</option>
              <option name="nov">Nov</option>
              <option name="dec">Dec</option>
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
            <button
              className="btn btn-danger"
              type="cancel"
              onClick={this.handleCancelClick}
            >
              Cancel
            </button>
          </div>
          <div />
        </form>

        <br />
        <div class="back">
          <a href="/admin">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Payrolls List
            </i>
          </a>
        </div>
        <br />
        <ToastContainer
          position="top-center"
          autoClose={4000}
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
