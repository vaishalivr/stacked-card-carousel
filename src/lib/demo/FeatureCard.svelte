<script lang="ts">
  let { index }: { index: number } = $props();
</script>

{#if index === 0}
  <div class="feature feature--image">
    <img src="/mountain.svg" alt="Layered mountain peaks at sunset" />
    <div class="caption">
      <p class="eyebrow">01 / IMAGE</p>
      <h3>A landscape for every story.</h3>
    </div>
  </div>
{:else if index === 1}
  <div class="feature feature--illustration">
    <svg viewBox="0 0 480 360" role="img" aria-labelledby="orbit-title">
      <title id="orbit-title">Abstract illustration of an orbiting planet</title>
      <circle cx="240" cy="180" r="95" fill="#f3a64a" />
      <ellipse
        cx="240"
        cy="180"
        rx="190"
        ry="72"
        fill="none"
        stroke="#f8e9d2"
        stroke-width="8"
        transform="rotate(-22 240 180)"
      />
      <circle cx="82" cy="116" r="12" fill="#f8e9d2" />
      <circle cx="375" cy="280" r="8" fill="#f8e9d2" />
    </svg>
    <div class="caption">
      <p class="eyebrow">02 / ILLUSTRATION</p>
      <h3>Bring your own visual language.</h3>
    </div>
  </div>
{:else}
  <div class="feature feature--text">
    <p class="eyebrow">03 / COMPONENT</p>
    <h3>Cards can render any Svelte content.</h3>
    <p>Use your own components, media, links, or layouts inside each card.</p>
    <span class="arrow" aria-hidden="true">↗</span>
  </div>
{/if}

<style>
  .feature {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    padding: clamp(1.5rem, 5vw, 4rem);
    color: #fffaf2;
  }

  .feature--image {
    background: #193444;
  }

  .feature--image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .feature--image::after {
    position: absolute;
    inset: 25% 0 0;
    background: linear-gradient(transparent, rgb(9 26 36 / 85%));
    content: '';
  }

  .feature--illustration {
    align-items: center;
    justify-content: center;
    background: #263d39;
  }

  .feature--illustration svg {
    width: min(72%, 32rem);
    max-height: 65%;
  }

  .feature--illustration .caption {
    text-align: center;
  }

  .feature--text {
    background: #433c71;
  }

  .caption,
  .feature--text > * {
    position: relative;
    z-index: 1;
  }

  .eyebrow {
    margin: 0 0 0.8rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
  }

  h3 {
    max-width: 14ch;
    margin: 0;
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.02;
  }

  .feature--text > p:not(.eyebrow) {
    max-width: 34rem;
    font-size: clamp(1rem, 1.6vw, 1.3rem);
    line-height: 1.5;
  }

  .arrow {
    position: absolute;
    right: clamp(1.5rem, 5vw, 4rem);
    bottom: clamp(1.5rem, 5vw, 4rem);
    font-size: 3rem;
  }
</style>
