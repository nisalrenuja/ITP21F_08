import React, { Component } from "react";
import axios from "axios";
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
    axios.put(`http://localhost:5000/payroll/update/${id}`, data).then(res => {
      if (res.data.success) {
        alert("Salary Details Updated Successfully");

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
    this.props.history.push("/admin");
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
          salary_date: res.data.payroll.salary_date
        });
        console.log(this.state.payroll);
      }
    });
  }
  /*
  uploadPDF(e) {
    if (e.target.files[0] !== null) {
      const uploadTask = storage
        .ref(`users/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ uploadPercentage: progress });
        },
        error => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("users")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then(url => {
              this.setState({ reportPDF: url });
              console.log("Hello " + url);
            });
        }
      );
    } else {
    }
  }
  */
  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Payroll Details</h1>
        <br />
        <br />

        <form
          className="need-validation"
          noValidate
          style={{
            backgroundColor: "#F6F5F5",
            border: "5px solid eastern blue",
            padding: "30px",
            borderRadius: "15px"
          }}
        >
          <h2>Employee Details</h2>
          <hr></hr>

          <div className="form-group col-sm-4" style={{ marginBottom: "15px" }}>
            <label
              for="valid1"
              class="form-label"
              style={{ marginBottom: "5px" }}
            >
              Empoyee ID
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
          </div>

          <div className="form-group " style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter full name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="orm-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Position</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="position"
              required
            >
              <option value="DEFAULT" disabled>
                {this.state.position}
              </option>
              <option value="Manager">Manager</option>
              <option value="Senior">Senior Staff</option>
              <option value="Trainee">Trainee</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <br />

          <h2>Bank Details</h2>
          <hr></hr>

          <div class="d-flex justify-content-between">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Bank</label>
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
                <option name="commercial">Commercial Bank of Ceylon</option>
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
            </div>

            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Branch</label>
              <input
                type="text"
                className="form-control"
                name="bank_branch"
                placeholder=""
                value={this.state.bank_branch}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group col-md-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Account No</label>
            <input
              type="text"
              className="form-control"
              name="account_no"
              placeholder="Type the correct account number"
              value={this.state.account_no}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <hr></hr>

          <div class="d-flex justify-content-around">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Basic Salary</label>
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
                  placeholder=""
                  value={this.state.basic_salary}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px" }}>Pay Date</label>
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
        <br />
      </div>
    );
  }
}
