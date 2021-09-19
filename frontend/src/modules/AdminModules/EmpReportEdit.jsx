import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
import { Redirect } from "react-router";
export default class EmpReportUpload extends Component {
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

    this.uploadPDF = this.uploadPDF.bind(this);

    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      status: "",
      uploadPercentage: 0,
      empno: "",
      sub_date: today,
      due_date: "",
      progress: "",
      empnumbers: [],
      assignments: [],
      managerStatus: "",
      directorStatus: "",
      partnerStatus: "",
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }
  retrievePosts() {
    axios.get("http://localhost:5000/assignments/empreportupload").then(res => {
      if (res.data.success) {
        this.setState({
          empnumbers: res.data.empnumbers,
          assignments: res.data.assignmentnames
        });

        console.log(this.state.assignments);
      }
    });
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/review/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          execid_review: res.data.post.execid_review,
          report: res.data.post.report,
          reportPDF: res.data.post.reportPDF,
          points: res.data.post.points,
          feedback: res.data.post.feedback,
          managerStatus: res.data.post.managerStatus,
          directorStatus: res.data.post.directorStatus,
          partnerStatus: res.data.post.partnerStatus
        });
      }
    });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      execid_review,
      report,
      reportPDF,
      empno,
      sub_date,
      due_date,
      managerStatus,
      directorStatus,
      partnerStatus
    } = this.state;
    console.log(managerStatus);
    console.log(directorStatus);
    console.log(partnerStatus);

    const data = {
      execid_review: execid_review,
      report: report,
      reportPDF: reportPDF,
      points: 0,
      feedback: " - ",
      status: "Pending",
      empno: empno,
      sub_date: sub_date,
      due_date: due_date,
      managerStatus: managerStatus,
      directorStatus: directorStatus,
      partnerStatus: partnerStatus,
      redirectToReferrer: true
    };

    console.log(data);

    axios.put(`http://localhost:5000/review/update/${id}`, data).then(res => {
      if (res.data.success) {
        this.setState({
          execid_review: "",
          report: "",
          reportPDF: "",
          points: "",
          feedback: "",
          status: "",
          empno: "",
          sub_date: "",
          due_date: "",
          redirectToReferrer: true
        });
        alert("Submitted Successfully");
      }
    });
  };

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
    const managerStatus = this.state.managerStatus;
    const directorStatus = this.state.directorStatus;
    const partnerStatus = this.state.partnerStatus;
    if (managerStatus == "Rejected") {
      this.state.managerStatus = "Pending";
    } else if (directorStatus == "Rejected")
      this.state.directorStatus = "Pending";
    else if (partnerStatus == "Rejected") this.state.partnerStatus = "Pending";
    const redirectToReferrer = this.state.redirectToReferrer;
    console.log(redirectToReferrer);
    if (redirectToReferrer == true) {
      return <Redirect to="/employeereport" />;
    }
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-4 font-weight-bold text-center">
          Edit Upload Report For Review
        </h1>
        <form>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label for="validationCustom03" style={{ marginBottom: "5px" }}>
              To be Reviewed By
            </label>
            <div class="input-group has-validation">
              <input
                type="text"
                id="validationCustom03"
                className="form-control"
                name="execid_review"
                placeholder="Enter Executive Id"
                value={this.state.execid_review}
                onChange={this.handleInputChange}
                required
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <input
              defaultValue={"DEFAULT"}
              type="text"
              className="form-control"
              name="report"
              placeholder="Enter Report Name"
              value={this.state.report}
              onChange={this.handleInputChange}
              disabled
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>
              Upload Your Report PDF
            </label>
            <input
              type="file"
              className="form-control"
              name="reportPDF"
              //value={this.state.reportPDF}
              onChange={e => {
                this.uploadPDF(e);
              }}
              multiple=""
            />
            <a
              href={this.state.reportPDF}
              className="btn btn-primary col-2 me-2"
            >
              View Report
            </a>
          </div>

          <div className="mt-3">
            <Progress percentage={this.state.uploadPercentage} />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Date of Submission</label>
            <input
              defaultValue={"DEFAULT"}
              className="form-control"
              aria-label="Default select example"
              name="sub_date"
              value={this.state.sub_date}
              disabled
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Employee Number</label>
            <select
              defaultValue={"DEFAULT"}
              type="number"
              className="form-control"
              name="empno"
              placeholder="Enter Employee Number"
              onChange={this.handleInputChange}
            >
              <option value="DEFAULT">Select Employee Number</option>
              {this.state.empnumbers.map((pending, index) => (
                <option key={index}>{pending}</option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-danger"
            type="submit"
            style={{ marginTop: "15px", marginBottom: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fa"></i>&nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
