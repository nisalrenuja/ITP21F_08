import React, { Component } from "react";
import axios from "axios";

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
      salary_date: ""
    };
  }

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
      empno,
      name,
      position,
      bank,
      bank_branch,
      account_no,
      basic_salary,
      salary_date
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      position: position,
      bank: bank,
      bank_branch: bank_branch,
      account_no: account_no,
      basic_salary: basic_salary,
      salary_date: salary_date
    };

    console.log(data);

    axios.post("http://localhost:5000/payroll/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          empno: "",
          name: "",
          position: "",
          bank: "",
          bank_branch: "",
          account_no: "",
          basic_salary: "",
          salary_date: ""
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
          Salary Details Of an Employee
        </h1>

        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Empoyee ID</label>
            <input
              type="text"
              className="form-control"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your full name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Position</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="position"
            >
              <option value="DEFAULT" disabled>
                Select option
              </option>

              <option value="maternity">Manager</option>
              <option value="paternity">Senior Staff</option>
              <option value="maternity">Trainee</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Bank</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="bank"
            >
              <option value="DEFAULT" disabled>
                Select Bank Name
              </option>
              <option value="boc">Bank of Ceylon</option>
              <option value="commercial">Commercial Bank of Ceylon</option>
              <option value="dfcc">DFCC Bank PLC</option>
              <option value="hatton">Hatton National Bank</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="nations">Nations Trust Bank</option>
              <option value="ndb">NDB Bank</option>
              <option value="panasia">PAN Asia Bank</option>
              <option value="peoples">Peoples Bank</option>
              <option value="sampath">Sampath Bank</option>
              <option value="seylan">Seylan Bank</option>
              <option value="union">Union Bank-Colombo</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Branch</label>
            <input
              type="text"
              className="form-control"
              name="bank_branch"
              placeholder=""
              value={this.state.bank_branch}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Account No</label>
            <input
              type="text"
              className="form-control"
              name="account_no"
              placeholder="Type the correct account number"
              value={this.state.account_no}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Basic Salary</label>
            <input
              type="number"
              className="form-control"
              name="basic_salary"
              placeholder=""
              value={this.state.basic_salary}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Salary Date</label>
            <input
              type="date"
              className="form-control"
              name="salary_date"
              placeholder="Enter the pay day"
              value={this.state.salary_date}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            className="btn btn-outline-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fas fa-save"></i>&nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
