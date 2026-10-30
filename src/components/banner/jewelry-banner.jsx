import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import { ArrowNextTwo, ArrowPrevTwo, ArrowRightLong } from "@/svg";
import { heroSlides } from "@/data/client-catalog";

const HERO_VIDEO_SRC =
  "https://res.cloudinary.com/dws2bgxg4/video/upload/v1793106657/Elegant_Fashion_mabido.mp4";

const JewelryBanner = () => {
  const [slider1, setSlider1] = useState(null);
  const [mediaPhase, setMediaPhase] = useState("calm");
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  const main_slider_setting = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    centerMode: false,
  };

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!media || !video) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setMediaPhase("calm");
      return undefined;
    }

    let mediaInView = false;
    let sourceRequested = false;

    const playVideo = () => {
      video.play().catch(() => setMediaPhase("calm"));
    };

    const onVideoReady = () => {
      if (video.readyState < 2) return;
      setMediaPhase("video");
      if (mediaInView) playVideo();
    };

    const onVideoError = () => {
      setMediaPhase("calm");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        mediaInView = entry.isIntersecting;
        if (mediaInView) {
          if (!sourceRequested) {
            sourceRequested = true;
            video.load();
          } else if (video.readyState >= 2) {
            playVideo();
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    video.muted = true;
    video.loop = false;
    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("error", onVideoError);
    observer.observe(media);

    return () => {
      video.pause();
      video.removeEventListener("loadeddata", onVideoReady);
      video.removeEventListener("error", onVideoError);
      observer.disconnect();
    };
  }, []);

  const showingCalm = mediaPhase === "calm";

  return (
    <section className="tp-slider-area client-home-hero p-relative z-index-1">
      <div className="client-home-hero__shell">
        <div className="container client-home-hero__container">
          <div className="client-home-hero__split">
            <div className="client-home-hero__copy">
              <Slider
                {...main_slider_setting}
                ref={(slider) => setSlider1(slider)}
                className="tp-slider-active-4 client-home-hero__slider"
              >
                {heroSlides.map((item) => (
                  <div key={item.title}>
                    <span className="client-home-hero__eyebrow">{item.subtitle}</span>
                    <h1>
                      {item.titleLead}
                      <span>{item.titleAccent}</span>
                    </h1>
                    <Link href={item.href} className="client-home-hero__cta">
                      Discover Now <ArrowRightLong />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="client-home-hero__arrows">
              <button
                type="button"
                className="client-home-hero__copy-arrow"
                onClick={() => slider1?.slickPrev()}
                aria-label="Previous headline"
              >
                <ArrowPrevTwo />
              </button>
              <button
                type="button"
                className="client-home-hero__copy-arrow"
                onClick={() => slider1?.slickNext()}
                aria-label="Next headline"
              >
                <ArrowNextTwo />
              </button>
            </div>

            <div className="client-home-hero__primary">
              <div className="client-home-hero__image">
                <div className="client-home-hero__media is-calm">
                  <div className="client-home-hero__calm">
                    <Image
                      src="/assets/img/optimized/hero/im1.webp"
                      alt="Children in occasion wear at Tickles & Giggles"
                      fill
                      priority
                      quality={78}
                      sizes="(min-width: 1440px) 760px, (min-width: 768px) 56vw, 60vw"
                      className="client-home-hero__calm-photo"
                    />
                    <div className="client-home-hero__calm-veil" aria-hidden="true" />
                    <div className="client-home-hero__calm-copy">
                      <span>Tickles &amp; Giggles Kids</span>
                      <p>Occasion wear, quietly made memorable.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="client-home-hero__chapters">
                <p className="client-home-hero__chapters-label">Keep exploring</p>
                <div className="client-home-hero__explore">
                  <div className="client-home-hero__explore-video">
                    <div
                      ref={mediaRef}
                      className={`client-home-hero__media${showingCalm ? " is-calm" : " is-video"}`}
                    >
                      <video
                        ref={videoRef}
                        className="client-home-hero__video"
                        src={HERO_VIDEO_SRC}
                        muted
                        playsInline
                        preload="none"
                        aria-hidden="true"
                      />
                      <div className="client-home-hero__calm" aria-hidden="true">
                        <div className="client-home-hero__calm-veil" />
                      </div>
                    </div>
                  </div>
                  <div className="client-home-hero__explore-copy">
                    <span className="client-home-hero__explore-eyebrow">
                      Style for little moments
                    </span>
                    <h2>Made to be remembered.</h2>
                    <p>
                      Explore occasionwear and everyday favourites, thoughtfully
                      brought together for growing little personalities.
                    </p>
                    <Link href="/#shops" className="client-home-hero__explore-link">
                      Explore the collection <ArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="client-home-hero__rail">
              <aside className="client-home-hero__aside">
                <span className="client-home-hero__aside-label">Your Nairobi shopping guide</span>
                <h2>Two shops.<br />One lovely visit.</h2>
                <p>
                  Discover kidswear, shoes and school bags, alongside furniture,
                  home accents and kitchen finds.
                </p>
                <div className="client-home-hero__shop-tags">
                  <span>Tickles &amp; Giggles Kids</span>
                  <span>Bliss n Blush</span>
                </div>
                <Link href="/#shops" className="client-home-hero__aside-link">
                  Explore both shops <ArrowRightLong />
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelryBanner;
