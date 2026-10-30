import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRightLong } from "@/svg";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM, moreShopFinds } from "@/data/client-catalog";

const shopFilters = [
  { label: "Both shops", value: "all" },
  { label: "Tickles & Giggles", value: "kids" },
  { label: "Bliss n Blush", value: "bliss" },
];

const getCategoryLabel = (item) => {
  if (item.brand === "bliss") return "Home & dining";
  if (item.category.name === "School & Play") return "School & play";
  return "Kidswear";
};

const FindCard = ({ item, index, decorative = false }) => {
  const isBliss = item.brand === "bliss";
  const shopName = isBliss ? "Bliss n Blush" : "Tickles & Giggles Kids";
  const instagram = isBliss ? BLISS_INSTAGRAM : KIDS_INSTAGRAM;

  return (
    <article className="home-finds__item" aria-hidden={decorative || undefined}>
      <a
        className="home-finds__image"
        href={instagram}
        target="_blank"
        rel="noreferrer"
        tabIndex={decorative ? -1 : undefined}
        aria-label={decorative ? undefined : `Ask ${shopName} about ${item.title}`}
      >
        <Image
          src={item.img}
          alt={decorative ? "" : item.title}
          fill
          sizes="(min-width: 1200px) 22vw, (min-width: 768px) 30vw, 70vw"
          draggable={false}
        />
      </a>
      <div className="home-finds__details">
        <div className="home-finds__meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{getCategoryLabel(item)}</span>
          <span>{shopName}</span>
        </div>
        <h3>{item.title}</h3>
        <a
          className="home-finds__ask"
          href={instagram}
          target="_blank"
          rel="noreferrer"
          tabIndex={decorative ? -1 : undefined}
          aria-hidden={decorative || undefined}
        >
          Ask on Instagram <ArrowRightLong />
        </a>
      </div>
    </article>
  );
};

const PopularProducts = () => {
  const [activeShop, setActiveShop] = useState("all");

  const visibleFinds = useMemo(
    () =>
      activeShop === "all"
        ? moreShopFinds
        : moreShopFinds.filter((item) =>
            activeShop === "bliss" ? item.brand === "bliss" : item.brand !== "bliss"
          ),
    [activeShop]
  );

  // Keep the loop wide enough on narrow filters so the seam never feels abrupt.
  const loopSource = useMemo(() => {
    if (visibleFinds.length === 0) return [];
    let items = [...visibleFinds];
    while (items.length < 6) {
      items = [...items, ...visibleFinds];
    }
    return items;
  }, [visibleFinds]);

  const duration = `${Math.max(loopSource.length, 6) * 7}s`;

  return (
    <section className="home-finds" aria-labelledby="home-finds-title">
      <div className="container">
        <div className="home-finds__intro">
          <div className="home-finds__heading">
            <span className="home-finds__eyebrow">In the shops now</span>
            <h2 id="home-finds-title">Pieces people stop for.</h2>
            <p>
              A closer look at favourites waiting on the rails and floors —
              ask the team about what&apos;s in today.
            </p>
          </div>

          <div className="home-finds__filters" role="group" aria-label="Filter finds by shop">
            {shopFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeShop === filter.value}
                className={activeShop === filter.value ? "is-active" : ""}
                onClick={() => setActiveShop(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="home-finds__marquee"
        style={{ "--home-finds-duration": duration }}
        aria-label="Favourite finds from both shops"
      >
        <div key={activeShop} className="home-finds__track">
          <div className="home-finds__group">
            {loopSource.map((item, index) => (
              <FindCard
                key={`${item._id}-${index}`}
                item={item}
                index={index % visibleFinds.length}
              />
            ))}
          </div>
          <div className="home-finds__group" aria-hidden="true">
            {loopSource.map((item, index) => (
              <FindCard
                key={`${item._id}-dup-${index}`}
                item={item}
                index={index % visibleFinds.length}
                decorative
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <p className="home-finds__note">
          Selection changes often. Confirm availability with the shop before you visit.
        </p>
      </div>
    </section>
  );
};

export default PopularProducts;
