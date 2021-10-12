import React, { Component } from "react";
import axios from "axios";
import "./LaptopInventory.css";

import Clock from "../../component/common/clock/Clock";

import Chart from "react-google-charts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default class AdminTab7 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptops: []
    };
  }

  //load retrieve data in to the laptop table
  componentDidMount() {
    this.retrievePosts();
  }

  //print data
  printData() {
    let printTable = document.getElementById("laptopdetails").innerHTML;
    let getprintout = window.open("", "", "height=1024, width=1024");
    getprintout.document.write(
      "<html><head><title>Laptop Print Page</title></head>"
    );
    getprintout.document.write(
      '<body style="font-family:Arial, Helvetica, sans-serif;font-size:10px;color:#000000";margin:100;padding:40> <h1 style="text-align:center"><u>Inventory Laptops Details </u></h1><br>'
    );
    getprintout.document.write(
      '<table style="width: 100%; border: 1px  solid black ;text-align: center"><hr><tbody style=" font-size: 36px; padding: 25px ;border: 1px  solid black ;text-align: center"',
      printTable,
      "</table><br>"
    );
    getprintout.document.write("  ...................<br>");
    getprintout.document.write("       Signature</body></html>");
    getprintout.print();
    getprintout.close();
  }

  generateBarChart = () => {
    let laptopcontent = document.getElementById("laptopContent");
    let print = document.getElementById("printcontent").contentWindow;
    print.document.open();
    print.document.write(laptopcontent.innerHTML);
    print.document.close();
    print.focus();
    print.print();
  };

  //retreive all data into the table
  retrievePosts() {
    axios.get("http://localhost:5000/laptops").then(res => {
      if (res.data.success) {
        this.setState({
          laptops: res.data.existingLaptops,
          laptopcount: res.data.laptopCount
        });
        console.log(this.state.laptops);
        console.log(this.state.laptopcount);
      }
    });
  }

  notify = () => {
    toast.success("Deleted Laptop Inventory Details Successfully! ");
  };

  //delete button
  onDelete = _id => {
    axios.delete(`http://localhost:5000/laptop/delete/${_id}`).then(res => {
      this.notify();
      this.retrievePosts();
    });
  };

  //search bar data filter
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
    const hcount = this.state.laptops.reduce((hcount, laptops) => {
      if (laptops.brand === "HP") {
        return hcount + (laptops.brand, 1);
      }
      return hcount;
    }, 0);
    const acount = this.state.laptops.reduce((acount, laptops) => {
      if (laptops.brand === "ASUS") {
        return acount + (laptops.brand, 1);
      }
      return acount;
    }, 0);
    const dcount = this.state.laptops.reduce((dcount, laptops) => {
      if (laptops.brand === "Dell") {
        return dcount + (laptops.brand, 1);
      }
      return dcount;
    }, 0);
    const lcount = this.state.laptops.reduce((lcount, laptops) => {
      if (laptops.brand === "Lenevo") {
        return lcount + (laptops.brand, 1);
      }
      return lcount;
    }, 0);

    return (
      <div className="container saj">
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
                  Total Laptops Inventory Details ({this.state.laptopcount})
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
          <div id="laptopdetails">
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
                  <th scope="col">Availability status</th>
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
                        <i class="far fa-eye"></i>
                      </a>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <a href={`/editlaptop/${laptops._id}`}>
                        <i class="far fa-edit"></i>
                      </a>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <a
                        href="#"
                        data-tip
                        data-for="deleteTip"
                        onClick={() =>
                          confirmAlert({
                            title: "Delete Confirmation",
                            message: "Are you sure to delete this?",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () => this.onDelete(laptops._id)
                              },
                              {
                                label: "No",
                                onClick: () => window.close
                              }
                            ]
                          })
                        }
                      >
                        <i className="far fa-trash-alt"> </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
          <div>
            <button class="btn btn-primary" onClick={() => this.printData()}>
              <i class="fa fa-print" aria-hidden="true"></i>&nbsp; PRINT
            </button>
            <p>
              Click above button opens print preview with Laptop Inventory
              Details
            </p>
          </div>

          <a href="/createlaptop">
            <button class="addbtn">
              <i class="fas fa-plus"></i>&nbsp;New Laptop Details
            </button>
          </a>
        </div>

        <div
          id="laptopContent"
          class="lapcontent"
          style={{ marginTop: "10px", padding: "10px", paddingRight: "5px" }}
        >
          <h4>Inventory Laptop Type Chart</h4>
          <center>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Laptop Type Chart</div>}
              data={[
                ["Types of laptops", "No of Laptops"],
                ["Dell", dcount],
                ["HP", hcount],
                ["ASUS", acount],
                ["Lenevo", lcount]
              ]}
              options={{
                chart: {
                  title: "Laptop Inventory ",
                  subtitle: "No of Types of laptops"
                }
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </center>
          <button
            type="primary"
            className="btn btn-warning text-light col-2 float-right"
            onClick={this.generateBarChart}
          >
            Print:PDF
          </button>
          <br></br>
        </div>
        <div>
          <iframe id="printcontent" style={{ display: "none" }}></iframe>
        </div>
        <br></br>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
