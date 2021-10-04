import React, { Component } from "react";
import axios from "axios";
import "./AllPayrollDisplays.css";
//import jsPDF from "jspdf";

export default class DisplayAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendance: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/attendance/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          attendance: res.data.attendance
        });

        console.log(this.state.attendance);
      }
    });
  }
  /*
  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#reportContent"), {
      callback: function(doc) {
        doc.save("payslip.pdf");
      }
    });
  };
*/
  render() {
    const {
      empno,
      att_date,
      att_type,
      location_type,
      location,
      time_in,
      time_out,
      assignment_name
    } = this.state.attendance;

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <div className="">
          <h2 class="col-10 topic">Assignment Attendance - E. ID : {empno}</h2>
          <br></br>
        </div>
        <hr className="hr-line2" />
        <form className="need-validation">
          <div class="threerowbox">
            <dl>
              <p class="sub-details">
                Attendance for : &nbsp;{assignment_name}
              </p>
            </dl>
            <dl>
              <p class="sub-details">Date: &nbsp;{att_date}</p>
            </dl>
            <dl>
              <p class="sub-details" style={{ color: "blue" }}>
                Attendance: &nbsp;{att_type}
              </p>
            </dl>
          </div>
          <br />

          <h5>Attendance Details </h5>
          <hr />

          <dl>
            <dt>Location Type :</dt>
            <dd>{location_type}</dd>
          </dl>

          <dl>
            <dt>Location:</dt>
            <dd>{location}</dd>
          </dl>

          <dl>
            <dt>Time In:</dt>
            <dd>{time_in}</dd>
          </dl>

          <dl>
            <dt>Time Out:</dt>
            <dd>{time_out}</dd>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/allattendance">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Attendance List
            </i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
