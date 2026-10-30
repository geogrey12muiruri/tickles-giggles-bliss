import React from "react";
import Link from "next/link";
import { ArrowRightLong } from "@/svg";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM } from "@/data/client-catalog";

const locations = [
  {
    name: "Tickles & Giggles Kids",
    detail: "Ufundi Coop, Jeevanjee · Nairobi CBD",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tickles+%26+Giggles+Kids+Ufundi+Coop+Jeevanjee+Nairobi",
  },
  {
    name: "Bliss n Blush",
    detail: "Malik Heights, Adams Arcade · Ngong Road",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Malik+Heights+Adams+Arcade+Ngong+Road+Nairobi",
  },
];

const phones = [
  { label: "Call", number: "0797 729 738", href: "tel:+254797729738" },
  { label: "Call", number: "0111 703 747", href: "tel:+254111703747" },
];

const exploreLinks = [
  { title: "Home", href: "/" },
  { title: "Tickles & Giggles", href: "/#kids" },
  { title: "Bliss n Blush", href: "/#bliss" },
  { title: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Tickles & Giggles Kids",
    handle: "@ticklesandgiggles_kids_kenya",
    href: KIDS_INSTAGRAM,
  },
  {
    name: "Bliss n Blush",
    handle: "@blissnblushkitchen",
    href: BLISS_INSTAGRAM,
  },
];

const FooterTwo = () => {
  return (
    <footer className="client-footer">
      <div className="container">
        <div className="client-footer__top">
          <div className="client-footer__brand">
            <Link href="/" className="client-wordmark logo-light">
              Tickles & Giggles
              <small>Kids · Bliss n Blush</small>
            </Link>
            <p>
              Two Nairobi shops for kidswear, school finds, furniture, and home
              pieces — come by or message us on Instagram.
            </p>
          </div>

          <div className="client-footer__grid">
            <div className="client-footer__col">
              <h3>Visit</h3>
              <ul>
                {locations.map((location) => (
                  <li key={location.name}>
                    <a href={location.mapsUrl} target="_blank" rel="noreferrer">
                      <strong>{location.name}</strong>
                      <span>{location.detail}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="client-footer__col">
              <h3>Call</h3>
              <ul>
                {phones.map((phone) => (
                  <li key={phone.number}>
                    <a href={phone.href}>{phone.number}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="client-footer__col">
              <h3>Explore</h3>
              <ul>
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="client-footer__col">
              <h3>Follow</h3>
              <ul className="client-footer__social">
                {socialLinks.map((shop) => (
                  <li key={shop.href}>
                    <a
                      href={shop.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Follow ${shop.name} on Instagram`}
                    >
                      <span>{shop.handle}</span>
                      <ArrowRightLong />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="client-footer__bottom">
          <p>© {new Date().getFullYear()} Tickles & Giggles Kids · Bliss n Blush</p>
          <p>Prices and availability are confirmed in store or on Instagram.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
