import React, { Component } from "react";
import axios from "axios";
import "./EditEmployee.css";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);
    //set the initial states
    this.state = {
      empno: "",
      name: "",
      email: "",
      contact: "",
      dob: "",
      gender: "",
      nic_no: "",
      nic_no_copy: "",
      permernant_address: "",
      district: "",
      province: "",
      place_of_stay: "",
      organization: "",
      sector: "",
      duration: "",
      commencement_date: "",
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

  //Assign the values from the input fields to states when changed
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  //toast notification for invalid form data
  notify = () => {
    toast.error(
      "Invalid Form Data. Please Check Name, Email, Status, Type, Contact & NIC Number !!!"
    );
  };
  //toast notification for invalid form data
  notify1 = () => {
    toast.warn(
      "Employee Already Exists, Please check your NIC and enter again!"
    );
  };

  //Form validations for Employee name, email, status, type, status, contactNo and NICNo
  validate = async () => {
    let empnoError = "";
    let nameError = "";
    let emailError = "";
    let statusError = "";
    let contactError = "";
    let NICError = "";

    //validate employee number is blank
    if (!this.state.empno) {
      empnoError = "**EmpNo Cannot Be Blank";
    }
    //Validate employee name is blank
    if (!this.state.name) {
      nameError = "**Name Cannot Be Blank";
    }
    //Validate email with the conditions
    if (!this.state.email.match("[a-z0-9.]{1,}[@]{1}[a-z]{1,}[.]{1}(com)$")) {
      emailError = "**Invalid email";
    }
    //Validate status is blank
    if (!this.state.status) {
      statusError = "**Status Cannot Be Blank";
    }
    //Validate type is blank
    if (!this.state.contact) {
      contactError = "**Contact Number Cannot Be Blank";
    } else if (this.state.contact.length == undefined) {
    } else if (this.state.contact.length !== 10) {
      contactError = "**Contact Number must have 10 digits";
    }
    //Validate NIC Number for Both Old and New
    if (!this.state.nic_no) {
      NICError = "**NIC Cannot Be Blank";
    } else if (
      this.state.nic_no.length !== 12 &&
      this.state.nic_no.length !== 10
    ) {
      NICError = "**Invalid NIC";
    } else if (
      !(this.state.nic_no.length == 10 && this.state.nic_no.includes("V"))
    ) {
      NICError = "**Invalid Old NIC";
      console.log(this.state.nic_no.match("^[0-9]{9}[V]{1}$"));
    } else if (this.state.nic_no == this.state.nic_no_copy) {
    } else {
      const { nic_no } = this.state;
      //Validate if an employee with the same nic already exist
      await axios
        .get(`http://localhost:5000/employees/checknic/${nic_no}`)
        .then(res => {
          if (res.data.success) {
            if (res.data.staffs.length == 0) {
              console.log(res.data.staffs.length);
            } else {
              this.notify1();
              NICError = "**NIC Already Exists!!!";
              return false;
            }
          }
        });
    }

    //Validate if theres a error state triggered
    if (
      emailError ||
      nameError ||
      empnoError ||
      statusError ||
      contactError ||
      NICError
    ) {
      this.setState({
        emailError,
        nameError,
        empnoError,
        statusError,
        contactError,
        NICError
      });
      //toast to display when error is triggered
      this.notify();
      return false;
    }
    return true;
  };

  //Method triggered when cancel button is clicked to redirect
  handleCancelClick = () => {
    this.setState({ redirectToReferrer: true });
  };

  //Method triggered when save button is clicked
  onSubmit = async e => {
    e.preventDefault();
    const id = this.props.dataFromParent;

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
    console.log(commencement_date);
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
    //Validate the form data
    const isValid = await this.validate();
    if (isValid) {
      console.log(isValid);
      axios
        .put(`http://localhost:5000/employees/update/${id}`, data)
        .then(res => {
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
            alert("Employee Details Updated!");
          }
        });
    } else {
    }
  };

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    const p = this.props.dataFromParent;
    console.log(p);
    axios.get(`http://localhost:5000/employees/${p}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.employee.empno,
          name: res.data.employee.name,
          email: res.data.employee.email,
          contact: res.data.employee.contact,
          dob: res.data.employee.dob,
          gender: res.data.employee.gender,
          nic_no: res.data.employee.nic_no,
          nic_no_copy: res.data.employee.nic_no,
          permernant_address: res.data.employee.permernant_address,
          district: res.data.employee.district,
          province: res.data.employee.province,
          place_of_stay: res.data.employee.place_of_stay,
          organization: res.data.employee.organization,
          sector: res.data.employee.sector,
          duration: res.data.employee.duration,
          commencement_date: res.data.employee.commencement_date,
          ending_date: res.data.employee.ending_date,
          professional_education: res.data.employee.professional_education,
          completed_stage: res.data.employee.completed_stage,
          current_stage: res.data.employee.current_stage,
          attempt: res.data.employee.attempt,
          subjects: res.data.employee.subjects,
          al_year: res.data.employee.al_year,
          university: res.data.employee.university,
          graduated_yr: res.data.employee.graduated_yr,
          department: res.data.employee.department,
          old_password: res.data.employee.old_password,
          new_password: res.data.employee.new_password,
          confirm_password: res.data.employee.confirm_password,
          type: res.data.employee.type,
          status: res.data.employee.status
        });

        console.log(this.state.empno);
      }
    });
  }
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AllEmployees" />;
    }

    return (
      <div className="container">
        <h1 class="headie">Edit Employee Details </h1>
        <hr class="lineie"></hr>
        <form>
          <div class="mbmainie">
            <h1 class="head1">Basic Info </h1>
            <hr class="line1"></hr>
            <p class="label1">Employee Number: </p>
            <input
              type="text"
              class="box1"
              id="empno"
              name="empno"
              value={this.state.empno}
              onChange={this.handleInputChange}
              placeholder="Enter Employee Number (Required)"
              disabled
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
              style={{ color: "black" }}
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
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "50px",
                top: "425px"
              }}
            >
              {this.state.NICError}
            </div>
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
              style={{ color: "black" }}
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
            value={this.state.type}
            type="text"
            class="box29"
            id="type"
            name="type"
            onChange={this.handleInputChange}
            placeholder="Enter 'Audit' / 'Tax' (Required)"
            style={{ color: "black" }}
          >
            <option value="DEFAULT" disabled>
              Select Type
            </option>
            <option value="Audit">Audit</option>
            <option value="Tax">Tax</option>
          </select>
          <p class="label30">Status: </p>
          <select
            value={this.state.status}
            type="text"
            class="box30"
            id="status"
            name="status"
            onChange={this.handleInputChange}
            placeholder="Enter 'Trainee' / 'Senior' (Required)"
            style={{ color: "black" }}
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
                marginRight: "5px",
                borderRadius: "60px",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              }}
              onClick={this.handleCancelClick}
            >
              <i></i>&nbsp;Cancel
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
              <i></i>&nbsp; Save
            </button>
          </center>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={false}
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
