import { UrlShortenerForm } from '@/components/url-shortener-form';

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="topbar"><a className="brand" href="/" aria-label="Linklet home"><span className="brand-icon">↗</span> linklet</a><span className="topbar-note">Simple links. Better sharing.</span></nav>
      <section className="hero">
        <div className="pill"><span className="live-dot" /> YOUR LINK, SIMPLIFIED</div>
        <h1>Long links.<br /><span>Short stories.</span></h1>
        <p className="subtitle">Turn lengthy URLs into neat, shareable links.<br className="desktop-break" /> One click and you’re ready to go.</p>
        <UrlShortenerForm />
      </section>
      <footer className="footer"><span>LINKLET</span><span>Make every character count.</span><a href="http://localhost:3001/api/docs" target="_blank" rel="noreferrer">API documentation ↗</a></footer>
    </main>
  );
}
