import React, { useState } from "react";
import Link from "next/link";
import { CloseTwo, Menu } from "@/svg";
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";

const NAV = [
  { title: "Home", link: "/" },
  { title: "Tickles & Giggles", link: "/#kids" },
  { title: "Bliss n Blush", link: "/#bliss" },
  { title: "Contact", link: "/contact" },
];

const HeaderFour = () => {
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { sticky } = useSticky();

  return (
    <>
      <header className={`site-header${sticky ? " is-sticky" : ""}`}>
        <div className="container site-header__bar">
          <Link href="/" className="site-header__brand client-wordmark logo-light">
            Tickles & Giggles
            <small>Kids · Bliss n Blush</small>
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            <Menus />
          </nav>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={isOffCanvasOpen}
            aria-controls="site-mobile-nav"
            aria-label={isOffCanvasOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsCanvasOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      <div
        id="site-mobile-nav"
        className={`site-drawer${isOffCanvasOpen ? " is-open" : ""}`}
      >
        <div
          className="site-drawer__overlay"
          onClick={() => setIsCanvasOpen(false)}
          aria-hidden="true"
        />
        <div className="site-drawer__panel">
          <button
            type="button"
            className="site-drawer__close"
            aria-label="Close menu"
            onClick={() => setIsCanvasOpen(false)}
          >
            <CloseTwo />
          </button>
          <Link
            href="/"
            className="site-drawer__brand client-wordmark logo-light"
            onClick={() => setIsCanvasOpen(false)}
          >
            Tickles & Giggles
            <small>Kids · Bliss n Blush</small>
          </Link>
          <nav aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={() => setIsCanvasOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="site-drawer__cta"
            onClick={() => setIsCanvasOpen(false)}
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderFour;
