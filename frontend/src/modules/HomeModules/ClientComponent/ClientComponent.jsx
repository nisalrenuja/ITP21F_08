import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ClientCard from "../../../component/ClientCard/ClientCard";
import Clients from "../../ClientModules/ClientList/ClientListData.json";

const responsive = {
  0: {
    items: 1.3,
  },
  370: {
    items: 1.2,
  },
  411: {
    items: 1.3,
  },
  414: {
    items: 1.3,
  },
  600: {
    items: 2,
  },
  768: {
    items: 2.25,
  },
  1000: {
    items: 3,
  },
  1200: {
    items: 3,
  },
  1400: {
    items: 3.3,
  },
  1700: {
    items: 4,
  },
};

const ClientsComponent = () => (
  <div className="past-event-container pt-5">
    <h1 className="event-header">Our Clients</h1>

    <div className="container-fluid">
      <OwlCarousel
        className="owl-theme"
        dots={false}
        loop
        margin={70}
        responsive={responsive}
      >
        {Clients.data.map((client) => (
          <ClientCard
            key={client.id}
            image={client.image}
            title={client.title}
            datetime={client.datetime}
            description={client.description}
            link={client.link}
            tags={client.tags}
            mediumProfileImg={client.mediumProfileImg}
          />
        ))}
      </OwlCarousel>
    </div>
  </div>
);

export default ClientsComponent;
