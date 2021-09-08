import React, { Component } from "react";
import axios from "axios";
import "./LapAllo.css";

export default class LapAllo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lapassignments: []
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
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
  onDelete = name => {
    console.log(name);
    axios
      .delete(`http://localhost:5000/lapassignments/delete/${name}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrievePosts();
      });
  };
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
          <hr class="line1l"></hr>
          <a href="/allassignments">
            <button class="div11">
              <p class="txt11">Assignments</p>
            </button>
          </a>
          <a href="/laptopallocation">
            <button class="div22">
              <p class="txt22">Allocate Laptops</p>
            </button>
          </a>
          <div class="div3">
            <p class="txt3">Filter by</p>
            <input
              class="select121"
              type="text"
              placeholder="Search..."
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
            <a className="btn btn-info search121">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
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
                  <td>{lapassignments.status}</td>

                  <td>
                    <a href={`/editlapallo/${lapassignments.assignment_name}`}>
                      <i className="fas fa-edit"></i>&nbsp;
                    </a>
                    &nbsp;
                    <a
                      href="#"
                      onClick={() =>
                        this.onDelete(lapassignments.assignment_name)
                      }
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;
                    </a>
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
