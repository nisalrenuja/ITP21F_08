import React, { Component } from "react";
import axios from "axios";

export default class PostLaptopRepair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptopRepair: {}
    };
  }

  componentDidMount() {
    const _id = this.props.match.params._id;
    axios.get(`http://localhost:5000/laptop_repair/${_id}`).then(res => {
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
      <div class="container">
        <h1 class="laptoprepairdetails">Laptop Inventory Details</h1>
        <hr />
        <dl className="row">
          <dt className="col-sm-3">Laptop ID :</dt>
          <dd className="col-sm-9">{id}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Repair Reason :</dt>
          <dd className="col-sm-9">{repair_reason}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Repair Date :</dt>
          <dd className="col-sm-9">{repair_date}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Repair Cost :</dt>
          <dd className="col-sm-9">{repair_cost}</dd>
        </dl>
      </div>
    );
  }
}
