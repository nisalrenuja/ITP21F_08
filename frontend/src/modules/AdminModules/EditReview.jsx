import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
export default class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      points: "",
      feedback: "",
      init_status: "",
      status: "Pending",
      uploadPercentage: 0,
      fileVal: "",
      managerData: []
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === "init_status") {
      if (value === "Accepted") {
        this.state.init_status = "Accepted";
      } else if (value === "Pending") {
        this.state.init_status = "Pending";
      } else this.state.init_status = "Rejected";
    }

    console.log(this.state.init_status);
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      execid_review,
      report,
      reportPDF,
      points,
      feedback,
      init_status,
      status
    } = this.state;
    let data = "";
    if (init_status === "Accepted") {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        init_status: init_status,
        status: status,
        isAdminApprove: true
      };
    } else {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        status: status,
        isAdminApprove: false
      };
    }

    console.log(this.state.status);
    axios.put(`http://localhost:5000/review/update/${id}`, data).then(res => {
      if (res.data.success) {
        let managerReview = data;
        alert("Review Updated Successfully");
        this.setState({
          execid_review: "",
          report: "",
          reportPDF: null,
          points: "",
          feedback: "",
          init_status: "",
          status: "Pending"
        });
      }
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
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
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit Review</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Review Id</label>
            <input
              type="text"
              className="form-control"
              name="execid_review"
              placeholder="Edit Review Id"
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

          <div className="mt-3">
            <Progress percentage={this.state.uploadPercentage} />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Points</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="points"
            >
              <option value="DEFAULT" disabled>
                selected Point is : {this.state.points}
              </option>
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
            <label style={{ marginBottom: "5px" }}>Report Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="init_status"
            >
              <option value="DEFAULT" disabled>
                selected status is : {this.state.init_status}
              </option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <button
            className="btn btn-info mb-2"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fas fa-sync"></i>&nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}
