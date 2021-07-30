import React from "react";
import ClientCard from "../../../component/ClientCard/ClientCard";
import Clients from "./ClientListData.json";
import "./ClientListStyle.css";

const ClientList = () => (
  <div className="ClientListPolygonDiv">
    <div className="past-event-container">
      <h1 className="event-header">Top Clients</h1>
      <div className="container-fluid ">
        <div className="row">
          {Clients.data.map((Client) => (
            <div className="col-lg-4 col-md-3 col-sm-12" key={Client.id}>
              <ClientCard
                image={Client.image}
                title={Client.title}
                datetime={Client.datetime}
                description={Client.description}
                link={Client.link}
                tags={Client.tags}
                mediumProfileImg={Client.mediumProfileImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ClientList;
