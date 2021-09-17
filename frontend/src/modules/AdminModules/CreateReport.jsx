import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";

export default class CreateReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      points: "",
      feedback: "",
      status: "",
      uploadPercentage: 0,
      fileVal: "",
      assignmentstatus: "",
      managerData: []
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === "status") {
      if (value === "Accepted") {
        this.state.assignmentstatus = "Completed";
        this.state.status = "Accepted";
      } else if (value === "Pending") {
        this.state.assignmentstatus = "Working";
        this.state.status = "Pending";
      } else this.state.status = "Rejected";
    }

    console.log(this.state.assignmentstatus);
    console.log(this.state.status);
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
      status
    } = this.state;
    let data = "";
    if (status === "Accepted") {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
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

    const { assignmentstatus } = this.state;
    const data1 = { progress: assignmentstatus };
    console.log(data1);
    axios
      .put(
        `http://localhost:5000/assignments/update/${this.state.report}`,
        data1
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            assignmentstatus: ""
          });
        }
      });
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
          status: ""
        });
      }
    });
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
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
          Report Management | Add Report Details
        </h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Review ID</label>
            <input
              type="text"
              className="form-control"
              name="execid_review"
              placeholder="Edit Review Id"
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
            />
            <div className="row d-flex justify-content-end mt-3">
              <a className="btn btn-primary col-2 me-2">View PDF</a>
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
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              name="status"
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
          >
            <i className="fas fa-sync"></i>&nbsp;Save
          </button>
        </form>
      </div>
    );
  }
}
