import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default class DisplayReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/review/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          post: res.data.post
        });

        console.log(this.state.post);
      }
    });
  }

  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#reportContent"), {
      callback: function(doc) {
        doc.save("report.pdf");
      }
    });
  };

  render() {
    const { execid_review, report, points, feedback, status } = this.state.post;
    return (
      <div
        id="reportContent"
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h4 className="col-10">{execid_review}</h4>
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generatePDF}
          >
            Generate PDF
          </button>
        </div>
        <hr />
        <dl className="row">
          <dt className="col-sm-3">Report Name</dt>
          <dd className="col-sm-9">{report}</dd>

          <dt className="col-sm-3">Points</dt>
          <dd className="col-sm-9">{points}</dd>

          <dt className="col-sm-3">Feedback</dt>
          <dd className="col-sm-9">{feedback}</dd>

          <dt className="col-sm-3">Status</dt>
          <dd className="col-sm-9">{status}</dd>
        </dl>
      </div>
    );
  }
}
