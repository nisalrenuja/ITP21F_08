import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";
import Clock from "../../component/common/clock/Clock";

//laptop
export default class LaptopRepair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptopsRepair: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/laptops_repair").then(res => {
      if (res.data.success) {
        this.setState({
          laptopsRepair: res.data.existingLaptopsRepair
        });
        console.log(this.state.laptopsRepair);
      }
    });
  }

  onDelete = _id => {
    console.log(_id);
    axios
      .delete(`http://localhost:5000/laptop_repair/delete/${_id}`)
      .then(res => {
        alert("Deleted Laptop Reapir Details successfully");
        this.retrievePosts();
      });
  };

  filterData(laptopsRepair, searchKey) {
    const result = laptopsRepair.filter(
      laptop_repair =>
        laptop_repair.id.toLowerCase().includes(searchKey) ||
        laptop_repair.repair_reason.toLowerCase().includes(searchKey) ||
        laptop_repair.repair_date.toLowerCase().includes(searchKey) ||
        laptop_repair.repair_cost.toLowerCase().includes(searchKey)
    );
    this.setState({ laptopsRepair: result });
  }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/laptops_repair").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingLaptopsRepair, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <br></br>
        <div className="inventory react-bs-table-pagination">
          <div className="row">
            <div class="d-flex justify-content-between">
              <div className="col-lg-9 mt-2 mb-2 font-weight-bold ">
                <br />
                <h1 className="ap-topic">
                  Inventory Management | Laptop Repairing
                </h1>
              </div>
              <div>
                <Clock />
              </div>
            </div>

            <hr />
            <div className="col-lg-9 mt-2 mb-2">
              <a
                href="/admin"
                style={{ textDecoration: "none", color: "white" }}
              >
                <button className="btn btn-lg aptab-btn">Laptops</button>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/repairinglaptop">
                <button className="btn btn-lg aptab-disable">
                  Repairing Laptops
                </button>
              </a>
            </div>

            <div class="d-flex">
              <div className="col-lg-9 mt-2 mb-2 ">
                <h2 className="h3 mb-3">Available Repair Laptops</h2>
              </div>

              <div className="col-lg-3 mt-2 mb-2 search-bar">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  aria-label="Search"
                  onChange={this.handleSearchArea}
                />
              </div>
            </div>
          </div>

          <table
            className="table table-hover text-center"
            style={{ marginTop: "40px" }}
          >
            <thead class="tblhead">
              <tr>
                <th scope="col">Laptop ID</th>
                <th scope="col">Repair Reason </th>
                <th scope="col">Repair Date</th>
                <th scope="col">Repair Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.laptopsRepair.map((laptopsRepair, index) => (
                <tr>
                  <td>{laptopsRepair.id}</td>
                  <td>{laptopsRepair.repair_reason}</td>
                  <td>{laptopsRepair.repair_date}</td>
                  <td>{laptopsRepair.repair_cost}</td>

                  <td>
                    <a href={`/viewrepair/${laptopsRepair._id}`}>
                      <i class="far fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editrepair/${laptopsRepair._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a
                      href="#"
                      onClick={() => this.onDelete(laptopsRepair._id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
          <a href="/createlaptoprepair">
            <button class="addbtn">
              <i class="fas fa-plus"></i>&nbsp;New Laptop Repair Details
            </button>
          </a>
        </div>
      </div>
    );
  }
}
