import React, { Component } from "react";
import axios from "axios";
import "./CreateAssignment.css";
import { ToastContainer, toast } from "react-toastify"; // Imports for toastify
import "react-toastify/dist/ReactToastify.css"; // Imports for toastif

export default class NewLapAllo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment_name: "",
      client_no: "",
      execid: "",
      empno: "",
      status: "",
      date_allocated: "",
      date_received: "",
      lapid: "",
      laps: []
    };
  }
  //retrieve data
  componentDidMount() {
    this.retrievePosts();
  }
  ///retrieve function for laptops
  retrievePosts() {
    axios.get("http://localhost:5000/laps/ass").then(res => {
      if (res.data.success) {
        this.setState({
          laps: res.data.laps
        });
        console.log(this.state.laps);
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
  //laptops check function
  onCheck = id => {
    console.log(id);
    axios.get(`http://localhost:5000/checklapassigned/${id}`).then(res => {
      if (res.data.success) {
        alert("Laptop is Allocated to " + res.data.l + " Assignment/s!");
      }
    });
  };
  //function to validate
  validate = () => {
    let empnoError = "";
    let nameError = "";
    let clientError = "";
    let execidError = "";

    if (!this.state.assignment_name) {
      nameError = "*";
    }

    if (!this.state.client_no) {
      clientError = "*";
    }

    if (!this.state.execid) {
      execidError = "*";
    }

    if (!this.state.empno) {
      empnoError = "*";
    }

    if (nameError || clientError || execidError || empnoError) {
      //emaiError also equal to emailError:emailError in Js.
      this.setState({
        nameError,
        empnoError,
        execidError,
        clientError
      });
      toast.warn("Invalid Form Data. Please Check All the Fields!!!");
      return false;
    }
    return true;
  };
  //insert function for laptop allocations
  onSubmit = e => {
    e.preventDefault();

    const {
      assignment_name,
      client_no,
      execid,
      empno,
      status,
      date_allocated,
      date_received,
      lapid
    } = this.state;

    const data = {
      assignment_name: assignment_name,
      client_no: client_no,
      execid: execid,
      empno: empno,
      status: "Assigned",
      date_allocated: date_allocated,
      date_received: date_received,
      lapid: lapid
    };
    const isValid = this.validate();
    if (isValid) {
      console.log(data);
      axios
        .get(`http://localhost:5000/checkassignmentlap/${assignment_name}`)
        .then(res => {
          if (res.data.success) {
            if (res.data.l !== 0) {
              axios
                .get(`http://localhost:5000/laps/check/${lapid}`)
                .then(res => {
                  if (res.data.success) {
                    if (res.data.laps.length !== 0) {
                      axios
                        .post(
                          "http://localhost:5000/lapassignments/save/",
                          data
                        )
                        .then(res => {
                          if (res.data.success) {
                            this.setState({
                              assignment_name: "",
                              client_no: "",
                              execid: "",
                              empno: "",
                              status: "",
                              date_allocated: "",
                              date_received: "",
                              lapid: ""
                            });
                            alert("Done!");
                          }
                        });
                      axios
                        .put(
                          `http://localhost:5000/lapallocated/${lapid}`,
                          data
                        )
                        .then(res => {
                          if (res.data.success) {
                          }
                        });
                    } else {
                      toast.warn("Invalid Laptop ID, Please enter again!");
                    }
                  }
                });
            } else {
              toast.warn("Invalid Assignment Name!");
            }
          }
        });
    }
  };
  //demo button function
  demo = e => {
    e.preventDefault();
    this.setState({
      assignment_name: "Assignment7",
      client_no: "CL005",
      execid: "DOO2",
      empno: "1001",
      date_allocated: "2021-10-10",
      date_received: "2021-10-15"
    });
  };
  //search filter
  filterData(laps, searchKey) {
    console.log(searchKey);
    const result = laps.filter(
      laps =>
        laps.model.toLowerCase().includes(searchKey) ||
        laps.brand.toLowerCase().includes(searchKey)
    );
    this.setState({ laps: result });
  }
  //search function
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/laps/ass").then(res => {
      if (res.data.success) {
        this.filterData(res.data.laps, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main3">
          <h1 class="head1c">Laptop Allocation|Create Laptop Allocation</h1>
          <hr class="line1c"></hr>
          <div class="main33">
            <form>
              <p class="ic">Assignment Name: </p>
              <input
                type="text"
                class="icc"
                id="assignment_name"
                name="assignment_name"
                value={this.state.assignment_name}
                onChange={this.handleInputChange}
                required
              />
              <p class="iic">Client No: </p>
              <input
                type="text"
                class="iicc"
                id="client_no"
                name="client_no"
                value={this.state.client_no}
                onChange={this.handleInputChange}
                required
              />
              <p class="iiic">Executive ID: </p>
              <input
                type="text"
                class="iiicc"
                id="execid"
                name="execid"
                value={this.state.execid}
                onChange={this.handleInputChange}
                required
              />
              <p class="ivc">Employee Number: </p>
              <input
                type="text"
                class="ivcc"
                id="empno"
                name="empno"
                value={this.state.empno}
                onChange={this.handleInputChange}
                required
              />
              <p class="vc">Special Notes(not compulsory): </p>
              <input type="text" class="vcc" id="spec" name="spec" />
              <p class="vic">Date Allocating: </p>
              <input
                type="date"
                class="vicc"
                id="date_allocated"
                name="date_allocated"
                value={this.state.date_allocated}
                onChange={this.handleInputChange}
                required
              />
              <p class="viic">Due Date: </p>
              <input
                type="date"
                class="viicc"
                id="date_received"
                name="date_received"
                value={this.state.date_received}
                onChange={this.handleInputChange}
                required
              />
              <div class="staff">
                <center>
                  <h4>Click on Lap to check status</h4>
                  <input
                    type="text"
                    placeholder="Search Model"
                    name="searchQuery"
                    onChange={this.handleSearchArea}
                  />
                  {"\n"}
                  <ul>
                    {this.state.laps.map((laps, index) => (
                      <li style={{ backgroundColor: "#c4c4c4" }}>
                        {" "}
                        <strong>Lap ID-</strong>
                        {laps.id}
                        {"\t"} <strong>Model-</strong>
                        {laps.model}
                        {"\t"}
                        {"\t"} <strong>Brand-</strong>
                        {laps.brand}
                        {"\t"}
                        <a
                          href="#"
                          onClick={() => this.onCheck(laps.id)}
                          style={{
                            backgroundColor: "#1687a7",
                            paddingRight: "5px",
                            color: "white"
                          }}
                        >
                          Check
                        </a>
                      </li>
                    ))}
                  </ul>
                </center>
              </div>
              <p class="viiic">Laptop ID: </p>

              <input
                type="text"
                class="viiicc"
                id="lapid"
                name="lapid"
                value={this.state.lapid}
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
                <br />
                <br />
                <br />
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={this.demo}
                >
                  Demo
                </button>
              </center>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-center"
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
