import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default class DisplayReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executives: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/executives/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          executives: res.data.executives
        });

        console.log(this.state.executives);
      }
    });
  }

  generatePDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#reportContent"), {
      callback: function(doc) {
        doc.save("executive report.pdf");
      }
    });
  };

  render() {
    const { exeno, name, email } = this.state.executives;
    return (
      <div
        id="reportContent"
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h4 className="col-10">Details of {name}</h4>
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
          <dt className="col-sm-3">Executive</dt>
          <dd className="col-sm-9">{name}</dd>

          <dt className="col-sm-3">Email Address</dt>
          <dd className="col-sm-9">{email}</dd>
        </dl>
      </div>
    );
  }
}
