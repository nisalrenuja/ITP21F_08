import React, { Component } from "react";
import axios from "axios";
import "./PostLaptopDetails.css";
//laptops
export default class PostLaptopRepair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptopRepair: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/laptop_repair/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          laptopRepair: res.data.laptopRepair
        });
        console.log(this.state.laptopRepair);
      }
    });
  }

  render() {
    const {
      id,
      repair_reason,
      repair_date,
      repair_cost
    } = this.state.laptopRepair;

    return (
      <div className="col-md-6 mt-4 mx-auto">
        <form className="need-validation">
          <div class="box">
            <dl>
              <p class="lap">Laptop ID : &nbsp;{id}</p>
            </dl>
            <dl>
              <p class="laps">Repair Reason : &nbsp;{repair_reason}</p>
            </dl>
          </div>

          <h2>Laptop Repair Details</h2>
          <hr />

          <dl>
            <dt>Laptop ID :</dt>
            <dd>{id}</dd>
          </dl>
          <dl>
            <dt>Repair Reason :</dt>
            <dd>{repair_reason}</dd>
          </dl>
          <dl>
            <dt>Repair Date</dt>
            <dd>{repair_date}</dd>
          </dl>
          <dl>
            <dt>Repair Cost:</dt>
            <dd>{repair_cost}</dd>
          </dl>
        </form>
        &nbsp;
        <div class="back">
          <a href="/repairinglaptop">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Laptop Repair Inventory
            </i>
          </a>
        </div>
      </div>
    );
  }
}
