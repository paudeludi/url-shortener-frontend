import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Linklet — Make your links shorter',
  description: 'Create clean, shareable short links in seconds.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
