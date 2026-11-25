function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function scaleForNextCard(
  nextStageTop: number,
  viewportHeight: number,
  stickyOffset: number,
  minScale: number
): number {
  const travelDistance = Math.max(1, viewportHeight - stickyOffset);
  const progress = clamp((viewportHeight - nextStageTop) / travelDistance, 0, 1);

  return 1 - (1 - minScale) * progress;
}
