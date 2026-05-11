import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ─────────────────────────────────────────────────────────────
   Mega-menu data  (mirrors Semrush column layout)
───────────────────────────────────────────────────────────── */
const BROWSE_MENU = {
  cols: [
    {
      heading: 'Browse',
      items: [
        { label: 'All Content',    href: '/explore'           },
        { label: 'New Releases',   href: '/explore?sort=new'  },
        { label: 'Top Rated',      href: '/explore?sort=top'  },
        { label: 'Free to Watch',  href: '/explore?tier=free' },
      ],
    },
    {
      heading: 'Categories',
      items: [
        { label: 'Movies',         href: '/category/movie'       },
        { label: 'Series',         href: '/category/series'      },
        { label: 'Anime',          href: '/category/anime'       },
        { label: 'Documentaries',  href: '/category/documentary' },
        { label: 'Gaming',         href: '/category/gaming'      },
        { label: '18+ Series',     href: '/category/18plus'      },
      ],
    },
    {
      heading: 'Discover',
      items: [
        { label: 'Trending Now',   href: '/trending'             },
        { label: 'Recommended',    href: '/recommendations'      },
        { label: 'By Genre',       href: '/explore?view=genre'   },
        { label: 'By Language',    href: '/explore?view=lang'    },
      ],
    },
  ],
  promo: {
    tag:   'PREMIUM',
    title: 'Unlock All Content',
    body:  'Ad-free streaming, exclusive titles & AI-powered recommendations.',
    cta:   'Try Premium Free',
    href:  '/register',
    bg:    'linear-gradient(135deg,#6366f1 0%,#ec4899 100%)',
  },
};

const CREATORS_MENU = {
  cols: [
    {
      heading: 'For Creators',
      items: [
        { label: 'Creator Dashboard', href: '/creator'          },
        { label: 'Upload Content',    href: '/creator/upload'   },
        { label: 'Revenue Share',     href: '/creator/revenue'  },
        { label: 'Analytics',         href: '/creator/analytics'},
      ],
    },
    {
      heading: 'Platform',
      items: [
        { label: 'API Access',        href: '/api-docs'         },
        { label: 'Integrations',      href: '/integrations'     },
        { label: 'Creator Blog',      href: '/blog'             },
      ],
    },
  ],
  promo: null,
};

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    /* ── Host ─────────────────────────────────────────────── */
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #ffffff;
      border-bottom: 1px solid #e8e8e8;
    }

    /* ── Wrapper ──────────────────────────────────────────── */
    .navbar {
      display: flex;
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      gap: 0;
    }

    /* ── Logo ─────────────────────────────────────────────── */
    .logo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-decoration: none;
      margin-right: 32px;
      flex-shrink: 0;
    }
    .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #1a1a1a;
      line-height: 1;
      letter-spacing: -0.5px;
    }
    .logo-sub {
      font-size: 0.6rem;
      font-weight: 500;
      color: #888;
      letter-spacing: 0.3px;
      margin-top: 1px;
    }

    /* ── Center nav ───────────────────────────────────────── */
    .nav-center {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 1;
    }

    /* nav trigger button */
    .nav-item {
      position: relative;
    }
    .nav-trigger {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      background: none;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
      text-decoration: none;
    }
    .nav-trigger:hover,
    .nav-item:hover .nav-trigger {
      background: #f5f5f5;
    }
    .nav-trigger svg {
      width: 14px;
      height: 14px;
      color: #666;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .nav-item:hover .nav-trigger svg {
      transform: rotate(180deg);
    }

    /* external-link icon (↗) */
    .ext-icon {
      font-size: 0.75rem;
      color: #888;
      margin-left: 2px;
    }

    /* ── Mega-menu panel ──────────────────────────────────── */
    .mega {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: #ffffff;
      border: 1px solid #e8e8e8;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.12);
      padding: 28px;
      gap: 32px;
      min-width: 680px;
      z-index: 2000;
      animation: fadeDown .18s ease;
    }
    .mega.has-promo {
      display: none; /* toggled by hover */
    }
    .nav-item:hover .mega {
      display: flex;
    }

    @keyframes fadeDown {
      from { opacity:0; transform:translateY(-6px); }
      to   { opacity:1; transform:translateY(0);    }
    }

    /* columns */
    .mega-cols {
      display: flex;
      gap: 32px;
      flex: 1;
    }
    .mega-col h4 {
      font-size: 0.7rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
    }
    .mega-col ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .mega-col ul li a {
      display: block;
      padding: 6px 10px;
      font-size: 0.875rem;
      color: #333;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.12s, color 0.12s;
      white-space: nowrap;
    }
    .mega-col ul li a:hover {
      background: #f0f0ff;
      color: #6366f1;
    }

    /* promo card */
    .mega-promo {
      width: 220px;
      flex-shrink: 0;
      border-radius: 14px;
      padding: 20px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
    }
    .promo-tag {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 1px;
      background: rgba(255,255,255,.25);
      border-radius: 4px;
      padding: 2px 7px;
      display: inline-block;
      margin-bottom: 10px;
    }
    .promo-title {
      font-family: 'Poppins', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 8px;
    }
    .promo-body {
      font-size: 0.78rem;
      opacity: .88;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .promo-cta {
      display: inline-block;
      background: #fff;
      color: #6366f1;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      transition: opacity .15s;
      align-self: flex-start;
    }
    .promo-cta:hover { opacity: .88; }

    /* ── Right side ───────────────────────────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Login — outline pill */
    .btn-login {
      padding: 8px 22px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1a1a1a;
      background: transparent;
      border: 1.5px solid #c8c8c8;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      transition: border-color .15s, background .15s;
      white-space: nowrap;
    }
    .btn-login:hover {
      border-color: #1a1a1a;
      background: #f5f5f5;
    }

    /* Sign Up — filled black pill */
    .btn-signup {
      padding: 8px 22px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      background: #1a1a1a;
      border: 1.5px solid #1a1a1a;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      transition: background .15s, border-color .15s;
      white-space: nowrap;
    }
    .btn-signup:hover {
      background: #333;
      border-color: #333;
    }

    /* Avatar (logged-in) */
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      font-weight: 700;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      flex-shrink: 0;
    }

    /* ── Mobile ───────────────────────────────────────────── */
    @media (max-width: 900px) {
      .nav-center { display: none; }
      .mega       { display: none !important; }
    }
  `;

  @consume({ context: authContext, subscribe: true })
  @state() private authState?: AuthState;

  /* chevron SVG */
  private chevron() {
    return html`
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"/>
      </svg>`;
  }

  /* render one mega-menu */
  private renderMega(menu: typeof BROWSE_MENU) {
    return html`
      <div class="mega ${menu.promo ? 'has-promo' : ''}">
        <div class="mega-cols">
          ${menu.cols.map(col => html`
            <div class="mega-col">
              <h4>${col.heading}</h4>
              <ul>
                ${col.items.map(item => html`
                  <li><a href="${item.href}">${item.label}</a></li>
                `)}
              </ul>
            </div>
          `)}
        </div>

        ${menu.promo ? html`
          <div class="mega-promo" style="background:${menu.promo.bg}">
            <div>
              <span class="promo-tag">${menu.promo.tag}</span>
              <p class="promo-title">${menu.promo.title}</p>
              <p class="promo-body">${menu.promo.body}</p>
            </div>
            <a href="${menu.promo.href}" class="promo-cta">${menu.promo.cta}</a>
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    const isAuth = this.authState?.isAuthenticated;
    const user   = this.authState?.user;

    return html`
      <nav class="navbar">

        <!-- ── Logo ── -->
        <a href="/" class="logo">
          <span class="logo-name">EntertainingHub</span>
          <span class="logo-sub">entertainingzen.com</span>
        </a>

        <!-- ── Center nav ── -->
        <div class="nav-center">

          <!-- Browse (mega) -->
          <div class="nav-item">
            <button class="nav-trigger">
              Browse ${this.chevron()}
            </button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <!-- Pricing (plain link) -->
          <a href="/pricing" class="nav-trigger">Pricing</a>

          <!-- Creators (mega) -->
          <div class="nav-item">
            <button class="nav-trigger">
              Creators ${this.chevron()}
            </button>
            ${this.renderMega(CREATORS_MENU)}
          </div>

          <!-- Enterprise (external-style) -->
          <a href="/enterprise" class="nav-trigger">
            Enterprise <span class="ext-icon">↗</span>
          </a>

        </div>

        <!-- ── Right side ── -->
        <div class="nav-right">
          ${isAuth ? html`
            <a href="/profile" class="avatar" title="${user?.username}">
              ${user?.username?.charAt(0).toUpperCase() ?? 'U'}
            </a>
            <button class="btn-login" @click=${() => authService.logout()}>
              Log Out
            </button>
          ` : html`
            <a href="/login"    class="btn-login">Log In</a>
            <a href="/register" class="btn-signup">Sign Up</a>
          `}
        </div>

      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
