import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'User Registration',
  description: 'Simple user registration form',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="nec-template">
      <body className="nec-template__body">
        <header className="nec-header" role="banner" data-module="nec-header">
          <div className="nec-header__container nec-width-container">
            <div className="nec-header__content">
              <span className="nec-header__link--service-name">
                Arturas Salivonas Test
              </span>
            </div>
          </div>
        </header>

        <div className="nec-width-container">
          <a href="#main-content" className="nec-skip-link">
            Skip to main content
          </a>
        </div>

        {children}

        <footer className="nec-footer" role="contentinfo">
          <div className="nec-width-container">
            <div className="nec-footer__meta">
              <div className="nec-footer__meta-item nec-footer__meta-item--grow">
                <a className="nec-footer__link" href="https://salivon.net" target="_blank" rel="noopener noreferrer">
                  © Arturas Salivonas
                </a>
              </div>

            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
