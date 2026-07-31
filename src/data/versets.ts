export interface Verset {
  /** Texte du verset, sans guillemets : la carte les porte visuellement. */
  text: string;
  /** Référence en casse naturelle ; l'affichage la met en capitales. */
  reference: string;
}

/**
 * Versets du jour, tous sur la louange et l'adoration.
 *
 * Texte de la version Louis Segond 1910, du domaine public. La numérotation des
 * Psaumes varie d'une édition à l'autre (certaines comptent le titre comme
 * premier verset) : les références suivent ici la numérotation Segond.
 *
 * La liste peut grandir ou rétrécir sans toucher au code : la rotation prend sa
 * longueur, quelle qu'elle soit. Trente-deux versets font un cycle d'environ un mois.
 */
export const VERSETS: readonly Verset[] = [
  {
    text: 'Chantez à l’Éternel un cantique nouveau, car il a fait des merveilles.',
    reference: 'Psaume 98.1',
  },
  { text: 'Que tout ce qui respire loue l’Éternel !', reference: 'Psaume 150.6' },
  {
    text: 'Servez l’Éternel avec joie, venez avec allégresse en sa présence.',
    reference: 'Psaume 100.2',
  },
  {
    text: 'Je bénirai l’Éternel en tout temps ; sa louange sera toujours dans ma bouche.',
    reference: 'Psaume 34.2',
  },
  {
    text: 'Mon âme, bénis l’Éternel ! Que tout ce qui est en moi bénisse son saint nom !',
    reference: 'Psaume 103.1',
  },
  {
    text: 'Venez, chantons avec allégresse à l’Éternel ! Poussons des cris de joie vers le rocher de notre salut.',
    reference: 'Psaume 95.1',
  },
  {
    text: 'Chantez à l’Éternel un cantique nouveau ! Chantez à l’Éternel, vous tous, habitants de la terre !',
    reference: 'Psaume 96.1',
  },
  {
    text: 'Entretenez-vous par des psaumes, par des hymnes et par des cantiques spirituels, chantant et célébrant de tout votre cœur les louanges du Seigneur.',
    reference: 'Éphésiens 5.19',
  },
  {
    text: 'Chantez à Dieu dans vos cœurs, par des psaumes, par des hymnes, par des cantiques spirituels.',
    reference: 'Colossiens 3.16',
  },
  {
    text: 'Il est beau de célébrer notre Dieu, il est doux, il est bienséant de le louer.',
    reference: 'Psaume 147.1',
  },
  {
    text: 'Chantez-lui un cantique nouveau ! Faites retentir vos instruments et vos voix !',
    reference: 'Psaume 33.3',
  },
  {
    text: 'Louez l’Éternel ! Chantez à l’Éternel un cantique nouveau !',
    reference: 'Psaume 149.1',
  },
  {
    text: 'L’Éternel est grand et très digne de louange, et sa grandeur est insondable.',
    reference: 'Psaume 145.3',
  },
  {
    text: 'Car ta bonté vaut mieux que la vie : mes lèvres célèbrent tes louanges.',
    reference: 'Psaume 63.4',
  },
  {
    text: 'Offrons sans cesse à Dieu un sacrifice de louange, le fruit de lèvres qui confessent son nom.',
    reference: 'Hébreux 13.15',
  },
  {
    text: 'Chantez, chantez en son honneur ! Parlez de toutes ses merveilles !',
    reference: 'Psaume 105.2',
  },
  { text: 'Chantez à Dieu, chantez ! Chantez à notre roi, chantez !', reference: 'Psaume 47.7' },
  {
    text: 'Chantez à l’Éternel, vous qui l’aimez, célébrez par vos louanges sa sainteté !',
    reference: 'Psaume 30.5',
  },
  {
    text: 'En te célébrant, j’aurai la joie sur les lèvres, la joie dans mon âme que tu as délivrée.',
    reference: 'Psaume 71.23',
  },
  {
    text: 'Chantez la gloire de son nom, célébrez sa gloire par vos louanges !',
    reference: 'Psaume 66.2',
  },
  {
    text: 'Je chanterai l’Éternel tant que je vivrai, je célébrerai mon Dieu tant que j’existerai.',
    reference: 'Psaume 104.33',
  },
  {
    text: 'À celui qui est assis sur le trône et à l’Agneau soient la louange, l’honneur, la gloire et la force !',
    reference: 'Apocalypse 5.13',
  },
  {
    text: 'C’est ici la journée que l’Éternel a faite : qu’elle soit pour nous un sujet d’allégresse et de joie !',
    reference: 'Psaume 118.24',
  },
  {
    text: 'Je louerai l’Éternel de tout mon cœur, je raconterai toutes tes merveilles.',
    reference: 'Psaume 9.2',
  },
  { text: 'Je chanterai toujours les bontés de l’Éternel.', reference: 'Psaume 89.2' },
  {
    text: 'Il a mis dans ma bouche un cantique nouveau, une louange à notre Dieu.',
    reference: 'Psaume 40.4',
  },
  {
    text: 'Mon cœur est affermi, ô Dieu ! Je chanterai, je ferai retentir mes instruments.',
    reference: 'Psaume 57.8',
  },
  { text: 'Louez l’Éternel ! Mon âme, loue l’Éternel !', reference: 'Psaume 146.1' },
  {
    text: 'Célébrez l’Éternel, car il a fait des choses magnifiques : qu’elles soient connues par toute la terre !',
    reference: 'Ésaïe 12.5',
  },
  { text: 'Vous qui craignez l’Éternel, louez-le !', reference: 'Psaume 22.23' },
  {
    text: 'Quelqu’un est-il dans la joie ? Qu’il chante des cantiques.',
    reference: 'Jacques 5.13',
  },
  {
    text: 'Il est beau de louer l’Éternel, et de célébrer ton nom, ô Très-Haut !',
    reference: 'Psaume 92.2',
  },
];
