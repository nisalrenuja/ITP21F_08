import React, { Component } from "react";
import axios from "axios";
import "./DisplayNotice.css";
import { Redirect } from "react-router";
import { storage } from "../../firebase";

export default class DisplayNotice extends Component {
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

  //inserting fields function
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  //retrieving notices to display
  componentDidMount() {
    this.retrieveexistingNotices();
  }

  retrieveexistingNotices() {
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

          updateNotice2: res.data.existingNotices2
        });

        console.log(this.state.updateNotice);
      }
    });
  }

  //Function to upload PDFs (For notice attachments)
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

    const {
      notice_id,
      emp_id,
      emp_name,
      notice_topic,
      notice_content,
      notice_attachments,
      published_date
    } = this.state.updateNotice;

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <div className="row">
          <h2 class="col-10 topic">Notice ID : {notice_id}</h2>
        </div>
        <hr className="hr-line2" />
        <form>
          <div class="ckbox">
            <dl>
              <p class="cksub-details">Employee ID: &nbsp;{emp_id}</p>
            </dl>
            <dl>
              <p class="cksub-details">Employee Name : &nbsp;{emp_name}</p>
            </dl>
          </div>
          <br />

          <dl>
            <dt class="ckdt">Notice Topic:</dt>
            <dd class="ckdd">{notice_topic}</dd>
          </dl>

          <dl>
            <dt class="ckdt">Content:</dt>
            <p class="ckddp">{notice_content}</p>
          </dl>
          <dl>
            <dt class="ckdt">Attachments: </dt>
            <div class="cookie123">
              <div className="row d-flex justify-content-end mt-3">
                <a
                  href={this.state.notice_attachments}
                  className="btncookies btn-primary col-2 me-2"
                >
                  View PDF
                </a>
              </div>
            </div>
          </dl>

          <dl>
            <dt class="ckdt">Published Date: </dt>
            <dd class="ckdd"> {published_date}</dd>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/AdminTab5">
            <i class="fas fa-angle-double-left fa-3x">&nbsp;&nbsp;Back</i>
          </a>
        </div>
        <br />
      </div>
    );
  }
}
