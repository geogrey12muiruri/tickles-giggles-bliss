import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightLong } from "@/svg";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM } from "@/data/client-catalog";
import { blissAsset, kidsAsset } from "@/lib/media/paths";

const shopWorlds = [
  {
    id: "kids",
    name: "Tickles & Giggles Kids",
    shortName: "Kids",
    eyebrow: "For little ones",
    description:
      "Clothes, shoes, school bags and baby essentials for every little adventure.",
    mobileDescription: "Kidswear, school finds and baby essentials.",
    categories: ["Kidswear", "School & play", "Baby essentials"],
    image: kidsAsset("shop-display.webp"),
    imageAlt: "Children's clothing and accessories at Tickles & Giggles Kids",
    href: KIDS_INSTAGRAM,
  },
  {
    id: "bliss",
    name: "Bliss n Blush",
    shortName: "Home",
    eyebrow: "For the home",
    description:
      "Furniture, dining pieces and kitchen finds to make everyday living feel special.",
    mobileDescription: "Furniture, dining and kitchen finds.",
    categories: ["Furniture", "Dining", "Kitchen"],
    image: blissAsset("home-bar.webp"),
    imageAlt: "Home bar and glass display at Bliss n Blush",
    href: BLISS_INSTAGRAM,
  },
];

const SHOP_VIDEO_SRC =
  "https://res.cloudinary.com/dws2bgxg4/video/upload/v1793110755/Elegant_Fashion_2_dcravj.mp4";

const JewelryShopBanner = () => {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let isInView = false;
    let hasPlayedInView = false;
    let sourceAttached = false;

    const attachSource = () => {
      if (sourceAttached) return;
      sourceAttached = true;
      video.src = SHOP_VIDEO_SRC;
      video.load();
    };

    const playVideo = () => {
      if (hasPlayedInView) return;
      hasPlayedInView = true;
      video.play().catch(() => {
        hasPlayedInView = false;
        setVideoVisible(false);
      });
    };

    const onVideoReady = () => {
      if (isInView) playVideo();
    };

    const onVideoEnded = () => {
      video.pause();
      video.currentTime = 0;
      setVideoVisible(false);
    };

    const onVideoPlaying = () => setVideoVisible(true);
    const onVideoError = () => setVideoVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          attachSource();
          if (video.readyState >= 2) playVideo();
        } else {
          video.pause();
          if (video.readyState > 0) video.currentTime = 0;
          hasPlayedInView = false;
          setVideoVisible(false);
        }
      },
      { threshold: 0.35, rootMargin: "80px 0px" }
    );

    video.muted = true;
    video.loop = false;
    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("ended", onVideoEnded);
    video.addEventListener("playing", onVideoPlaying);
    video.addEventListener("error", onVideoError);
    observer.observe(video);

    return () => {
      video.pause();
      video.removeEventListener("loadeddata", onVideoReady);
      video.removeEventListener("ended", onVideoEnded);
      video.removeEventListener("playing", onVideoPlaying);
      video.removeEventListener("error", onVideoError);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const syncActive = () => {
      const cards = [...track.querySelectorAll(".shop-worlds__card")];
      if (!cards.length) return;

      const trackMid = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;

      cards.forEach((card, index) => {
        const cardMid = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardMid - trackMid);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });

      setActiveIndex((current) => (current === nearest ? current : nearest));
    };

    syncActive();
    track.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);

    return () => {
      track.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, []);

  const scrollToShop = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll(".shop-worlds__card")?.[index];
    if (!track || !card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="shops" className="shop-worlds" aria-labelledby="shop-worlds-title">
      <div className="container">
        <div className="shop-worlds__heading">
          <div>
            <span className="shop-worlds__eyebrow">Two shops, one lovely visit</span>
            <h2 id="shop-worlds-title">A little something for everyone.</h2>
          </div>
          <p>Choose a shop to explore more of its latest finds and collections.</p>
        </div>

        <div className="shop-worlds__rail" ref={trackRef} aria-label="Shop worlds">
          <div className="shop-worlds__grid">
            {shopWorlds.map((shop, index) => (
              <article className="shop-worlds__card" id={shop.id} key={shop.name}>
                <div className="shop-worlds__image">
                  <Image
                    src={shop.image}
                    alt={shop.imageAlt}
                    fill
                    priority={index === 0}
                    quality={72}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  {index === 0 && (
                    <video
                      ref={videoRef}
                      className={`shop-worlds__video${videoVisible ? " is-visible" : ""}`}
                      muted
                      playsInline
                      preload="none"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="shop-worlds__shade" aria-hidden="true" />
                <div className="shop-worlds__content">
                  <span className="shop-worlds__card-eyebrow">{shop.eyebrow}</span>
                  <h3>{shop.name}</h3>
                  <p className="shop-worlds__desc shop-worlds__desc--desktop">
                    {shop.description}
                  </p>
                  <p className="shop-worlds__desc shop-worlds__desc--mobile">
                    {shop.mobileDescription}
                  </p>
                  <ul aria-label={`${shop.name} categories`}>
                    {shop.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                  <a href={shop.href} target="_blank" rel="noreferrer">
                    Explore this shop <ArrowRightLong />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="shop-worlds__pager" role="tablist" aria-label="Choose a shop">
          {shopWorlds.map((shop, index) => (
            <button
              key={shop.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={shop.id}
              className={`shop-worlds__dot${activeIndex === index ? " is-active" : ""}`}
              onClick={() => scrollToShop(index)}
            >
              <span className="shop-worlds__dot-label">{shop.shortName}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JewelryShopBanner;
