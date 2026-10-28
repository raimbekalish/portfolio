// AI Visual Novel Creator: how the team's pipeline works, from the public repository README
// (github.com/Vimpel-O-O/AI_Visual_Novel_Creator), and which stages were mine, from the current site.
// No award is claimed: the public CodeDay showcase lists the project but no award.

/** Areas of the project screenshot. */
export type FrameRegion = "art" | "line" | "interface";

export type NovelStage = {
  id: string;
  name: string;
  tool: string;
  detail: string;
  by: "mine" | "team";
  /** The part of the screenshot this stage produced, if any. */
  region?: FrameRegion;
};

/** Each region as percentages of the game frame (the screenshot with its window chrome cropped away). */
export const regions: Record<FrameRegion, { label: string; box: { x: number; y: number; w: number; h: number } }> = {
  art: { label: "the scene image", box: { x: 0, y: 0, w: 100, h: 74.6 } },
  line: { label: "the speaker and dialogue line", box: { x: 16.8, y: 74.8, w: 39.6, h: 11.7 } },
  interface: { label: "Ren’Py’s dialogue window and menu", box: { x: 0, y: 74.6, w: 100, h: 25.4 } },
};

const stages: NovelStage[] = [
  { id: "input", name: "Story input", tool: "Interactive prompts", detail: "Prompts collect the narrative, genre, art style, characters and mood.", by: "team" },
  { id: "story", name: "Story JSON", tool: "Gemini 2.5 Flash", detail: "Gemini writes the whole story as structured JSON: a style bible and its scenes.", by: "team", region: "line" },
  { id: "script", name: "Ren’Py script", tool: "Python → .rpy", detail: "The story becomes a Ren’Py script with character definitions and dialogue.", by: "mine", region: "line" },
  { id: "images", name: "Scene images", tool: "Stability AI", detail: "One 1920 × 1080 image per scene, generated from its description.", by: "mine", region: "art" },
  { id: "play", name: "Playable novel", tool: "Ren’Py", detail: "The generated project opens and plays in Ren’Py.", by: "team", region: "interface" },
];

export const visualNovel = {
  slug: "ai-visual-novel-creator",
  /** The section heading from the current site. */
  headline: { lead: "From a story idea", rest: "to a playable", accent: "visual novel." },
  team: "Team project",
  event: "CodeDay Seattle 2025",
  stages,
  /** The story format exactly as the README documents it, placeholders included. */
  storyFormat: `{
  "style_bible": "art style description",
  "scenes": [
    {
      "id": "s001",
      "bg": {"location": "...", "time": "..."},
      "characters": [{"name": "...", "look_key": "...", "pose": "..."}],
      "camera": "...",
      "mood": "...",
      "dialogue": ["..."]
    }
  ]
}`,
  screenshot: {
    src: "images/visual-novel.jpg",
    width: 1723,
    height: 1080,
    /** The game frame inside the captured window: chrome above it, a black bar below. */
    frame: { top: 70, height: 970 },
    alt: "AI Visual Novel Creator project scene: Anya overlooking a city at sunset, with a Ren’Py dialogue panel.",
    credit: "Project screenshot from the team’s public CodeDay showcase entry",
  },
};
