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
      partnerStatus: "",
      status: "Pending",
      uploadPercentage: 0,
      fileVal: "",
      assignmentstatus: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "execid_review") {
      if (value.match("^[A-Z]{1}[0-9]{1,4}$")) {
        document.getElementById("errorMessageExID").innerHTML = "";
      } else {
        document.getElementById("errorMessageExID").innerHTML =
          "Please Enter correct Review ID";
      }
    }

    if (name === "report") {
      if (value.match("^[a-zA-Z][a-zA-Z\\s]+$")) {
        document.getElementById("errorMessageName").innerHTML = "";
      } else {
        document.getElementById("errorMessageName").innerHTML =
          "Please Enter correct Report Name";
      }
    }

    if (name === "feedback") {
      if (value.match("^[a-zA-Z][a-zA-Z\\s]+$")) {
        document.getElementById("errorMessageFeed").innerHTML = "";
      } else {
        document.getElementById("errorMessageFeed").innerHTML =
          "Please Enter correct Feedback";
      }
    }
    console.log(name);
    console.log(value);
    if (name === "partnerStatus") {
      if (value === "Accepted") {
        this.state.assignmentstatus = "Completed";
        this.state.partnerStatus = "Accepted";
        this.state.status = "Accepted";
      } else if (value === "Pending") {
        this.state.assignmentstatus = "Working";
        this.state.partnerStatus = "Pending";
      } else {
        this.state.partnerStatus = "Rejected";
        this.state.assignmentstatus = "Working";
        this.state.status = "Rejected";
      }
    }

    console.log(this.state.assignmentstatus);
    console.log(this.state.partnerStatus);
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
      partnerStatus,
      status
    } = this.state;

    if (execid_review === "" && report === "" && feedback === "") {
      this.errorMessageAlert(
        "You can't save anything without entering details"
      );
    } else if (execid_review === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageExID").innerHTML =
        "Enter Correct Report ID";
    } else if (report === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageName").innerHTML =
        "Enter Correct Report Name";
    } else if (feedback === "") {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
      document.getElementById("errorMessageFeed").innerHTML =
        "Enter Correct Feedback";
    } else {
      //document.getElementsByClassName('errorMessage').innerHTML = '';
    }
    let data = "";
    if (partnerStatus === "Accepted") {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        partnerStatus: partnerStatus,
        status: status,
        isManagerApprove: true
      };
    } else {
      data = {
        execid_review: execid_review,
        report: report,
        reportPDF: reportPDF,
        points: points,
        feedback: feedback,
        partnerStatus: partnerStatus,
        status: status,
        isManagerApprove: false
      };
    }
    console.log(status);
    const { assignmentstatus } = this.state;
    const data1 = { progress: assignmentstatus };
    console.log(data1);
    axios
      .put(
        `http://localhost:5000/assignments/updte/${this.state.report}`,
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

        this.ReviewUpdate("Review Updated Successfully");
        this.setState({
          execid_review: "",
          report: "",
          reportPDF: null,
          points: "",
          feedback: "",
          partnerStatus: ""
        });
      }
    });
    this.props.history.push("/partnerreview");
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
          partnerStatus: res.data.post.partnerStatus
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
        <h1 className="h3 mb-3 font-weight-normal">Edit Partner Review</h1>
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
            <span id="errorMessageExID" style={{ color: "red" }}></span>
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
            <span id="errorMessageName" style={{ color: "red" }}></span>
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
            <span id="errorMessageFeed" style={{ color: "red" }}></span>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Status</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="partnerStatus"
            >
              <option value="DEFAULT" disabled>
                selected status is : {this.state.partnerStatus}
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
