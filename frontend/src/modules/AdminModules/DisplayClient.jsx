import React, { Component } from "react";
import axios from "axios";

export default class DisplayClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/client/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          client: res.data.client
        });

        console.log(this.state.client);
      }
    });
  }
  render() {
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
    } = this.state.client;

    return (
      <div
        id="ClientID"
        style={{ marginTop: "20px", padding: "25px", paddingRight: "25px" }}
      >
        <div className="row">
          <h3 className="col-10">Client Details of </h3>
        </div>

        <hr />
        <dl className="row">
          <dt className="col-sm-3">Client ID</dt>
          <dd className="col-sm-9">{clientID}</dd>

          <dt className="col-sm-3">Company Name</dt>
          <dd className="col-sm-9">{company_name}</dd>

          <dt className="col-sm-3">Company Address</dt>
          <dd className="col-sm-9">{comp_address}</dd>

          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{email}</dd>

          <dt className="col-sm-3">Telephone</dt>
          <dd className="col-sm-9">{tel_no}</dd>

          <dt className="col-sm-3">Audit Fee</dt>
          <dd className="col-sm-9">{audit_fee}</dd>

          <dt className="col-sm-3">Director Name</dt>
          <dd className="col-sm-9">{dirname}</dd>

          <dt className="col-sm-3">Director TelNo</dt>
          <dd className="col-sm-9">{dirtel}</dd>

          <dt className="col-sm-3">Director Email</dt>
          <dd className="col-sm-9">{dirtemail}</dd>

          <dt className="col-sm-3">Position</dt>
          <dd className="col-sm-9">{position}</dd>

          <dt className="col-sm-3">Added date</dt>
          <dd className="col-sm-9">{added_date}</dd>
        </dl>
      </div>
    );
  }
}
