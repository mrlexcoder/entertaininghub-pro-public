import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

/* ─────────────────────────────────────────────────────────────
   Menu data — tailored to entertainingzen.com
───────────────────────────────────────────────────────────── */
const BROWSE_MENU = {
  heading: 'Browse',
  cols: [
    {
      label: 'CONTENT',
      items: [
        { icon: '🎬', title: 'Movies',        desc: 'Hollywood, Bollywood & world cinema',  href: '/category/movie'       },
        { icon: '📺', title: 'Series',         desc: 'Binge-worthy shows & seasons',         href: '/category/series'      },
        { icon: '🎌', title: 'Anime',          desc: 'Japanese animation & manga adaptations',href: '/category/anime'       },
        { icon: '🎥', title: 'Documentaries',  desc: 'Real stories, real impact',            href: '/category/documentary' },
        { icon: '🎮', title: 'Gaming',         desc: 'Game reviews, trailers & walkthroughs',href: '/category/gaming'      },
        { icon: '🔞', title: '18+ Series',     desc: 'Mature content for adult audiences',   href: '/category/18plus'      },
      ],
    },
    {
      label: 'DISCOVER',
      items: [
        { icon: '🔥', title: 'Trending Now',   desc: 'What everyone is watching today',      href: '/trending'             },
        { icon: '⭐', title: 'Top Rated',       desc: 'Highest rated across all categories',  href: '/explore?sort=top'     },
        { icon: '🆕', title: 'New Releases',   desc: 'Fresh titles added this week',         href: '/explore?sort=new'     },
        { icon: '🤖', title: 'Recommended',    desc: 'AI-curated picks just for you',        href: '/recommendations'      },
      ],
    },
  ],
  whatsNew: [
    { icon: '✨', title: 'AI Recommendations', badge: 'New',  desc: 'Personalised picks powered by AI'       },
    { icon: '🎭', title: 'Anime Movies',        badge: 'Beta', desc: 'Full-length anime films now available'  },
    { icon: '📱', title: 'Mobile PWA',          badge: 'Beta', desc: 'Install EntertainingHub on your phone'  },
    { icon: '👥', title: 'Watchlists',          badge: null,   desc: 'Share lists with friends'               },
  ],
  footer: [
    { icon: '🗂️', label: 'Browse all categories' , href: '/explore'         },
    { icon: '📋', label: 'View use cases',          href: '/use-cases'       },
    { icon: '🚀', label: 'Join Early Access',       href: '/register'        },
  ],
};

const CREATORS_MENU = {
  heading: 'Creators',
  cols: [
    {
      label: 'TOOLS',
      items: [
        { icon: '📤', title: 'Upload Content',    desc: 'Publish movies, series & more',       href: '/creator/upload'    },
        { icon: '📊', title: 'Analytics',         desc: 'Track views, ratings & revenue',      href: '/creator/analytics' },
        { icon: '💰', title: 'Revenue Share',     desc: '60/40 split — earn from your content',href: '/creator/revenue'   },
        { icon: '🎛️', title: 'Creator Dashboard', desc: 'Manage all your content in one place',href: '/creator'           },
      ],
    },
    {
      label: 'PLATFORM',
      items: [
        { icon: '🔌', title: 'API Access',        desc: 'Integrate with our REST API',         href: '/api-docs'          },
        { icon: '🔗', title: 'Integrations',      desc: 'Connect with IMDb, TMDB & more',      href: '/integrations'      },
        { icon: '📝', title: 'Creator Blog',      desc: 'Tips, guides & platform updates',     href: '/blog'              },
      ],
    },
  ],
  whatsNew: [
    { icon: '💳', title: 'Stripe Payouts',   badge: 'New',  desc: 'Get paid directly to your bank'         },
    { icon: '📈', title: 'Advanced Stats',   badge: 'Beta', desc: 'Deep-dive analytics for creators'       },
    { icon: '🤝', title: 'Brand Deals',      badge: null,   desc: 'Connect with sponsors & advertisers'    },
  ],
  footer: [
    { icon: '🎬', label: 'Become a Creator',    href: '/creator'       },
    { icon: '📖', label: 'Creator Docs',         href: '/creator/docs'  },
    { icon: '💬', label: 'Creator Community',    href: '/community'     },
  ],
};

const RESOURCES_MENU = {
  heading: 'Resources',
  cols: [
    {
      label: 'LEARN',
      items: [
        { icon: '📚', title: 'Blog',           desc: 'Articles, news & entertainment guides', href: '/blog'       },
        { icon: '❓', title: 'Help Center',    desc: 'FAQs and support documentation',        href: '/help'       },
        { icon: '🗺️', title: 'Roadmap',        desc: 'See what we\'re building next',         href: '/roadmap'    },
        { icon: '📣', title: 'Changelog',      desc: 'Latest updates and releases',           href: '/changelog'  },
      ],
    },
  ],
  whatsNew: [
    { icon: '🎙️', title: 'EntertainZen Podcast', badge: 'New', desc: 'Weekly entertainment deep-dives'       },
    { icon: '📰', title: 'Newsletter',            badge: null,  desc: 'Weekly picks straight to your inbox'  },
  ],
  footer: [
    { icon: '📖', label: 'Read the blog',       href: '/blog'      },
    { icon: '🆘', label: 'Get support',          href: '/help'      },
  ],
};

type MenuData = typeof BROWSE_MENU;

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    /* ── Reset & host ─────────────────────────────────────── */
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
    }

    /* ── Navbar row ───────────────────────────────────────── */
    .navbar {
      display: flex;
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 60px;
      gap: 0;
    }

    /* ── Logo ─────────────────────────────────────────────── */
    .logo {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      margin-right: 36px;
      flex-shrink: 0;
      line-height: 1;
    }
    .logo-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #111;
      letter-spacing: -0.4px;
    }
    .logo-domain {
      font-size: 0.58rem;
      color: #999;
      font-weight: 500;
      letter-spacing: 0.2px;
      margin-top: 1px;
    }

    /* ── Center nav ───────────────────────────────────────── */
    .nav-center {
      display: flex;
      align-items: center;
      gap: 0;
      flex: 1;
    }

    /* nav item wrapper — controls dropdown visibility */
    .nav-item {
      position: static; /* dropdown is full-width, positioned on :host */
    }

    /* trigger button / link */
    .nav-trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #111;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color .15s, border-color .15s;
      white-space: nowrap;
      height: 60px;
    }
    .nav-trigger:hover,
    .nav-item:hover > .nav-trigger {
      color: #ff4f00;           /* Zapier-style orange accent */
      border-bottom-color: #ff4f00;
    }

    /* chevron */
    .nav-trigger svg {
      width: 13px;
      height: 13px;
      color: #666;
      transition: transform .2s;
      flex-shrink: 0;
    }
    .nav-item:hover > .nav-trigger svg {
      transform: rotate(180deg);
      color: #ff4f00;
    }

    /* plain link (no dropdown) */
    .nav-plain {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #111;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      height: 60px;
      transition: color .15s, border-color .15s;
      white-space: nowrap;
    }
    .nav-plain:hover {
      color: #ff4f00;
      border-bottom-color: #ff4f00;
    }

    /* ── MEGA DROPDOWN ────────────────────────────────────── */
    .mega {
      display: none;
      position: fixed;          /* full-width across viewport */
      top: 60px;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      box-shadow: 0 8px 24px rgba(0,0,0,.10);
      z-index: 999;
      /* NO border-radius — flat Zapier style */
    }
    .nav-item:hover .mega {
      display: block;
    }

    /* inner layout */
    .mega-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 24px 0;
      display: flex;
      gap: 0;
    }

    /* left: columns area */
    .mega-left {
      flex: 1;
      display: flex;
      gap: 48px;
      padding-right: 32px;
      border-right: 1px solid #ebebeb;
    }

    /* column */
    .mega-col-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 16px;
    }
    .mega-col-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 220px;
    }

    /* item row */
    .mega-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 6px;
      text-decoration: none;
      transition: background .12s;
    }
    .mega-item:hover { background: #f7f7f7; }
    .mega-item-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-top: 1px;
      width: 24px;
      text-align: center;
    }
    .mega-item-text {}
    .mega-item-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111;
      display: block;
      line-height: 1.3;
    }
    .mega-item-desc {
      font-size: 0.78rem;
      color: #666;
      display: block;
      margin-top: 1px;
      line-height: 1.4;
    }

    /* right: What's New panel */
    .mega-right {
      width: 280px;
      flex-shrink: 0;
      padding-left: 32px;
    }
    .whats-new-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 16px;
    }
    .wn-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .wn-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: default;
      transition: background .12s;
    }
    .wn-item:hover { background: #f7f7f7; }
    .wn-icon {
      font-size: 1.1rem;
      flex-shrink: 0;
      width: 22px;
      text-align: center;
      margin-top: 1px;
    }
    .wn-body {}
    .wn-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .wn-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #111;
    }
    .wn-badge {
      font-size: 0.6rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 3px;
      background: #fff3e0;
      color: #e65100;
      letter-spacing: 0.3px;
    }
    .wn-badge.beta {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .wn-desc {
      font-size: 0.76rem;
      color: #777;
      margin-top: 1px;
      line-height: 1.4;
    }

    /* mega footer strip */
    .mega-footer {
      max-width: 1280px;
      margin: 0 auto;
      padding: 14px 24px;
      display: flex;
      gap: 28px;
      border-top: 1px solid #ebebeb;
      margin-top: 24px;
    }
    .mega-footer-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      font-weight: 500;
      color: #444;
      text-decoration: none;
      transition: color .12s;
    }
    .mega-footer-link:hover { color: #ff4f00; }
    .mega-footer-link span { font-size: 0.9rem; }

    /* ── Right side ───────────────────────────────────────── */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Log In — outline pill */
    .btn-login {
      padding: 7px 20px;
      font-size: 0.85rem;
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
      padding: 7px 20px;
      font-size: 0.85rem;
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

    /* ── Mobile hide ──────────────────────────────────────── */
    @media (max-width: 900px) {
      .nav-center { display: none; }
      .mega       { display: none !important; }
    }
  `;

  @consume({ context: authContext, subscribe: true })
  @state() private authState?: AuthState;

  /* chevron SVG */
  private chevron() {
    return html`<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"/>
    </svg>`;
  }

  /* render a full mega panel */
  private renderMega(menu: MenuData) {
    return html`
      <div class="mega">
        <div class="mega-inner">

          <!-- Left: columns -->
          <div class="mega-left">
            ${menu.cols.map(col => html`
              <div>
                <p class="mega-col-label">${col.label}</p>
                <div class="mega-col-items">
                  ${col.items.map(item => html`
                    <a href="${item.href}" class="mega-item">
                      <span class="mega-item-icon">${item.icon}</span>
                      <span class="mega-item-text">
                        <span class="mega-item-title">${item.title}</span>
                        <span class="mega-item-desc">${item.desc}</span>
                      </span>
                    </a>
                  `)}
                </div>
              </div>
            `)}
          </div>

          <!-- Right: What's New -->
          <div class="mega-right">
            <p class="whats-new-label">WHAT'S NEW</p>
            <div class="wn-items">
              ${menu.whatsNew.map(w => html`
                <div class="wn-item">
                  <span class="wn-icon">${w.icon}</span>
                  <div class="wn-body">
                    <div class="wn-title-row">
                      <span class="wn-title">${w.title}</span>
                      ${w.badge ? html`
                        <span class="wn-badge ${w.badge.toLowerCase() === 'beta' ? 'beta' : ''}">
                          ${w.badge}
                        </span>` : ''}
                    </div>
                    <span class="wn-desc">${w.desc}</span>
                  </div>
                </div>
              `)}
            </div>
          </div>

        </div>

        <!-- Footer strip -->
        <div class="mega-footer">
          ${menu.footer.map(f => html`
            <a href="${f.href}" class="mega-footer-link">
              <span>${f.icon}</span>${f.label}
            </a>
          `)}
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

          <!-- Browse -->
          <div class="nav-item">
            <button class="nav-trigger">Browse ${this.chevron()}</button>
            ${this.renderMega(BROWSE_MENU)}
          </div>

          <!-- Creators -->
          <div class="nav-item">
            <button class="nav-trigger">Creators ${this.chevron()}</button>
            ${this.renderMega(CREATORS_MENU)}
          </div>

          <!-- Resources -->
          <div class="nav-item">
            <button class="nav-trigger">Resources ${this.chevron()}</button>
            ${this.renderMega(RESOURCES_MENU)}
          </div>

          <!-- Plain links -->
          <a href="/enterprise" class="nav-plain">Enterprise</a>
          <a href="/pricing"    class="nav-plain">Pricing</a>

        </div>

        <!-- Right side -->
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
