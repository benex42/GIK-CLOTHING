"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Product = {
  name: string;
  category: "Suits" | "Tuxedos" | "Three-Piece" | "Wedding";
  price: number;
  image: string;
  tone: string;
  badge?: "New" | "Limited" | "Bestseller";
  description: string;
};

const products: Product[] = [
  { name: "Midnight Single-Breasted", category: "Suits", price: 1850, image: "/gik-black-suit.jpeg", tone: "Midnight", badge: "New", description: "A sharp, all-season two-piece in a deep black finish." },
  { name: "Cobalt Three-Piece", category: "Three-Piece", price: 2250, image: "/gik-blue-three-piece.png", tone: "Cobalt", badge: "Bestseller", description: "The complete occasion suit, cut with confident clean lines." },
  { name: "Ivory Dinner Jacket", category: "Tuxedos", price: 2100, image: "/gik-ivory-tuxedo.png", tone: "Ivory", badge: "New", description: "A warm ivory tuxedo for ceremonies and black-tie evenings." },
  { name: "Burgundy Three-Piece", category: "Wedding", price: 2300, image: "/gik-burgundy-three-piece.png", tone: "Burgundy", badge: "Limited", description: "A rich, celebratory suit with a matching waistcoat." },
  { name: "Forest Double-Breasted", category: "Suits", price: 2050, image: "/journal-forest-double-breasted.png", tone: "Forest", description: "Modern double-breasted tailoring in an unforgettable green." },
  { name: "Sky Blue Ceremony Suit", category: "Wedding", price: 2200, image: "/journal-sky-blue-three-piece.png", tone: "Sky", badge: "New", description: "A refined light-blue three-piece for the main event." },
  { name: "Olive Double-Breasted", category: "Suits", price: 2050, image: "/journal-olive-double-breasted.png", tone: "Olive", description: "A relaxed double-breasted silhouette with a precise fit." },
  { name: "Rosewood Evening Suit", category: "Tuxedos", price: 2150, image: "/journal-rose-three-piece.png", tone: "Rosewood", badge: "Limited", description: "An expressive evening suit for an entrance worth remembering." }
];

const filters = ["All", "Suits", "Tuxedos", "Three-Piece", "Wedding"] as const;
type Filter = (typeof filters)[number];
type Sort = "Recommended" | "Price: Low to High" | "Price: High to Low" | "Newest";

function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l-.75 11h-11.5l-.75-11Z" /><path d="M8.5 9V6.75a3.5 3.5 0 0 1 7 0V9" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.4 4.4" /></svg>; }
function UserIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20c.75-3.2 3-5 6.5-5s5.75 1.8 6.5 5" /></svg>; }

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("Recommended");
  const [cart, setCart] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const visibleProducts = useMemo(() => {
    const matchesFilter = products.filter((item) => activeFilter === "All" || item.category === activeFilter);
    const matchesSearch = search.trim() ? matchesFilter.filter((item) => `${item.name} ${item.category} ${item.tone}`.toLowerCase().includes(search.trim().toLowerCase())) : matchesFilter;
    if (sort === "Price: Low to High") return [...matchesSearch].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") return [...matchesSearch].sort((a, b) => b.price - a.price);
    if (sort === "Newest") return [...matchesSearch].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
    return matchesSearch;
  }, [activeFilter, sort, search]);
  const addToBag = (product: Product) => setCart((current) => [...current, product]);
  const money = (value: number) => new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 }).format(value);

  return <main className="shop-shell">
    <header className="shop-header">
      <a href="/#appointment" className="contact-link"><span>+</span> Contact us</a>
      <a href="/" className="shop-brand" aria-label="GIK Clothing home"><img src="/gik-clothings-logo.jpg" alt="GIK Clothings" /><span>GIK<br />CLOTHINGS</span></a>
      <div className="header-actions"><button className="icon-button" aria-label="Open bag" onClick={() => document.querySelector<HTMLDialogElement>("#bag")?.showModal()}><BagIcon />{cart.length > 0 && <b>{cart.length}</b>}</button><button className="icon-button desktop-icon" aria-label="Account"><UserIcon /></button><button className="icon-button" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><SearchIcon /></button><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /><span>Menu</span></button></div>
    </header>
    <AnimatePresence>{searchOpen && <motion.div className="search-drawer" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><SearchIcon /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" /><button onClick={() => { setSearch(""); setSearchOpen(false); }}>Close</button></motion.div>}</AnimatePresence>
    <AnimatePresence>{menuOpen && <motion.div className="menu-drawer" initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ type: "spring", damping: 20, stiffness: 120 }} onClick={() => setMenuOpen(false)}><button className="dialog-close" onClick={() => setMenuOpen(false)}>×</button><nav className="menu-nav"><a href="/#appointment" onClick={() => setMenuOpen(false)}>Book a fitting</a><a href="/#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="/#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav></motion.div>}</AnimatePresence>
    <section className="shop-hero" id="top"><p className="breadcrumb">Home <span>/</span> Shop</p><div className="shop-title-row"><div><p className="overline">GIK Clothings / Accra</p><h1>Shop <em>tailoring.</em></h1></div><p className="shop-intro">A considered collection of suits, tuxedos and ceremony pieces made for the moments that matter.</p></div><div className="filter-pills" aria-label="Shop categories">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter === "All" ? "All pieces" : filter}</button>)}</div></section>
    <section className="catalogue" aria-label="Available suits"><div className="catalogue-bar"><div className="catalogue-tabs"><button className="active" onClick={() => setActiveFilter("All")}>All <span>{products.length}</span></button><button onClick={() => setActiveFilter("Suits")}>Ready to wear</button><button onClick={() => setActiveFilter("Wedding")}>Ceremony edit</button></div><label className="sort-control">Sort <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option>Recommended</option><option>Newest</option><option>Price: Low to High</option><option>Price: High to Low</option></select></label></div><div className="catalogue-meta"><span>{visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"}</span><span>Made in Accra / Ships worldwide</span></div><div className="product-grid"><AnimatePresence mode="popLayout">{visibleProducts.map((product, index) => <motion.article className="product-card" key={product.name} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ delay: Math.min(index * .045, .25) }}><button className="product-image" onClick={() => setSelectedProduct(product)} aria-label={`View ${product.name}`}>{product.badge && <span className={`product-badge ${product.badge === "Limited" ? "limited" : ""}`}>{product.badge}</span>}<img src={product.image} alt={product.name} /><span className="view-piece">View piece <b className="arrow-icon">↗</b></span></button><div className="product-details"><div><p>{product.category} / {product.tone}</p><h2>{product.name}</h2></div><div className="product-price"><strong>{money(product.price)}</strong><button onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>+</button></div></div></motion.article>)}</AnimatePresence></div>{visibleProducts.length === 0 && <div className="empty-state">No pieces match that search. Try another name or collection.</div>}</section>
    <section className="store-note" id="contact"><p className="overline">The GIK difference</p><h2>Tailoring, made<br /><em>personal.</em></h2><div><p>Not sure where to begin? Our stylists are here to help you choose a piece, prepare for your fitting, and make the look entirely yours.</p><a href="mailto:hello@gikclothings.com">Speak with a stylist</a></div></section>
    <footer className="store-footer"><section className="store-footer-cta"><p className="overline">GIK Clothings / Accra</p><div><h2>Dress for<br />the <em>occasion.</em></h2><div className="store-footer-actions"><a className="store-footer-button" href="/#appointment">Book a fitting</a><a className="store-footer-outline" href="#top">Back to top <b>↑</b></a></div></div></section><div className="store-footer-main"><div><a className="shop-brand" href="/"><img src="/gik-clothings-logo.jpg" alt="" /><span>GIK<br />CLOTHINGS</span></a><p>Formalwear made for presence, purpose and every moment worth marking.</p></div><div className="store-footer-links"><div><h3>Explore</h3><a href="#top">Shop</a><a href="/#story">Our story</a><a href="/#journal">Journal</a></div><div><h3>Services</h3><a href="/#appointment">Bespoke tailoring</a><a href="/#appointment">Wedding styling</a><a href="/#appointment">Private fittings</a></div><div><h3>Get in touch</h3><a href="mailto:hello@gikclothings.com">hello@gikclothings.com</a><p>Osu, Accra<br />Ghana</p></div></div></div><div className="store-footer-bottom"><p>© 2026 GIK Clothings. All rights reserved.</p><div><a href="#">Privacy</a><a href="#">Terms</a></div></div></footer>
    <dialog id="bag" className="bag-dialog"><button className="dialog-close" onClick={() => document.querySelector<HTMLDialogElement>("#bag")?.close()}>×</button><p className="overline">Your selection</p><h2>Your bag <span>({cart.length})</span></h2>{cart.length ? <><div className="bag-lines">{cart.map((item, index) => <div key={`${item.name}-${index}`}><img src={item.image} alt="" /><p>{item.name}<span>{money(item.price)}</span></p></div>)}</div><div className="bag-total"><span>Total</span><strong>{money(cart.reduce((total, item) => total + item.price, 0))}</strong></div><button className="checkout-button" onClick={() => document.querySelector<HTMLDialogElement>("#bag")?.close()}>Request checkout</button></> : <p className="bag-empty">Your bag is ready for a remarkable suit.</p>}</dialog>
    <AnimatePresence>{selectedProduct && <motion.div className="quick-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)}><motion.div className="quick-view-card" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button className="dialog-close" onClick={() => setSelectedProduct(null)}>×</button><div className="quick-view-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div><div className="quick-view-content"><p className="overline">{selectedProduct.category} / {selectedProduct.tone}</p><h2>{selectedProduct.name}</h2><strong>{money(selectedProduct.price)}</strong><p>{selectedProduct.description}</p><button className="checkout-button" onClick={() => { addToBag(selectedProduct); setSelectedProduct(null); }}>Add to bag <span>+</span></button></div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}
