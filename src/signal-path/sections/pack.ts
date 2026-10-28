import type { Chunk, ChunkKind, PackMode } from "../../content/promptlock";

export type Packed = {
  included: Chunk[];
  excluded: { chunk: Chunk; reason: string }[];
  used: number;
};

/** Priority of a chunk type in a mode, from the README's table: highest 3, lowest 1, others 2. */
export function priority(mode: PackMode, kind: ChunkKind) {
  const high = mode.highest.indexOf(kind);
  if (high >= 0) return 3 - high * 0.1;
  return mode.lowest.includes(kind) ? 1 : 2;
}

/**
 * A model of PromptLock's packing step (README and backend/pipeline/packer.py): chunks ranked by the
 * mode, then taken highest priority first; one that does not fit is skipped and the rest are still
 * tried, so the budget is never exceeded. PromptLock would first try to compress or shorten a chunk
 * that does not fit, and reserves room for its prompt template; the model does neither.
 */
export function pack(chunks: Chunk[], mode: PackMode, budget: number): Packed {
  const ranked = chunks
    .map((chunk, order) => ({ chunk, order, score: priority(mode, chunk.kind) }))
    .sort((a, b) => b.score - a.score || a.order - b.order);
  const included: Chunk[] = [];
  const excluded: Packed["excluded"] = [];
  let used = 0;
  for (const { chunk, score } of ranked) {
    if (used + chunk.tokens <= budget) {
      included.push(chunk);
      used += chunk.tokens;
    } else {
      excluded.push({ chunk, reason: score <= 1 ? `Low priority for ${mode.name}` : "No room left in the budget" });
    }
  }
  return { included, excluded, used };
}
