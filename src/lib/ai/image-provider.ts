import type { BookStyle, ImageProvider } from "@/types";
import { generateIllustrationSync } from "@/lib/illustrations";

/**
 * Mock image generation provider — works with zero API keys so the full
 * product experience (generation, editor, preview, export) can be built,
 * demoed, and tested before any real image API is wired up.
 *
 * To connect a real provider (e.g. an SDXL/DALL-E/Imagen endpoint), implement
 * `ImageProvider` and swap the export of `getImageProvider()` below — no
 * caller in the app needs to change, they only rely on the
 * `{ url, palette }` shape returned by `generateIllustration()`.
 */
class MockImageProvider implements ImageProvider {
  name = "mock-illustration-engine";

  async generateIllustration(
    prompt: string,
    style: string
  ): Promise<{ url: string; palette: string }> {
    // Simulate network latency of a real image generation API.
    await new Promise((resolve) => setTimeout(resolve, 120 + Math.random() * 220));
    return generateIllustrationSync(prompt, style as BookStyle, prompt);
  }
}

let provider: ImageProvider | null = null;

export function getImageProvider(): ImageProvider {
  if (!provider) {
    // Provider selection would branch on an env var (e.g. AI_IMAGE_PROVIDER)
    // once a real backend is connected. Mock mode is always the fallback.
    provider = new MockImageProvider();
  }
  return provider;
}
