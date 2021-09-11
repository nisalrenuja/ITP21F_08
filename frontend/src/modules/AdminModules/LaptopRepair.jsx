import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

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
      <div class="inventory">
        <h1 className="laptop-repair">
          Inventory Management | Laptop Repairing
        </h1>
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

        <a href="/createlaptoprepair">
          <button class="addbtn">
            <i class="fas fa-plus"></i>&nbsp;New Laptop Repair Details
          </button>
        </a>

        <table className="table table-hover table1">
          <thead className="thead">
            <tr>
              <th scope="col">Laptop ID</th>
              <th scope="col">Repair Reason </th>
              <th scope="col">Repair Date</th>
              <th scope="col">Repair Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tbody-container">
            {this.state.laptopsRepair.map((laptopsRepair, index) => (
              <tr>
                <td>{laptopsRepair.id}</td>
                <td>{laptopsRepair.repair_reason}</td>
                <td>{laptopsRepair.repair_date}</td>
                <td>{laptopsRepair.repair_cost}</td>

                <td>
                  <a className="view" href={`/viewrepair/${laptopsRepair._id}`}>
                    <i class="fas fa-eye"></i>&nbsp;&nbsp;
                  </a>
                  <a className="edit" href={`/editrepair/${laptopsRepair._id}`}>
                    <i class="fas fa-edit"></i>&nbsp;&nbsp;
                  </a>
                  &nbsp;
                  <a
                    className="delete"
                    href="#"
                    onClick={() => this.onDelete(laptopsRepair._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;&nbsp;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot class="tfoot"></tfoot>
        </table>
      </div>
    );
  }
}
