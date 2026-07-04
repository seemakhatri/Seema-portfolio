import { motion } from "framer-motion";
import profilePhoto from "../assets/seema.jpg";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let mouseX = null;
    let mouseY = null;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
        
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            this.x -= dx * 0.005;
            this.y -= dy * 0.005;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 163, 192, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 163, 192, ${0.06 * (1 - dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "#060f1e",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(79,163,192,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "2rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Hi — Clean and confident */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#4fa3c0",
                letterSpacing: "0.15em",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              Hi
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(4rem, 7vw, 7rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Seema
              <br />
              <span
                style={{
                  color: "#4fa3c0",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Khatri
                <span
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "rgba(79,163,192,0.2)",
                    borderRadius: "2px",
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(168,216,234,0.4)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                marginTop: "1.2rem",
              }}
            >
              Full Stack Developer · AI · Real-time Systems
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(168,216,234,0.6)",
              lineHeight: 1.9,
              maxWidth: "480px",
              marginTop: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            I build production apps where{" "}
            <span style={{ color: "white", fontWeight: 500 }}>
              AI is the main feature
            </span>
            . 3+ years shipping to{" "}
            <span style={{ color: "white", fontWeight: 500 }}>
              10,000+ users
            </span>
            . Angular, React, Node.js, Python.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "2.8rem",
            }}
          >
            {["Angular", "React", "TypeScript", "Node.js", "Python", "AI/LLMs"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(168,216,234,0.8)",
                    background: "rgba(79,163,192,0.06)",
                    border: "1px solid rgba(79,163,192,0.1)",
                    borderRadius: "6px",
                    padding: "0.35rem 1rem",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "linear-gradient(135deg, #4fa3c0, #2a8fb5)",
                color: "white",
                padding: "0.9rem 2.4rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                fontWeight: 500,
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                border: "none",
                boxShadow: "0 4px 30px rgba(79,163,192,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(79,163,192,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(79,163,192,0.25)";
              }}
            >
              <span>→</span>
              See My Work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(255,255,255,0.04)",
                color: "white",
                padding: "0.9rem 2.4rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>✉</span>
              Let's Talk
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, auto)",
              gap: "2.5rem",
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {[
              { n: "3+", l: "Years Experience" },
              { n: "10k+", l: "Users Served" },
              { n: "5", l: "Apps Shipped" },
              { n: "99.5%", l: "Payment Success" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    color: "rgba(168,216,234,0.3)",
                    marginTop: "0.3rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              border: "1px solid rgba(79,163,192,0.06)",
              animation: "spin 30s linear infinite",
            }}
          />

          {/* Middle ring */}
          <div
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              border: "1px solid rgba(79,163,192,0.04)",
              animation: "spin 20s linear infinite reverse",
            }}
          />

          {/* Glow behind photo */}
          <div
            style={{
              position: "absolute",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(79,163,192,0.08), transparent 70%)",
            }}
          />

          {/* Photo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: "340px",
              height: "440px",
              borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4), inset 0 0 60px rgba(79,163,192,0.03)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(2px)",
            }}
          >
            <img
              src={profilePhoto}
              alt="Seema Khatri"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(6,15,30,0.3) 100%)",
              }}
            />
          </motion.div>

          {/* Floating badge 1 - AI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            whileHover={{ y: -4 }}
            style={{
              position: "absolute",
              top: "8%",
              left: "-8%",
              zIndex: 10,
              background: "rgba(6,15,30,0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(79,163,192,0.12)",
              borderRadius: "12px",
              padding: "0.7rem 1.2rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              color: "white",
            }}
          >
            <div style={{ fontSize: "0.6rem", color: "#4fa3c0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              AI Focused
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 500, marginTop: "2px" }}>
              GPT-4 · DeepSeek
            </div>
          </motion.div>

          {/* Floating badge 2 - Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            whileHover={{ y: -4 }}
            style={{
              position: "absolute",
              bottom: "8%",
              right: "-8%",
              zIndex: 10,
              background: "rgba(6,15,30,0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(79,163,192,0.12)",
              borderRadius: "12px",
              padding: "0.7rem 1.2rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              fontFamily: "'DM Sans', sans-serif",
              color: "white",
              textAlign: "right",
            }}
          >
            <div style={{ fontSize: "0.6rem", color: "#4fa3c0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Full Stack
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 500, marginTop: "2px" }}>
              Angular · React
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 820px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            gap: 2.5rem !important; 
            padding: 1.5rem !important; 
          }
          .hero-stats { 
            grid-template-columns: repeat(2, auto) !important; 
            gap: 1.5rem !important; 
          }
          .hero-photo { 
            width: 260px !important; 
            height: 340px !important; 
          }
          .hero-rings { 
            width: 300px !important; 
            height: 300px !important; 
          }
        }
      `}
      </style>
    </section>
  );
}