import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ButtonMain from "../shared/ButtonMain";
import JoinOur from "./JoinOur";

const MARQUEE_ITEMS = ["Page not found", "•", "Page not found", "•", "Page not found", "•", "Page not found", "•"];

const MarqueeRow = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / 60;

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: item === "•" ? "1.5rem" : "clamp(2rem, 3.5vw, 3.5rem)",
              fontWeight: 500,
              color: "#ffffff",
              padding: item === "•" ? "0 1.5rem" : "0 2.5rem",
              fontFamily: "var(--font-family)",
              letterSpacing: "0.02em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const NotFound = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <>
      {/* 404 Section */}
      <section
        style={{
          paddingTop: "clamp(80px, 12vw, 180px)",
          paddingBottom: "clamp(40px, 6vw, 80px)",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Big 404 Title */}
        <div
          ref={titleRef}
          style={{
            fontSize: "clamp(120px, 22vw, 330px)",
            fontWeight: 500,
            lineHeight: 1,
            color: "#2a2a2a",
            fontFamily: "var(--font-family)",
            userSelect: "none",
          }}
        >
          404
        </div>

        {/* Marquee Rows */}
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <MarqueeRow />
        </div>

        {/* Description + Button */}
        <div
          ref={contentRef}
          style={{
            maxWidth: "496px",
            margin: "3rem auto 0",
            padding: "0 1.5rem",
          }}
        >
          <p
            style={{
              color: "#c0c0c0",
              fontSize: "clamp(12px, 2vw, 18px)",
              fontFamily: "var(--font-family)",
              fontWeight: 500,
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/">
              <ButtonMain>Go back home</ButtonMain>
            </Link>
          </div>
        </div>
      </section>

      {/* JoinOur Section (same as homepage) */}
      <JoinOur />
    </>
  );
};

export default NotFound;
