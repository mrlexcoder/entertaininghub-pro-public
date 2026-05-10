import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Content } from '../../types';

@customElement('content-card')
export class ContentCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-background-card);
      transition: transform var(--transition-base), box-shadow var(--transition-base);
      cursor: pointer;
      height: 100%;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .poster {
      width: 100%;
      aspect-ratio: 2/3;
      object-fit: cover;
      background: var(--color-background-hover);
    }

    .content {
      padding: var(--spacing-md);
    }

    .title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-xs);
      color: var(--color-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      margin-bottom: var(--spacing-sm);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--color-accent);
      font-weight: var(--font-weight-semibold);
    }

    .badge {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-md);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
    }

    .genres {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }

    .genre-tag {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-background-hover);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
  `;

  @property({ type: Object })
  content!: Content;

  render() {
    return html`
      <a href="/content/${this.content.id}" class="card">
        ${this.content.maturity_rating ? html`
          <span class="badge">${this.content.maturity_rating}</span>
        ` : ''}
        
        <img 
          class="poster" 
          src="${this.content.poster_url || '/assets/images/placeholder.jpg'}" 
          alt="${this.content.title}"
          loading="lazy"
        />
        
        <div class="content">
          <h3 class="title">${this.content.title}</h3>
          
          <div class="meta">
            ${this.content.imdb_rating ? html`
              <span class="rating">
                ⭐ ${this.content.imdb_rating.toFixed(1)}
              </span>
            ` : ''}
            <span>${this.content.release_year}</span>
            ${this.content.duration_minutes ? html`
              <span>${Math.floor(this.content.duration_minutes / 60)}h ${this.content.duration_minutes % 60}m</span>
            ` : ''}
          </div>

          ${this.content.genre && this.content.genre.length > 0 ? html`
            <div class="genres">
              ${this.content.genre.slice(0, 3).map(genre => html`
                <span class="genre-tag">${genre}</span>
              `)}
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
