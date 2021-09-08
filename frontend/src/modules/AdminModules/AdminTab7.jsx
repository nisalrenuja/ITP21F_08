import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

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

  onDelete = id => {
    console.log(id);
    axios.delete(`http://localhost:5000/laptops/delete/${id}`).then(res => {
      alert("Deleted Laptop Details successfully");
      this.retrievePosts();
    });
  };

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("./laptop").then(res => {
      if (res.data.success) {
        this.filterData(res.data.laptop, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <div class="container">
          <h1 className="h3 mb-3 font-weight-normal">Inventory Management</h1>
          <hr></hr>

          <div class="choice">
            <a href="/createlaptop">
              <button class="div1">
                <p class="txt1">Laptops</p>
              </button>
            </a>
            <a href="/repairinglaptop">
              <button class="div2">
                <p class="txt2">Repairing Laptops</p>
              </button>
            </a>
          </div>

          <div class="searchFilter">
            <p class="txt"> Filter by</p>
            <input
              class="select"
              type="search"
              placeholder="Laptop ID"
              name="searchlaptop"
              onChange={this.handleSearchArea}
            />

            <a className="btn btn-info search">
              <i className="fas fa-search"></i>&nbsp;Search
            </a>
          </div>

          <table className="table table-hover table1">
            <thead className="thead">
              <tr>
                <th scope="col">Laptop ID</th>
                <th scope="col">Laptop Brand</th>
                <th scope="col">Laptop Model</th>
                <th scope="col">Storage size</th>
                <th scope="col">Assign status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="tbody-container">
              {this.state.laptops.map((laptops, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <a href={``} style={{ textDecoration: "none" }}>
                      {laptops.id}
                    </a>
                  </td>
                  <td>{laptops.brand}</td>
                  <td>{laptops.model}</td>
                  <td>{laptops.storage_type}</td>
                  <td>{laptops.status}</td>
                  <td>
                    <a className="btn btn-warning" href={`/edit/${laptops.id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(laptops.id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="tfoot">
              <a href="/createlaptop">
                <i class="fas fa-plus"></i>&nbsp;New Laptop Inventory Details
              </a>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

/**const AdminTab7 = () => {
  return <div>Tab8 content goes here</div>;
};

export default AdminTab7;*/
