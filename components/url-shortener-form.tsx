'use client';

import { FormEvent, useState } from 'react';
import { createShortUrl, ShortUrlResult } from '@/lib/api';

export function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [result, setResult] = useState<ShortUrlResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(''); setResult(null); setCopied(false); setLoading(true);
    try {
      const created = await createShortUrl(originalUrl.trim());
      setResult(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  async function copyUrl() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.shortUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setError('Clipboard access was blocked. You can select and copy the short URL.'); }
  }

  return (
    <div className="shortener-wrap">
      <form className="url-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="long-url">Long URL</label>
        <input id="long-url" type="url" inputMode="url" placeholder="Paste your long URL here…" value={originalUrl}
          onChange={(event) => setOriginalUrl(event.target.value)} required maxLength={2048}
          pattern="https?://.+" title="Enter a valid URL beginning with http:// or https://" />
        <button type="submit" disabled={loading || !originalUrl.trim()}>
          {loading ? <><span className="spinner" /> Creating…</> : <>Shorten URL <span aria-hidden="true">↗</span></>}
        </button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      {result && (
        <section className="result-card" aria-live="polite">
          <div className="success-mark" aria-hidden="true">✓</div>
          <div className="result-content">
            <p className="result-eyebrow">Your link is ready</p>
            <a className="short-link" href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
            <p className="destination">Redirects to: <span title={result.originalUrl}>{result.originalUrl}</span></p>
          </div>
          <button className="copy-button" type="button" onClick={copyUrl}>{copied ? 'Copied ✓' : 'Copy link'}</button>
        </section>
      )}
      <p className="form-hint">Free to use · No account required · Your original URL stays intact</p>
    </div>
  );
}
