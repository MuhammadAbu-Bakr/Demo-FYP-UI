export interface GeneratedImage {
  id: string;
  createdAt: string;
  seed: number;
  digitClass: number;
  gradientFrom: string;
  gradientTo: string;
  config: { latentDim: number; numImages: number; digitClass: number | "random"; temperature: number };
  isFavorited: boolean;
}

const gradients: Array<[string, string]> = [
  ["#16a34a", "#4ade80"], ["#22c55e", "#86efac"], ["#15803d", "#34d399"],
  ["#166534", "#22c55e"], ["#4d7c0f", "#84cc16"], ["#16a34a", "#86efac"],
  ["#15803d", "#4ade80"], ["#14532d", "#16a34a"], ["#166534", "#65a30d"],
  ["#15803d", "#22c55e"], ["#365314", "#4d7c0f"], ["#166534", "#84cc16"],
];

/** Decorative placeholders shown on the public landing page; not model output. */
export const mockGeneratedImages: GeneratedImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: `sample-${i + 1}`,
  createdAt: "2026-01-01T00:00:00.000Z",
  seed: 1000 + i * 137,
  digitClass: i % 10,
  gradientFrom: gradients[i][0],
  gradientTo: gradients[i][1],
  config: { latentDim: 100, numImages: 1, digitClass: i % 10, temperature: 1 },
  isFavorited: false,
}));
