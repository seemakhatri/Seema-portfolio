import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import painting1 from "../assets/paintings/Painting-1.jpeg";
import painting2 from "../assets/paintings/Painting-2.jpeg";
import painting3 from "../assets/paintings/Painting-3.jpeg";
import painting4 from "../assets/paintings/Painting-4.jpeg";
import painting5 from "../assets/paintings/Painting-5.jpeg";

// Replace with your real imports when ready:
// import painting1 from '../assets/paintings/painting1.jpg'

const paintings = [
  { img: painting1, label: "Ocean Dreams", medium: "Acrylic on Canvas" },
  { img: painting2, label: "Golden Hour", medium: "Watercolour" },
  { img: painting3, label: "Dusk Shores", medium: "Oil on Canvas" },
  { img: painting4, label: "Sand & Sea", medium: "Mixed Media" },
  { img: painting5, label: "Midnight Deep", medium: "Digital" },
];

export default function ArtGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [selected, setSelected] = useState(null); // index of open painting

  // Keyboard navigation
  useEffect(() => {
    if (selected === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight")
        setSelected((i) => (i + 1) % paintings.length);
      if (e.key === "ArrowLeft")
        setSelected((i) => (i - 1 + paintings.length) % paintings.length);
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="art"
      ref={ref}
      style={{ background: "#f7f3ee", padding: "6rem 2rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem,3.5vw,3rem)",
            color: "#0d3b5e",
            fontWeight: 300,
            textAlign: "center",
            marginBottom: "0.3rem",
          }}
        >
          My Paintings
        </h2>
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            color: "#4fa3c0",
            textAlign: "center",
            fontSize: "1.1rem",
            marginBottom: "3rem",
          }}
        >
          dreams of countries, sharing more stuff ✦
        </p>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "1rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {paintings.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.97 }}
              onClick={() => setSelected(i)}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "zoom-in",
                background: p.bg,
                position: "relative",
                gridRow: i === 0 ? "span 2" : "auto",
                minHeight: i === 0 ? "300px" : "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <img
                src={p.img}
                alt={p.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                  color: "white",
                  padding: "1.5rem 0.8rem 0.8rem",
                  fontFamily: "'Caveat', cursive",
                  fontSize: "0.95rem",
                }}
              >
                {p.label}
              </div>

              {/* Zoom hint */}
              <div
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "0.6rem",
                  background: "rgba(0,0,0,0.35)",
                  color: "white",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                }}
              >
                ⤢
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(6, 15, 30, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Left chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(
                  (i) => (i - 1 + paintings.length) % paintings.length,
                );
              }}
              style={{
                position: "absolute",
                left: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(79,163,192,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.2rem",
              }}
            >
              <div
                style={{
                  width: "min(80vw, 520px)",
                  height: "min(70vh, 480px)",
                  background: paintings[selected].bg,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "6rem",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={paintings[selected].img}
                  alt={paintings[selected].label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
                {/* When you have real images:
                <img src={paintings[selected].img}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                */}
              </div>

              {/* Caption */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    color: "white",
                    fontWeight: 300,
                  }}
                >
                  {paintings[selected].label}
                </p>
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "#a8d8ea",
                    fontSize: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {paintings[selected].medium}
                </p>
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {paintings.map((_, i) => (
                  <div
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(i);
                    }}
                    style={{
                      width: selected === i ? "20px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background:
                        selected === i ? "#4fa3c0" : "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected((i) => (i + 1) % paintings.length);
              }}
              style={{
                position: "absolute",
                right: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(79,163,192,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
            >
              ›
            </button>

            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {/* Keyboard hint */}
            <p
              style={{
                position: "absolute",
                bottom: "1.5rem",
                fontFamily: "'Caveat', cursive",
                color: "rgba(168,216,234,0.4)",
                fontSize: "0.85rem",
              }}
            >
              ← → arrow keys to navigate · esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
