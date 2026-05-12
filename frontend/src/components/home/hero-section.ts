import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/**
 * HeroSection — Pro-level video background hero
 * Uses a YouTube embed (muted, autoplay, loop) as background
 * YouTube video ID: dQw4w9WgXcQ is a placeholder — swap for a cinematic trailer
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
      min-height: 600px;
      max-height: 900px;
      overflow: hidden;
      background: #0a0a0a;
    }

    /* ── Video background ─────────────────────────────────── */
    .video-wrap {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    /* YouTube iframe fills the container and stays centered */
    .video-wrap iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 177.78vh;   /* 16:9 aspect ratio based on height */
      height: 100%;
      min-width: 100%;
      min-height: 56.25vw; /* 16:9 aspect ratio based on width */
      transform: translate(-50%, -50%);
      border: none;
      pointer-events: none;
    }

    /* ── Gradient overlays ────────────────────────────────── */
    /* Bottom fade — content readable */
    .overlay-bottom {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.92) 0%,
        rgba(0,0,0,0.55) 40%,
        rgba(0,0,0,0.15) 70%,
        transparent 100%
      );
    }

    /* Top fade — subtle darkening at top */
    .overlay-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 180px;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.4) 0%,
        transparent 100%
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
      padding: 0 0 72px;
      max-width: 1300px;
      margin: 0 auto;
      padding-left: 28px;
      padding-right: 28px;
    }

    /* badge */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(99,102,241,0.9);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 4px;
      margin-bottom: 20px;
      width: fit-content;
      backdrop-filter: blur(8px);
    }

    /* heading */
    .title {
      font-family: var(--font-family-heading, 'Poppins', sans-serif);
      font-size: clamp(2.5rem, 5.5vw, 4.5rem);
      font-weight: 900;
      color: #ffffff;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin: 0 0 16px;
      max-width: 700px;
      text-shadow: 0 2px 20px rgba(0,0,0,0.5);
    }

    .title span {
      background: linear-gradient(135deg, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* subtitle */
    .subtitle {
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      color: rgba(255,255,255,0.82);
      max-width: 560px;
      line-height: 1.65;
      margin: 0 0 36px;
      font-weight: 400;
    }

    /* CTA row */
    .cta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: #ffffff;
      color: #0a0a0a;
      font-size: 15px;
      font-weight: 700;
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.15s, transform 0.15s;
      letter-spacing: 0.01em;
    }
    .btn-primary:hover {
      background: #e8e8e8;
      transform: scale(1.03);
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 32px;
      background: rgba(255,255,255,0.12);
      color: #ffffff;
      font-size: 15px;
      font-weight: 600;
      border-radius: 999px;
      border: 1.5px solid rgba(255,255,255,0.4);
      text-decoration: none;
      backdrop-filter: blur(8px);
      transition: background 0.15s, border-color 0.15s;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.22);
      border-color: rgba(255,255,255,0.7);
    }

    /* meta row */
    .meta-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 28px;
      flex-wrap: wrap;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.65);
      font-size: 13px;
      font-weight: 500;
    }

    .meta-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
    }

    /* rating badge */
    .rating {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(245,158,11,0.2);
      border: 1px solid rgba(245,158,11,0.4);
      color: #fbbf24;
      font-size: 12px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 4px;
    }

    /* ── Scroll indicator ─────────────────────────────────── */
    .scroll-hint {
      position: absolute;
      bottom: 28px;
      right: 28px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.4);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .scroll-line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 0.4; transform: scaleY(1); }
      50%       { opacity: 1;   transform: scaleY(1.2); }
    }

    /* ── Mobile ───────────────────────────────────────────── */
    @media (max-width: 768px) {
      .hero { max-height: 700px; }
      .content { padding-bottom: 48px; }
      .cta-row { gap: 10px; }
      .btn-primary, .btn-outline { padding: 12px 24px; font-size: 14px; }
      .scroll-hint { display: none; }
    }

    @media (max-width: 480px) {
      .hero { min-height: 500px; max-height: 600px; }
      .meta-row { gap: 12px; }
    }
  `;

  /* YouTube video IDs — cinematic/trailer style */
  private readonly VIDEO_ID = 'LXb3EKWsInQ'; /* Epic cinematic trailer */

  @state() private videoLoaded = false;

  private onVideoLoad() {
    this.videoLoaded = true;
  }

  render() {
    return html`
      <section class="hero">

        <!-- ── Video background ── -->
        <div class="video-wrap">
          <iframe
            src="https://www.youtube.com/embed/${this.VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${this.VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
            title="Background video"
            allow="autoplay; encrypted-media"
            allowfullscreen
            @load=${this.onVideoLoad}
          ></iframe>
        </div>

        <!-- ── Gradient overlays ── -->
        <div class="overlay-bottom"></div>
        <div class="overlay-top"></div>

        <!-- ── Hero content ── -->
        <div class="content">

          <span class="badge">✦ Now Streaming</span>

          <h1 class="title">
            Your Ultimate<br>
            <span>Entertainment Hub</span>
          </h1>

          <p class="subtitle">
            Movies, Series, Anime, Gaming & Documentaries — all in one place,
            curated by AI and loved by millions of fans worldwide.
          </p>

          <div class="cta-row">
            <a href="/explore" class="btn-primary">
              ▶ Start Watching
            </a>
            <a href="/register" class="btn-outline">
              Sign Up Free
            </a>
          </div>

          <div class="meta-row">
            <span class="rating">⭐ 4.8 / 5</span>
            <span class="meta-dot"></span>
            <span class="meta-item">10,000+ Titles</span>
            <span class="meta-dot"></span>
            <span class="meta-item">50K+ Users</span>
            <span class="meta-dot"></span>
            <span class="meta-item">200+ Creators</span>
          </div>

        </div>

        <!-- ── Scroll hint ── -->
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
