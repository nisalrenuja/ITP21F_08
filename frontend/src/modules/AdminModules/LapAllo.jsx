import React, { Component } from "react";
import axios from "axios";
import "./LapAllo.css";
import { confirmAlert } from "react-confirm-alert"; // Imports for confirm alert
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactTooltip from "react-tooltip"; // Imports for tooltip

export default class LapAllo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lapassignments: []
    };
  }
  //retrirve data
  componentDidMount() {
    this.retrievePosts();
  }
  //retrieve function for allocations
  retrievePosts() {
    axios.get("http://localhost:5000/lapassignments/dis").then(res => {
      if (res.data.success) {
        this.setState({
          lapassignments: res.data.lapassignments,
          l: res.data.lapassignments.length
        });
        console.log(this.state.lapassignments);
      }
    });
  }
  //delete function
  onDelete = name => {
    console.log(name);
    axios
      .delete(`http://localhost:5000/lapassignments/delete/${name}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrievePosts();
      });
  };
  //search filter
  filterData(lapassignmentsassigned, searchKey) {
    console.log(searchKey);
    const result = lapassignmentsassigned.filter(
      lapassignmentsassigned =>
        lapassignmentsassigned.assignment_name
          .toLowerCase()
          .includes(searchKey) ||
        lapassignmentsassigned.lapid.toLowerCase().includes(searchKey)
    );
    this.setState({ lapassignments: result });
  }
  //search function
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/lapassignments/dis").then(res => {
      if (res.data.success) {
        console.log(res.data.lapassignments);
        this.filterData(res.data.lapassignments, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div class="main2">
          <h2 class="head1l">Laptop Allocation</h2>
          <a href="/lapalloreport" class="btn btn-info reportdiv">
            <i class="fa fa-file fa-2x" aria-hidden="true"></i>&nbsp;
          </a>
          <hr class="line1l"></hr>
          <a href="/allassignments">
            <button class="div1331">
              <p class="txt1x1" style={{ paddingTop: "11px" }}>
                Assignments
              </p>
            </button>
          </a>
          <a href="/laptopallocation">
            <button class="div2332">
              <p class="txt2x2" style={{ paddingTop: "11px" }}>
                Allocate Laptops
              </p>
            </button>
          </a>
          <div class="div3112">
            <p class="txt354">Filter by</p>
            <input
              class="select121x"
              type="text"
              placeholder="Search..."
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
          <h2 class="tah121">Total Laptop Allocations({this.state.l})</h2>
          <table className="table table-hover table121">
            <thead class="thead121">
              <tr>
                <th scope="col">Assignment Name</th>
                <th scope="col">Staff ID</th>
                <th scope="col">Laptop ID</th>
                <th scope="col">Allocated Date</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="tbody121">
              {this.state.lapassignments.map((lapassignments, index) => (
                <tr key={index}>
                  <td>{lapassignments.assignment_name}</td>
                  <td>{lapassignments.empno}</td>
                  <td>{lapassignments.lapid}</td>
                  <td>{lapassignments.date_allocated}</td>

                  <td>{lapassignments.date_received}</td>
                  <td>
                    <b>{lapassignments.status}</b>
                  </td>

                  <td>
                    <a
                      href={`/editlapallo/${lapassignments.assignment_name}`}
                      data-tip
                      data-for="allocationEditTip"
                    >
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <ReactTooltip id="allocationEditTip" place="top">
                      <span>Edit Allocation</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
                    <a
                      href="#"
                      onClick={() =>
                        confirmAlert({
                          title: "Confirm to Delete",
                          message: "Are you sure to delete ?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () =>
                                this.onDelete(lapassignments.assignment_name)
                            },
                            {
                              label: "No",
                              onClick: () => window.close
                            }
                          ]
                        })
                      }
                      data-tip
                      data-for="allocationDeleteTip"
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
                    <ReactTooltip id="allocationDeleteTip" place="top">
                      <span>Delete Allocation</span>
                    </ReactTooltip>
                    &nbsp; &nbsp;
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="tfoot121">
              <a href="/createlapallocation">
                <i class="fas fa-plus"></i>&nbsp;New Allocation
              </a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
