import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";
import { storage } from "../../firebase"; // Imports for firebase
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify"; // Imports for toastify
import "react-toastify/dist/ReactToastify.css"; // Imports for toastify

export default class EditAssignments extends Component {
  constructor(props) {
    super(props);
    this.uploadPDF = this.uploadPDF.bind(this);
    this.state = {
      assignment_name: "",
      client_no: "",
      execid: "",
      place_of_engagement: "",
      distance: "",
      date_of_allocation: "",
      deadline: "",
      emp_no: "",
      progress: "",
      assignment: [],
      assignment2: [],
      travel_allowance: "",
      empno: "",
      redirectToReferrer: false,
      scan_invoice_allowance: null
    };
  }
  // retrieve data
  componentDidMount() {
    this.retrievePosts();
  }
  //notify when uploading document
  notify = () => {
    toast.success("Uploading...");
  };
  //retrieve function
  retrievePosts() {
    const p = this.props.dataFromParent;
    console.log(p);

    axios.get(`http://localhost:5000/assignment/${p}`).then(res => {
      if (res.data.success) {
        this.setState({
          assignment: res.data.ass,
          deadline: res.data.ass[0].deadline,
          progress: res.data.ass[0].progress,
          assignment2: res.data.ass2
        });
        console.log(res.data.ass);
      }
    });
  }
  //search filter
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  handleInputChange2 = e => {
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
  //update function for deadline and progress
  onSubmit = e => {
    e.preventDefault();

    const { deadline, progress } = this.state;

    const data = {
      deadline: deadline,

      progress: progress
    };

    console.log(data);
    axios
      .put(
        `http://localhost:5000/assignments/update/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            deadline: deadline,
            progress: progress,
            redirectToReferrer: true
          });
          alert("Updated");
        }
      });
  };
  //update function for allowances
  onSubmit2 = e => {
    e.preventDefault();

    const { empno, travel_allowance } = this.state;

    const data = {
      empno: empno,

      travel_allowance: travel_allowance
    };

    console.log(data);
    axios.get(`http://localhost:5000/staff/check/${empno}`).then(res => {
      if (res.data.success) {
        if (res.data.staffs.length !== 0) {
          axios
            .put(
              `http://localhost:5000/assignments/updateallo/${this.props.dataFromParent}`,
              data
            )
            .then(res => {
              if (res.data.success) {
                this.setState({
                  empno: "",
                  travel_allowance: "",
                  redirectToReferrer: true
                });
                alert("Updated Allowance");
                this.retrievePosts();
              }
            });
        } else {
          alert("Invalid Employee Number, Please enter again!");
        }
      }
    });
  };
  //update function for bills document
  onSubmit3 = e => {
    e.preventDefault();

    const { scan_invoice_allowance } = this.state;

    const data = {
      scan_invoice_allowance: scan_invoice_allowance
    };

    console.log(data);

    axios
      .put(
        `http://localhost:5000/assignments/updatescanallo/${this.props.dataFromParent}`,
        data
      )
      .then(res => {
        if (res.data.success) {
          this.setState({
            scan_invoice_allowance: scan_invoice_allowance,
            redirectToReferrer: true
          });
          alert("Document Submitted");
          this.retrievePosts();
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
              this.setState({ scan_invoice_allowance: url });
              console.log("Hello " + url);
            });
        }
      );

      this.notify();
    } else {
    }
  }
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Work Allocation | Edit Assignment</h1>
          <hr class="line1c"></hr>
          <div class="main332">
            {this.state.assignment.map((assignment, index) => (
              <div>
                <strong>
                  <center>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Assignment Name - {assignment.assignment_name}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Client No - {assignment.client_no}
                    </p>
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Allocated On -{assignment.date_of_allocation}
                    </p>
                    <br />

                    <p style={{ color: "black", fontSize: "22px" }}>
                      Deadline - {this.state.deadline}
                    </p>
                    <p class="vic" style={{ color: "black", fontSize: "20px" }}>
                      Change Deadline :{" "}
                    </p>
                    <input
                      type="date"
                      class="vicc"
                      id="deadline"
                      name="deadline"
                      value={this.state.deadline}
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <p style={{ color: "black", fontSize: "22px" }}>
                      Progress - {this.state.progress}
                    </p>

                    <br />
                    <p
                      class="viic"
                      style={{ color: "black", fontSize: "20px" }}
                    >
                      Change Progress :
                      <br />
                    </p>

                    <select
                      type="text"
                      class="viicc"
                      id="progress"
                      name="progress"
                      value={this.state.progress}
                      onChange={this.handleInputChange}
                      style={{ color: "black", fontSize: "15px" }}
                    >
                      <option
                        value="Assigned"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Assigned
                      </option>
                      <option
                        value="Working"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Working
                      </option>
                      <option
                        value="Completed"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Completed
                      </option>
                    </select>
                  </center>
                </strong>
              </div>
            ))}
            <br />
            <br />
            <br />
            <br />
            <center>
              <button
                className="btn btn-success"
                type="submit"
                style={{ marginTop: "135px" }}
                onClick={this.onSubmit}
              >
                <i className="fas fa-save"></i>&nbsp;Save
              </button>
            </center>
            <br />
            <br />
            <br />
            <center>
              <h4>
                <u>Allowances to Employees(Rs)</u>
              </h4>
            </center>
            {this.state.assignment2.map((assignment2, index) => (
              <div>
                <strong>
                  <center>
                    <p style={{ color: "black", fontSize: "20px" }}>
                      Emp No:-{assignment2.employees[0].empno} - Name:-{" "}
                      {assignment2.employees[0].name} - Allowances:-
                      {assignment2.travel_allowance}
                    </p>
                  </center>
                </strong>
              </div>
            ))}
            <center>
              <br />
              <br />
              <h4>
                <u>Edit Allowances to Employees(Rs)(Enter one by one)</u>
              </h4>
              <input
                type="text"
                id="empno"
                name="empno"
                placeholder="Enter empno"
                value={this.state.empno}
                onChange={this.handleInputChange2}
              />
              <input
                type="text"
                id="travel_allowance"
                name="travel_allowance"
                placeholder="Enter allowance"
                value={this.state.travel_allowance}
                onChange={this.handleInputChange2}
              />
              <br />
              <button
                className="btn btn-success"
                type="submit"
                onClick={this.onSubmit2}
              >
                Set
              </button>
              <br />
              <br />

              <h4>
                <u>Document of Bills(For Allowances) </u>
              </h4>
              <input
                type="file"
                id="scan_invoice_allowance"
                name="scan_invoice_allowance"
                onChange={e => {
                  this.uploadPDF(e);
                }}
                multiple=""
              />
              <br />
              <button
                className="btn btn-success"
                type="submit"
                onClick={this.onSubmit3}
              >
                Submit
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <center>
                <a href="/admin">
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    style={{ width: "20%" }}
                  >
                    Done
                  </button>
                </a>
              </center>
            </center>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          type="success"
        />
      </div>
    );
  }
}
