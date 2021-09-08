import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

//lap
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
    axios.get("http://localhost:5000/laptop_repair").then(res => {
      if (res.data.success) {
        this.setState({
          laptopsRepair: res.data.existingLaptopsRepair
        });
        console.log(this.state.laptopsRepair);
      }
    });
  }

  onDelete = id => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/laptop_repair/delete/${id}`)
      .then(res => {
        alert("Deleted Laptop Reapir Details successfully");
        this.retrievePosts();
      });
  };

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;
    axios.get("./laptop_repair").then(res => {
      if (res.data.success) {
        this.filterData(res.data.laptopRepair, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">
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

          <a className="btn btn-info search">
            <i className="fas fa-search"></i>&nbsp;Search
          </a>
        </div>

        <table className="table table-hover table1">
          <thead className="thead">
            <tr>
              <th scope="col">Laptop ID</th>
              <th scope="col">Repair Reason </th>
              <th scope="col">Repair Price</th>
              <th scope="col">Repair Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tbody-container">
            {this.state.laptopsRepair.map((laptopsRepair, index) => (
              <tr>
                <td>
                  {" "}
                  <a href={``} style={{ textDecoration: "none" }}>
                    {laptopsRepair.id}
                  </a>
                </td>
                <td>{laptopsRepair.repair_reason}</td>
                <td>{laptopsRepair.repair_cost}</td>
                <td>{laptopsRepair.repair_date}</td>

                <td>
                  <a
                    className="btn btn-warning"
                    href={`/edit/${laptopsRepair.id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(laptopsRepair.id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot class="tfoot">
            <a href="/createlaptoprepair">
              <i class="fas fa-plus"></i>&nbsp;New Laptop Repair Details
            </a>
          </tfoot>
        </table>
      </div>
    );
  }
}
