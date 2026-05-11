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
      padding: 72px 24px 80px;
      text-align: center;
    }
    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      color: #6366f1;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-radius: 999px;
      padding: 4px 14px;
      margin-bottom: 20px;
      letter-spacing: 0.3px;
    }
    .hero-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin-bottom: 20px;
      max-width: 760px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-title span {
      background: linear-gradient(135deg, #6366f1, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-sub {
      font-size: 1.05rem;
      color: #475569;
      max-width: 560px;
      margin: 0 auto 32px;
      line-height: 1.7;
    }
    .hero-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-hero-primary {
      padding: 12px 28px;
      background: #1a1a1a;
      color: #fff;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 999px;
      text-decoration: none;
      transition: background .15s;
    }
    .btn-hero-primary:hover { background: #333; }
    .btn-hero-outline {
      padding: 12px 28px;
      background: transparent;
      color: #1a1a1a;
      font-size: 0.9rem;
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
      padding: 32px 24px 0;
      max-width: 1280px;
      margin: 0 auto;
    }
    .cat-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      background: #fff;
      border: 1.5px solid #e2e8f0;
      border-radius: 999px;
      font-size: 0.85rem;
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

    /* ── Content sections ─────────────────────────────────── */
    .sections {
      max-width: 1280px;
      margin: 0 auto;
      padding: 56px 24px;
    }

    .section { margin-bottom: 56px; }

    .section-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 12px;
    }
    .section-title {
      font-family: 'Poppins', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .view-all {
      font-size: 0.85rem;
      font-weight: 600;
      color: #6366f1;
      text-decoration: none;
      transition: color .15s;
    }
    .view-all:hover { color: #4f46e5; }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
    }

    /* ── States ───────────────────────────────────────────── */
    .loading-row {
      display: flex;
      gap: 20px;
      overflow: hidden;
    }
    .skeleton {
      flex: 0 0 180px;
      height: 270px;
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
      padding: 48px;
      color: #94a3b8;
      font-size: 0.9rem;
    }

    /* ── Stats bar ────────────────────────────────────────── */
    .stats-bar {
      background: #fff;
      border-top: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;
    }
    .stats-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      justify-content: center;
      gap: 64px;
      flex-wrap: wrap;
    }
    .stat-item { text-align: center; }
    .stat-value {
      font-family: 'Poppins', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: #0f172a;
      display: block;
    }
    .stat-label {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }

    @media (max-width: 768px) {
      .hero { padding: 48px 16px 56px; }
      .content-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
      .stats-inner { gap: 32px; }
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

      <!-- ── Hero ── -->
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

      <!-- ── Category pills ── -->
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

      <!-- ── Stats bar ── -->
      <div class="stats-bar">
        <div class="stats-inner">
          ${[
            { value: '10K+',  label: 'Titles Available'   },
            { value: '50K+',  label: 'Active Users'       },
            { value: '200+',  label: 'Indie Creators'     },
            { value: '4.8★',  label: 'Average Rating'     },
          ].map(s => html`
            <div class="stat-item">
              <span class="stat-value">${s.value}</span>
              <span class="stat-label">${s.label}</span>
            </div>
          `)}
        </div>
      </div>

      <!-- ── Content sections ── -->
      <div class="sections">

        <!-- Trending -->
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

        <!-- Movies -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">🎬 Movies</h2>
            <a href="/category/movie" class="view-all">View all →</a>
          </div>
          <div class="content-grid"></div>
        </section>

        <!-- Series -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">📺 Series</h2>
            <a href="/category/series" class="view-all">View all →</a>
          </div>
          <div class="content-grid"></div>
        </section>

        <!-- Anime -->
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
