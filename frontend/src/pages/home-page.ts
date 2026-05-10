import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { contentService } from '../services/content-service';
import type { Content } from '../types';
import '../components/content/content-card';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .hero {
      position: relative;
      height: 500px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      margin-bottom: var(--spacing-3xl);
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    }

    .hero-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: var(--spacing-3xl);
      color: white;
    }

    .hero-title {
      font-size: var(--font-size-5xl);
      font-weight: var(--font-weight-extrabold);
      margin-bottom: var(--spacing-md);
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: var(--font-size-xl);
      margin-bottom: var(--spacing-xl);
      opacity: 0.9;
    }

    .hero-cta {
      display: flex;
      gap: var(--spacing-md);
    }

    .btn {
      padding: var(--spacing-md) var(--spacing-xl);
      border-radius: var(--radius-lg);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .btn-primary {
      background: white;
      color: var(--color-primary);
    }

    .btn-primary:hover {
      transform: scale(1.05);
    }

    .btn-outline {
      border: 2px solid white;
      color: white;
      background: transparent;
    }

    .btn-outline:hover {
      background: white;
      color: var(--color-primary);
    }

    .section {
      margin-bottom: var(--spacing-3xl);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .section-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
    }

    .view-all {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
      transition: color var(--transition-fast);
    }

    .view-all:hover {
      color: var(--color-primary-light);
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-lg);
    }

    .loading {
      text-align: center;
      padding: var(--spacing-3xl);
      color: var(--color-text-muted);
    }

    .error {
      text-align: center;
      padding: var(--spacing-3xl);
      color: var(--color-error);
    }

    @media (max-width: 768px) {
      .hero {
        height: 400px;
      }

      .hero-title {
        font-size: var(--font-size-3xl);
      }

      .hero-subtitle {
        font-size: var(--font-size-lg);
      }

      .content-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  `;

  private trendingTask = new Task(this, {
    task: async () => {
      return await contentService.getTrending(10);
    },
    args: () => [],
  });

  render() {
    return html`
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to EntertainingHub</h1>
          <p class="hero-subtitle">
            Discover movies, series, anime, and more. All in one place.
          </p>
          <div class="hero-cta">
            <a href="/explore">
              <button class="btn btn-primary">Explore Now</button>
            </a>
            <a href="/trending">
              <button class="btn btn-outline">Trending</button>
            </a>
          </div>
        </div>
      </div>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🔥 Trending Now</h2>
          <a href="/trending" class="view-all">View All →</a>
        </div>
        
        ${this.trendingTask.render({
          pending: () => html`<div class="loading">Loading trending content...</div>`,
          complete: (content) => html`
            <div class="content-grid">
              ${content.map(item => html`
                <content-card .content=${item}></content-card>
              `)}
            </div>
          `,
          error: (e) => html`<div class="error">Failed to load content: ${e.message}</div>`,
        })}
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🎬 Movies</h2>
          <a href="/category/movie" class="view-all">View All →</a>
        </div>
        <div class="content-grid">
          <!-- Movies will be loaded here -->
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">📺 Series</h2>
          <a href="/category/series" class="view-all">View All →</a>
        </div>
        <div class="content-grid">
          <!-- Series will be loaded here -->
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🎌 Anime</h2>
          <a href="/category/anime" class="view-all">View All →</a>
        </div>
        <div class="content-grid">
          <!-- Anime will be loaded here -->
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage;
  }
}
