import React, { Component } from "react";
import axios from "axios";
import "./AllNotices.css";

export default class AdminTab5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      existingNotices: [] //CreateNotice
    };
  }
  onDelete = id => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/CreateNotice/delete/${id}`)
      .then(res => {
        alert("Deleted Succesfully");
        this.retrieveexistingNotices();
      });
  };
  componentDidMount() {
    this.retrieveexistingNotices();
  }
  retrieveexistingNotices() {
    axios.get("http://localhost:5000/CreateNotices").then(res => {
      if (res.data.success) {
        this.setState({
          existingNotices: res.data.existingNotices
        });
        console.log(this.state.existingNotices);
      }
    });
  }
  //Search
  filterData(existingNotices, searchKey) {
    console.log(searchKey);
    const result = existingNotices.filter(
      existingNotices =>
        existingNotices.notice_id.toLowerCase().includes(searchKey) ||
        existingNotices.emp_id.toLowerCase().includes(searchKey) ||
        existingNotices.notice_topic.toLowerCase().includes(searchKey)
    );
    this.setState({ existingNotices: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/CreateNotices").then(res => {
      if (res.data.success) {
        console.log(res.data.existingNotices);
        this.filterData(res.data.existingNotices, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div class="senmain">
          <h2 class="senhead1">Notice Management</h2>
          <hr class="senline1"></hr>
          <a href="/CreateNotice">
            <button class="sendiv4">
              <p class="sentxt4">NEW NOTICE +</p>
            </button>
          </a>
          <a href="/TopPerformers">
            <button class="senadiv1">
              <p class="senatxt1">Top Performers</p>
            </button>
          </a>
          <a href="/NoticeComPerf">
            <button class="senadiv2">
              <p class="senatxt2">Company Performance</p>
            </button>
          </a>
          <div class="sendiv3">
            <p class="sentxt3">Filter by</p>
            <input
              class="senselect1"
              type="text"
              name="searchQuery"
              placeholder="Search by Notice ID or Employee ID"
              onChange={this.handleSearchArea}
            />
            <a className="btn btn-info sensearch">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>
          <div>
            <h2 class="sentah">All Notices</h2>
            <table className="table table-hover sentable1">
              <thead class="senthead">
                <tr>
                  <th scope="col">Notice ID</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Notice Topic</th>
                  <th scope="col">Published Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody class="sentbody1">
                {this.state.existingNotices.map((existingNotices, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={`/DisplayNotice/${existingNotices._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {existingNotices.notice_id}
                      </a>
                    </td>
                    <td>{existingNotices.emp_id}</td>

                    <td>{existingNotices.notice_topic}</td>
                    <td>{existingNotices.published_date}</td>

                    <td>
                      <a
                        href={existingNotices.notice_attachments}
                        class="icon-btns"
                      >
                        <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;
                      </a>
                      <a href={`/EditNotices/${existingNotices._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;
                      </a>
                      &nbsp;
                      <a
                        href="#"
                        onClick={() => this.onDelete(existingNotices._id)}
                      >
                        <i className="far fa-trash-alt"></i>&nbsp;
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot class="tfoot"></tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
