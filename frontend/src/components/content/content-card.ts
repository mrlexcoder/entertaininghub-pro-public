import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Content } from '../../types';

@customElement('content-card')
export class ContentCard extends LitElement {
  static styles = css`
    :host { display: block; }

    .card {
      display: block;
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: #fff;
      border: 1px solid #e8e8e8;
      text-decoration: none;
      transition: transform .2s ease, box-shadow .2s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,.12);
    }

    /* Poster */
    .poster-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 2/3;
      background: #f1f5f9;
      overflow: hidden;
    }
    .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .3s ease;
    }
    .card:hover .poster { transform: scale(1.04); }

    /* Maturity badge */
    .maturity {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 2px 8px;
      background: rgba(0,0,0,.65);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      border-radius: 4px;
      letter-spacing: 0.5px;
      backdrop-filter: blur(4px);
    }

    /* Type badge */
    .type-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      padding: 2px 8px;
      background: #6366f1;
      color: #fff;
      font-size: 0.6rem;
      font-weight: 700;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Info */
    .info {
      padding: 14px;
    }
    .title {
      font-size: 1rem;           /* 16px — Google minimum for readable text */
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;       /* 14px */
      color: #64748b;
      flex-wrap: wrap;
    }
    .rating {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #f59e0b;
      font-weight: 600;
    }
    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #cbd5e1;
    }
    .genres {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 8px;
    }
    .genre-tag {
      padding: 3px 10px;
      background: #f1f5f9;
      border-radius: 999px;
      font-size: 0.8125rem;      /* 13px */
      color: #475569;
      font-weight: 500;
    }
  `;

  @property({ type: Object }) content!: Content;

  render() {
    const c = this.content;
    return html`
      <a href="/content/${c.id}" class="card">
        <div class="poster-wrap">
          <img
            class="poster"
            src="${c.poster_url || '/assets/images/placeholder.jpg'}"
            alt="${c.title}"
            loading="lazy"
          />
          ${c.maturity_rating ? html`<span class="maturity">${c.maturity_rating}</span>` : ''}
          <span class="type-badge">${c.content_type}</span>
        </div>

        <div class="info">
          <h3 class="title">${c.title}</h3>
          <div class="meta">
            ${c.imdb_rating ? html`
              <span class="rating">⭐ ${c.imdb_rating.toFixed(1)}</span>
              <span class="dot"></span>
            ` : ''}
            ${c.release_year ? html`<span>${c.release_year}</span>` : ''}
            ${c.duration_minutes ? html`
              <span class="dot"></span>
              <span>${Math.floor(c.duration_minutes / 60)}h ${c.duration_minutes % 60}m</span>
            ` : ''}
          </div>
          ${c.genre?.length ? html`
            <div class="genres">
              ${c.genre.slice(0, 2).map(g => html`<span class="genre-tag">${g}</span>`)}
            </div>
          ` : ''}
        </div>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'content-card': ContentCard;
  }
}
