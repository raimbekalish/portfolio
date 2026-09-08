import type { Repository, SourceFile } from './types';
// An exact parent directory is a sheet. Empty directories and non-source assets are absent.
export function sourceSheets(repo: Repository): {path: string; files: SourceFile[]}[] {
  const groups = new Map<string, SourceFile[]>();
  for (const file of repo.files) {
    const path = file.path.includes('/') ? file.path.slice(0, file.path.lastIndexOf('/')) : '.';
    groups.set(path, [...(groups.get(path) || []), file]);
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([path, files]) => ({ path, files: files.sort((a,b) => a.path.localeCompare(b.path)) }));
}
export function fileWidth(bytes: number) { return 18 + Math.min(68, Math.log2(Math.max(1, bytes)) * 4.2); }
export function nameOf(path: string) { return path.split('/').pop() || path; }

export function focusEdges(repo: Repository) {
  const degree = new Map<string,number>();
  repo.edges.forEach(edge => degree.set(edge.source,(degree.get(edge.source)||0)+1));
  return [...repo.edges].sort((a,b)=>(degree.get(b.source)||0)-(degree.get(a.source)||0)||a.source.localeCompare(b.source)||a.target.localeCompare(b.target)).slice(0,4);
}
