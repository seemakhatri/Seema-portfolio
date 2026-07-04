import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const RESUME_URL =
  "https://drive.google.com/file/d/1kmqLlnbMENkNr0Iw_mAXdB7BVKUkgInW/view?usp=drive_link";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      "Angular v16–v20",
      "Angular Signals",
      "React",
      "Next.js App Router",
      "TypeScript",
      "RxJS",
    ],
  },
  {
    category: "State & Data",
    skills: ["NgRx", "Redux Toolkit", "TanStack Query", "Recharts", "D3.js"],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express",
      "WebSockets",
      "REST",
      "Razorpay",
      "Google Maps API",
    ],
  },
  {
    category: "DB & DevOps",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "Docker", "CI/CD", "Git"],
  },
  {
    category: "Data Science",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Jupyter",
    ],
  },
  {
    category: "UI & Design",
    skills: ["Tailwind CSS", "shadcn/ui", "Figma-to-Code", "HTML5", "CSS3"],
  },
  {
    category: "AI & LLMs",
    skills: [
      "OpenRouter",
      "DeepSeek",
      "GPT-4 Vision",
      "Prompt Engineering",
      "AI Integration",
    ],
  },
];

const timeline = [
  {
    period: "Oct 2024 – Feb 2026",
    role: "Full Stack Developer",
    company: "Arka Information Systems / Docty Inc.",
    note:
      "Telehealth platform · 10,000+ users · Angular v20 · NgRx · WebSockets",
  },
  {
    period: "Jan 2023 – Jun 2024",
    role: "Full-Stack Developer",
    company: "MainStream Soft",
    note: "Angular · React · TypeScript · Node.js · REST APIs",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #060f1e 0%, #0a1628 100%)",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-160px",
            width: "520px",
            height: "520px",
            background:
              "radial-gradient(circle, rgba(79,163,192,0.04) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-100px",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, rgba(79,163,192,0.03) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(79,163,192,0.02) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Subtle rings */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-160px",
            width: "520px",
            height: "520px",
            border: "1px solid rgba(79,163,192,0.05)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-100px",
            width: "320px",
            height: "320px",
            border: "1px solid rgba(79,163,192,0.03)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "5rem" }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              color: "#4fa3c0",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "block",
              marginBottom: "1rem",
            }}
          >
            About
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            The person behind<br />the code<span style={{ color: "#4fa3c0" }}>
              .
            </span>
          </h2>
        </motion.div>

        {/* Two-column */}
        <div
          className="about-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "5.5rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — Story + Timeline + Resume */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ——— FOCUSED BIO ——— */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(168,216,234,0.75)",
                lineHeight: 1.88,
                marginBottom: "1.3rem",
              }}
            >
              I build production applications where{" "}
              <strong style={{ color: "white", fontWeight: 600 }}>
                AI isn't a gimmick
              </strong>{" "}
              — it's the core feature.{" "}
              <strong style={{ color: "white", fontWeight: 600 }}>
                3+ years
              </strong>{" "}
              shipping full-stack products in healthcare and fintech, serving{" "}
              <strong style={{ color: "white", fontWeight: 600 }}>
                10,000+ real users
              </strong>
              .
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.97rem",
                color: "rgba(168,216,234,0.55)",
                lineHeight: 1.88,
                marginBottom: "1.3rem",
              }}
            >
              My sweet spot:{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>
                Angular for complex UIs
              </strong>{" "}
              with NgRx state management,{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>
                WebSockets for real-time data
              </strong>
              , and{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>
                AI integration that actually adds value
              </strong>
              . I've built telehealth platforms, live stock dashboards, and
              AI-powered products like Nozomi AI and Thumbnail Roast — all
              shipped to production with real users depending on them.
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.97rem",
                color: "rgba(168,216,234,0.55)",
                lineHeight: 1.88,
                marginBottom: "2.8rem",
              }}
            >
              I work across the stack:{" "}
              <strong style={{ color: "white", fontWeight: 500 }}>
                Angular, React, Node.js, Python
              </strong>
              . But my real skill is translating complex problems into software
              that actually ships and gets used. No AI fluff. Just working code
              that solves problems for real people.
            </p>

            {/* ——— FOCUS BOX ——— */}
            <div
              style={{
                background: "rgba(79,163,192,0.04)",
                border: "1px solid rgba(79,163,192,0.08)",
                borderRadius: "12px",
                padding: "1.2rem 1.5rem",
                marginBottom: "2.8rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "#4fa3c0",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "0.6rem",
                }}
              >
                Currently focused on
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(168,216,234,0.8)",
                    background: "rgba(79,163,192,0.06)",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(79,163,192,0.08)",
                  }}
                >
                  AI Product Development
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(168,216,234,0.8)",
                    background: "rgba(79,163,192,0.06)",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(79,163,192,0.08)",
                  }}
                >
                  Real-time Systems
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(168,216,234,0.8)",
                    background: "rgba(79,163,192,0.06)",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(79,163,192,0.08)",
                  }}
                >
                  Full Stack Angular + React
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(168,216,234,0.8)",
                    background: "rgba(79,163,192,0.06)",
                    padding: "0.25rem 0.85rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(79,163,192,0.08)",
                  }}
                >
                  Data Science with Python
                </span>
              </div>
            </div>

            {/* Experience timeline */}
            <div style={{ marginBottom: "2.8rem" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "#4fa3c0",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "1.6rem",
                }}
              >
                Experience
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
              >
                {timeline.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "flex",
                      gap: "1.2rem",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Dot + line */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "5px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: i === 0 ? "#4fa3c0" : "transparent",
                          border: `2px solid ${
                            i === 0 ? "#4fa3c0" : "rgba(79,163,192,0.3)"
                          }`,
                          flexShrink: 0,
                          boxShadow: i === 0
                            ? "0 0 0 3px rgba(79,163,192,0.15)"
                            : "none",
                        }}
                      />
                      {i < timeline.length - 1 && (
                        <div
                          style={{
                            width: "1px",
                            height: "52px",
                            background: "rgba(79,163,192,0.1)",
                            marginTop: "3px",
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        paddingBottom: i < timeline.length - 1 ? "0" : "0",
                        marginBottom: i < timeline.length - 1 ? "0" : "0",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.65rem",
                          color: "rgba(168,216,234,0.4)",
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          marginBottom: "0.2rem",
                          fontWeight: 500,
                        }}
                      >
                        {t.period}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "0.97rem",
                          fontWeight: 700,
                          color: "white",
                          marginBottom: "0.12rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {t.role}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: "#4fa3c0",
                          fontWeight: 500,
                          marginBottom: "0.12rem",
                        }}
                      >
                        {t.company}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: "rgba(168,216,234,0.35)",
                          marginBottom: i < timeline.length - 1 ? "0" : "0",
                        }}
                      >
                        {t.note}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume CTA */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #4fa3c0, #2a8fb5)",
                color: "white",
                padding: "0.78rem 1.9rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                boxShadow: "0 4px 20px rgba(79,163,192,0.2)",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(79,163,192,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(79,163,192,0.2)";
              }}
            >
              View Resume →
            </a>
          </motion.div>

          {/* RIGHT — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                color: "#4fa3c0",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1.8rem",
              }}
            >
              Skills & Tools
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: 0.28 + gi * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      color: "rgba(168,216,234,0.6)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "0.7rem",
                    }}
                  >
                    {group.category}
                    {group.category === "Data Science" && (
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          fontSize: "0.6rem",
                          color: "#4fa3c0",
                          background: "rgba(79,163,192,0.1)",
                          border: "1px solid rgba(79,163,192,0.2)",
                          borderRadius: "4px",
                          padding: "0.1rem 0.45rem",
                          letterSpacing: "0.08em",
                          verticalAlign: "middle",
                        }}
                      >
                        Learning
                      </span>
                    )}
                    {group.category === "AI & LLMs" && (
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          fontSize: "0.6rem",
                          color: "#4fa3c0",
                          background: "rgba(79,163,192,0.1)",
                          border: "1px solid rgba(79,163,192,0.2)",
                          borderRadius: "4px",
                          padding: "0.1rem 0.45rem",
                          letterSpacing: "0.08em",
                          verticalAlign: "middle",
                        }}
                      >
                        Building
                      </span>
                    )}
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.76rem",
                          color: "rgba(168,216,234,0.7)",
                          background: "rgba(79,163,192,0.05)",
                          border: "1px solid rgba(79,163,192,0.08)",
                          borderRadius: "6px",
                          padding: "0.3rem 0.78rem",
                          fontWeight: 400,
                          transition: "all 0.2s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(79,163,192,0.12)";
                          e.currentTarget.style.borderColor =
                            "rgba(79,163,192,0.2)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(79,163,192,0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(79,163,192,0.08)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {gi < skillGroups.length - 1 && (
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(79,163,192,0.05)",
                        marginTop: "1.6rem",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>
        {`
        @media (max-width: 760px) {
          .about-cols { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }
      `}
      </style>
    </section>
  );
}