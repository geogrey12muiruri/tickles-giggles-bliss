import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightLong } from "@/svg";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM } from "@/data/client-catalog";

const shopWorlds = [
  {
    id: "kids",
    name: "Tickles & Giggles Kids",
    eyebrow: "For little ones",
    description: "Clothes, shoes, school bags and baby essentials for every little adventure.",
    categories: ["Kidswear", "School & play", "Baby essentials"],
    image: "/assets/img/client/kids/shop-display.jpg",
    imageAlt: "Children's clothing and accessories at Tickles & Giggles Kids",
    href: KIDS_INSTAGRAM,
  },
  {
    id: "bliss",
    name: "Bliss n Blush",
    eyebrow: "For the home",
    description: "Furniture, dining pieces and kitchen finds to make everyday living feel special.",
    categories: ["Furniture", "Dining", "Kitchen"],
    image: "/assets/img/client/bliss/home-bar.jpg",
    imageAlt: "Home bar and glass display at Bliss n Blush",
    href: BLISS_INSTAGRAM,
  },
];

const SHOP_VIDEO_SRC =
  "https://res.cloudinary.com/dws2bgxg4/video/upload/v1793110755/Elegant_Fashion_2_dcravj.mp4";

const JewelryShopBanner = () => {
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let isInView = false;
    let hasPlayedInView = false;

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
          if (video.readyState >= 2) {
            playVideo();
          } else {
            video.load();
          }
        } else {
          video.pause();
          if (video.readyState > 0) video.currentTime = 0;
          hasPlayedInView = false;
          setVideoVisible(false);
        }
      },
      { threshold: 0.35 }
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

        <div className="shop-worlds__grid">
          {shopWorlds.map((shop, index) => (
            <article className="shop-worlds__card" id={shop.id} key={shop.name}>
              <div className="shop-worlds__image">
                <Image
                  src={shop.image}
                  alt={shop.imageAlt}
                  fill
                  sizes="(min-width: 992px) 50vw, 100vw"
                />
                {index === 0 && (
                  <video
                    ref={videoRef}
                  className={`shop-worlds__video${videoVisible ? " is-visible" : ""}`}
                    src={SHOP_VIDEO_SRC}
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
                <p>{shop.description}</p>
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
    </section>
  );
};

export default JewelryShopBanner;
