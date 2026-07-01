/*
 * Galéria kategória adatok.
 * Új kép hozzáadásához:
 *   1) Tedd a képfájlt az assets/galeria/kepek/<id>/ mappába
 *   2) Írd be a fájlnevét a megfelelő kategória "kepek" tömbjébe
 * A galéria oldal automatikusan megjeleníti.
 */
var GALERIA_KATEGORIAK = [
  {
    id: 'anyak-napi',
    szam: '01',
    cim: 'Anyák napi és virágos ajándékok',
    leiras: 'Anyák napi lapok, pillangós/macis dekorok, tulipánok, csokrok, horgolt virágok.',
    kepek: []
  },
  {
    id: 'valentin-paros',
    szam: '02',
    cim: 'Valentin és páros ajándékok',
    leiras: 'Love feliratok, szívek, páros neves dekorok, évfordulós ajándékok.',
    kepek: []
  },
  {
    id: 'gyerek-lampak',
    szam: '03',
    cim: 'Névre szóló gyerek lámpák',
    leiras: 'Stitch, Micimackó, dínó, Minyon, Hello Kitty, Olaf, gyerekneves lámpák.',
    kepek: []
  },
  {
    id: 'gamer-filmes',
    szam: '04',
    cim: 'Gamer és filmes dekorok',
    leiras: 'Minecraft, Fortnite, GTA, Assassin’s Creed, Pókember, Jurassic Park, popkultúrás lámpák.',
    kepek: []
  },
  {
    id: 'karacsonyi',
    szam: '05',
    cim: 'Karácsonyi termékek',
    leiras: 'Karácsonyi figurák, rénszarvasok, hóemberek, karácsonyi csomagok, vásári ünnepi termékek.',
    kepek: []
  },
  {
    id: 'oszi-halloween',
    szam: '06',
    cim: 'Őszi és Halloween dekorációk',
    leiras: 'Tökök, szellemek, hello fall dekorok, őszi asztali díszek.',
    kepek: []
  },
  {
    id: 'ceges-logos',
    szam: '07',
    cim: 'Céges és logós termékek',
    leiras: 'Világító logók, brandelt táblák, céges ajándékok, promóciós dekorok.',
    kepek: []
  },
  {
    id: 'vendeltatos',
    szam: '08',
    cim: 'Vendéglátós és üzleti kellékek',
    leiras: 'QR menütartók, poháralátétek, bisztrós/éttermes asztali kiegészítők.',
    kepek: []
  },
  {
    id: 'lakasdekor',
    szam: '09',
    cim: 'Lakásdekor és hangulatlámpák',
    leiras: 'Kaspók, vázák, mécsesek, hengerlámpák, asztali/fali dekorok.',
    kepek: []
  },
  {
    id: 'egyedi',
    szam: '10',
    cim: 'Egyedi megrendelések és kiegészítők',
    leiras: 'Kulcstartók, tokenek, tartók, szobrok, rendezvényes projektek, minden egyedi kérés.',
    kepek: []
  }
];
