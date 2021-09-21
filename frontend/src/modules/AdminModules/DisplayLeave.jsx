import React, { Component } from "react";
import axios from "axios";
import "./AllPayrollDisplays.css";
//import jsPDF from "jspdf";

export default class DisplayLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leave: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/leave/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          leave: res.data.leave
        });

        console.log(this.state.leave);
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
      name,
      leave_type,
      leave_start_date,
      leave_end_date,
      no_of_leaves,
      leave_message,
      leave_status
    } = this.state.leave;

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <div className="row">
          <h2 class="col-10 topic">Leave Requests -- Employee ID : {empno} </h2>
        </div>
        <hr className="hr-line2" />
        <form className="need-validation">
          <div class="box">
            <dl>
              <p class="sub-details">Employee Name : &nbsp;{name}</p>
            </dl>
            <dl>
              <p class="sub-details">Leave Type : &nbsp;{leave_type}</p>
            </dl>
          </div>
          <br />

          <dl>
            <dt>Leave Start From :</dt>
            <dd>{leave_start_date}</dd>
          </dl>

          <dl>
            <dt>Leave End From ::</dt>
            <dd>{leave_end_date}</dd>
          </dl>
          <dl>
            <dt>Total no of Leave dates :</dt>
            <dd>{no_of_leaves}</dd>
          </dl>
          <dl>
            <dt>Leave Reason (Briefly) :</dt>
            <dd>{leave_message}</dd>
          </dl>

          <hr />
          <br />

          <dl>
            <dt>Leave Status :</dt>
            <dd>Rs. {leave_status}</dd>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/allrequests">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Requests
            </i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
