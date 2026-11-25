<script lang="ts">
  import StackedCards from './lib/StackedCards.svelte';
  import FeatureCard from './lib/demo/FeatureCard.svelte';

  const titles = ['Make a little space.', 'Tell a bigger story.', 'Let ideas unfold.'];
  const colors = ['#d8664b', '#4b7182', '#718263'];
</script>

<svelte:head>
  <meta name="theme-color" content="#f5f1e9" />
</svelte:head>

<main>
  <header class="intro" id="top">
    <p class="eyebrow">A SVELTE COMPONENT STUDY</p>
    <h1>Stories, one card at a time.</h1>
    <p class="description">
      A scroll-driven stack with content and styling supplied by your project.
      Scroll to explore, then scroll back up to see it reverse.
    </p>
    <span class="scroll-hint" aria-hidden="true">SCROLL ↓</span>
  </header>

  <section class="demo-section" aria-labelledby="color-demo-title">
    <div class="section-heading">
      <p class="eyebrow">01 / THE BASICS</p>
      <h2 id="color-demo-title">Simple color cards</h2>
      <p>Three cards show the default stack, scale, and overlap behavior.</p>
    </div>

    {#snippet colorCard({ index }: { index: number })}
      <div class="color-card" style={`--background: ${colors[index]}`}>
        <p class="eyebrow">CHAPTER 0{index + 1}</p>
        <h3>{titles[index]}</h3>
        <span class="card-count">0{index + 1} / 03</span>
      </div>
    {/snippet}

    <StackedCards
      count={3}
      renderCard={colorCard}
      label="Three simple color cards"
      minScale={0.82}
      cardWidth="min(92%, 980px)"
    />
  </section>

  <section class="demo-section varied" aria-labelledby="varied-demo-title">
    <div class="section-heading">
      <p class="eyebrow">02 / YOUR CONTENT</p>
      <h2 id="varied-demo-title">Bring your own cards</h2>
      <p>Images, illustrations, and Svelte components all use the same stack.</p>
    </div>

    {#snippet featureCard({ index }: { index: number })}
      <FeatureCard {index} />
    {/snippet}

    <StackedCards
      count={3}
      renderCard={featureCard}
      label="Cards with images, illustrations, and custom content"
      cardWidth="min(92%, 980px)"
      cardHeight="76vh"
      cornerRadius="32px"
      scrollDistance="92vh"
      stickyOffset="10vh"
      minScale={0.8}
    />
  </section>

  <footer>
    <p>Built to scroll with you.</p>
    <a href="#top">Back to top ↑</a>
  </footer>
</main>
