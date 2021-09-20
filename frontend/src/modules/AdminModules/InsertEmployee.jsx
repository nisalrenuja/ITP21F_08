import React, { Component } from "react";
import axios from "axios";
import "./InsertEmployee.css";
import { Redirect } from "react-router";

export default class InsertEmployee extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    console.log(date);

    this.state = {
      empno: "",
      name: "",
      email: "",
      contact: "",
      dob: "",
      gender: "",
      nic_no: "",
      permernant_address: "",
      district: "",
      province: "",
      place_of_stay: "",
      organization: "",
      sector: "",
      duration: "",
      commencement_date: today,
      ending_date: "",
      professional_education: "",
      completed_stage: "",
      current_stage: "",
      attempt: "",
      subjects: "",
      al_year: "",
      university: "",
      graduated_yr: "",
      department: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
      type: "",
      status: "",
      empnoError: "",
      nameError: "",
      emailError: "",
      statusError: "",
      redirectToReferrer: false
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
    let emailError = "";
    let statusError = "";
    let typeError = "";
    let contactError = "";

    if (!this.state.empno) {
      empnoError = "**EmpNo Cannot Be Blank";
    }

    if (!this.state.name) {
      nameError = "**Name Cannot Be Blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "**Invlaid email";
    }

    if (!this.state.status) {
      statusError = "**Status Cannot Be Blank";
    }
    if (!this.state.type) {
      typeError = "**Type Cannot Be Blank";
    }
    if (!this.state.contact) {
      contactError = "**Contact Number Cannot Be Blank";
    }

    if (
      emailError ||
      nameError ||
      empnoError ||
      statusError ||
      typeError ||
      contactError
    ) {
      //emaiError also equal to emailError:emailError in Js.
      this.setState({
        emailError,
        nameError,
        empnoError,
        statusError,
        typeError,
        contactError
      });
      alert(
        "Invalid Form Data. Please Check Emp No, Name, Email, Status, Type & Contact!!!"
      );
      return false;
    }
    return true;
  };

  handleCancelClick = () => {
    this.setState({ redirectToReferrer: true });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      empno,
      name,
      email,
      contact,
      dob,
      gender,
      nic_no,
      permernant_address,
      district,
      province,
      place_of_stay,
      organization,
      sector,
      duration,
      commencement_date,
      ending_date,
      professional_education,
      completed_stage,
      current_stage,
      attempt,
      subjects,
      al_year,
      university,
      graduated_yr,
      department,
      old_password,
      new_password,
      confirm_password,
      type,
      status
    } = this.state;

    const data = {
      empno: empno,
      name: name,
      email: email,
      contact: contact,
      dob: dob,
      gender: gender,
      nic_no: nic_no,
      permernant_address: permernant_address,
      district: district,
      province: province,
      place_of_stay: place_of_stay,
      organization: organization,
      sector: sector,
      duration: duration,
      commencement_date: commencement_date,
      ending_date: ending_date,
      professional_education: professional_education,
      completed_stage: completed_stage,
      current_stage: current_stage,
      attempt: attempt,
      subjects: subjects,
      al_year: al_year,
      university: university,
      graduated_yr: graduated_yr,
      department: department,
      old_password: old_password,
      new_password: new_password,
      confirm_password: confirm_password,
      type: type,
      status: status
    };
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      axios.post("http://localhost:5000/employees/save", data).then(res => {
        if (res.data.success) {
          this.setState({
            empno: empno,
            name: name,
            email: email,
            contact: contact,
            dob: dob,
            gender: gender,
            nic_no: nic_no,
            permernant_address: permernant_address,
            district: district,
            province: province,
            place_of_stay: place_of_stay,
            organization: organization,
            sector: sector,
            duration: duration,
            commencement_date: commencement_date,
            ending_date: ending_date,
            professional_education: professional_education,
            completed_stage: completed_stage,
            current_stage: current_stage,
            attempt: attempt,
            subjects: subjects,
            al_year: al_year,
            university: university,
            graduated_yr: graduated_yr,
            department: department,
            old_password: old_password,
            new_password: new_password,
            confirm_password: confirm_password,
            type: type,
            status: status,
            redirectToReferrer: true
          });
          alert("Employee Details Saved!");
        }
      });
    }
  };
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AllEmployees" />;
    }

    return (
      <div className="container">
        <h1 class="headie">Add New Employee </h1>
        <hr class="lineie"></hr>
        <form>
          <div class="mainie">
            <h1 class="head1">Basic Info </h1>
            <hr class="line1"></hr>
            <p class="label1">Employee Number: </p>
            <input
              type="number"
              class="box1"
              id="empno"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              placeholder="Enter Employee Number (Required)"
              required
            />
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "50px",
                top: "155px"
              }}
            >
              {this.state.empnoError}
            </div>
            <p class="label2">Employee Name: </p>
            <input
              type="text"
              class="bbox2"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Enter Employee Name (Required)"
              required
            />
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "500px",
                top: "155px"
              }}
            >
              {this.state.nameError}
            </div>
            <p class="label3">Email: </p>
            <input
              type="text"
              class="box3"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Enter Email (Required)"
              required
            />
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "50px",
                top: "245px"
              }}
            >
              {this.state.emailError}
            </div>
            <p class="label4">Contact No: </p>
            <input
              type="number"
              class="box4"
              id="contact"
              name="contact"
              value={this.state.contact}
              onChange={this.handleInputChange}
              placeholder="Enter Contact Number (Required)"
              required
            />
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "500px",
                top: "245px"
              }}
            >
              {this.state.contactError}
            </div>
            <p class="label5">DOB: </p>
            <input
              type="date"
              class="box5"
              id="dob"
              name="dob"
              value={this.state.dob}
              onChange={this.handleInputChange}
            />
            <p class="label6">Gender: </p>
            <select
              type="text"
              class="box6"
              id="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.handleInputChange}
            >
              <option value="DEFAULT" disabled>
                Select Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <p class="label7">NIC No: </p>
            <input
              type="text"
              class="box7"
              id="nic_no"
              name="nic_no"
              value={this.state.nic_no}
              onChange={this.handleInputChange}
            />
            <p class="label8">Permanent Address: </p>
            <input
              type="text"
              class="box8"
              id="permernant_address"
              name="permernant_address"
              value={this.state.permernant_address}
              onChange={this.handleInputChange}
            />

            <p class="label9">District: </p>
            <input
              type="text"
              class="box9"
              id="district"
              name="district"
              value={this.state.district}
              onChange={this.handleInputChange}
            />
            <p class="label10">Province: </p>
            <select
              value={this.state.province}
              type="text"
              class="box10"
              id="province"
              name="province"
              onChange={this.handleInputChange}
              placeholder="Enter 'Audit' / 'Tax' (Required)"
            >
              <option value="DEFAULT" disabled>
                Select Province
              </option>
              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Southern">Southern</option>
              <option value="Uva">Uva</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
              <option value="North Western">North Western</option>
              <option value="North Central">North Central</option>
              <option value="Northern">Northern</option>
              <option value="Eastern">Eastern</option>
            </select>
            <p class="label11">Place Of Stay: </p>
            <input
              type="text"
              class="box11"
              id="place_of_stay"
              name="place_of_stay"
              value={this.state.place_of_stay}
              onChange={this.handleInputChange}
            />

            <h1 class="head2">Previous Experience </h1>
            <hr class="line2"></hr>
            <p class="label12">Organization: </p>
            <input
              type="text"
              class="box12"
              id="organization"
              name="organization"
              value={this.state.organization}
              onChange={this.handleInputChange}
            />
            <p class="label13">Sector: </p>
            <input
              type="text"
              class="box13"
              id="sector"
              name="sector"
              value={this.state.sector}
              onChange={this.handleInputChange}
            />
            <p class="label14">Duration: </p>
            <input
              type="text"
              class="box14"
              id="duration"
              name="duration"
              value={this.state.duration}
              onChange={this.handleInputChange}
            />
            <h1 class="head5">Training </h1>
            <hr class="line5"></hr>
            <p class="label15">Commencement Date: </p>
            <input
              type="text"
              class="box15"
              id="commmencement_date"
              name="commmencement_date"
              value={this.state.commencement_date}
              disabled
            />
            <p class="label16">Expected Ending Date: </p>
            <input
              type="date"
              class="box16"
              id="ending_date"
              name="ending_date"
              value={this.state.ending_date}
              onChange={this.handleInputChange}
            />
            <h1 class="head3">Examination </h1>
            <hr class="line3"></hr>
            <p class="label17">Professional Education: </p>
            <input
              type="text"
              class="box17"
              id="professional_education"
              name="professional_education"
              value={this.state.professional_education}
              onChange={this.handleInputChange}
            />
            <p class="label18">Completed Stage: </p>
            <input
              type="text"
              class="box18"
              id="completed_stage"
              name="completed_stage"
              value={this.state.completed_stage}
              onChange={this.handleInputChange}
            />
            <p class="label19">Current Stage: </p>
            <input
              type="text"
              class="box19"
              id="current_stage"
              name="current_stage"
              value={this.state.current_stage}
              onChange={this.handleInputChange}
            />
            <p class="label20">Attempt: </p>
            <input
              type="text"
              class="box20"
              id="attempt"
              name="attempt"
              value={this.state.attempt}
              onChange={this.handleInputChange}
            />
            <p class="label21">Subjects: </p>
            <input
              type="text"
              class="box21"
              id="subjects"
              name="subjects"
              value={this.state.subjects}
              onChange={this.handleInputChange}
            />
            <h1 class="head4">Academic Info </h1>
            <hr class="line4"></hr>
            <p class="label22">A/L Year: </p>
            <input
              type="text"
              class="box22"
              id="al_year"
              name="al_year"
              value={this.state.al_year}
              onChange={this.handleInputChange}
            />
            <p class="label23">University: </p>
            <input
              type="text"
              class="box23"
              id="university"
              name="university"
              value={this.state.university}
              onChange={this.handleInputChange}
            />
            <p class="label24">Graduated Year: </p>
            <input
              type="text"
              class="box24"
              id="graduated_yr"
              name="graduated_yr"
              value={this.state.graduated_yr}
              onChange={this.handleInputChange}
            />
            <p class="label25">Department: </p>
            <input
              type="text"
              class="box25"
              id="department"
              name="department"
              value={this.state.department}
              onChange={this.handleInputChange}
            />
            <h1 class="head6">Security Info </h1>
            <hr class="line6"></hr>
            <p class="label26">Old Password: </p>
            <input
              type="text"
              class="box26"
              id="old_password"
              name="old_password"
              value={this.state.old_password}
              onChange={this.handleInputChange}
            />
            <p class="label27">New Password: </p>
            <input
              type="text"
              class="box27"
              id="new_password"
              name="new_password"
              value={this.state.new_password}
              onChange={this.handleInputChange}
            />
            <p class="label28">Confirm Password: </p>
            <input
              type="text"
              class="box28"
              id="confirm_password"
              name="confirm_password"
              value={this.state.confirm_password}
              onChange={this.handleInputChange}
            />
          </div>
          <p class="label29">Type: </p>
          <select
            defaultValue={"DEFAULT"}
            type="text"
            class="box29"
            id="type"
            name="type"
            onChange={this.handleInputChange}
            placeholder="Enter 'Audit' / 'Tax' (Required)"
          >
            <option value="DEFAULT" disabled>
              Select Type
            </option>
            <option value="Audit">Audit</option>
            <option value="Tax">Tax</option>
          </select>
          <p class="label30">Status: </p>
          <select
            defaultValue={"DEFAULT"}
            type="text"
            class="box30"
            id="status"
            name="status"
            onChange={this.handleInputChange}
            placeholder="Enter 'Trainee' / 'Senior' (Required)"
            required
          >
            <option value="DEFAULT" disabled>
              Select Status
            </option>
            <option value="Trainee">Trainee</option>
            <option value="Senior">Senior</option>
          </select>
          <div
            style={{
              color: "red",
              position: "absolute",
              left: "110px",
              top: "780px"
            }}
          >
            {this.state.typeError}
          </div>
          <div
            style={{
              color: "red",
              position: "absolute",
              left: "610px",
              top: "780px"
            }}
          >
            {this.state.statusError}
          </div>
          <center>
            <button
              className="btn btn-light"
              type="cancel"
              style={{
                marginTop: "240px",
                marginLeft: "920px",
                marginRight: "20px",
                borderRadius: "60px",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              }}
              onClick={this.handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              type="submit"
              style={{
                marginTop: "240px",
                borderRadius: "60px",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              }}
              onClick={this.onSubmit}
            >
              <i></i> Save
            </button>
          </center>
        </form>
      </div>
    );
  }
}
