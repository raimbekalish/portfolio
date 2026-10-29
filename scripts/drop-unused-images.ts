import type { Plugin } from "vite";

/**
 * Drops emitted images that nothing in the build refers to. Vite emits an imported image as soon as
 * its module loads, even when tree-shaking then removes every use: the Visual Novel screenshot, for
 * one, is only shown with the team's consent (src/content/permissions.ts) or by the old homepage
 * before launch, and must not be published otherwise.
 */
export function dropUnusedImages(): Plugin {
  return {
    name: "drop-unused-images",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const sources = Object.values(bundle).map((file) => (file.type === "chunk" ? file.code : typeof file.source === "string" ? file.source : ""));
      for (const [name, file] of Object.entries(bundle)) {
        if (file.type !== "asset" || !/\.(jpe?g|png|webp|avif|gif)$/i.test(name)) continue;
        if (!sources.some((source) => source.includes(name))) delete bundle[name];
      }
    },
  };
}
