import React, { Component } from "react";
import axios from "axios";
import "./EditNotices.css";
import { Redirect } from "react-router";

export default class EditNotices extends Component {
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
      updateNotice: [],
      updateNotice2: [],
      redirectToReferrer: false
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
    //const id = this.props.match.params.id;

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
    axios
      .put(
        `http://localhost:5000/CreateNotice/update/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            notice_topic: "",
            notice_content: "",
            notice_attachments: "",
            published_date: ""
          });
          alert("Notice Updated Successfully");
        }
      });
  };

  componentDidMount() {
    this.retrieveexsitingNotices();
  }

  retrieveexsitingNotices() {
    const id = this.props.dataFromParent;
    console.log(id);

    axios.get(`http://localhost:5000/CreateNotice/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          updateNotice: res.data.existingNotices,
          notice_id: res.data.existingNotices.notice_id,
          emp_id: res.data.existingNotices.emp_id,
          emp_name: res.data.existingNotices.emp_name,
          notice_topic: res.data.existingNotices.notice_topic,
          notice_content: res.data.existingNotices.notice_content,
          notice_attachments: res.data.existingNotices.notice_attachments,
          published_date: res.data.existingNotices.published_date,

          updateNotice2: res.data.existingNotices2
        });
        console.log(this.state.updateNotice);
      }
    });
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/Notices" />;
    }
    return (
      <div className="container">
        <div class="senamain3">
          <h1 class="senahead1c">Notice Management | Edit Notice</h1>
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
                name="published_date"
                value={this.state.published_date}
                onChange={this.handleInputChange}
              />

              <center>
                <div class="d-flex justify-content-center">
                  <button
                    className="btn btn-warning"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="fa fa-refresh"></i>&nbsp;Update
                  </button>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    type="cancel"
                    style={{ marginTop: "15px" }}
                  >
                    Cancel
                  </button>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
