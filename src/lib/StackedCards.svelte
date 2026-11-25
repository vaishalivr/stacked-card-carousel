<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { scaleForNextCard } from './stacked-cards/scroll';

  interface Props {
    count: number;
    renderCard: Snippet<[{ index: number }]>;
    minScale?: number;
    cardWidth?: string;
    cardHeight?: string;
    cornerRadius?: string;
    scrollDistance?: string;
    stickyOffset?: string;
    label?: string;
  }

  let {
    count,
    renderCard,
    minScale = 0.82,
    cardWidth = '92%',
    cardHeight = '82vh',
    cornerRadius = '24px',
    scrollDistance = '100vh',
    stickyOffset = '9vh',
    label = 'Stacked cards'
  }: Props = $props();

  const indexes = $derived.by(() => {
    if (!Number.isInteger(count) || count < 1) {
      throw new RangeError('StackedCards count must be a positive integer.');
    }

    if (!Number.isFinite(minScale) || minScale <= 0 || minScale > 1) {
      throw new RangeError('StackedCards minScale must be greater than 0 and at most 1.');
    }

    return Array.from({ length: count }, (_, index) => index);
  });

  let stages = $state<HTMLElement[]>([]);

  const styles = $derived([
    `--card-width: ${cardWidth}`,
    `--card-height: ${cardHeight}`,
    `--corner-radius: ${cornerRadius}`,
    `--scroll-distance: ${scrollDistance}`,
    `--sticky-offset: ${stickyOffset}`
  ].join('; '));

  onMount(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const updateScales = () => {
      frame = 0;
      if (reducedMotion.matches) return;

      const viewportHeight = window.innerHeight;
      const firstCard = stages[0]?.querySelector<HTMLElement>('.card');
      const stickyOffsetPx = firstCard
        ? Number.parseFloat(window.getComputedStyle(firstCard).top)
        : 0;
      const safeStickyOffset = Number.isFinite(stickyOffsetPx) ? stickyOffsetPx : 0;

      for (let index = 0; index < count; index += 1) {
        const nextStage = stages[index + 1];
        const card = stages[index]?.querySelector<HTMLElement>('.card');
        if (!card) continue;

        const scale = nextStage
          ? scaleForNextCard(
              nextStage.getBoundingClientRect().top,
              viewportHeight,
              safeStickyOffset,
              minScale
            )
          : 1;

        card.style.setProperty('--card-scale', scale.toFixed(4));
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScales);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  });
</script>

<div class="stacked-cards" role="list" aria-label={label} style={styles}>
  {#each indexes as index (index)}
    <div
      class="stage"
      role="listitem"
      aria-label={`Card ${index + 1} of ${count}`}
      style={`--card-index: ${index + 1}`}
      bind:this={stages[index]}
    >
      <div class="card">
        {@render renderCard({ index })}
      </div>
    </div>
  {/each}
</div>

<style>
  .stacked-cards {
    width: 100%;
  }

  .stage {
    display: grid;
    justify-items: center;
    height: calc(var(--scroll-distance) + var(--card-height));
    margin-bottom: calc(0px - var(--card-height));
  }

  .stage:last-child {
    margin-bottom: 0;
  }

  .card {
    position: sticky;
    top: var(--sticky-offset);
    z-index: var(--card-index);
    box-sizing: border-box;
    width: var(--card-width);
    height: var(--card-height);
    overflow: hidden;
    border-radius: var(--corner-radius);
    transform: scale(var(--card-scale, 1));
    transform-origin: center top;
  }

  @media (max-width: 640px) {
    .card {
      width: min(var(--card-width), calc(100% - 2rem));
      border-radius: min(var(--corner-radius), 20px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stage {
      height: auto;
      margin-bottom: 0;
      padding-block: 0.75rem;
    }

    .card {
      position: static;
      transform: none;
    }
  }
</style>
