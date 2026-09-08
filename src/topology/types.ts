export type SourceFile = { path: string; language: string; bytes: number; group: string };
export type SourceGroup = { id: string; path: string; parent?: string | null; fileCount: number; ownFileCount: number; languages: Record<string, number> };
export type SourceEdge = { source: string; target: string; kind: string };
export type Repository = {
  id: string; title: string; owner: string; repo: string; url: string; commit: string;
  public: boolean; ownership: string; summary: string; contribution: string;
  files: SourceFile[]; groups: SourceGroup[]; edges: SourceEdge[];
  dependencies: {name: string; manifest: string; kind: string}[];
  languageCounts: Partial<Record<string, number>>; structuralHighlights: string[];
};
export type RepositoryData = { schemaVersion: number; generatedAt: string; repositories: Repository[] };
export type Point = {x: number; y: number};
export type DrawingProps = { repositories: Repository[]; selected: number | null; entered: boolean };
export const inkFor = (language: string) => language === 'Python' ? '#94cdb4' : ['TypeScript', 'JavaScript', 'TSX', 'JSX'].includes(language) ? '#e5e0ce' : '#8c9e98';
