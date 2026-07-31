import type { Section } from '../data/types';

/**
 * Pistes audio embarquees, indexees par numero de cantique.
 *
 * Vide : aucun enregistrement n'accompagne le recueil a ce jour. La maquette en
 * simulait dix (1, 3, 11, 26, 49, 72, 87, 99, 103, 122) ; ce n'etait qu'une
 * demonstration et il ne faut pas la reproduire.
 *
 * Pour ajouter une piste, il suffit de la declarer ici :
 *   87: require('../../assets/audio/087.m4a'),
 * Le lecteur de l'ecran Lecture et la mention « audio » des listes apparaissent
 * alors d'eux-memes, sans autre modification.
 *
 * Seuls les cantiques peuvent porter un enregistrement, comme dans le prototype.
 */
export const AUDIO_TRACKS: Readonly<Record<number, number>> = {};

export const hasAudio = (section: Section, n: number): boolean =>
  section === 'cantiques' && n in AUDIO_TRACKS;

export const audioSource = (section: Section, n: number): number | undefined =>
  section === 'cantiques' ? AUDIO_TRACKS[n] : undefined;
