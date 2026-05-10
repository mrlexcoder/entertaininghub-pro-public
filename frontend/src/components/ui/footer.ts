import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--color-background-elevated);
      border-top: 1px solid var(--color-border);
      margin-top: var(--spacing-3xl);
    }

    .footer {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--spacing-2xl) var(--spacing-lg);
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
    }

    .footer-section h3 {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-md);
      color: var(--color-text);
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .footer-link {
      color: var(--color-text-secondary);
      transition: color var(--transition-fast);
    }

    .footer-link:hover {
      color: var(--color-primary);
    }

    .footer-bottom {
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
    }

    .social-links {
      display: flex;
      gap: var(--spacing-md);
    }

    .social-link {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      background: var(--color-background-card);
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
    }

    .social-link:hover {
      background: var(--color-primary);
      color: white;
    }

    @media (max-width: 768px) {
      .footer-bottom {
        flex-direction: column;
        gap: var(--spacing-md);
        text-align: center;
      }
    }
  `;

  render() {
    return html`
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>🎬 EntertainingHub</h3>
            <p style="color: var(--color-text-secondary);">
              Your ultimate entertainment platform for movies, series, anime, and more.
            </p>
          </div>

          <div class="footer-section">
            <h3>Explore</h3>
            <div class="footer-links">
              <a href="/explore" class="footer-link">Browse All</a>
              <a href="/category/movie" class="footer-link">Movies</a>
              <a href="/category/series" class="footer-link">Series</a>
              <a href="/category/anime" class="footer-link">Anime</a>
              <a href="/trending" class="footer-link">Trending</a>
            </div>
          </div>

          <div class="footer-section">
            <h3>Company</h3>
            <div class="footer-links">
              <a href="/about" class="footer-link">About Us</a>
              <a href="/contact" class="footer-link">Contact</a>
              <a href="/careers" class="footer-link">Careers</a>
              <a href="/blog" class="footer-link">Blog</a>
            </div>
          </div>

          <div class="footer-section">
            <h3>Legal</h3>
            <div class="footer-links">
              <a href="/privacy" class="footer-link">Privacy Policy</a>
              <a href="/terms" class="footer-link">Terms of Service</a>
              <a href="/cookies" class="footer-link">Cookie Policy</a>
              <a href="/dmca" class="footer-link">DMCA</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 EntertainingHub Pro. All rights reserved.</p>
          <div class="social-links">
            <a href="#" class="social-link" title="Twitter">𝕏</a>
            <a href="#" class="social-link" title="Facebook">f</a>
            <a href="#" class="social-link" title="Instagram">📷</a>
            <a href="#" class="social-link" title="YouTube">▶</a>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter;
  }
}
