import React, { Component } from "react";
import axios from "axios";
import "./CreateNotice.css";
import { storage } from "../../firebase";
import { Redirect } from "react-router";

export default class CreateNotice extends Component {
  constructor(props) {
    super(props);
    this.uploadPDF = this.uploadPDF.bind(this);
    this.state = {
      notice_id: "",
      emp_id: "",
      emp_name: "",
      notice_topic: "",
      notice_content: "",
      notice_attachments: null,
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
  //input fields
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  //insert PDFs
  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  //Validation for the form
  validate = () => {
    let noticeidError = "";
    let empidError = "";
    let empnameError = "";
    let noticetopicError = "";
    let noticecontentError = "";
    let pubdateError = "";

    if (!this.state.notice_id) {
      noticeidError = "Notice ID required";
    }

    if (!this.state.emp_id) {
      empidError = "Enter your Employee ID";
    }

    if (!this.state.emp_name) {
      empnameError = "Enter Employee Name";
    }

    if (!this.state.notice_topic) {
      noticetopicError = "Please enter a Notice Topic";
    }

    if (!this.state.notice_content) {
      noticecontentError = "Please enter Notice Content";
    }

    if (!this.state.published_date) {
      pubdateError = "Enter the Date";
    }

    if (
      noticeidError ||
      empidError ||
      empnameError ||
      noticetopicError ||
      noticecontentError ||
      pubdateError
    ) {
      this.setState({
        noticeidError,
        empidError,
        empnameError,
        noticetopicError,
        noticecontentError,
        pubdateError
      });
      alert("Please fill the required fields!");
      return false;
    }
    return true;
  };

  //Submit function for the Save button
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
    };

    //Saving notices
    console.log(data);
    const isValid = this.validate();
    if (isValid) {
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
          alert("New notice is created");
        }
      });
    }
  };

  //Uploading PDFs (Notice attachments)
  uploadPDF(e) {
    if (e.target.files[0] !== null) {
      const uploadTask = storage
        .ref(`users/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {},
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
              this.setState({ notice_attachments: url });
              console.log("Hello " + url);
            });
        }
      );
    } else {
    }
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer == true) {
      return <Redirect to="/AdminTab5" />;
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
                placeholder="NB000"
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
                type="file"
                class="senavccattach"
                id="notice_attachements"
                name="notice_attachments"
                //value={this.state.notice_attachments}
                onChange={e => {
                  this.uploadPDF(e);
                }}
                multiple=""
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
                <a href="/AdminTab5">
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "795px", width: "20%" }}
                    onClick={this.onSubmit}
                  >
                    <i className="fas fa-save"></i>&nbsp;Save
                  </button>
                </a>
                <button
                  className="btn btn-secondary"
                  type="submit"
                  style={{ marginTop: "795px", width: "20%" }}
                >
                  Cancel
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
