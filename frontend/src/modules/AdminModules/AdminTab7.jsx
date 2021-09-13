import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";
import Clock from "../../component/common/clock/Clock";

//laptopss
export default class AdminTab7 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptops: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:5000/laptops").then(res => {
      if (res.data.success) {
        this.setState({
          laptops: res.data.existingLaptops
        });
        console.log(this.state.laptops);
      }
    });
  }

  onDelete = _id => {
    console.log(_id);
    axios.delete(`http://localhost:5000/laptop/delete/${_id}`).then(res => {
      alert("Deleted Laptop Details successfully");
      this.retrievePosts();
    });
  };

  filterData(laptops, searchKey) {
    const result = laptops.filter(
      laptop =>
        laptop.id.toLowerCase().includes(searchKey) ||
        laptop.brand.toLowerCase().includes(searchKey) ||
        laptop.model.toLowerCase().includes(searchKey) ||
        laptop.status.toLowerCase().includes(searchKey)
    );
    this.setState({ laptops: result });
  }
  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/laptops").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingLaptops, searchKey);
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
                <h1 className="ap-topic">Inventory Management</h1>
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
                <button className="btn btn-lg aptab-disable">Laptops</button>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a
                href="/repairinglaptop"
                style={{ textDecoration: "none", color: "#1687A7" }}
              >
                <button class="btn btn-lg aptab-btn">Repairing Laptops</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </div>

            <div class="d-flex">
              <div className="col-lg-9 mt-2 mb-2 ">
                <h2 className="h3 mb-3">
                  Total Available Laptops ( {this.state.laptopcount} )
                </h2>
              </div>

              <div className="col-lg-3 mt-2 mb-2 search-bar">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search     "
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
                <th scope="col">Laptop Brand</th>
                <th scope="col">Laptop Model</th>
                <th scope="col">Storage size</th>
                <th scope="col">Assign status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.laptops.map((laptops, index) => (
                <tr>
                  <td>{laptops.id}</td>
                  <td>{laptops.brand}</td>
                  <td>{laptops.model}</td>
                  <td>{laptops.storage_type}</td>
                  <td>{laptops.status}</td>
                  <td>
                    <a href={`/viewlaptop/${laptops._id}`}>
                      <i class="fas fa-eye"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href={`/editlaptop/${laptops._id}`}>
                      <i class="far fa-edit"></i>
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href="#" onClick={() => this.onDelete(laptops._id)}>
                      <i className="fas fa-trash-alt"> </i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
          <a href="/createlaptop">
            <button class="addbtn">
              <i class="fas fa-plus"></i>&nbsp;New Laptop Repair Details
            </button>
          </a>
        </div>
      </div>
    );
  }
}

/**const AdminTab7 = () => {
  return <div>Tab8 content goes here</div>;
};

export default AdminTab7;*/
