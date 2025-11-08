import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'SAP CPI Toolkit',
  description: 'Guides and utilities for SAP Cloud Integration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">SAP CPI Toolkit</Link>
            <nav className="nav">
              <Link href="/guides">Guides</Link>
              <Link href="/tools">Tools</Link>
              <a href="https://help.sap.com/docs/cloud-integration" target="_blank" rel="noreferrer">Docs</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>Built for CPI practitioners. Not affiliated with SAP.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
