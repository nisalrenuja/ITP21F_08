import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

//laptop
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
      <div class="inventory-managemnt">
        <div class="container">
          <h1>Inventory Management</h1>
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
          </div>
          <a href="/createlaptop">
            <button class="addbtn">
              <i class="fas fa-plus"></i>&nbsp;New Laptop Inventory Details
            </button>
          </a>

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
                  <td>{laptops.id}</td>
                  <td>{laptops.brand}</td>
                  <td>{laptops.model}</td>
                  <td>{laptops.storage_type}</td>
                  <td>{laptops.status}</td>
                  <td>
                    <a className="view" href={`/viewlaptop/${laptops._id}`}>
                      <i class="fas fa-eye"></i>&nbsp;&nbsp;
                    </a>
                    <a className="edit" href={`/editlaptop/${laptops._id}`}>
                      <i class="fas fa-edit"></i>&nbsp;&nbsp;
                    </a>
                    &nbsp;
                    <a
                      className="delete"
                      href="#"
                      onClick={() => this.onDelete(laptops._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="tfoot"></tfoot>
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
