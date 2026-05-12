import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ── Types ─────────────────────────────────────────────────── */
interface MenuItem  { label: string; href: string; }
interface MenuCol   { heading: string; items: MenuItem[]; }
interface MenuPromo { bg: string; imgText: string; tagline: string; body: string; }
interface MenuData  { cols: MenuCol[]; promo: MenuPromo; }

/* ── Menu data ─────────────────────────────────────────────── */
const BROWSE_MENU: MenuData = {
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
    bg:      'linear-gradient(160deg,#7c3aed 0%,#a855f7 55%,#c084fc 100%)',
    imgText: 'EntertainingHub\nPremium✦',
    tagline: 'TRY PREMIUM FOR FREE',
    body:    'The platform that unifies all entertainment with AI-powered recommendations.',
  },
};

const OTHERS_MENU: MenuData = {
  cols: [
    {
      heading: 'By Language',
      items: [
        { label: 'Japanese',        href: '/explore?lang=japanese'        },
        { label: 'Korean',          href: '/explore?lang=korean'          },
        { label: 'Chinese',         href: '/explore?lang=chinese'         },
        { label: 'Spanish',         href: '/explore?lang=spanish'         },
        { label: 'French',          href: '/explore?lang=french'          },
        { label: 'Hindi',           href: '/explore?lang=hindi'           },
      ],
    },
    {
      heading: 'Mature Content',
      items: [
        { label: 'Adults (18+)',    href: '/category/18plus'              },
        { label: 'Mature Anime',    href: '/explore?genre=mature-anime'   },
        { label: 'Mature Series',   href: '/explore?genre=mature-series'  },
        { label: 'Erotic Thriller', href: '/explore?genre=erotic-thriller'},
      ],
    },
    {
      heading: 'World Cinema',
      items: [
        { label: 'K-Drama',         href: '/explore?genre=kdrama'         },
        { label: 'J-Drama',         href: '/explore?genre=jdrama'         },
        { label: 'Bollywood',       href: '/explore?genre=bollywood'      },
        { label: 'European Films',  href: '/explore?genre=european'       },
        { label: 'Latin Cinema',    href: '/explore?genre=latin'          },
      ],
    },
  ],
  promo: {
    bg:      'linear-gradient(160deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)',
    imgText: 'World\nContent',
    tagline: 'GLOBAL ENTERTAINMENT',
    body:    'Explore content from Japan, Korea, China, India and beyond.',
  },
};

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
      background: var(--nav-bg);
      border-bottom: 1px solid var(--nav-border);
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    :host(.menu-open) {
      border-bottom-color: transparent;
    }

    /* ── Navbar ───────────────────────────────────────────── */
    .navbar {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      max-width: 1300px;
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
      color: var(--nav-text);
      letter-spacing: -0.4px;
      font-family: var(--font);
      transition: color 0.25s;
    }
    .logo-sub {
      font-size: 10px;
      font-weight: 400;
      color: var(--nav-text-muted);
      font-family: var(--font);
      transition: color 0.25s;
    }

    /* ── Center nav ───────────────────────────────────────── */
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

    /* trigger button */
    .nav-trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0 14px;
      height: 64px;
      font-family: var(--font);
      font-size: 18px;
      font-weight: 500;
      color: var(--nav-text);
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      line-height: 1;
      transition: color 0.25s;
    }

    .trigger-text {
      border-bottom: 2px solid transparent;
      padding-bottom: 1px;
      transition: border-color 0.15s;
    }
    .nav-trigger:hover .trigger-text { border-bottom-color: var(--nav-hover-border); }
    .nav-item.open .trigger-text     { border-bottom-color: var(--nav-hover-border); }

    .chevron {
      width: 11px;
      height: 11px;
      color: var(--nav-text-muted);
      flex-shrink: 0;
      transition: transform 0.2s, color 0.25s;
    }
    .nav-item.open .chevron { transform: rotate(180deg); }

    /* plain link */
    .nav-plain {
      display: inline-flex;
      align-items: center;
      padding: 0 14px;
      height: 64px;
      font-family: var(--font);
      font-size: 18px;
      font-weight: 500;
      color: var(--nav-text);
      text-decoration: none;
      white-space: nowrap;
      transition: color 0.25s;
    }
    .nav-plain span {
      border-bottom: 2px solid transparent;
      padding-bottom: 1px;
      transition: border-color 0.15s;
    }
    .nav-plain:hover span { border-bottom-color: var(--nav-hover-border); }

    /* ── Mega dropdown ────────────────────────────────────── */
    .mega {
      display: none;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: var(--nav-mega-bg);
      border-top: 1px solid var(--nav-mega-border);
      box-shadow: var(--nav-mega-shadow);
      z-index: 999;
      transition: background 0.25s ease;
    }
    .nav-item.open .mega { display: block; }

    .mega-inner {
      max-width: 1300px;
      margin: 0 auto;
      padding: 28px 28px 24px;
      display: flex;
      align-items: flex-start;
      font-family: var(--font);
    }

    /* ── Columns ──────────────────────────────────────────── */
    .mega-cols {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      gap: 0;
      padding-right: 40px;
      border-right: 1px solid var(--nav-col-divider);
    }

    .mega-col { min-width: 130px; }

    .mega-col-heading {
      display: block;
      font-family: var(--font);
      font-size: 17px;
      font-weight: 700;
      color: var(--nav-text);
      margin-bottom: 14px;
      line-height: 1.3;
      transition: color 0.25s;
    }

    .mega-col-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .mega-col-list li a {
      display: block;
      padding: 5px 0;
      font-family: var(--font);
      font-size: 15px;
      font-weight: 400;
      color: var(--nav-link-color);
      text-decoration: none;
      line-height: 1.5;
      white-space: nowrap;
      transition: color 0.1s;
    }
    .mega-col-list li a:hover {
      color: var(--nav-link-hover);
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* ── Promo panel ──────────────────────────────────────── */
    .mega-promo {
      width: 240px;
      flex-shrink: 0;
      padding-left: 40px;
    }

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

    .promo-tagline {
      display: block;
      font-family: var(--font);
      font-size: 13px;
      font-weight: 700;
      color: var(--nav-promo-tag);
      letter-spacing: 0.2px;
      margin-bottom: 6px;
      transition: color 0.25s;
    }
    .promo-body {
      font-family: var(--font);
      font-size: 15px;
      font-weight: 400;
      color: var(--nav-promo-body);
      line-height: 1.55;
      margin: 0;
      transition: color 0.25s;
    }

    /* ── Backdrop ─────────────────────────────────────────── */
    .backdrop {
      position: fixed;
      inset: 64px 0 0 0;
      z-index: 998;
      background: transparent;
      pointer-events: none;
      display: block;
    }
    .backdrop.on { pointer-events: all; }

    /* ── Right: buttons + theme toggle ───────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Theme toggle button */
    .btn-theme {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 999px;
      border: 1.5px solid var(--btn-login-border);
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      transition: border-color 0.15s, background 0.15s;
      flex-shrink: 0;
    }
    .btn-theme:hover {
      border-color: var(--nav-hover-border);
      background: var(--btn-login-hover-bg);
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
      color: var(--btn-login-color);
      background: transparent;
      border: 1.5px solid var(--btn-login-border);
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: border-color 0.15s, background 0.15s, color 0.25s;
    }
    .btn-login:hover {
      border-color: var(--nav-hover-border);
      background: var(--btn-login-hover-bg);
    }

    /* Sign Up — filled pill */
    .btn-signup {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 24px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 600;
      color: var(--btn-signup-color);
      background: var(--btn-signup-bg);
      border: 1.5px solid var(--btn-signup-bg);
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      line-height: 1;
      transition: background 0.15s, border-color 0.15s, color 0.25s;
    }
    .btn-signup:hover {
      background: var(--btn-signup-hover);
      border-color: var(--btn-signup-hover);
    }

    /* Avatar — intentional hardcoded brand color */
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
  @state() private isDark = false;

  connectedCallback() {
    super.connectedCallback();
    const saved = localStorage.getItem('eh-theme');
    if (saved === 'dark') this.applyTheme(true);
  }

  private applyTheme(dark: boolean) {
    this.isDark = dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('eh-theme', dark ? 'dark' : 'light');
  }

  private toggleTheme() {
    this.applyTheme(!this.isDark);
  }

  private toggle(name: string) {
    this.openMenu = this.openMenu === name ? null : name;
    this.classList.toggle('menu-open', this.openMenu !== null);
  }

  private close() {
    this.openMenu = null;
    this.classList.remove('menu-open');
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
            ${menu.cols.map((col: MenuCol) => html`
              <div class="mega-col">
                <span class="mega-col-heading">${col.heading}</span>
                <ul class="mega-col-list">
                  ${col.items.map((item: MenuItem) => html`
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

          <!-- Promo -->
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

          <!-- 1. Browse (mega menu) -->
          <div class="nav-item ${this.openMenu === 'browse' ? 'open' : ''}">
            <button class="nav-trigger"
                    @click=${() => this.toggle('browse')}
                    aria-expanded="${this.openMenu === 'browse'}">
              <span class="trigger-text">Browse</span>
              ${this.chevronSvg()}
            </button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <!-- 2. Pricing (plain link) -->
          <a href="/pricing" class="nav-plain" @click=${() => this.close()}>
            <span>Pricing</span>
          </a>

          <!-- 3. Anime (plain link) -->
          <a href="/category/anime" class="nav-plain" @click=${() => this.close()}>
            <span>Anime</span>
          </a>

          <!-- 4. Gaming (plain link) -->
          <a href="/category/gaming" class="nav-plain" @click=${() => this.close()}>
            <span>Gaming</span>
          </a>

          <!-- 5. Others (mega menu) -->
          <div class="nav-item ${this.openMenu === 'others' ? 'open' : ''}">
            <button class="nav-trigger"
                    @click=${() => this.toggle('others')}
                    aria-expanded="${this.openMenu === 'others'}">
              <span class="trigger-text">Others</span>
              ${this.chevronSvg()}
            </button>
            ${this.renderMega(OTHERS_MENU)}
          </div>

        </div>

        <!-- Right: theme toggle + auth -->
        <div class="nav-right">
          <button class="btn-theme"
                  @click=${() => this.toggleTheme()}
                  title="${this.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}"
                  aria-label="Toggle theme">
            ${this.isDark ? '☀️' : '🌙'}
          </button>

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
