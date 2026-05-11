import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ─────────────────────────────────────────────────────────────
   Menu data — Semrush style, no icons, plain text columns
───────────────────────────────────────────────────────────── */
const BROWSE_MENU = {
  cols: [
    {
      heading: 'Start Here',
      items: [
        { label: 'All Content',       href: '/explore'              },
        { label: 'New Releases',      href: '/explore?sort=new'     },
        { label: 'Top Rated',         href: '/explore?sort=top'     },
        { label: 'Free to Watch',     href: '/explore?tier=free'    },
        { label: 'Trending Now',      href: '/trending'             },
      ],
    },
    {
      heading: 'Categories',
      items: [
        { label: 'Movies',            href: '/category/movie'       },
        { label: 'Series',            href: '/category/series'      },
        { label: 'Anime',             href: '/category/anime'       },
        { label: 'Anime Movies',      href: '/category/anime-movie' },
        { label: 'Documentaries',     href: '/category/documentary' },
        { label: 'Gaming',            href: '/category/gaming'      },
        { label: '18+ Series',        href: '/category/18plus'      },
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
  ],
  promo: {
    bg:    'linear-gradient(135deg,#6366f1 0%,#a855f7 60%,#ec4899 100%)',
    tag:   'TRY PREMIUM FREE',
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
        { label: 'Creator Dashboard',  href: '/creator'            },
        { label: 'Upload Content',     href: '/creator/upload'     },
        { label: 'Revenue Share',      href: '/creator/revenue'    },
        { label: 'Analytics',          href: '/creator/analytics'  },
        { label: 'Creator Blog',       href: '/blog'               },
      ],
    },
    {
      heading: 'Platform',
      items: [
        { label: 'API Access',         href: '/api-docs'           },
        { label: 'Integrations',       href: '/integrations'       },
        { label: 'App Center',         href: '/apps'               },
        { label: 'Data Sources',       href: '/data-sources'       },
      ],
    },
    {
      heading: 'Top Features',
      items: [
        { label: 'Stripe Payouts',     href: '/creator/payouts'    },
        { label: 'Advanced Stats',     href: '/creator/stats'      },
        { label: 'Brand Deals',        href: '/creator/brands'     },
        { label: 'Community',          href: '/community'          },
      ],
    },
  ],
  promo: {
    bg:    'linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#0369a1 100%)',
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
        { label: 'Blog',               href: '/blog'       },
        { label: 'Help Center',        href: '/help'       },
        { label: 'Roadmap',            href: '/roadmap'    },
        { label: 'Changelog',          href: '/changelog'  },
        { label: 'API Docs',           href: '/api-docs'   },
      ],
    },
    {
      heading: 'Company',
      items: [
        { label: 'About Us',           href: '/about'      },
        { label: 'Careers',            href: '/careers'    },
        { label: 'Press',              href: '/press'      },
        { label: 'Contact',            href: '/contact'    },
      ],
    },
  ],
  promo: {
    bg:    'linear-gradient(135deg,#064e3b 0%,#065f46 60%,#10b981 100%)',
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
    /* ── Host ─────────────────────────────────────────────── */
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
    }

    /* ── Navbar ───────────────────────────────────────────── */
    .navbar {
      display: flex;
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 60px;
    }

    /* ── Logo ─────────────────────────────────────────────── */
    .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      margin-right: 40px;
      flex-shrink: 0;
      line-height: 1;
    }
    .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #111;
      letter-spacing: -0.3px;
    }
    .logo-domain {
      font-size: 0.58rem;
      color: #aaa;
      font-weight: 400;
      margin-top: 2px;
    }

    /* ── Center nav ───────────────────────────────────────── */
    .nav-center {
      display: flex;
      align-items: stretch;
      gap: 0;
      flex: 1;
      height: 100%;
    }

    /* nav item — controls dropdown */
    .nav-item {
      position: static;
      display: flex;
      align-items: center;
    }

    /* trigger */
    .nav-trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0 14px;
      height: 60px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #111;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition: color .15s, border-color .15s;
    }
    .nav-trigger:hover,
    .nav-item:hover > .nav-trigger {
      color: #111;
      border-bottom-color: #111;
    }

    /* active underline on the trigger when open */
    .nav-item:hover > .nav-trigger {
      border-bottom-color: #111;
    }

    /* chevron */
    .nav-trigger svg {
      width: 12px;
      height: 12px;
      color: #666;
      transition: transform .2s;
      flex-shrink: 0;
    }
    .nav-item:hover > .nav-trigger svg {
      transform: rotate(180deg);
    }

    /* plain link */
    .nav-plain {
      display: inline-flex;
      align-items: center;
      padding: 0 14px;
      height: 60px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #111;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      transition: border-color .15s;
    }
    .nav-plain:hover { border-bottom-color: #111; }

    /* ── MEGA DROPDOWN — full width, NO border-radius ─────── */
    .mega {
      display: none;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      box-shadow: 0 6px 20px rgba(0,0,0,.08);
      z-index: 999;
    }
    .nav-item:hover .mega { display: block; }

    /* inner */
    .mega-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 24px 28px;
      display: flex;
      gap: 0;
    }

    /* left: columns */
    .mega-left {
      flex: 1;
      display: flex;
      gap: 48px;
      padding-right: 40px;
      border-right: 1px solid #ebebeb;
    }

    /* column */
    .mega-col {}
    .mega-col-heading {
      font-size: 0.72rem;
      font-weight: 700;
      color: #111;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 14px;
      display: block;
    }
    .mega-col-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .mega-col-list li a {
      display: block;
      padding: 5px 0;
      font-size: 0.875rem;
      color: #333;
      text-decoration: none;
      transition: color .12s;
      white-space: nowrap;
    }
    /* HOVER = underline, no background */
    .mega-col-list li a:hover {
      color: #111;
      text-decoration: underline;
    }

    /* right: promo card */
    .mega-right {
      width: 240px;
      flex-shrink: 0;
      padding-left: 40px;
      display: flex;
      flex-direction: column;
    }
    .promo-card {
      border-radius: 12px;
      padding: 22px 20px 20px;
      color: #fff;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .promo-tag {
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: rgba(255,255,255,.75);
      margin-bottom: 10px;
      display: block;
    }
    .promo-title {
      font-family: 'Poppins', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 10px;
      white-space: pre-line;
    }
    .promo-body {
      font-size: 0.78rem;
      line-height: 1.55;
      color: rgba(255,255,255,.85);
      margin-bottom: 18px;
      flex: 1;
    }
    .promo-cta {
      display: inline-block;
      background: #fff;
      color: #111;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      align-self: flex-start;
      transition: opacity .15s;
    }
    .promo-cta:hover { opacity: .85; }

    /* ── Right side ───────────────────────────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Log In — outline pill */
    .btn-login {
      padding: 8px 22px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #111;
      background: transparent;
      border: 1.5px solid #bbb;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      transition: border-color .15s, background .15s;
      white-space: nowrap;
    }
    .btn-login:hover { border-color: #111; background: #f5f5f5; }

    /* Sign Up — filled black pill */
    .btn-signup {
      padding: 8px 22px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #fff;
      background: #111;
      border: 1.5px solid #111;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      transition: background .15s;
      white-space: nowrap;
    }
    .btn-signup:hover { background: #333; border-color: #333; }

    /* Avatar */
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      font-weight: 700;
      font-size: 0.85rem;
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

  private chevron() {
    return html`<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"/>
    </svg>`;
  }

  private renderMega(menu: MenuData) {
    return html`
      <div class="mega">
        <div class="mega-inner">

          <!-- Columns (no icons, plain text) -->
          <div class="mega-left">
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
          <div class="mega-right">
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
          <span class="logo-domain">entertainingzen.com</span>
        </a>

        <!-- Center nav -->
        <div class="nav-center">

          <div class="nav-item">
            <button class="nav-trigger">Browse ${this.chevron()}</button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <a href="/pricing" class="nav-plain">Pricing</a>

          <div class="nav-item">
            <button class="nav-trigger">Creators ${this.chevron()}</button>
            ${this.renderMega(CREATORS_MENU)}
          </div>

          <div class="nav-item">
            <button class="nav-trigger">Resources ${this.chevron()}</button>
            ${this.renderMega(RESOURCES_MENU)}
          </div>

          <a href="/enterprise" class="nav-plain">Enterprise</a>

        </div>

        <!-- Right -->
        <div class="nav-right">
          ${isAuth ? html`
            <a href="/profile" class="avatar" title="${user?.username}">
              ${user?.username?.charAt(0).toUpperCase() ?? 'U'}
            </a>
            <button class="btn-login" @click=${() => authService.logout()}>Log Out</button>
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
