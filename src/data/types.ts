export type PartType = 'v' | 'r';

/** Un couplet (t:'v'), un refrain (t:'r') ou un bloc de corps de texte (t:'v' sans n). */
export interface Part {
  t: PartType;
  /** Numéro de couplet. Absent = bloc de texte continu, à afficher sans numéro ni carte refrain. */
  n?: number;
  /** Lignes du bloc, une entrée par ligne chantée. */
  l: string[];
}

export interface Cantique {
  /** Numéro imprimé dans le recueil (1 → 130). Sert d'identifiant. */
  n: number;
  /** Titre en capitales, tel qu'imprimé. */
  title: string;
  parts: Part[];
}

export interface Recueil {
  cantiques: Cantique[];
}

/** Une seule section depuis la suppression des chœurs. */
export type Section = 'cantiques';
