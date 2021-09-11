import React, { Component } from "react";
import axios from "axios";

export default class EditClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientID: "",
      company_name: "",
      comp_address: "",
      email: "",
      tel_no: "",
      audit_fee: "",
      dirname: "",
      dirtel: "",
      dirtemail: "",
      position: "",
      added_date: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {
      clientID,
      company_name,
      comp_address,
      email,
      tel_no,
      audit_fee,
      dirname,
      dirtel,
      dirtemail,
      position,
      added_date
    } = this.state;

    const data = {
      clientID: clientID,
      company_name: company_name,
      comp_address: comp_address,
      email: email,
      tel_no: tel_no,
      audit_fee: audit_fee,
      dirname: dirname,
      dirtel: dirtel,
      dirtemail: dirtemail,
      position: position,
      added_date: added_date
    };

    console.log(data);
    axios.put(`http://localhost:5000/client/update/${id}`, data).then(res => {
      if (res.data.success) {
        alert("Client Updated Successfully");

        this.setState({
          clientID: "",
          company_name: "",
          comp_address: "",
          email: "",
          tel_no: "",
          audit_fee: "",
          dirname: "",
          dirtel: "",
          dirtemail: "",
          position: "",
          added_date: ""
        });
      }
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/client/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          clientID: res.data.client.clientID,
          company_name: res.data.client.company_name,
          comp_address: res.data.client.comp_address,
          email: res.data.client.email,
          tel_no: res.data.client.tel_no,
          audit_fee: res.data.client.audit_fee,
          dirname: res.data.client.dirname,
          dirtel: res.data.client.dirtel,
          dirtemail: res.data.client.dirtemail,
          position: res.data.client.position,
          added_date: res.data.client.added_date
        });
        console.log(this.state.client);
      }
    });
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

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Company Address</label>
            <input
              type="text"
              className="form-control"
              name="comp_address"
              placeholder="Enter Company Address"
              value={this.state.comp_address}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Telephone</label>
            <input
              type="number"
              className="form-control"
              name="tel_no"
              placeholder="Enter Telephone"
              value={this.state.tel_no}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Audit Fee</label>
            <input
              type="text"
              className="form-control"
              name="audit_fee"
              placeholder="Enter Audit Fee"
              value={this.state.audit_fee}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Director Name</label>
            <input
              type="text"
              className="form-control"
              name="dirname"
              placeholder="Enter Director Name"
              value={this.state.dirname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Director TelNo</label>
            <input
              type="text"
              className="form-control"
              name="dirtel"
              placeholder="Enter Director TelNo:"
              value={this.state.dirtel}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Director Email</label>
            <input
              type="text"
              className="form-control"
              name="dirtemail"
              placeholder="Enter Director Email:"
              value={this.state.dirtemail}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Director Position</label>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleInputChange}
              name="position"
            >
              <option value="DEFAULT" disabled>
                Select Position
              </option>

              <option name="manager">Manager</option>
              <option name="senior">Senior Staff</option>
              <option name="trainee">Trainee</option>
              <option name="other">Other</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Joined Date</label>
            <input
              type="date"
              className="form-control"
              name="added_date"
              placeholder="Enter Joined Date:"
              value={this.state.added_date}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            className="btn btn-success mb-2"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="fa fa-check-square"></i>&nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}
