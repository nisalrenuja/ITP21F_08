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
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/laptop/${id}`).then(res => {
      if (res.data.success) {
        this.setState({
          laptop: res.data.laptop
        });
        console.log(this.state.laptop);
      }
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
      <div className="col-md-6 mt-4 mx-auto">
        <form class="need-validation">
          <div class="box">
            <dl>
              <p class="lap">Laptop ID : &nbsp;{id}</p>
            </dl>
            <dl>
              <p class="lapsbrand">Brand : &nbsp;{brand}</p>
            </dl>
          </div>
          <h2>Laptop Inventory Details</h2>
          <hr />
          <dl>
            <dt>Laptop ID :</dt>
            <dd>{id}</dd>
          </dl>
          <dl>
            <dt>Brand :</dt>
            <dd>{brand}</dd>
          </dl>
          <dl>
            <dt>Model :</dt>
            <dd>{model}</dd>
          </dl>
          <dl>
            <dt>Storage Type :</dt>
            <dd>{storage_type}</dd>
          </dl>
          <dl>
            <dt>Purchase Date :</dt>
            <dd>{purchaase_date}</dd>
          </dl>
          <dl>
            <dt>Purchas Price :</dt>
            <dd>{purchase_price}</dd>
          </dl>
          <dl>
            <dt>Status :</dt>
            <dd>{status}</dd>
          </dl>
          <div class="box2">
            <h3>Current Status</h3>

            <dl>
              <p class="status">Status : &nbsp;{status}</p>
            </dl>
          </div>
        </form>
        <div class="back">
          <a href="/admin">
            <i class="fas fa-angle-double-left fa-3x">
              &nbsp;&nbsp;Back To Laptop Inventory
            </i>
          </a>
        </div>
      </div>
    );
  }
}
