import React, { Component } from "react";
import axios from "axios";
import "./EditNotices.css";
import { storage } from "../../firebase";
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
      notice_attachments: null,
      published_date: "",
      updateNotice: [],
      updateNotice2: [],
      redirectToReferrer: false
    };
  }

  //Insert fields function
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  //inserting PDFs for notice attachments
  handleInputFileChange = e => {
    var file = e.target.files[0];
    console.log(file);
  };

  //Submit function for the Update Button
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

    //Updating Notices
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
            published_date: "",
            redirectToReferrer: true
          });
          alert("Notice Updated Successfully");
        }
      });
  };

  //Retrieving specific Notices
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

  //Upload PDFs for notice attachments
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
                type="file"
                class="senavccattach"
                id="notice_attachements"
                name="notice_attachments"
                //value={this.state.notice_attachments}
                onChange={e => {
                  this.uploadPDF(e);
                }}
              />
              <div class="cookie123">
                <div className="row d-flex justify-content-end mt-3">
                  <a
                    href={this.state.notice_attachments}
                    className="btncookie btn-primary col-2 me-2"
                  >
                    View PDF
                  </a>
                </div>
              </div>

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
                <div class="cookie">
                  <a href="/AdminTab5">
                    <button
                      className="btn btn-warning"
                      type="submit"
                      style={{ marginTop: "725px" }}
                      onClick={this.onSubmit}
                    >
                      <i className="fa fa-refresh"></i>&nbsp;Update
                    </button>
                  </a>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    type="cancel"
                    style={{ marginTop: "725px" }}
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
