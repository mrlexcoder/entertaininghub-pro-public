import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { authContext, type AuthState } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: var(--z-sticky);
      background: var(--color-background-elevated);
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(10px);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--spacing-md) var(--spacing-lg);
      height: var(--header-height);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-family: var(--font-family-heading);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      text-decoration: none;
    }

    .logo:hover {
      color: var(--color-primary-light);
    }

    nav {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
    }

    .nav-links {
      display: flex;
      gap: var(--spacing-md);
    }

    .nav-link {
      padding: var(--spacing-sm) var(--spacing-md);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .nav-link:hover {
      color: var(--color-text);
      background: var(--color-background-hover);
    }

    .nav-link.active {
      color: var(--color-primary);
      background: rgba(99, 102, 241, 0.1);
    }

    .search-box {
      position: relative;
    }

    .search-input {
      width: 300px;
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: 2.5rem;
      background: var(--color-background-card);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      color: var(--color-text);
    }

    .search-icon {
      position: absolute;
      left: var(--spacing-md);
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-text-muted);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-fast);
      cursor: pointer;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--color-primary-dark);
    }

    .btn-outline {
      border: 1px solid var(--color-border);
      color: var(--color-text);
    }

    .btn-outline:hover {
      background: var(--color-background-hover);
    }

    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-full);
      background: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .search-input {
        width: 200px;
      }
    }
  `;

  @consume({ context: authContext, subscribe: true })
  @state()
  private authState?: AuthState;

  private handleLogout() {
    authService.logout();
  }

  render() {
    const isAuth = this.authState?.isAuthenticated;
    const user = this.authState?.user;

    return html`
      <header class="header">
        <a href="/" class="logo">
          🎬 EntertainingHub
        </a>

        <nav>
          <div class="nav-links">
            <a href="/" class="nav-link">Home</a>
            <a href="/explore" class="nav-link">Explore</a>
            <a href="/trending" class="nav-link">Trending</a>
            ${isAuth ? html`
              <a href="/watchlist" class="nav-link">Watchlist</a>
            ` : ''}
          </div>

          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="search" 
              class="search-input" 
              placeholder="Search movies, series, anime..."
              @input=${this.handleSearch}
            />
          </div>

          <div class="user-menu">
            ${isAuth ? html`
              <a href="/profile" class="avatar" title="${user?.username}">
                ${user?.username?.charAt(0).toUpperCase()}
              </a>
              <button class="btn btn-outline" @click=${this.handleLogout}>
                Logout
              </button>
            ` : html`
              <a href="/login">
                <button class="btn btn-outline">Login</button>
              </a>
              <a href="/register">
                <button class="btn btn-primary">Sign Up</button>
              </a>
            `}
          </div>
        </nav>
      </header>
    `;
  }

  private handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    const query = input.value.trim();
    
    if (query.length > 2) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
