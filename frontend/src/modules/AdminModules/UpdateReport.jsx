import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import "./UpdateReport.css";
import Progress from "../../component/common/ProgressBar/progress";
import { Redirect } from "react-router";

export default class UpdateReport extends Component {
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
      managerData: [],
      UpdateReport: [],
      UpdateReport2: [],
      redirectToReferrer: false
    };
  }

  //Function for inserting fields
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  //insert PDF reports
  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  //Update function on submit
  onSubmitupdate = e => {
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

    //Update Reports
    console.log(data);
    axios
      .put(
        `http://localhost:5000/final_report/update/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            execid_review: "",
            report: "",
            reportPDF: "",
            points: "",
            feedback: "",
            date_and_time_upload: "",
            approved_user: "",
            status: ""
          });
          alert("Report Updated Successfully");
        }
      });
  };

  componentDidMount() {
    this.retrievefinalreport();
  }

  //Retrieving final report details
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
          approved_user: res.data.approved_user,
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
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AllReports" />;
    }
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
          Report Management | Update Report Details
        </h1>
        <div class="anuupdateform2">
          <form className="need-validation" noValidate>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Review ID</label>
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
              className="btn btn-warning"
              type="submit"
              onClick={this.onSubmitupdate}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
