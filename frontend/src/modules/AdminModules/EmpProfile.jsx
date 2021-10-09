import React, { Component } from "react";
import axios from "axios";
import "./EmpProfile.css";

export default class EmployeeReport extends Component {
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
      totalallocation: "",
      points: [],
      redirectToReferrer: false
    };
  }

  //Load the retreived employee details
  componentDidMount() {
    this.retrievePosts();
  }

  //Retrieve all the employee details for the profile
  async retrievePosts() {
    const id = this.props.match.params.id;
    console.log(id);

    //Get all the employee details of the employee
    await axios.get(`http://localhost:5000/employees/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          empno: res.data.employee.empno,
          name: res.data.employee.name,
          email: res.data.employee.email,
          contact: res.data.employee.contact,
          dob: res.data.employee.dob,
          gender: res.data.employee.gender,
          nic_no: res.data.employee.nic_no,
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

    //Get the total allocation
    await axios
      .get(`http://localhost:5000/employees/alocation/${this.state.empno}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            totalallocation: res.data.allocationcount
          });

          console.log(this.state.totalallocation);
          console.log(res.data);
        }
      });

    //Get the total points
    await axios
      .get(`http://localhost:5000/employees/pointsreq/${this.state.empno}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            points: res.data.maxpoints
          });
          console.log(this.state.points);
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div className="bubumain1">
          <div className="bubuavatar">
            <div class="about-avatar">
              <img
                class="rounded-circle mt-6 center"
                width="200px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              ></img>
            </div>
            <h1 class="bubuname">{this.state.name}</h1>
            <h1 class="bubutype">
              {this.state.type} - {this.state.status}
            </h1>
            {this.state.points.map((employees, index) => (
              <h1 class="bubupoints1">{employees.maxpoints}</h1>
            ))}
            <h1 class="bubupoints12">Total Points</h1>
            <h1 class="bubupoints2">{this.state.totalallocation}</h1>
            <h1 class="bubupoints13">Total Allocations</h1>
          </div>

          <div className="bubumain2">
            <a href="/AllEmployees" class="report">
              <button class="btn-outline-secondary">
                <p>Back </p>
              </button>
            </a>
            <div className="basiccomp">
              <h1 class="basic">Basic Info</h1>
              <hr class="line50"></hr>
              <p class="bulabel1">Emp No : {this.state.empno}</p>
              <p class="bulabel2">Email : {this.state.email}</p>
              <p class="bulabel3">Contact No : {this.state.contact}</p>
              <p class="bulabel4">DOB : {this.state.dob}</p>
              <p class="bulabel5">Gender : {this.state.gender}</p>
              <p class="bulabel5">Gender : {this.state.gender}</p>
              <p class="bulabel6">NIC : {this.state.nic_no}</p>
              <p class="bulabel7">
                Permanent Address : {this.state.permernant_address}
              </p>
              <p class="bulabel8">District : {this.state.district}</p>
              <p class="bulabel9">Province : {this.state.province}</p>
              <p class="bulabel10">
                Place of Stay : {this.state.place_of_stay}
              </p>
              <h1 class="basic2">Previous Experience</h1>
              <hr class="line51"></hr>
              <p class="bulabel11">Organization : {this.state.organization}</p>
              <p class="bulabel12">Sector : {this.state.sector}</p>
              <p class="bulabel13">Duration : {this.state.duration}</p>
              <h1 class="basic3">Training</h1>
              <hr class="line52"></hr>
              <p class="bulabel14">
                Joined Date : {this.state.commencement_date}
              </p>
              <p class="bulabel15">Ending Date : {this.state.ending_date}</p>
              <h1 class="basic4">Professional Education :</h1>
              <hr class="line53"></hr>
              <p class="bulabel16">
                Education : {this.state.professional_education}
              </p>
              <p class="bulabel17">
                Completed Stage : {this.state.completed_stage}
              </p>
              <p class="bulabel18">
                Current Stage : {this.state.current_stage}
              </p>
              <p class="bulabel19">Attempt : {this.state.attempt}</p>
              <p class="bulabel20">Subjects : {this.state.subjects}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
