import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, #a8d8ea 0%, #4fa3c0 50%, #1a6b8a 100%)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
          color: "white",
        }}
      >
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "1.1rem",
            opacity: 0.8,
            marginBottom: "1rem",
          }}
        >
          🖌️ about me →
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.3,
            marginBottom: "1.5rem",
          }}
        >
          I paint ideas into
          <br />
          living, breathing code
        </h2>
        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.9,
            maxWidth: "550px",
            margin: "0 auto",
          }}
        >
          I’m a Full Stack Developer with 3+ years of experience building
          real-world applications in healthcare and fintech. I specialize in
          Angular, TypeScript, and real-time systems using WebSockets and RxJS.
          I’ve worked on production platforms serving thousands of users — from
          telehealth systems to stock market dashboards — focusing on
          performance, scalability, and clean architecture. Beyond code, I
          approach development with a creative mindset. I enjoy designing
          experiences that not only work well but also feel intuitive and
          thoughtful.
        </p>
      </motion.div>
    </section>
  );
}
