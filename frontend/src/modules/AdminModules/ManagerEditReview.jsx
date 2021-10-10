import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class ManagerEditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      points: "",
      feedback: "",
      managerStatus: "",
      status: "Pending",
      uploadPercentage: 0,
      fileVal: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === "managerStatus") {
      if (value === "Accepted") {
        this.state.managerStatus = "Accepted";
      } else if (value === "Pending") {
        this.state.managerStatus = "Pending";
      } else {
        this.state.managerStatus = "Rejected";
        this.state.status = "Rejected";
      }
    }

    console.log(this.state.managerStatus);
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  ReviewUpdate = () => {
    toast.success("Review Updated Successfully");
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
      managerStatus,
      status
    } = this.state;
    let data = "";
    if (managerStatus === "Accepted") {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        managerStatus: managerStatus,
        isManagerApprove: true
      };
    } else {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        managerStatus: managerStatus,
        status: status,
        isManagerApprove: false
      };
    }
    console.log(data);
    console.log(status);

    axios.put(`http://localhost:5000/review/update/${id}`, data).then(res => {
      if (res.data.success) {
        this.ReviewUpdate("Review Updated Successfully");
        let managerReview = data;

        this.setState({
          execid_review: "",
          report: "",
          reportPDF: null,
          points: "",
          feedback: "",
          managerStatus: ""
        });
      }
    });
    this.props.history.push("/managerreview");
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
          managerStatus: res.data.post.managerStatus
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
        <h1 className="h3 mb-3 font-weight-normal">Edit Manager Review</h1>
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
              name="managerStatus"
            >
              <option value="DEFAULT" disabled>
                selected status is : {this.state.managerStatus}
              </option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>

          <div class="d-flex justify-content-center">
            <button
              className="btn btn-info"
              type="submit"
              style={{ backgroundColor: "#1687A7" }}
              onClick={this.onSubmit}
            >
              &nbsp;&nbsp;Save&nbsp;&nbsp;
            </button>{" "}
            &nbsp;&nbsp;
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={"dark"}
              type="success"
            />
            <button className="btn btn-danger" type="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
