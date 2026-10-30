import React, { useState } from "react";
import Image from "next/image";
import { featuredProducts, KIDS_INSTAGRAM, BLISS_INSTAGRAM } from "@/data/client-catalog";
import { ArrowRightLong } from "@/svg";

const categories = [
  { label: "Everything", value: "all" },
  { label: "Kidswear", value: "Kids Clothing" },
  { label: "School & play", value: "School & Play" },
  { label: "Home & dining", value: "Bliss Home" },
];

const HomeStoreSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProducts = activeCategory === "all"
    ? featuredProducts
    : featuredProducts.filter((item) => item.category.name === activeCategory);

  return (
    <section className="home-store" aria-labelledby="home-store-title">
      <div className="container">
        <div className="home-store__intro">
          <div className="home-store__heading">
            <span className="home-store__eyebrow">A little of what we love</span>
            <h2 id="home-store-title">Find something lovely.</h2>
            <p>
              Browse a selection from both shops. Ask the team about current
              availability and pricing.
            </p>
          </div>
          <div className="home-store__filters" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                aria-pressed={activeCategory === category.value}
                className={activeCategory === category.value ? "is-active" : ""}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="home-store__grid" aria-live="polite">
          {visibleProducts.map((item, index) => {
            const isBliss = item.brand === "bliss";
            const shopName = isBliss ? "Bliss n Blush" : "Tickles & Giggles Kids";
            const instagram = isBliss ? BLISS_INSTAGRAM : KIDS_INSTAGRAM;
            const categoryLabel = isBliss
              ? "Home & dining"
              : item.category.name === "School & Play"
                ? "School & play"
                : "Kidswear";

            return (
              <article className="home-store__product" key={item._id}>
                <a
                  className="home-store__image"
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ask ${shopName} about ${item.title}`}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={70}
                    sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 50vw"
                  />
                </a>
                <div className="home-store__details">
                  <div className="home-store__product-meta">
                    <span>{categoryLabel}</span>
                    <span>{shopName}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <a
                    className="home-store__availability"
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ask about availability <ArrowRightLong />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="home-store__note">
          Product selection, pricing and availability may change. Please confirm
          with the shop before visiting.
        </p>
      </div>
    </section>
  );
};

export default HomeStoreSection;
