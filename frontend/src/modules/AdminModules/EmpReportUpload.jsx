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
  }

  validate = () => {
    let empnoError = "";
    let executiveError = "";
    let reportnameError = "";
    let PDFerror = "";

    if (!this.state.empno) {
      empnoError = "**Employee Number Cannot Be Blank";
    }

    if (!this.state.execid_review) {
      executiveError = "**ExecutiveID Cannot Be Blank";
    }

    if (!this.state.report) {
      reportnameError = "**Report Name Cannot be Blank";
    }
    if (this.state.reportPDF == null) {
      PDFerror = "**PDF Upload Cannot be Blank";
    }

    if (reportnameError || executiveError || empnoError || PDFerror) {
      //emaiError also equal to reportnameError:reportnameError in Js.
      this.setState({
        reportnameError,
        executiveError,
        empnoError,
        PDFerror
      });
      alert(
        "Invalid Form Data. Please Check ExecutiveID, Empno, PDF Upload & ReportName !!!"
      );
      return false;
    }
    return true;
  };

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

  handleCancelClick = () => {
    this.setState({ redirectToReferrer: true });
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
      due_date: due_date,
      redirectToReferrer: true
    };

    const { progress } = this.state;
    const data1 = { progress: "Working" };
    console.log(data);

    const isValid = this.validate();
    if (isValid) {
      axios
        .put(
          `http://localhost:5000/assignments/updte/${this.state.report}`,
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
            due_date: "",
            redirectToReferrer: true
          });
          alert("Submitted Successfully");
        }
      });
    }
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
    const redirectToReferrer = this.state.redirectToReferrer;
    console.log(redirectToReferrer);
    if (redirectToReferrer == true) {
      return <Redirect to="/employeereport" />;
    }
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-4 font-weight-bold text-center">
          Upload Report For Review
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
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  left: "0px",
                  top: "35px"
                }}
              >
                {this.state.executiveError}
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Report Name</label>
            <select
              defaultValue={"DEFAULT"}
              type="text"
              className="form-select"
              name="report"
              placeholder="Enter Report Name"
              onChange={this.handleInputChange}
            >
              <option value="DEFAULT">Select Assignment Name</option>
              {this.state.assignments.map((pending, index) => (
                <option key={index}>{pending}</option>
              ))}
            </select>
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "250px",
                top: "375px"
              }}
            >
              {this.state.reportnameError}
            </div>
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
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "250px",
                top: "453px"
              }}
            >
              {this.state.PDFerror}
            </div>
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
            <div
              style={{
                color: "red",
                position: "absolute",
                left: "250px",
                top: "633px"
              }}
            >
              {this.state.empnoError}
            </div>
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              borderRadius: "60px"
            }}
            onClick={this.onSubmit}
          >
            <i className="fa"></i>&nbsp;Save
          </button>
          <button
            className="btn btn-light"
            type="cancel"
            style={{
              marginLeft: "15px",
              borderRadius: "60px",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            }}
            onClick={this.handleCancelClick}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
