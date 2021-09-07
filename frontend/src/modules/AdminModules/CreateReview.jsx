import React, { Component } from "react";
import axios from "axios";

export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      execid_review: "",
      report: "",
      reportPDF: "",
      points: "",
      feedback: "",
      status: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleInputFileChange = (e) => {
    var file = e.target.file[0].name;
    console.log(file);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      execid_review,
      report,
      reportPDF,
      points,
      feedback,
      status,
    } = this.state;
    const data = {
      execid_review: execid_review,
      report: report,
      reportPDF: reportPDF,
      points: points,
      feedback: feedback,
      status: status,
    };
    console.log(data);
    axios.post("http://localhost:5000/review/save", data).then((res) => {
      if (res.data.success) {
        this.setState({
          execid_review: "",
          report: "",
          reportPDF: "",
          points: "",
          feedback: "",
          status: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create New Review</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Topic</label>
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
            <label style={{ marginBottom: "5px" }}>Upload Your Repor PDF</label>
            <input
              type="file"
              className="form-control"
              name="reportPDF"
              value={this.state.reportPDF}
              onChange={this.handleInputFileChange}
              multiple=""
            />
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
