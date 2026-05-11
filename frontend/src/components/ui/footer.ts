import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #ffffff;
      border-top: 1px solid #e8e8e8;
      margin-top: 80px;
    }

    .footer {
      max-width: 1280px;
      margin: 0 auto;
      padding: 56px 24px 32px;
    }

    /* ── Top grid ─────────────────────────────────────────── */
    .footer-grid {
      display: grid;
      grid-template-columns: 220px repeat(4, 1fr);
      gap: 40px;
      padding-bottom: 48px;
      border-bottom: 1px solid #e8e8e8;
    }

    /* Brand column */
    .brand-col .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #1a1a1a;
      display: block;
      margin-bottom: 4px;
    }
    .brand-col .logo-sub {
      font-size: 0.7rem;
      color: #999;
      display: block;
      margin-bottom: 16px;
    }
    .brand-col p {
      font-size: 0.82rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    /* Social icons */
    .socials {
      display: flex;
      gap: 10px;
    }
    .social-btn {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      color: #555;
      text-decoration: none;
      transition: border-color .15s, background .15s, color .15s;
    }
    .social-btn:hover {
      border-color: #6366f1;
      background: #f0f0ff;
      color: #6366f1;
    }

    /* Link columns */
    .link-col h4 {
      font-size: 0.75rem;
      font-weight: 700;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      margin-bottom: 14px;
    }
    .link-col ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .link-col ul li a {
      font-size: 0.875rem;
      color: #555;
      text-decoration: none;
      transition: color .15s;
    }
    .link-col ul li a:hover { color: #6366f1; }

    /* ── Bottom bar ───────────────────────────────────────── */
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-bottom p {
      font-size: 0.8rem;
      color: #999;
      margin: 0;
    }
    .bottom-links {
      display: flex;
      gap: 20px;
    }
    .bottom-links a {
      font-size: 0.8rem;
      color: #999;
      text-decoration: none;
      transition: color .15s;
    }
    .bottom-links a:hover { color: #1a1a1a; }

    /* ── Responsive ───────────────────────────────────────── */
    @media (max-width: 1024px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .brand-col { grid-column: 1 / -1; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-bottom { flex-direction: column; align-items: flex-start; }
    }
  `;

  render() {
    return html`
      <footer class="footer">
        <div class="footer-grid">

          <!-- Brand -->
          <div class="brand-col">
            <span class="logo-name">EntertainingHub</span>
            <span class="logo-sub">entertainingzen.com</span>
            <p>Your ultimate entertainment platform — movies, series, anime, gaming & more, all in one place.</p>
            <div class="socials">
              <a href="#" class="social-btn" title="X / Twitter">𝕏</a>
              <a href="#" class="social-btn" title="Instagram">📷</a>
              <a href="#" class="social-btn" title="YouTube">▶</a>
              <a href="#" class="social-btn" title="Discord">💬</a>
            </div>
          </div>

          <!-- Browse -->
          <div class="link-col">
            <h4>Browse</h4>
            <ul>
              <li><a href="/category/movie">Movies</a></li>
              <li><a href="/category/series">Series</a></li>
              <li><a href="/category/anime">Anime</a></li>
              <li><a href="/category/documentary">Documentaries</a></li>
              <li><a href="/category/gaming">Gaming</a></li>
              <li><a href="/trending">Trending</a></li>
            </ul>
          </div>

          <!-- Platform -->
          <div class="link-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/creator">Creator Hub</a></li>
              <li><a href="/api-docs">API</a></li>
              <li><a href="/integrations">Integrations</a></li>
              <li><a href="/enterprise">Enterprise</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="link-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/press">Press</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="link-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/dmca">DMCA</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>© 2026 EntertainingHub · entertainingzen.com · All rights reserved.</p>
          <div class="bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
            <a href="/sitemap">Sitemap</a>
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
