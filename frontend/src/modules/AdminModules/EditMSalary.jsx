import React, { Component } from "react";
import axios from "axios";
//import { storage } from "../../firebase";
//import Progress from "../../component/common/ProgressBar/progress";

export default class EditMSalary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empno: "",
      name: "",
      pay_month: "",
      basic: "",
      OT_rate: "",
      OT_hrs: "",
      total_OT: "",
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings: "",
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      total_deductions: "",
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

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {
      empno,
      name,
      pay_month,
      basic,
      OT_rate,
      OT_hrs,
      total_OT,
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings,
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      total_deductions,
      net_salary,
      salary_status
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      pay_month: pay_month,
      basic: basic,
      OT_rate: OT_rate,
      OT_hrs: OT_hrs,
      total_OT: total_OT,
      //earnings: [{ earn_reason: "", earn_amount : "" }],
      total_earnings: total_earnings,
      //deductions: [{ deduct_reason: "", deduct_amount : "" }],
      total_deductions: total_deductions,
      net_salary: net_salary,
      salary_status: salary_status
    };

    console.log(data);
    axios.put(`http://localhost:5000/salary/update/${id}`, data).then(res => {
      if (res.data.success) {
        alert("Monthly Salary Updated Successfully");

        this.setState({
          empno: "",
          name: "",
          pay_month: "",
          basic: "",
          OT_rate: "",
          OT_hrs: "",
          total_OT: "",
          //earnings: [{ earn_reason: "", earn_amount : "" }],
          total_earnings: "",
          //deductions: [{ deduct_reason: "", deduct_amount : "" }],
          total_deductions: "",
          net_salary: "",
          salary_status: ""
        });
      }
    });
    this.props.history.push("/allsalary");
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/salary/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.salary.empno,
          name: res.data.salary.name,
          pay_month: res.data.salary.pay_month,
          basic: res.data.salary.basic,
          OT_rate: res.data.salary.OT_rate,
          OT_hrs: res.data.salary.OT_hrs,
          total_OT: res.data.salary.total_OT,
          total_earnings: res.data.salary.total_earnings,
          total_deductions: res.data.salary.total_deductions,
          net_salary: res.data.salary.net_salary,
          salary_status: res.data.salary.salary_status
        });
        console.log(this.state.salary);
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
      <div className="col-md-6 mt-4 mx-auto">
        <br />

        <h1>Payroll Management | Edit Attendance Details</h1>
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
          <hr></hr>
          <div class="d-flex justify-content-between">
            <div
              className="form-group  col-md-5"
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
              <label style={{ marginBottom: "5px" }}>OT Rate/hr</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    Rs
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="OT_rate"
                  placeholder=""
                  value={this.state.OT_rate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "blue" }}>
                OT Amount
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
                  name="total_OT"
                  placeholder=""
                  value={this.state.total_OT}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
          </div>
          <div class="d-flex align-items-end flex-column">
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "blue" }}>
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
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "red" }}>
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
            <div
              className="form-group col-md-5"
              style={{ marginBottom: "15px" }}
            >
              <label style={{ marginBottom: "5px", color: "#1687A7" }}>
                Net Salary
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
                  name="net_salary"
                  placeholder=""
                  value={this.state.net_salary}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>{" "}
          </div>
          <hr></hr>
          <div className="form-group col-sm-6" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Does the employee recieved the salary ?
            </label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              onChange={this.handleInputChange}
              name="salary_status"
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
                Senior Staff
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

        <br />
      </div>
    );
  }
}
