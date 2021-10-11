import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
import "./CreateReport.css";

export default class CreateReport extends Component {
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
      managerData: []
    };
  }

  //demo
  demoanu = e => {
    e.preventDefault();
    this.setState({
      execid_review: "M03",
      approved_user: "Buddhima Jayasinghe",
      date_and_time_upload: "2021-10-13"
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  validate = () => {
    let execidError = "";
    let pointsError = "";
    let feedbackError = "";
    let dateError = "";
    let approveduserError = "";
    let statusError = "";

    if (!this.state.execid_review) {
      execidError = "**Executive ID field empty";
    }

    if (!this.state.points) {
      pointsError = "**Points field empty";
    }

    if (!this.state.feedback) {
      feedbackError = "**Feedback field empty";
    }

    if (!this.state.date_and_time_upload) {
      dateError = "**Date field empty";
    }

    if (!this.state.approved_user) {
      approveduserError = "**Approved User field empty";
    }

    if (!this.state.status) {
      statusError = "**Status field empty";
    }

    if (
      execidError ||
      pointsError ||
      feedbackError ||
      dateError ||
      approveduserError ||
      statusError
    ) {
      this.setState({
        execidError,
        pointsError,
        feedbackError,
        dateError,
        approveduserError,
        statusError
      });
      alert("Hello Admin! Please fill the fields.");
      return false;
    }
    return true;
  };

  onSubmitanu = e => {
    e.preventDefault();

    const {
      execid_review,
      report,
      reportPDF,
      points,
      feedback,
      date_and_time_upload,
      approved_user,
      status
    } = this.state;

    const data = {
      execid_review: execid_review,
      report: report,
      reportPDF: reportPDF,
      points: points,
      feedback: feedback,
      date_and_time_upload: date_and_time_upload,
      approved_user: approved_user,
      status: status
    };

    console.log(data);
    const isValid = this.validate();
    if (isValid) {
      axios.post("http://localhost:5000/final_report/save/", data).then(res => {
        if (res.data.success) {
          this.setState({
            execid_review: execid_review,
            report: report,
            reportPDF: reportPDF,
            points: points,
            feedback: feedback,
            date_and_time_upload: date_and_time_upload,
            approved_user: approved_user,
            status: status,
            redirectToReferrer: true
          });
          alert("Report Saved Successfully");
        }
      });
    }
  };

  componentDidMount() {
    const id = this.props.dataFromParent;
    axios.get(`http://localhost:5000/review/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          execid_review: res.data.post.execid_review,
          report: res.data.post.report,
          reportPDF: res.data.post.reportPDF,
          points: res.data.post.points,
          feedback: res.data.post.feedback,
          status: res.data.post.status
        });
        console.log(res.data.post.points);
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

  render() {
    return (
      <div class="anuformin">
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 font-weight-normal">
            Report Management | Add Report Details
          </h1>

          <button
            type="button"
            class="btn btn-warning"
            onClick={this.demoanu}
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "500",
              borderRadius: "40px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"
            }}
          >
            Demo
          </button>

          <form className="need-validationanu" noValidate>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Report ID</label>
              <input
                type="text"
                className="form-control"
                name="execid_review"
                placeholder="Edit Review Id"
                value={this.state.execid_review}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Report Name</label>
              <input
                id="report"
                type="text"
                className="form-control"
                name="report"
                placeholder="Edit Report Name"
                value={this.state.report}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>
                Upload Your Report PDF
              </label>

              <input
                type="file"
                id="file"
                className="form-control"
                name="reportPDF"
                // value={this.state.reportPDF}
                onChange={e => {
                  this.uploadPDF(e);
                }}
                multiple=""
              />
              <div className="row d-flex justify-content-end mt-3">
                <a
                  href={this.state.reportPDF}
                  className="btn btn-primary col-2 me-2"
                >
                  View PDF
                </a>
              </div>
            </div>

            <div className="mt-3"></div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Report Points</label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                name="points"
                value={this.state.points}
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Feedback</label>
              <input
                type="text"
                className="form-control"
                name="feedback"
                placeholder="Edit Feedback"
                value={this.state.feedback}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Approved User</label>
              <input
                type="text"
                className="form-control"
                id="approved_user"
                name="approved_user"
                placeholder="Enter Approved User "
                value={this.state.approved_user}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Published Date</label>
              <input
                type="date"
                className="form-control"
                id="date_and_time_upload"
                name="date_and_time_upload"
                placeholder="Enter Published Date "
                value={this.state.date_and_time_upload}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Report Status</label>
              <select
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
                name="status"
                value={this.state.status}
                onChange={this.handleInputChange}
              >
                <option value="DEFAULT" disabled></option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>

            <button
              className="btn btn-info mb-2"
              type="submit"
              style={{ marginTop: "15px" }}
              onClick={this.onSubmitanu}
            >
              <i className="fas fa-sync"></i>&nbsp;Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
