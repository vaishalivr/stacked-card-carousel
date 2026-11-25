# Svelte Stacked Cards

A Svelte 5 component for a stacked card interaction driven by page scrolling. Cards stick in place as later cards enter from below; each outgoing card scales down as the next card takes over. Scrolling upward reverses the same progress naturally.

The repository includes a runnable demo. The component is kept separate from that demo so it can be packaged independently later. It is not published as an npm package.

## Run the demo

```sh
npm install
npm run dev
```

Check and build:

```sh
npm run check
npm run build
```

## Usage

Pass the number of cards and a Svelte snippet that renders a card for each index:

```svelte
<script lang="ts">
  import StackedCards from './lib/StackedCards.svelte';

  const titles = ['First story', 'Second story', 'Third story'];
</script>

{#snippet card({ index }: { index: number })}
  <article class="my-card">
    <h2>{titles[index]}</h2>
  </article>
{/snippet}

<StackedCards count={titles.length} renderCard={card} label="Featured stories" />
```

`renderCard` is called once per card with a zero-based `index`. It can render any Svelte markup, media, or components; the stack owns only the outer card geometry and scroll behavior.

## Configuration

| Prop | Default | Description |
| --- | --- | --- |
| `count` | required | Positive number of cards. |
| `renderCard` | required | Svelte snippet receiving `{ index }`. |
| `minScale` | `0.82` | Scale of an outgoing card after the next card reaches its sticky position. Must be greater than `0` and at most `1`. |
| `cardWidth` | `92%` | CSS width of each card. |
| `cardHeight` | `82vh` | CSS height of each card. |
| `cornerRadius` | `24px` | CSS border radius. |
| `scrollDistance` | `100vh` | Scroll distance between cards entering their sticky positions. |
| `stickyOffset` | `9vh` | Distance from the viewport top where a card sticks. |
| `label` | `Stacked cards` | Accessible name for the card list. |

Values for dimensions and distance should be valid CSS lengths, such as `92%`, `640px`, `82vh`, or `calc(100vh - 3rem)`. `scrollDistance` should be long enough to make each transition comfortable. Keep `cardHeight` shorter than the viewport and leave enough room for `stickyOffset`; very tall cards may not fit in the sticky area.

## Layout and behavior

- Place the component in a normally scrolling page. Do not put it inside an ancestor with `overflow: hidden`, `auto`, or `scroll`; that changes the sticky scroll container and can prevent the cards from sticking to the viewport.
- The component uses overlapping sticky stages. Its parent should not impose a fixed height or clip its overflow.
- Card content is clipped to the configured rounded card bounds. Size or make content scrollable within the card when it may exceed the card height.
- On narrow screens the component limits card width to the viewport with side gutters.
- When `prefers-reduced-motion: reduce` is enabled, cards render in normal document flow without pinning or scaling.
- Scroll updates are passive and batched with `requestAnimationFrame`; listeners are removed when the component is destroyed.

## Package direction

`src/lib/StackedCards.svelte` and `src/lib/stacked-cards/scroll.ts` are the component source and framework-independent scroll calculation. The demo lives outside that component. A package build, exports, and publishing workflow can be added when distribution is needed.
