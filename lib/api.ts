export interface ShortUrlResult {
  id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');

export async function createShortUrl(originalUrl: string): Promise<ShortUrlResult> {
  const response = await fetch(`${API_BASE}/api/v1/urls`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = Array.isArray(payload?.message) ? payload.message.join(', ') : payload?.message;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return response.json();
}
