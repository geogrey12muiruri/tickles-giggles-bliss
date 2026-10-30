import React, { useState } from "react";
import { ArrowRightLong } from "@/svg";

const locations = [
  {
    name: "Tickles & Giggles Kids",
    detail: "Ufundi Coop, Jeevanjee · Nairobi CBD",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tickles+%26+Giggles+Kids+Ufundi+Coop+Jeevanjee+Nairobi",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8194195221317!2d36.81883017496567!3d-1.2821277987056812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d444bfa00f%3A0xbefe372e447110f3!2sTickles%20%26%20Giggles%20Kids!5e0!3m2!1sen!2ske!4v1793112518172!5m2!1sen!2ske",
  },
  {
    name: "Bliss n Blush",
    detail: "Malik Heights, Adams Arcade · Ngong Road",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Malik+Heights+Adams+Arcade+Ngong+Road+Nairobi",
    embedUrl:
      "https://www.google.com/maps?q=Malik+Heights%2C+Adams+Arcade%2C+Ngong+Road%2C+Nairobi&output=embed",
  },
];

const JewelryAbout = () => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [mapEnabled, setMapEnabled] = useState(false);
  const activeLocation = locations[activeLocationIndex];

  return (
    <section className="client-locations" aria-labelledby="client-locations-title">
      <div className="container">
        <div className="client-locations__layout">
          <div className="client-locations__visual">
            <div className="client-locations__map-heading">
              <span>Explore the area</span>
              <span>Google Maps</span>
            </div>
            <div className="client-locations__map-switcher" role="group" aria-label="Choose a shop map">
              {locations.map((location, index) => (
                <button
                  key={location.name}
                  type="button"
                  aria-pressed={activeLocationIndex === index}
                  className={activeLocationIndex === index ? "is-active" : ""}
                  onClick={() => {
                    setActiveLocationIndex(index);
                    setMapEnabled(true);
                  }}
                >
                  <span>0{index + 1}</span>
                  {index === 0 ? "Nairobi CBD" : "Adams Arcade"}
                </button>
              ))}
            </div>

            {mapEnabled ? (
              <iframe
                key={activeLocation.embedUrl}
                className="client-locations__map"
                src={activeLocation.embedUrl}
                title={`Google Maps: ${activeLocation.name}, ${activeLocation.detail}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="client-locations__map client-locations__map-placeholder"
                onClick={() => setMapEnabled(true)}
              >
                Load map for {activeLocation.name}
              </button>
            )}
          </div>

          <div className="client-locations__content">
            <span className="client-locations__eyebrow">Come by and say hello</span>
            <h2 id="client-locations-title">Find us in Nairobi.</h2>
            <p>
              Explore Tickles &amp; Giggles Kids and Bliss n Blush in person at
              two convenient city locations.
            </p>

            <div className="client-locations__list">
              {locations.map((location, index) => (
                <article className="client-locations__item" key={location.name}>
                  <span className={`client-locations__number client-locations__number--${index + 1}`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{location.name}</h3>
                    <p>{location.detail}</p>
                  </div>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Get directions to ${location.name}`}
                  >
                    <ArrowRightLong />
                  </a>
                </article>
              ))}
            </div>
            <span className="client-locations__footnote">
              Check with the shop for current opening hours before your visit.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelryAbout;
