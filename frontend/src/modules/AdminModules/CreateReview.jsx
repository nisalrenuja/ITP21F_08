import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.uploadPDF = this.uploadPDF.bind(this);
    this.state = {
      execid_review: "",
      report: "",
      reportPDF: null,
      points: "",
      feedback: "",
      status: "",
      uploadPercentage: 0,
      review: []
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

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get(`http://localhost:5000/checkreviewno`).then(res => {
      if (res.data.success) {
        this.setState({
          review: res.data.execid_review
        });
        if (res.data.execid_review.length == 0) {
          console.log(res.data.execid_review.length);

          this.state.execid_review = 1000;
        } else {
          var no = this.state.review[0].execid_review;
          this.state.execid_review = no + 1;
          console.log(this.state.execid_review);
        }
      }
    });
  }

  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  ReviewSave = () => {
    toast.success("Initial Review Saved Successfully");
  };

  errorMessageAlert = message => {
    toast.error(message);
  };

  onSubmit = async e => {
    e.preventDefault();
    await axios.get(`http://localhost:5000/checkreviewno`).then(res => {
      if (res.data.success) {
        console.log(typeof res.data.execid_review);
        this.setState({
          review: res.data.execid_review
        });
        var no = this.state.review[0].execid_review;
        this.state.execid_review = no + 1;
        console.log(this.state.execid_review);
      }
    });

    const {
      execid_review,
      report,
      reportPDF,
      points,
      feedback,
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

    const data = {
      execid_review: execid_review,
      report: report,
      reportPDF: reportPDF,
      points: points,
      feedback: feedback,
      status: status
    };
    console.log(data);
    axios.post("http://localhost:5000/review/save", data).then(res => {
      if (res.data.success) {
        this.ReviewSave("Initial Review Saved Successfully");
        this.setState({
          execid_review: "",
          report: "",
          reportPDF: "",
          points: "",
          feedback: "",
          status: ""
        });
      }
    });
    this.props.history.push("/admin");
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
            <label style={{ marginBottom: "5px" }}>Review ID</label>
            <input
              type="number"
              className="form-control"
              name="execid_review"
              placeholder="Enter Review ID"
              value={this.state.execid_review}
              onChange={this.handleInputChange}
              required
              disabled
            />
            <span id="errorMessageExID" style={{ color: "red" }}></span>
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
            <span id="errorMessageName" style={{ color: "red" }}></span>
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
            <label style={{ marginBottom: "5px" }}>Report Points</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="points"
            >
              <option value="DEFAULT" disabled>
                Open this select Point
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
              placeholder="Enter Feedback"
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
              name="status"
            >
              <option value="DEFAULT" disabled>
                Open this select status
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
          <div />
        </form>
      </div>
    );
  }
}
