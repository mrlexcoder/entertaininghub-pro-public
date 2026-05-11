import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ── Menu data ─────────────────────────────────────────────── */
const BROWSE_MENU = {
  cols: [
    {
      heading: 'Start Here',
      items: [
        { label: 'All Content',           href: '/explore'              },
        { label: 'New Releases',          href: '/explore?sort=new'     },
        { label: 'Top Rated',             href: '/explore?sort=top'     },
        { label: 'Free to Watch',         href: '/explore?tier=free'    },
        { label: 'Trending Now',          href: '/trending'             },
      ],
    },
    {
      heading: 'Find the Right Content',
      items: [
        { label: 'Movies',                href: '/category/movie'       },
        { label: 'Series',                href: '/category/series'      },
        { label: 'Anime',                 href: '/category/anime'       },
        { label: 'Anime Movies',          href: '/category/anime-movie' },
        { label: 'Documentaries',         href: '/category/documentary' },
        { label: 'Gaming',                href: '/category/gaming'      },
        { label: '18+ Series',            href: '/category/18plus'      },
      ],
    },
    {
      heading: 'Discover',
      items: [
        { label: 'Recommended for You',   href: '/recommendations'      },
        { label: 'By Genre',              href: '/explore?view=genre'   },
        { label: 'By Language',           href: '/explore?view=lang'    },
        { label: 'Watchlist',             href: '/watchlist'            },
      ],
    },
    {
      heading: 'Top Picks',
      items: [
        { label: 'Action Movies',         href: '/explore?genre=action'   },
        { label: 'Thriller Series',       href: '/explore?genre=thriller' },
        { label: 'Shonen Anime',          href: '/explore?genre=shonen'   },
        { label: 'Other Content',         href: '/explore'                },
      ],
    },
  ],
  promo: {
    bg:       'linear-gradient(160deg,#7c3aed 0%,#a855f7 55%,#c084fc 100%)',
    imgText:  'EntertainingHub\nPremium✦',
    tagline:  'TRY PREMIUM FOR FREE',
    body:     'The platform that unifies all entertainment with AI-powered recommendations.',
  },
};

const CREATORS_MENU = {
  cols: [
    {
      heading: 'Creator Tools',
      items: [
        { label: 'Creator Dashboard',     href: '/creator'            },
        { label: 'Upload Content',        href: '/creator/upload'     },
        { label: 'Revenue Share',         href: '/creator/revenue'    },
        { label: 'Analytics',             href: '/creator/analytics'  },
        { label: 'Creator Blog',          href: '/blog'               },
      ],
    },
    {
      heading: 'Platform',
      items: [
        { label: 'API Access',            href: '/api-docs'           },
        { label: 'Integrations',          href: '/integrations'       },
        { label: 'App Center',            href: '/apps'               },
        { label: 'Data Sources',          href: '/data-sources'       },
      ],
    },
    {
      heading: 'Top Features',
      items: [
        { label: 'Stripe Payouts',        href: '/creator/payouts'    },
        { label: 'Advanced Stats',        href: '/creator/stats'      },
        { label: 'Brand Deals',           href: '/creator/brands'     },
        { label: 'Community',             href: '/community'          },
      ],
    },
  ],
  promo: {
    bg:       'linear-gradient(160deg,#0f172a 0%,#1e3a5f 55%,#0369a1 100%)',
    imgText:  'EntertainingHub\nCreator Hub',
    tagline:  'FOR CREATORS',
    body:     '60/40 revenue split. Real-time analytics. Grow your audience.',
  },
};

const RESOURCES_MENU = {
  cols: [
    {
      heading: 'Learn',
      items: [
        { label: 'Blog',                  href: '/blog'       },
        { label: 'Help Center',           href: '/help'       },
        { label: 'Roadmap',               href: '/roadmap'    },
        { label: 'Changelog',             href: '/changelog'  },
        { label: 'API Docs',              href: '/api-docs'   },
      ],
    },
    {
      heading: 'Company',
      items: [
        { label: 'About Us',              href: '/about'      },
        { label: 'Careers',               href: '/careers'    },
        { label: 'Press',                 href: '/press'      },
        { label: 'Contact',               href: '/contact'    },
      ],
    },
  ],
  promo: {
    bg:       'linear-gradient(160deg,#064e3b 0%,#065f46 55%,#10b981 100%)',
    imgText:  'EntertainingHub\nInsider',
    tagline:  'WEEKLY NEWSLETTER',
    body:     'Weekly picks, creator spotlights and platform updates.',
  },
};

type MenuData = typeof BROWSE_MENU;

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    /* ── Font + host ──────────────────────────────────────── */
    :host {
      --font: "Lazzer", ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        "Noto Sans", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #fff;
      /* bottom border only shows when no dropdown open */
      border-bottom: 1px solid #e2e2e2;
    }

    /* ── Navbar — 3-col grid: logo | center | buttons ─────── */
    .navbar {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 28px;
      height: 64px;
      font-family: var(--font);
    }

    /* ── Logo ─────────────────────────────────────────────── */
    .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      line-height: 1;
      gap: 3px;
    }
    .logo-name {
      font-size: 18px;
      font-weight: 800;
      color: #1a1a1a;
      letter-spacing: -0.4px;
      font-family: var(--font);
    }
    .logo-sub {
      font-size: 10px;
      font-weight: 400;
      color: #888;
      font-family: var(--font);
    }

    /* ── Center nav — truly centered ─────────────────────── */
    .nav-center {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .nav-item {
      position: static;
      display: flex;
      align-items: center;
      height: 100%;
    }

    /* ── Nav trigger button ───────────────────────────────── */
    .nav-trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0 14px;
      height: 64px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 500;
      color: #1a1a1a;
      background: none;
      border: none;
      /* underline lives on the text span, not the button */
      cursor: pointer;
      white-space: nowrap;
      line-height: 1;
    }

    /* text span inside trigger — gets the underline */
    .trigger-text {
      border-bottom: 2px solid transparent;
      padding-bottom: 1px;
      transition: border-color 0.15s;
    }
    /* hover: show underline */
    .nav-trigger:hover .trigger-text { border-bottom-color: #1a1a1a; }
    /* open: show underline */
    .nav-item.open .trigger-text { border-bottom-color: #1a1a1a; }

    /* chevron */
    .chevron {
      width: 11px;
      height: 11px;
      color: #555;
      flex-shrink: 0;
      transition: transform 0.2s;
    }
    .nav-item.open .chevron { transform: rotate(180deg); }

    /* plain link */
    .nav-plain {
      display: inline-flex;
      align-items: center;
      padding: 0 14px;
      height: 64px;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 500;
      color: #1a1a1a;
      text-decoration: none;
      white-space: nowrap;
    }
    .nav-plain span {
      border-bottom: 2px solid transparent;
      padding-bottom: 1px;
      transition: border-color 0.15s;
    }
    .nav-plain:hover span { border-bottom-color: #1a1a1a; }

    /* ── MEGA DROPDOWN ────────────────────────────────────── */
    /* Flush against navbar — no gap, no border-radius */
    .mega {
      display: none;
      position: fixed;
      top: 64px;          /* exactly navbar height — no gap */
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid #e2e2e2;
      border-bottom: 1px solid #e2e2e2;
      box-shadow: 0 8px 24px rgba(0,0,0,.10);
      z-index: 999;
    }
    .nav-item.open .mega { display: block; }

    /* inner */
    .mega-inner {
      max-width: 1440px;
      margin: 0 auto;
      padding: 28px 28px 24px;
      display: flex;
      align-items: flex-start;
      font-family: var(--font);
    }

    /* ── Columns ──────────────────────────────────────────── */
    .mega-cols {
      flex: 1;
      display: flex;
      gap: 48px;
      padding-right: 40px;
      border-right: 1px solid #ebebeb;
    }

    .mega-col { min-width: 130px; }

    /* heading — bold, ~12px, dark, no uppercase */
    .mega-col-heading {
      display: block;
      font-family: var(--font);
      font-size: 12px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    .mega-col-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .mega-col-list li a {
      display: block;
      padding: 4px 0;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 400;
      color: #333;
      text-decoration: none;
      line-height: 1.5;
      white-space: nowrap;
      transition: color 0.1s;
    }
    /* hover = underline only, no bg */
    .mega-col-list li a:hover {
      color: #1a1a1a;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── Promo panel — Semrush style: image box + text below ─ */
    .mega-promo {
      width: 240px;
      flex-shrink: 0;
      padding-left: 40px;
    }

    /* the coloured box (like Semrush's purple image) */
    .promo-img {
      width: 100%;
      height: 180px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      margin-bottom: 14px;
    }
    .promo-img-text {
      font-family: var(--font);
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      line-height: 1.15;
      white-space: pre-line;
      text-align: center;
      letter-spacing: -0.5px;
    }

    /* text below the image — like Semrush */
    .promo-tagline {
      display: block;
      font-family: var(--font);
      font-size: 11px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0.2px;
      margin-bottom: 6px;
    }
    .promo-body {
      font-family: var(--font);
      font-size: 13px;
      font-weight: 400;
      color: #444;
      line-height: 1.5;
      margin: 0;
    }

    /* ── Backdrop ─────────────────────────────────────────── */
    .backdrop {
      display: none;
      position: fixed;
      inset: 64px 0 0 0;
      z-index: 998;
      background: transparent;
    }
    .backdrop.on { display: block; }

    /* ── Right: buttons ───────────────────────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Log In — outline pill */
    .btn-login {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 24px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      background: transparent;
      border: 1.5px solid #b8b8b8;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: border-color 0.15s, background 0.15s;
    }
    .btn-login:hover { border-color: #1a1a1a; background: #f5f5f5; }

    /* Sign Up — filled black pill */
    .btn-signup {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 24px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: #1a1a1a;
      border: 1.5px solid #1a1a1a;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: background 0.15s, border-color 0.15s;
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
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      flex-shrink: 0;
      font-family: var(--font);
    }

    /* ── Mobile ───────────────────────────────────────────── */
    @media (max-width: 960px) {
      .nav-center { display: none; }
      .mega       { display: none !important; }
      .backdrop   { display: none !important; }
    }
  `;

  @consume({ context: authContext, subscribe: true })
  @state() private authState?: AuthState;

  @state() private openMenu: string | null = null;

  private toggle(name: string) {
    this.openMenu = this.openMenu === name ? null : name;
  }

  private close() {
    this.openMenu = null;
  }

  private chevronSvg() {
    return html`
      <svg class="chevron" viewBox="0 0 12 12" fill="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 4L6 8L10 4" stroke="currentColor"
              stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

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
                    <li>
                      <a href="${item.href}" @click=${() => this.close()}>
                        ${item.label}
                      </a>
                    </li>
                  `)}
                </ul>
              </div>
            `)}
          </div>

          <!-- Promo — image box + text below (Semrush style) -->
          <div class="mega-promo">
            <div class="promo-img" style="background:${menu.promo.bg}">
              <span class="promo-img-text">${menu.promo.imgText}</span>
            </div>
            <span class="promo-tagline">${menu.promo.tagline}</span>
            <p class="promo-body">${menu.promo.body}</p>
          </div>

        </div>
      </div>
    `;
  }

  render() {
    const isAuth = this.authState?.isAuthenticated;
    const user   = this.authState?.user;

    return html`
      <!-- Backdrop: click outside to close -->
      <div class="backdrop ${this.openMenu ? 'on' : ''}"
           @click=${() => this.close()}></div>

      <nav class="navbar">

        <!-- Logo -->
        <a href="/" class="logo">
          <span class="logo-name">EntertainingHub</span>
          <span class="logo-sub">entertainingzen.com</span>
        </a>

        <!-- Center nav -->
        <div class="nav-center">

          <!-- Browse -->
          <div class="nav-item ${this.openMenu === 'browse' ? 'open' : ''}">
            <button class="nav-trigger"
                    @click=${() => this.toggle('browse')}
                    aria-expanded="${this.openMenu === 'browse'}">
              <span class="trigger-text">Browse</span>
              ${this.chevronSvg()}
            </button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <!-- Pricing -->
          <a href="/pricing" class="nav-plain" @click=${() => this.close()}>
            <span>Pricing</span>
          </a>

          <!-- Creators -->
          <div class="nav-item ${this.openMenu === 'creators' ? 'open' : ''}">
            <button class="nav-trigger"
                    @click=${() => this.toggle('creators')}
                    aria-expanded="${this.openMenu === 'creators'}">
              <span class="trigger-text">Creators</span>
              ${this.chevronSvg()}
            </button>
            ${this.renderMega(CREATORS_MENU)}
          </div>

          <!-- Resources -->
          <div class="nav-item ${this.openMenu === 'resources' ? 'open' : ''}">
            <button class="nav-trigger"
                    @click=${() => this.toggle('resources')}
                    aria-expanded="${this.openMenu === 'resources'}">
              <span class="trigger-text">Resources</span>
              ${this.chevronSvg()}
            </button>
            ${this.renderMega(RESOURCES_MENU)}
          </div>

          <!-- Enterprise -->
          <a href="/enterprise" class="nav-plain" @click=${() => this.close()}>
            <span>Enterprise</span>
          </a>

        </div>

        <!-- Right: auth -->
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
