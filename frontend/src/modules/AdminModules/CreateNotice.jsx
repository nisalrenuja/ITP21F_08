import React, { Component } from "react";
import axios from "axios";
import "./CreateNotice.css";
import { Redirect } from "react-router";

export default class CreateNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notice_id: "",
      emp_id: "",
      emp_name: "",
      notice_topic: "",
      notice_content: "",
      notice_attachments: "",
      published_date: "",
      redirectToReferrer: false
    };
  }
  componentDidMount() {
    this.retrieveexistingNotices();
  }
  retrieveexistingNotices() {
    axios.get("http://localhost:5000/CreateNotice").then(res => {
      if (res.data.success) {
        this.setState({
          existingNotices: res.data.staff
        });
        console.log(this.state.notice_id);
      }
    });
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  onCheck = name => {
    console.log(name);
    axios.get(`http://localhost:5000/checkassigned/${name}`).then(res => {
      if (res.data.success) {
        alert("Assigned to " + res.data.l + " assignment/s!");
      }
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const {
      notice_id,
      emp_id,
      emp_name,
      notice_topic,
      notice_content,
      notice_attachments,
      published_date
    } = this.state;

    const data = {
      notice_id: notice_id,
      emp_id: emp_id,
      emp_name: emp_name,
      notice_topic: notice_topic,
      notice_content: notice_content,
      notice_attachments: notice_attachments,
      published_date: published_date
      //progress: "Assigned"
    };

    console.log(data);
    axios.post("http://localhost:5000/CreateNotice/save/", data).then(res => {
      if (res.data.success) {
        this.setState({
          notice_id: notice_id,
          emp_id: emp_id,
          emp_name: emp_name,
          notice_topic: notice_topic,
          notice_content: notice_content,
          notice_attachments: notice_attachments,
          published_date: published_date,
          redirectToReferrer: true
        });
        //alert("Employee added to assignment, Enter employee number");
      }
    });
  };
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/Notices" />;
    }
    return (
      <div className="container">
        <div class="senamain3">
          <h1 class="senahead1c">Notice Management | Create Notice</h1>
          <hr class="senaline1c"></hr>
          <div class="senamain33">
            <form>
              <p class="senaic">Notice ID:</p>
              <input
                type="text"
                class="senaicc"
                id="notice_id"
                name="notice_id"
                value={this.state.notice_id}
                onChange={this.handleInputChange}
              />
              <p class="senaiic">Emp ID:</p>
              <input
                type="text"
                class="senaiicc"
                id="emp_id"
                name="emp_id"
                value={this.state.emp_id}
                onChange={this.handleInputChange}
              />

              <p class="senaiiic">Emp Name:</p>
              <input
                type="text"
                class="senaiiicc"
                id="emp_name"
                name="emp_name"
                value={this.state.emp_name}
                onChange={this.handleInputChange}
              />
              <p class="senaivc">Notice Topic:</p>
              <input
                type="text"
                class="senaivcc"
                id="notice_topic"
                name="notice_topic"
                value={this.state.notice_topic}
                onChange={this.handleInputChange}
              />
              <p class="senavc">Content:</p>
              <input
                type="text"
                class="senavcc"
                id="notice_content"
                name="notice_content"
                value={this.state.notice_content}
                onChange={this.handleInputChange}
              />
              <p class="senavcattach">Attachments:</p>
              <input
                type="number"
                class="senavccattach"
                id="notice_attachements"
                name="notice_attachments"
                value={this.state.notice_attachments}
                onChange={this.handleInputChange}
              />
              <p class="senavic">Publishing Date: </p>
              <input
                type="date"
                class="senavicc"
                id="published_date"
                name="pulished_date"
                value={this.state.published_date}
                onChange={this.handleInputChange}
              />

              <center>
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ marginTop: "795px", width: "20%" }}
                  onClick={this.onSubmit}
                >
                  <i className="fas fa-save"></i>&nbsp;Save
                </button>
                <a href="/admin">
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    style={{ marginTop: "795px", width: "20%" }}
                  >
                    Cancel
                  </button>
                </a>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
