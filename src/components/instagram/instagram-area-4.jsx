import React, { useEffect, useRef, useState } from "react";
import { ArrowRightLong } from "@/svg";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM } from "@/data/client-catalog";

const SHOP_REEL_SRC =
  "https://res.cloudinary.com/dws2bgxg4/video/upload/q_auto,f_mp4/v1793139080/download_tkkr8f.mp4";
const SHOP_REEL_POSTER =
  "https://res.cloudinary.com/dws2bgxg4/video/upload/so_0,w_1600,q_auto,f_jpg/v1793139080/download_tkkr8f.jpg";

const shopHandles = [
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

const InstagramAreaFour = () => {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    if (!media || !video) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      return undefined;
    }

    let isInView = false;
    let hasPlayedInView = false;
    let sourceRequested = false;

    const playVideo = () => {
      if (hasPlayedInView) return;

      hasPlayedInView = true;
      video.play().catch(() => {
        hasPlayedInView = false;
        setIsPlaying(false);
      });
    };

    const onVideoReady = () => {
      if (video.readyState < 2) return;
      if (isInView) playVideo();
    };

    const onVideoEnded = () => {
      video.pause();
      setIsPlaying(false);
    };

    const onVideoPlaying = () => setIsPlaying(true);
    const onVideoError = () => setIsPlaying(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          if (!sourceRequested) {
            sourceRequested = true;
            video.src = SHOP_REEL_SRC;
            video.load();
          } else if (video.readyState >= 2) {
            playVideo();
          }
        } else {
          video.pause();
          if (video.readyState > 0) video.currentTime = 0;
          hasPlayedInView = false;
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;
    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("ended", onVideoEnded);
    video.addEventListener("playing", onVideoPlaying);
    video.addEventListener("error", onVideoError);
    observer.observe(media);

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
    <section className="home-instagram" aria-labelledby="home-instagram-title">
      <div className="container">
        <div className="home-instagram__intro">
          <div className="home-instagram__heading">
            <span className="home-instagram__eyebrow">Follow along</span>
            <h2 id="home-instagram-title">New arrivals land here first.</h2>
            <p>
              Peek into both shops between visits — fresh pieces, floor finds,
              and what just arrived.
            </p>
          </div>

          <div className="home-instagram__handles">
            {shopHandles.map((shop) => (
              <a
                key={shop.href}
                href={shop.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow ${shop.name} on Instagram`}
              >
                <span>{shop.handle}</span>
                <ArrowRightLong />
              </a>
            ))}
          </div>
        </div>

        <div ref={mediaRef} className="home-instagram__media">
          <video
            ref={videoRef}
            className={`home-instagram__video${isPlaying ? " is-playing" : ""}`}
            poster={SHOP_REEL_POSTER}
            muted
            playsInline
            preload="none"
            aria-label="New arrivals from Tickles & Giggles Kids and Bliss n Blush"
          />
        </div>
      </div>
    </section>
  );
};

export default InstagramAreaFour;
