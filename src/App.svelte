<script lang="ts">
  import StackedCards from './lib/StackedCards.svelte';

  const titles = [
    'Make a little space.',
    'Tell a bigger story.',
    'Let ideas unfold.',
    'Find a new perspective.',
    'Keep moving forward.',
    'Make room for wonder.',
    'Start something lasting.'
  ];
  const colors = ['#d8664b', '#4b7182', '#718263', '#8a688f', '#c08b42', '#437f75', '#555e91'];
</script>

<svelte:head>
  <meta name="theme-color" content="#f5f1e9" />
</svelte:head>

<main>
  <header class="intro" id="top">
    <h1>Stacked Cards</h1>
    <p class="description">
      The Stacked Cards feature uses Inner Rows to create dynamic, scroll-linked animations, where
      cards move seamlessly for an interactive storytelling effect.
    </p>
    <span class="scroll-hint" aria-hidden="true">SCROLL ↓</span>
  </header>

  <section class="demo-section" aria-labelledby="color-demo-title">
    {#snippet colorCard({ index }: { index: number })}
      <div class="color-card" style={`--background: ${colors[index]}`}>
        <p class="eyebrow">CHAPTER 0{index + 1}</p>
        <h3>{titles[index]}</h3>
        <span class="card-count">0{index + 1} / 07</span>
      </div>
    {/snippet}

    <StackedCards
      count={titles.length}
      renderCard={colorCard}
      label="Seven simple color cards"
      minScale={0.82}
      cardWidth="min(92%, 980px)"
    />
  </section>
</main>
