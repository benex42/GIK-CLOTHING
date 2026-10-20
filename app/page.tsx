"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const categories = [{ name: "Tailored Suits", image: "/gik-blue-suit.jpeg" }, { name: "Tuxedo Edit", image: "/gik-ivory-tuxedo.png" }, { name: "Bridal Party", image: "/gik-black-suit.jpeg" }, { name: "The Ceremony Edit", image: "/gik-burgundy-three-piece.png" }];
const looks = [{ title: "The Forest Double-Breasted", detail: "Signature / 01", image: "/journal-forest-double-breasted.png" }, { title: "The Rosewood Three-Piece", detail: "Occasion / 02", image: "/journal-rose-three-piece.png" }, { title: "The Midnight Tuxedo", detail: "Black Tie / 03", image: "/journal-midnight-tuxedo.png" }, { title: "The Olive Double-Breasted", detail: "Tailoring / 04", image: "/journal-olive-double-breasted.png" }, { title: "The Sky Blue Three-Piece", detail: "Celebration / 05", image: "/journal-sky-blue-three-piece.png" }];
const phrases = ["THE MOMENT.", "THE ROOM.", "YOUR STORY.", "THE MEMORY."];
const reveal = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false), [isScrolled, setIsScrolled] = useState(false), [onLight, setOnLight] = useState(false), [phrase, setPhrase] = useState(0), [activeLook, setActiveLook] = useState(0), [hovered, setHovered] = useState(false), [interacting, setInteracting] = useState(false);
  const dragStart = useRef<number | null>(null), wasDragged = useRef(false), pressedCard = useRef<number | null>(null), resumeTimer = useRef<number | undefined>(undefined);
  useEffect(() => { const updateNav = () => { setIsScrolled(window.scrollY > 80); setOnLight(Array.from(document.querySelectorAll<HTMLElement>(".intro, .looks")).some((section) => { const { top, bottom } = section.getBoundingClientRect(); return top <= 42 && bottom >= 42; })); }; updateNav(); window.addEventListener("scroll", updateNav, { passive: true }); return () => window.removeEventListener("scroll", updateNav); }, []);
  useEffect(() => { const timer = window.setInterval(() => setPhrase((current) => (current + 1) % phrases.length), 2600); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (hovered || interacting) return; const timer = window.setInterval(() => setActiveLook((current) => (current + 1) % looks.length), 2000); return () => window.clearInterval(timer); }, [hovered, interacting]);
  useEffect(() => () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current); }, []);
  const pause = () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current); setInteracting(true); };
  const resume = () => { if (resumeTimer.current) window.clearTimeout(resumeTimer.current); resumeTimer.current = window.setTimeout(() => setInteracting(false), 2200); };
  const changeLook = (direction: number) => setActiveLook((current) => (current + direction + looks.length) % looks.length);
  const position = (index: number) => { const distance = (index - activeLook + looks.length) % looks.length; return distance === 0 ? "active" : distance === 1 ? "next" : distance === looks.length - 1 ? "previous" : distance === 2 ? "far-next" : "far-previous"; };

  return <main className="gik-home">
    <header className={`nav ${isScrolled ? "scrolled" : ""} ${onLight ? "on-light" : ""}`}><a className="brand" href="#top"><img src="/gik-clothings-logo.jpg" alt="" /><span>GIK CLOTHINGS</span></a><nav className={menuOpen ? "open" : ""}><a href="#collection">Collection</a><a href="#story">Our story</a><a href="#journal">Journal</a></nav><a className="nav-cta" href="/store">Open store</a><button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span /><span /></button></header>
    <section className="hero" id="top">
      <video
        className="hero-photo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/header-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-shade" />
      <motion.div className="hero-content" initial="hidden" animate="visible" transition={{ staggerChildren: .13 }}><motion.p variants={reveal} className="eyebrow"><span /> Est. 2014 · Accra, Ghana</motion.p><motion.h1 variants={reveal}>DRESS FOR<br /><span className="hero-cycle"><AnimatePresence mode="wait" initial={false}><motion.em key={phrases[phrase]} initial={{ y: "105%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-105%", opacity: 0 }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>{phrases[phrase]}</motion.em></AnimatePresence></span></motion.h1><motion.p variants={reveal} className="hero-copy">Modern tailoring for the occasions that shape a life. Considered cuts, assured presence.</motion.p><motion.div variants={reveal} className="hero-actions"><a className="button button-red" href="/store">Explore collection</a><a className="text-link" href="#appointment">Visit the atelier</a></motion.div></motion.div><div className="hero-note"><span>01</span><i /><span>04</span></div><div className="scroll-cue"><span>Scroll to discover</span><i /></div></section>
    <section className="intro" id="story"><p className="section-number">01 / THE GIK STANDARD</p><div className="intro-grid"><h2>Made to be<br />remembered.</h2><div className="intro-body"><p>GIK is an expression of quiet confidence. Our pieces marry time-honoured craft with a distinctly modern point of view.</p><a className="text-link dark" href="#appointment">Discover our approach <span>→</span></a></div></div><div className="values">{[["01", "Purposeful tailoring", "An exacting fit that moves naturally with you."], ["02", "Considered fabric", "Exceptional cloth selected for every season and setting."], ["03", "Personal service", "From first conversation to final finishing touch."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="collection" id="collection">
      <motion.div
        className="collection-head"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <div style={{ overflow: 'hidden' }}>
          <motion.div variants={{ hidden: { y: '100%' }, visible: { y: 0 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow"><span /> The GIK Edit</p>
            <h2 style={{ margin: '23px 0 0' }}>Style, with<br /><em style={{ display: 'inline-block' }}>intention.</em></h2>
          </motion.div>
        </div>
        <motion.a
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-link"
          href="/store"
        >
          View all pieces
        </motion.a>
      </motion.div>
      <div className="category-grid">{categories.map((category, index) => <a className="category" href="/store" key={category.name}><img src={category.image} alt={category.name} /><div><span>0{index + 1}</span><h3>{category.name}</h3><b>↗</b></div></a>)}</div></section>
    <section className="campaign">
      <div className="campaign-image" />
      <motion.div
        className="campaign-copy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.p
          variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          <span /> The Ceremony Edit
        </motion.p>

        <div style={{ overflow: 'hidden', margin: '23px 0' }}>
          <motion.h2
            variants={{ hidden: { y: '100%' }, visible: { y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: 0 }}
          >
            Arrive like<br />you mean it.
          </motion.h2>
        </div>

        <motion.p
          variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          For the milestone. For the room. For the photographs that will outlast the evening.
        </motion.p>

        <motion.div
          variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="button button-light" href="/store">Explore occasion wear</a>
        </motion.div>
      </motion.div>
    </section>
    <section className="looks" id="journal"><div className="looks-head"><div><p className="section-number">03 / RECENT WORK</p><h2>The GIK journal</h2></div><a className="text-link dark" href="/store">See the journal <span>→</span></a></div><div className="journal-carousel"><div className="journal-stage" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPointerDownCapture={() => { pressedCard.current = null; }} onPointerDown={(event) => { wasDragged.current = false; dragStart.current = event.clientX; pause(); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { const start = dragStart.current, pressed = pressedCard.current; dragStart.current = null; pressedCard.current = null; if (start !== null) { const distance = event.clientX - start; if (Math.abs(distance) > 42) { wasDragged.current = true; changeLook(distance < 0 ? 1 : -1); } else if (pressed !== null) setActiveLook(pressed); } resume(); }} onPointerCancel={resume}>{looks.map((look, index) => <button className={`journal-card ${position(index)}`} key={look.title} onPointerDown={() => { pressedCard.current = index; }} onClick={() => { if (wasDragged.current) { wasDragged.current = false; return; } pause(); setActiveLook(index); resume(); }}><img src={look.image} alt={look.title} /><span className="journal-card-shade" /><span className="journal-card-index">0{index + 1}</span></button>)}</div><div className="journal-carousel-footer"><div className="journal-current"><p>{looks[activeLook].detail}</p><h3>{looks[activeLook].title}</h3></div><div className="journal-dots">{looks.map((look, index) => <button key={look.title} className={index === activeLook ? "active" : ""} onClick={() => setActiveLook(index)} aria-label={`Show ${look.title}`} />)}</div></div></div></section>
    <section className="appointment" id="appointment"><p className="eyebrow"><span /> GIK Clothings</p><h2>Make it<br /><em>personal.</em></h2><p>Begin your fitting journey at our Accra atelier.</p><a className="button button-red" href="mailto:hello@gikclothings.com">Book a fitting</a></section>
    <footer className="site-footer"><div className="footer-cta"><p className="eyebrow"><span /> GIK Clothings / Accra</p><div className="footer-cta-row"><h2>Dress for<br />the <em>occasion.</em></h2><div><a className="button button-red" href="#appointment">Book a fitting</a><a className="footer-outline" href="/store">View collection</a></div></div></div><div className="footer-main"><div><a className="brand" href="#top"><img src="/gik-clothings-logo.jpg" alt="" /><span>GIK CLOTHINGS</span></a><p>Formalwear made for presence, purpose, and every moment worth marking.</p></div><div className="footer-links"><div><h3>Explore</h3><a href="/store">Collection</a><a href="#story">Our story</a><a href="#journal">Journal</a></div><div><h3>Services</h3><a href="#appointment">Bespoke tailoring</a><a href="#appointment">Wedding styling</a><a href="#appointment">Private fittings</a></div><div><h3>Get in touch</h3><a href="mailto:hello@gikclothings.com">hello@gikclothings.com</a><p>Osu, Accra<br />Ghana</p></div></div></div><div className="footer-bottom"><p>© 2026 GIK Clothings. All rights reserved.</p><a href="#top">Back to top ↑</a></div></footer>
  </main>;
}
