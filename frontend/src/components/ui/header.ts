import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ─────────────────────────────────────────────────────────────
   Menu data  (Semrush column layout — no icons)
───────────────────────────────────────────────────────────── */
const BROWSE_MENU = {
  cols: [
    {
      heading: 'Start Here',
      items: [
        { label: 'All Content',         href: '/explore'              },
        { label: 'New Releases',        href: '/explore?sort=new'     },
        { label: 'Top Rated',           href: '/explore?sort=top'     },
        { label: 'Free to Watch',       href: '/explore?tier=free'    },
        { label: 'Trending Now',        href: '/trending'             },
      ],
    },
    {
      heading: 'Find the Right Content',
      items: [
        { label: 'Movies',              href: '/category/movie'       },
        { label: 'Series',              href: '/category/series'      },
        { label: 'Anime',               href: '/category/anime'       },
        { label: 'Anime Movies',        href: '/category/anime-movie' },
        { label: 'Documentaries',       href: '/category/documentary' },
        { label: 'Gaming',              href: '/category/gaming'      },
        { label: '18+ Series',          href: '/category/18plus'      },
      ],
    },
    {
      heading: 'Discover',
      items: [
        { label: 'Recommended for You', href: '/recommendations'      },
        { label: 'By Genre',            href: '/explore?view=genre'   },
        { label: 'By Language',         href: '/explore?view=lang'    },
        { label: 'Watchlist',           href: '/watchlist'            },
      ],
    },
    {
      heading: 'Top Picks',
      items: [
        { label: 'Action Movies',       href: '/explore?genre=action'     },
        { label: 'Thriller Series',     href: '/explore?genre=thriller'   },
        { label: 'Shonen Anime',        href: '/explore?genre=shonen'     },
        { label: 'Other content',       href: '/explore'                  },
      ],
    },
  ],
  promo: {
    bg:    'linear-gradient(160deg,#7c3aed 0%,#a855f7 55%,#c084fc 100%)',
    tag:   'TRY PREMIUM FOR FREE',
    title: 'EntertainingHub\nPremium',
    body:  'The platform that unifies all entertainment with AI-powered recommendations.',
    cta:   'Get Started Free',
    href:  '/register',
  },
};

const CREATORS_MENU = {
  cols: [
    {
      heading: 'Creator Tools',
      items: [
        { label: 'Creator Dashboard',   href: '/creator'            },
        { label: 'Upload Content',      href: '/creator/upload'     },
        { label: 'Revenue Share',       href: '/creator/revenue'    },
        { label: 'Analytics',           href: '/creator/analytics'  },
        { label: 'Creator Blog',        href: '/blog'               },
      ],
    },
    {
      heading: 'Platform',
      items: [
        { label: 'API Access',          href: '/api-docs'           },
        { label: 'Integrations',        href: '/integrations'       },
        { label: 'App Center',          href: '/apps'               },
        { label: 'Data Sources',        href: '/data-sources'       },
      ],
    },
    {
      heading: 'Top Features',
      items: [
        { label: 'Stripe Payouts',      href: '/creator/payouts'    },
        { label: 'Advanced Stats',      href: '/creator/stats'      },
        { label: 'Brand Deals',         href: '/creator/brands'     },
        { label: 'Community',           href: '/community'          },
      ],
    },
  ],
  promo: {
    bg:    'linear-gradient(160deg,#0f172a 0%,#1e3a5f 55%,#0369a1 100%)',
    tag:   'FOR CREATORS',
    title: 'EntertainingHub\nCreator Hub',
    body:  '60/40 revenue split. Real-time analytics. Grow your audience on entertainingzen.com.',
    cta:   'Become a Creator',
    href:  '/creator',
  },
};

const RESOURCES_MENU = {
  cols: [
    {
      heading: 'Learn',
      items: [
        { label: 'Blog',                href: '/blog'       },
        { label: 'Help Center',         href: '/help'       },
        { label: 'Roadmap',             href: '/roadmap'    },
        { label: 'Changelog',           href: '/changelog'  },
        { label: 'API Docs',            href: '/api-docs'   },
      ],
    },
    {
      heading: 'Company',
      items: [
        { label: 'About Us',            href: '/about'      },
        { label: 'Careers',             href: '/careers'    },
        { label: 'Press',               href: '/press'      },
        { label: 'Contact',             href: '/contact'    },
      ],
    },
  ],
  promo: {
    bg:    'linear-gradient(160deg,#064e3b 0%,#065f46 55%,#10b981 100%)',
    tag:   'WEEKLY NEWSLETTER',
    title: 'EntertainingHub\nInsider',
    body:  'Weekly picks, creator spotlights and platform updates straight to your inbox.',
    cta:   'Subscribe Free',
    href:  '/newsletter',
  },
};

type MenuData = typeof BROWSE_MENU;

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    /* ── Font system — Lazzer with full fallback stack ─────── */
    :host {
      --font-body: "Lazzer", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #ffffff;
      border-bottom: 1px solid #e2e2e2;
    }

    /* ── Navbar row ───────────────────────────────────────── */
    .navbar {
      display: flex;
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
      height: 56px;
      font-family: var(--font-body);
    }

    /* ── Logo ─────────────────────────────────────────────── */
    .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      margin-right: 32px;
      flex-shrink: 0;
      line-height: 1;
      gap: 2px;
    }
    .logo-name {
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: -0.2px;
    }
    .logo-sub {
      font-size: 10px;
      font-weight: 400;
      color: #999;
      letter-spacing: 0;
    }

    /* ── Center nav ───────────────────────────────────────── */
    .nav-center {
      display: flex;
      align-items: stretch;
      flex: 1;
      height: 100%;
    }

    /* nav item wrapper */
    .nav-item {
      position: static;
      display: flex;
      align-items: center;
    }

    /* trigger button */
    .nav-trigger {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 0 12px;
      height: 56px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: border-color 0.15s ease;
    }
    /* hover & open state — underline only, no bg */
    .nav-trigger:hover,
    .nav-item:hover > .nav-trigger {
      border-bottom-color: #1a1a1a;
    }

    /* chevron SVG */
    .nav-trigger .chevron {
      width: 11px;
      height: 11px;
      color: #555;
      transition: transform 0.2s ease;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .nav-item:hover > .nav-trigger .chevron {
      transform: rotate(180deg);
    }

    /* plain link (no dropdown) */
    .nav-plain {
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      height: 56px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      transition: border-color 0.15s ease;
    }
    .nav-plain:hover { border-bottom-color: #1a1a1a; }

    /* ── MEGA DROPDOWN ────────────────────────────────────── */
    /* Full viewport width, NO border-radius, flat edges */
    .mega {
      display: none;
      position: fixed;
      top: 56px;
      left: 0;
      right: 0;
      background: #ffffff;
      border-top: 1px solid #e2e2e2;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      z-index: 999;
    }
    .nav-item:hover .mega { display: block; }

    /* inner container — max-width centered */
    .mega-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 28px 20px 24px;
      display: flex;
      align-items: flex-start;
      gap: 0;
      font-family: var(--font-body);
    }

    /* ── Left: columns area ───────────────────────────────── */
    .mega-cols {
      flex: 1;
      display: flex;
      gap: 40px;
      padding-right: 36px;
      border-right: 1px solid #e8e8e8;
    }

    /* single column */
    .mega-col { min-width: 130px; }

    /* column heading — bold, small, dark */
    .mega-col-heading {
      display: block;
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    /* list */
    .mega-col-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .mega-col-list li { margin: 0; padding: 0; }

    /* link — plain text, no bg, underline on hover */
    .mega-col-list li a {
      display: block;
      padding: 4px 0;
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 400;
      color: #333333;
      text-decoration: none;
      line-height: 1.5;
      white-space: nowrap;
      transition: color 0.12s ease;
    }
    .mega-col-list li a:hover {
      color: #1a1a1a;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── Right: promo card ────────────────────────────────── */
    .mega-promo {
      width: 230px;
      flex-shrink: 0;
      padding-left: 36px;
      display: flex;
      flex-direction: column;
    }

    .promo-card {
      border-radius: 10px;
      padding: 20px 18px 18px;
      color: #fff;
      display: flex;
      flex-direction: column;
      min-height: 200px;
    }

    .promo-tag {
      display: block;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.6px;
      color: rgba(255, 255, 255, 0.75);
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .promo-title {
      font-family: var(--font-body);
      font-size: 18px;
      font-weight: 800;
      line-height: 1.2;
      color: #fff;
      margin: 0 0 8px;
      white-space: pre-line;
    }

    .promo-body {
      font-family: var(--font-body);
      font-size: 12.5px;
      line-height: 1.55;
      color: rgba(255, 255, 255, 0.85);
      margin: 0 0 16px;
      flex: 1;
    }

    .promo-cta {
      display: inline-block;
      align-self: flex-start;
      background: #ffffff;
      color: #1a1a1a;
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 700;
      padding: 7px 14px;
      border-radius: 6px;
      text-decoration: none;
      transition: opacity 0.15s ease;
    }
    .promo-cta:hover { opacity: 0.88; }

    /* ── Right side — Log In / Sign Up ────────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Log In — outline pill (Semrush style) */
    .btn-login {
      display: inline-flex;
      align-items: center;
      padding: 7px 20px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      background: transparent;
      border: 1.5px solid #c0c0c0;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .btn-login:hover {
      border-color: #1a1a1a;
      background: #f5f5f5;
    }

    /* Sign Up — filled black pill (Semrush style) */
    .btn-signup {
      display: inline-flex;
      align-items: center;
      padding: 7px 20px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      background: #1a1a1a;
      border: 1.5px solid #1a1a1a;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .btn-signup:hover {
      background: #333333;
      border-color: #333333;
    }

    /* Avatar (logged in) */
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 13px;
      display: inline-flex;
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

  /* small chevron SVG — matches Semrush exactly */
  private chevron() {
    return html`
      <svg class="chevron" viewBox="0 0 12 12" fill="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 4L6 8L10 4" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  /* render one full mega panel */
  private renderMega(menu: MenuData) {
    return html`
      <div class="mega">
        <div class="mega-inner">

          <!-- Columns -->
          <div class="mega-cols">
            ${menu.cols.map(col => html`
              <div class="mega-col">
                <span class="mega-col-heading">${col.heading}</span>
                <ul class="mega-col-list">
                  ${col.items.map(item => html`
                    <li><a href="${item.href}">${item.label}</a></li>
                  `)}
                </ul>
              </div>
            `)}
          </div>

          <!-- Promo card -->
          <div class="mega-promo">
            <div class="promo-card" style="background:${menu.promo.bg}">
              <span class="promo-tag">${menu.promo.tag}</span>
              <p class="promo-title">${menu.promo.title}</p>
              <p class="promo-body">${menu.promo.body}</p>
              <a href="${menu.promo.href}" class="promo-cta">${menu.promo.cta}</a>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  render() {
    const isAuth = this.authState?.isAuthenticated;
    const user   = this.authState?.user;

    return html`
      <nav class="navbar">

        <!-- Logo -->
        <a href="/" class="logo">
          <span class="logo-name">EntertainingHub</span>
          <span class="logo-sub">entertainingzen.com</span>
        </a>

        <!-- Center nav -->
        <div class="nav-center">

          <!-- Browse (mega) -->
          <div class="nav-item">
            <button class="nav-trigger">
              Browse ${this.chevron()}
            </button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <!-- Pricing (plain) -->
          <a href="/pricing" class="nav-plain">Pricing</a>

          <!-- Creators (mega) -->
          <div class="nav-item">
            <button class="nav-trigger">
              Creators ${this.chevron()}
            </button>
            ${this.renderMega(CREATORS_MENU)}
          </div>

          <!-- Resources (mega) -->
          <div class="nav-item">
            <button class="nav-trigger">
              Resources ${this.chevron()}
            </button>
            ${this.renderMega(RESOURCES_MENU)}
          </div>

          <!-- Enterprise (plain) -->
          <a href="/enterprise" class="nav-plain">Enterprise</a>

        </div>

        <!-- Right: auth buttons -->
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
