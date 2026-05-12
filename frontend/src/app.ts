import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { authContext } from './stores/auth-store';
import './components/ui/header';
import './components/ui/footer';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--color-background);
      color: var(--color-text);
    }

    /* main has NO max-width or padding — each page/section controls its own layout */
    main {
      flex: 1;
      width: 100%;
    }
  `;

  @provide({ context: authContext })
  @state()
  private authState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  connectedCallback() {
    super.connectedCallback();
    this.loadAuthState();
  }

  private loadAuthState() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.authState = {
        isAuthenticated: true,
        user: JSON.parse(user),
        token,
      };
    }
  }

  render() {
    return html`
      <app-header></app-header>
      <main>
        <slot></slot>
      </main>
      <app-footer></app-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': App;
  }
}
