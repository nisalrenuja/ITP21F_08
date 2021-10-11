import React, { Component } from "react";
import axios from "axios";
import "./DisplayReport.css";
import { Redirect } from "react-router";
import { storage } from "../../firebase";
//import jsPDF from "jspdf";

export default class DisplayReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      points: "",
      feedback: "",
      date_and_time_upload: "",
      approved_user: "",
      status: "",
      uploadPercentage: 0,
      fileVal: "",
      assignmentstatus: "",

      UpdateReport: [],
      UpdateReport2: [],
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

  componentDidMount() {
    this.retrievefinalreport();
  }

  retrievefinalreport() {
    const id = this.props.dataFromParent;
    console.log(id);

    axios.get(`http://localhost:5000/final_report/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          UpdateReport: res.data.finalreport,
          execid_review: res.data.finalreport.execid_review,
          report: res.data.finalreport.report,
          reportPDF: res.data.finalreport.reportPDF,
          points: res.data.finalreport.points,
          feedback: res.data.finalreport.feedback,
          date_and_time_upload: res.data.finalreport.date_and_time_upload,
          approved_user: res.data.finalreport.approved_user,
          status: res.data.finalreport.status,

          UpdateReport2: res.data.finalreport2
        });

        console.log(this.state.UpdateReport);
      }
    });
  }

  uploadPDF(e) {
    if (e.target.files[0] !== null) {
      const uploadTask = storage
        .ref(`users/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {},
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

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AdminTab2" />;
    }

    const {
      execid_review,
      report,
      reportPDF,
      points,
      feedback,
      date_and_time_upload,
      approved_user,
      status,
      fileVal,
      assignmentstatus
    } = this.state.UpdateReport;

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <div className="row">
          <h2 class="col-10 topic">Report ID : {execid_review}</h2>
        </div>
        <hr className="hr-line2" />
        <form className="need-validation">
          <div class="ackbox">
            <dl>
              <p class="acksub-details"> &nbsp;{report}</p>
            </dl>
          </div>
          <br />

          <dl>
            <dt class="ckdt">Report Points :</dt>
            <dd class="ckdd">{points}</dd>
          </dl>

          <dl>
            <dt class="ckdt">Feedback :</dt>
            <dd class="ckdd">{feedback}</dd>
          </dl>

          <dl>
            <dt class="ckdt">Attachments : </dt>
            <div class="cookie123">
              <div className="row d-flex justify-content-end mt-3">
                <a
                  href={this.state.reportPDF}
                  className="btnanujiview btn-primary col-2 me-2"
                >
                  Click to view Document
                </a>
              </div>
            </div>
          </dl>

          <dl>
            <dt class="ckdt">Published Date : </dt>
            <dd class="ckdd"> {date_and_time_upload}</dd>
          </dl>

          <dl>
            <dt class="ckdt">Approved User : </dt>
            <p class="ckddp">{approved_user}</p>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/AllReports">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back to Reports
            </i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
