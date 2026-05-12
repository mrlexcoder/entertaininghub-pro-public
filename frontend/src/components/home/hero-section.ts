import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * HeroSection — Pro-level video background hero
 * Uses HTML5 <video> with a free Pexels/Pixabay CDN video
 * No YouTube iframe — works in all browsers without autoplay restrictions
 */
@customElement('hero-section')
export class HeroSection extends LitElement {
  static styles = css`
    :host { display: block; }

    /* ── Wrapper ──────────────────────────────────────────── */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 620px;
      max-height: 920px;
      overflow: hidden;
      background: #050505;
    }

    /* ── HTML5 Video background ───────────────────────────── */
    .bg-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 0;
      opacity: 0;
      transition: opacity 1.2s ease;
    }
    .bg-video.loaded { opacity: 1; }

    /* Fallback gradient shown while video loads */
    .bg-fallback {
      position: absolute;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.35) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.25) 0%, transparent 55%),
        radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 40%, #1a0a2e 70%, #0a0a1a 100%);
    }

    /* ── Gradient overlays ────────────────────────────────── */
    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background:
        linear-gradient(to top,
          rgba(0,0,0,0.95) 0%,
          rgba(0,0,0,0.65) 35%,
          rgba(0,0,0,0.25) 65%,
          rgba(0,0,0,0.1)  100%
        ),
        linear-gradient(to right,
          rgba(0,0,0,0.5) 0%,
          transparent 60%
        );
    }

    /* ── Content ──────────────────────────────────────────── */
    .content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 80px;
      max-width: 1300px;
      margin: 0 auto;
      padding-left: 28px;
      padding-right: 28px;
    }

    /* Live badge */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(99,102,241,0.85);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 4px;
      margin-bottom: 22px;
      width: fit-content;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.15);
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      animation: blink 1.5s ease-in-out infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }

    /* Heading */
    .title {
      font-family: var(--font-family-heading, 'Poppins', sans-serif);
      font-size: clamp(2.8rem, 6vw, 5rem);
      font-weight: 900;
      color: #ffffff;
      line-height: 1.0;
      letter-spacing: -0.04em;
      margin: 0 0 20px;
      max-width: 720px;
      text-shadow: 0 4px 32px rgba(0,0,0,0.6);
    }

    .title-accent {
      display: block;
      background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Subtitle */
    .subtitle {
      font-size: clamp(1rem, 1.6vw, 1.15rem);
      color: rgba(255,255,255,0.75);
      max-width: 520px;
      line-height: 1.7;
      margin: 0 0 38px;
      font-weight: 400;
    }

    /* CTA buttons */
    .cta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }

    .btn-watch {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 15px 34px;
      background: #ffffff;
      color: #0a0a0a;
      font-size: 15px;
      font-weight: 700;
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .btn-watch:hover {
      background: #f0f0f0;
      transform: scale(1.04);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }

    .play-icon {
      width: 18px;
      height: 18px;
      background: #0a0a0a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .play-icon::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 7px;
      border-color: transparent transparent transparent #fff;
      margin-left: 1px;
    }

    .btn-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 15px 34px;
      background: rgba(255,255,255,0.12);
      color: #ffffff;
      font-size: 15px;
      font-weight: 600;
      border-radius: 999px;
      border: 1.5px solid rgba(255,255,255,0.3);
      text-decoration: none;
      backdrop-filter: blur(12px);
      transition: background 0.15s, border-color 0.15s;
    }
    .btn-info:hover {
      background: rgba(255,255,255,0.22);
      border-color: rgba(255,255,255,0.6);
    }

    /* Stats row */
    .stats-row {
      display: flex;
      align-items: center;
      gap: 0;
      flex-wrap: wrap;
    }

    .stat {
      display: flex;
      flex-direction: column;
      padding-right: 28px;
      margin-right: 28px;
      border-right: 1px solid rgba(255,255,255,0.15);
    }
    .stat:last-child {
      border-right: none;
      margin-right: 0;
      padding-right: 0;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .stat-label {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      font-weight: 500;
      margin-top: 3px;
      letter-spacing: 0.3px;
    }

    /* ── Scroll indicator ─────────────────────────────────── */
    .scroll-hint {
      position: absolute;
      bottom: 32px;
      right: 32px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.35);
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .scroll-line {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
      animation: scrollAnim 2s ease-in-out infinite;
    }

    @keyframes scrollAnim {
      0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
      50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
      100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
    }

    /* ── Mobile ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .hero { max-height: 750px; min-height: 560px; }
      .content { padding-bottom: 52px; padding-left: 20px; padding-right: 20px; }
      .cta-row { gap: 10px; }
      .btn-watch, .btn-info { padding: 13px 26px; font-size: 14px; }
      .stat-value { font-size: 1.25rem; }
      .scroll-hint { display: none; }
    }

    @media (max-width: 480px) {
      .hero { min-height: 500px; max-height: 650px; }
      .stats-row { gap: 16px; }
      .stat { border-right: none; padding-right: 0; margin-right: 0; }
    }
  `;

  render() {
    return html`
      <section class="hero">

        <!-- Fallback gradient (always visible, video fades over it) -->
        <div class="bg-fallback"></div>

        <!-- HTML5 video — free Pexels cinematic video, no autoplay restrictions -->
        <video
          class="bg-video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          @canplay=${(e: Event) => (e.target as HTMLVideoElement).classList.add('loaded')}
        >
          <!-- Free cinematic video from Pexels CDN -->
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <!-- Fallback source -->
          <source
            src="https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <!-- Gradient overlay -->
        <div class="overlay"></div>

        <!-- Content -->
        <div class="content">

          <div class="badge">
            <span class="badge-dot"></span>
            Now Streaming
          </div>

          <h1 class="title">
            Your Ultimate
            <span class="title-accent">Entertainment Hub</span>
          </h1>

          <p class="subtitle">
            Movies, Series, Anime, Gaming &amp; Documentaries —
            all in one place, curated by AI and loved by millions worldwide.
          </p>

          <div class="cta-row">
            <a href="/explore" class="btn-watch">
              <span class="play-icon"></span>
              Start Watching
            </a>
            <a href="/register" class="btn-info">
              Sign Up Free
            </a>
          </div>

          <div class="stats-row">
            <div class="stat">
              <span class="stat-value">10K+</span>
              <span class="stat-label">Titles</span>
            </div>
            <div class="stat">
              <span class="stat-value">50K+</span>
              <span class="stat-label">Users</span>
            </div>
            <div class="stat">
              <span class="stat-value">200+</span>
              <span class="stat-label">Creators</span>
            </div>
            <div class="stat">
              <span class="stat-value">4.8★</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>

        </div>

        <!-- Scroll hint -->
        <div class="scroll-hint">
          <div class="scroll-line"></div>
          <span>Scroll</span>
        </div>

      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hero-section': HeroSection;
  }
}
