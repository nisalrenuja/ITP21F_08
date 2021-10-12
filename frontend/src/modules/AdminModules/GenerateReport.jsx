import React, { Component } from "react";
import axios from "axios";
import "./GenerateReport.css";

export default class GenerateReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finalreport: []
    };
  }

  //execute the REACT code
  componentDidMount() {
    this.retrievefinalreport();
  }

  //retrieving function
  retrievefinalreport() {
    axios.get("http://localhost:5000/final_report").then(res => {
      if (res.data.success) {
        this.setState({
          finalreport: res.data.finalreport
        });
        console.log(this.state.finalreport);
      }
    });
  }

  //Generate PDF
  generatePDF1 = () => {
    var content = document.getElementById("reportContent");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  render() {
    return (
      <div className="container">
        <div class="anumaingenerate">
          <button type="primary" class="anubtng" onClick={this.generatePDF1}>
            Print/PDF
          </button>

          <div
            id="reportContent"
            style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
          >
            <h2 class="anutah1g"> Reviewed Assignment Reports 2021 </h2>

            <table className="table table-hover anutableg">
              <thead class="anutheadg">
                <tr>
                  <th scope="col">Report ID</th>
                  <th scope="col">Report Name</th>
                  <th scope="col">Points</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">Published Date</th>
                  <th scope="col">Approved User</th>
                </tr>
              </thead>
              <tbody class="anutbody1">
                {this.state.finalreport.map((finalreport, index) => (
                  <tr key={index}>
                    <td>{finalreport.execid_review}</td>
                    <td>{finalreport.report}</td>
                    <td>{finalreport.points}</td>
                    <td>{finalreport.feedback}</td>
                    <td>{finalreport.date_and_time_upload}</td>
                    <td>{finalreport.approved_user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <iframe id="ifmcontentstoprint" style={{ display: "none" }}></iframe>
        </div>
      </div>
    );
  }
}
