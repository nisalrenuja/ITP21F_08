import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
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
      progress: ""
    };
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

    const {
      execid_review,
      report,
      reportPDF,
      empno,
      sub_date,
      due_date
    } = this.state;
    const data = {
      execid_review: execid_review,
      report: report,
      reportPDF: reportPDF,
      points: 0,
      feedback: " - ",
      status: "Pending",
      empno: empno,
      sub_date: sub_date,
      due_date: due_date
    };
    const { progress } = this.state;
    const data1 = { progress: "Working" };
    console.log(data);
    axios
      .put(
        `http://localhost:5000/assignments/update/${this.state.report}`,
        data1
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            progress: ""
          });
        }
      });
    axios.post("http://localhost:5000/review/save", data).then(res => {
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
          due_date: ""
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
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create New Review</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>To be Reviewed By</label>
            <input
              type="text"
              className="form-control"
              name="execid_review"
              placeholder="Enter Executive Id"
              value={this.state.execid_review}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <input
              type="text"
              className="form-control"
              name="report"
              placeholder="Enter Report Name"
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
              className="form-control"
              name="reportPDF"
              //value={this.state.reportPDF}
              onChange={e => {
                this.uploadPDF(e);
              }}
              multiple=""
            />
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
            <input
              type="number"
              className="form-control"
              name="empno"
              placeholder="Enter Employee Number"
              value={this.state.empno}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fa fa-check-square"></i>&nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
