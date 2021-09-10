import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import Progress from "../../component/common/ProgressBar/progress";
export default class CreateClient extends Component {
  constructor(props) {
    super(props);
    this.uploadPDF = this.uploadPDF.bind(this);
    this.state = {
      clientID: "",
      company_name: "",
      location: null,
      added_date: "",
      status: "",
      uploadPercentage: 0
    };
  }

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

  onSubmit = e => {
    e.preventDefault();

    const { clientID, company_name, location, added_date, status } = this.state;
    const data = {
      clientID: clientID,
      company_name: company_name,
      location: location,
      added_date: added_date,
      status: status
    };
    console.log(data);
    axios.post("http://localhost:5000/client/save", data).then(res => {
      if (res.data.success) {
        this.setState({
          clientID: "",
          company_name: "",
          location: "",
          added_date: "",
          status: ""
        });
      }
    });
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
        <h1 className="h3 mb-3 font-weight-normal">Create New Client</h1>
        <form className="need-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Client ID</label>
            <input
              type="text"
              className="form-control"
              name="clientID"
              placeholder="Enter client Id"
              value={this.state.clientID}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Company Name</label>
            <input
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Enter Company Name"
              value={this.state.company_name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mt-3">
            <Progress percentage={this.state.uploadPercentage} />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Enter Location"
              value={this.state.location}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Added Date</label>
            <input
              type="date"
              className="form-control"
              name="added_date"
              placeholder="Enter Added Date"
              value={this.state.added_date}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}> Status</label>
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
          <br></br>
        </form>
      </div>
    );
  }
}
