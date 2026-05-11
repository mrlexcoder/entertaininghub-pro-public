import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { contentService } from '../services/content-service';
import '../components/content/content-card';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
    :host { display: block; }

    /* ── Hero ─────────────────────────────────────────────── */
    .hero {
      background: linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #fff0f6 100%);
      padding: 88px 24px 96px;
      text-align: center;
    }

    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;       /* 14px */
      font-weight: 600;
      color: #6366f1;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-radius: 999px;
      padding: 6px 16px;
      margin-bottom: 24px;
      letter-spacing: 0.2px;
    }

    .hero-title {
      font-family: var(--font-family-heading, 'Poppins', sans-serif);
      font-size: clamp(2.5rem, 6vw, 4rem);   /* 40-64px fluid */
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      margin-bottom: 24px;
      max-width: 820px;
      margin-left: auto;
      margin-right: auto;
      letter-spacing: -0.03em;
    }

    .hero-title span {
      background: linear-gradient(135deg, #6366f1, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-sub {
      font-size: clamp(1.0625rem, 2vw, 1.25rem);  /* 17-20px fluid */
      color: #475569;
      max-width: 600px;
      margin: 0 auto 40px;
      line-height: 1.7;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-hero-primary {
      padding: 14px 32px;
      background: #1a1a1a;
      color: #fff;
      font-size: 1rem;           /* 16px */
      font-weight: 600;
      border-radius: 999px;
      text-decoration: none;
      transition: background .15s;
      letter-spacing: 0.01em;
    }
    .btn-hero-primary:hover { background: #333; }

    .btn-hero-outline {
      padding: 14px 32px;
      background: transparent;
      color: #1a1a1a;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 999px;
      border: 1.5px solid #c8c8c8;
      text-decoration: none;
      transition: border-color .15s, background .15s;
    }
    .btn-hero-outline:hover { border-color: #1a1a1a; background: #f5f5f5; }

    /* ── Category pills ───────────────────────────────────── */
    .categories {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 40px 24px 0;
      max-width: 1300px;
      margin: 0 auto;
    }

    .cat-pill {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 10px 20px;
      background: #fff;
      border: 1.5px solid #e2e8f0;
      border-radius: 999px;
      font-size: 0.9375rem;      /* 15px */
      font-weight: 500;
      color: #334155;
      text-decoration: none;
      transition: border-color .15s, background .15s, color .15s;
      box-shadow: 0 1px 3px rgba(0,0,0,.05);
    }
    .cat-pill:hover {
      border-color: #6366f1;
      background: #f0f0ff;
      color: #6366f1;
    }

    /* ── Stats bar ────────────────────────────────────────── */
    .stats-bar {
      background: #fff;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
      margin-top: 48px;
    }
    .stats-inner {
      max-width: 1300px;
      margin: 0 auto;
      padding: 32px 24px;
      display: flex;
      justify-content: center;
      gap: 72px;
      flex-wrap: wrap;
    }
    .stat-item { text-align: center; }
    .stat-value {
      font-family: var(--font-family-heading, 'Poppins', sans-serif);
      font-size: 2rem;           /* 32px */
      font-weight: 800;
      color: #0f172a;
      display: block;
      letter-spacing: -0.02em;
    }
    .stat-label {
      font-size: 0.9375rem;      /* 15px */
      color: #64748b;
      margin-top: 4px;
      font-weight: 400;
    }

    /* ── Content sections ─────────────────────────────────── */
    .sections {
      max-width: 1300px;
      margin: 0 auto;
      padding: 64px 24px;
    }

    .section { margin-bottom: 64px; }

    .section-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 24px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 14px;
    }

    .section-title {
      font-family: var(--font-family-heading, 'Poppins', sans-serif);
      font-size: 1.5rem;         /* 24px */
      font-weight: 700;
      color: #0f172a;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .view-all {
      font-size: 0.9375rem;      /* 15px */
      font-weight: 600;
      color: #6366f1;
      text-decoration: none;
      transition: color .15s;
    }
    .view-all:hover { color: #4f46e5; }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 22px;
    }

    /* ── Skeleton loading ─────────────────────────────────── */
    .loading-row {
      display: flex;
      gap: 22px;
      overflow: hidden;
    }
    .skeleton {
      flex: 0 0 190px;
      height: 285px;
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 12px;
    }
    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .empty-state {
      text-align: center;
      padding: 56px;
      color: #94a3b8;
      font-size: 1rem;
    }

    /* ── Mobile ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .hero { padding: 56px 16px 64px; }

      .hero-eyebrow { font-size: 0.8125rem; }

      .hero-sub {
        font-size: 1rem;
        margin-bottom: 32px;
      }

      .btn-hero-primary,
      .btn-hero-outline {
        padding: 13px 28px;
        font-size: 0.9375rem;
      }

      .categories { padding: 28px 16px 0; gap: 8px; }
      .cat-pill { padding: 9px 16px; font-size: 0.875rem; }

      .stats-inner { gap: 40px; padding: 24px 16px; }
      .stat-value { font-size: 1.625rem; }
      .stat-label { font-size: 0.875rem; }

      .sections { padding: 40px 16px; }
      .section { margin-bottom: 48px; }
      .section-title { font-size: 1.25rem; }
      .view-all { font-size: 0.875rem; }

      .content-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 14px;
      }
      .skeleton { flex: 0 0 150px; height: 225px; }
    }

    @media (max-width: 480px) {
      .hero { padding: 40px 16px 48px; }
      .stats-inner { gap: 28px; }
      .stat-value { font-size: 1.375rem; }
      .content-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    }
  `;

  private trendingTask = new Task(this, {
    task: () => contentService.getTrending(10),
    args: () => [],
  });

  private skeletons(n = 6) {
    return html`
      <div class="loading-row">
        ${Array(n).fill(0).map(() => html`<div class="skeleton"></div>`)}
      </div>
    `;
  }

  render() {
    return html`
      <section class="hero">
        <div class="hero-eyebrow">✨ New — AI-Powered Recommendations</div>
        <h1 class="hero-title">
          Your Ultimate<br>
          <span>Entertainment Hub</span>
        </h1>
        <p class="hero-sub">
          Movies, Series, Anime, Gaming & Documentaries — all in one place,
          curated by AI and loved by fans.
        </p>
        <div class="hero-actions">
          <a href="/explore"  class="btn-hero-primary">Start Exploring</a>
          <a href="/register" class="btn-hero-outline">Sign Up Free</a>
        </div>
      </section>

      <div class="categories">
        ${[
          { icon: '🎬', label: 'Movies',        href: '/category/movie'       },
          { icon: '📺', label: 'Series',         href: '/category/series'      },
          { icon: '🎌', label: 'Anime',          href: '/category/anime'       },
          { icon: '🎮', label: 'Gaming',         href: '/category/gaming'      },
          { icon: '🎥', label: 'Documentaries',  href: '/category/documentary' },
          { icon: '🔞', label: '18+ Series',     href: '/category/18plus'      },
          { icon: '🔥', label: 'Trending',       href: '/trending'             },
        ].map(c => html`
          <a href="${c.href}" class="cat-pill">
            <span>${c.icon}</span>${c.label}
          </a>
        `)}
      </div>

      <div class="stats-bar">
        <div class="stats-inner">
          ${[
            { value: '10K+', label: 'Titles Available' },
            { value: '50K+', label: 'Active Users'     },
            { value: '200+', label: 'Indie Creators'   },
            { value: '4.8★', label: 'Average Rating'   },
          ].map(s => html`
            <div class="stat-item">
              <span class="stat-value">${s.value}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `)}
        </div>
      </div>

      <div class="sections">
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">🔥 Trending Now</h2>
            <a href="/trending" class="view-all">View all →</a>
          </div>
          ${this.trendingTask.render({
            pending: () => this.skeletons(6),
            complete: (items) => items.length
              ? html`<div class="content-grid">
                  ${items.map(c => html`<content-card .content=${c}></content-card>`)}
                </div>`
              : html`<p class="empty-state">No trending content yet.</p>`,
            error: () => html`<p class="empty-state">Could not load content.</p>`,
          })}
        </section>

        <section class="section">
          <div class="section-header">
            <h2 class="section-title">🎬 Movies</h2>
            <a href="/category/movie" class="view-all">View all →</a>
          </div>
          <div class="content-grid"></div>
        </section>

        <section class="section">
          <div class="section-header">
            <h2 class="section-title">📺 Series</h2>
            <a href="/category/series" class="view-all">View all →</a>
          </div>
          <div class="content-grid"></div>
        </section>

        <section class="section">
          <div class="section-header">
            <h2 class="section-title">🎌 Anime</h2>
            <a href="/category/anime" class="view-all">View all →</a>
          </div>
          <div class="content-grid"></div>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage;
  }
}
