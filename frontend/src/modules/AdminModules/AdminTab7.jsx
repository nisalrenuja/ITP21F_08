import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

//laptops
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
      <div class="containerbox">
        <h1 className="h1 mb-4 font-weight-normal">Inventory Management</h1>
        <hr />

        <div class="choice">
          <a href="/admin">
            <button class="laptopbtn">
              <p class="laptoptxt">Laptops</p>
            </button>
          </a>

          <a href="/repairinglaptop">
            <button class="repairlaptopbtn">
              <p class="repairlaptoptxt">Repairing Laptops</p>
            </button>
          </a>
        </div>

        <div class="searchFilter">
          <p class="filter"> Filter by</p>
          <input
            class="select"
            type="search"
            placeholder="Search"
            name="searchlaptop"
            onChange={this.handleSearchArea}
          />
        </div>
        <a href="/createlaptop">
          <button class="addbtn">
            <i class="fas fa-plus"></i>&nbsp;New Laptop Inventory Details
          </button>
        </a>

        <table>
          <thead>
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
                  <a className="view" href={`/viewlaptop/${laptops._id}`}>
                    <i class="fas fa-eye"></i>
                  </a>
                  <a className="edit" href={`/editlaptop/${laptops._id}`}>
                    <i class="far fa-edit"></i>
                  </a>

                  <a
                    className="delete"
                    href="#"
                    onClick={() => this.onDelete(laptops._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

/**const AdminTab7 = () => {
  return <div>Tab8 content goes here</div>;
};

export default AdminTab7;*/
