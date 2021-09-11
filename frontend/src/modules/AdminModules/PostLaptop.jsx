import React, { Component } from "react";
import axios from "axios";

//laptop post
export default class PostLaptop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laptop: {}
    };
  }

  componentDidMount() {
    const _id = this.props.match.params._id;
    axios.get(`http://localhost:5000/laptop/${_id}`).then(res => {
      if (res.data.success) {
        this.setState({
          laptop: res.data.laptop
        });
        console.log(this.state.laptop);
      }
      alert(console.error());
    });
  }

  render() {
    const {
      id,
      brand,
      model,
      storage_type,
      purchaase_date,
      purchase_price,
      status
    } = this.state.laptop;
    return (
      <div>
        <form
          class="post"
          style={{
            backgroundColor: "#F6F5F5",
            border: "5px solid eastern blue",
            padding: "30px",
            borderRadius: "15px",
            alignContent: "center",
            left: "70px",
            right: "70px"
          }}
        >
          <h1 class="laptopdetails" style={{ left: "30px" }}>
            Laptop Inventory Details
          </h1>
          <hr />
          <dl className="row">
            <dt className="col-sm-3">Laptop ID</dt>
            <dd className="col-sm-9">{id}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Brand</dt>
            <dd className="col-sm-9">{brand}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Model</dt>
            <dd className="col-sm-9">{model}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Storage Type</dt>
            <dd className="col-sm-9">{storage_type}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Purchase Date</dt>
            <dd className="col-sm-9">{purchaase_date}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Purchas Price</dt>
            <dd className="col-sm-9">{purchase_price}</dd>
          </dl>
          <dl className="row">
            <dt className="col-sm-3">Status</dt>
            <dd className="col-sm-9">{status}</dd>
          </dl>
        </form>
      </div>
    );
  }
}
