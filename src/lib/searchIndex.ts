import { getSection, getCantique } from '../data/recueil';
import type { Section } from '../data/types';
import { LINE_SEPARATOR, normalize, normalizeIndexed, type IndexedText } from './normalize';

/** Bornes de l'extrait, en caracteres, de part et d'autre du terme trouve. */
const SNIPPET_BEFORE = 34;
const SNIPPET_AFTER = 40;

/** Plafond de resultats, cantiques d'abord. */
export const MAX_RESULTS = 50;

export interface SearchResult {
  section: Section;
  n: number;
  title: string;
  /** Toujours « Cantique » (libelle affiche dans la ligne de resultat). */
  kind: string;
  /** Absent pour une recherche par numero : il n'y a rien a citer. */
  snippet?: { before: string; match: string; after: string };
}

interface IndexEntry {
  section: Section;
  n: number;
  title: string;
  /** Titre et paroles reunis, lignes separees par « · ». Sert aux extraits. */
  source: string;
  indexed: IndexedText;
}

let index: IndexEntry[] | null = null;

function buildEntry(section: Section, n: number, title: string): IndexEntry {
  const lines = [title, ...(getCantique(n)?.parts.flatMap((p) => p.l) ?? [])];
  const source = lines.join(LINE_SEPARATOR);
  return { section, n, title, source, indexed: normalizeIndexed(source) };
}

/**
 * Construit l'index une seule fois. Appele au demarrage, pendant le splash, pour
 * que la premiere frappe dans le champ de recherche ne coute rien.
 */
export function warmSearchIndex(): void {
  if (index) return;
  index = getSection('cantiques').entries.map((e) => buildEntry('cantiques', e.n, e.title));
}

/**
 * Decoupe l'extrait dans le texte d'origine, aux positions rendues par la table
 * de correspondance : c'est ce qui garantit que le terme surligne est bien celui
 * qui a ete trouve, meme quand la normalisation a change la longueur du texte.
 */
function buildSnippet(entry: IndexEntry, at: number, length: number) {
  const { offsets, sourceLength } = entry.indexed;
  const rawStart = offsets[at] ?? 0;
  const lastIndex = at + length - 1;
  const rawMatchEnd = lastIndex < offsets.length ? (offsets[lastIndex] ?? rawStart) + 1 : sourceLength;

  const from = Math.max(0, rawStart - SNIPPET_BEFORE);
  const to = Math.min(sourceLength, rawMatchEnd + SNIPPET_AFTER);

  return {
    before: (from > 0 ? '…' : '') + entry.source.slice(from, rawStart),
    match: entry.source.slice(rawStart, rawMatchEnd),
    after: entry.source.slice(rawMatchEnd, to) + (to < sourceLength ? '…' : ''),
  };
}

/**
 * Recherche du prototype, a l'identique :
 * une requete entierement numerique liste les numeros qui *commencent par* la
 * saisie ; sinon on cherche une sous-chaine dans « titre + toutes les paroles ».
 * Resultats dans l'ordre de numerotation.
 */
export function search(query: string): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];
  warmSearchIndex();

  const numeric = /^\d+$/.test(q);
  const results: SearchResult[] = [];

  for (const entry of index ?? []) {
    if (results.length >= MAX_RESULTS) break;
    const kind = 'Cantique';

    if (numeric) {
      if (!String(entry.n).startsWith(q)) continue;
      results.push({ section: entry.section, n: entry.n, title: entry.title, kind });
      continue;
    }

    const at = entry.indexed.text.indexOf(q);
    if (at < 0) continue;
    results.push({
      section: entry.section,
      n: entry.n,
      title: entry.title,
      kind,
      snippet: buildSnippet(entry, at, q.length),
    });
  }

  return results;
}
