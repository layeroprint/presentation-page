/*
 * Galéria kategória adatok.
 * A display mező az optimalizált WebP előnézet, a file mező az eredeti lightbox kép.
 * Új kép után futtasd újra a galéria képfrissítést, hogy bekerüljön ebbe a listába.
 */
var GALERIA_KATEGORIAK = [
  {
    id: '1-gyerek-lampak',
    szam: '01',
    cim: 'Névre szóló gyerek lámpák',
    leiras: 'Stitch, Micimackó, dinó, Minyon, Hello Kitty, Olaf és gyerekneves lámpák.',
    kepek: [
      { file: 'layero-asset-0087.jpg', display: 'optimized/layero-asset-0087-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0090.jpg', display: 'optimized/layero-asset-0090-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0091.jpg', display: 'optimized/layero-asset-0091-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0093.jpg', display: 'optimized/layero-asset-0093-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0094.jpg', display: 'optimized/layero-asset-0094-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0095.jpg', display: 'optimized/layero-asset-0095-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0099.jpg', display: 'optimized/layero-asset-0099-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0104.jpg', display: 'optimized/layero-asset-0104-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0106.jpg', display: 'optimized/layero-asset-0106-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0110.jpg', display: 'optimized/layero-asset-0110-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0112.jpg', display: 'optimized/layero-asset-0112-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0113.jpg', display: 'optimized/layero-asset-0113-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0114.jpg', display: 'optimized/layero-asset-0114-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '2-gamer-filmes',
    szam: '02',
    cim: 'Gamer és filmes dekorok',
    leiras: 'Minecraft, Fortnite, GTA, Assassin\'s Creed, Pókember, Jurassic Park és popkultúrás lámpák.',
    kepek: [
      { file: 'layero-asset-0024.jpg', display: 'optimized/layero-asset-0024-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0074.jpg', display: 'optimized/layero-asset-0074-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0075.png', display: 'optimized/layero-asset-0075-display.webp', width: 657, height: 900 },
      { file: 'layero-asset-0077.jpg', display: 'optimized/layero-asset-0077-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0079.jpg', display: 'optimized/layero-asset-0079-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0098.jpg', display: 'optimized/layero-asset-0098-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0105.jpg', display: 'optimized/layero-asset-0105-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0117.jpg', display: 'optimized/layero-asset-0117-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0122.png', display: 'optimized/layero-asset-0122-display.webp', width: 657, height: 900 },
      { file: 'layero-asset-0178.jpg', display: 'optimized/layero-asset-0178-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0187.jpg', display: 'optimized/layero-asset-0187-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0264.jpg', display: 'optimized/layero-asset-0264-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0269.jpg', display: 'optimized/layero-asset-0269-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0278.jpg', display: 'optimized/layero-asset-0278-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0283.jpg', display: 'optimized/layero-asset-0283-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0290.webp', display: 'optimized/layero-asset-0290-display.webp', width: 657, height: 900 },
      { file: 'layero-asset-0303.jpg', display: 'optimized/layero-asset-0303-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0304.jpg', display: 'optimized/layero-asset-0304-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '3-ceges-logos',
    szam: '03',
    cim: 'Céges és logós termékek',
    leiras: 'Világító logók, brandelt táblák, céges ajándékok, QR + NFC displayek és promóciós dekorok.',
    kepek: [
      { file: 'layero-asset-0068.jpg', display: 'optimized/layero-asset-0068-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0073.jpg', display: 'optimized/layero-asset-0073-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0088.jpg', display: 'optimized/layero-asset-0088-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0089.jpg', display: 'optimized/layero-asset-0089-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0109.jpg', display: 'optimized/layero-asset-0109-display.webp', width: 675, height: 900 },
      { file: 'layero-asset-0138.png', display: 'optimized/layero-asset-0138-display.webp', width: 900, height: 675 },
      { file: 'layero-asset-0186.jpg', display: 'optimized/layero-asset-0186-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0281.jpg', display: 'optimized/layero-asset-0281-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '4-lakasdekor',
    szam: '04',
    cim: 'Lakásdekor és hangulatlámpák',
    leiras: 'Kaspók, vázák, mécsesek, hengerlámpák, asztali és fali dekorok.',
    kepek: [
      { file: 'layero-asset-0081.webp', display: 'optimized/layero-asset-0081-display.webp', width: 900, height: 675 },
      { file: 'layero-asset-0001.jpg', display: 'optimized/layero-asset-0001-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0008.jpg', display: 'optimized/layero-asset-0008-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0026.jpg', display: 'optimized/layero-asset-0026-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0028.jpg', display: 'optimized/layero-asset-0028-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0031.jpg', display: 'optimized/layero-asset-0031-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0032.jpg', display: 'optimized/layero-asset-0032-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0076.jpg', display: 'optimized/layero-asset-0076-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0078.jpg', display: 'optimized/layero-asset-0078-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0082.jpg', display: 'optimized/layero-asset-0082-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0083.jpg', display: 'optimized/layero-asset-0083-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0118.jpg', display: 'optimized/layero-asset-0118-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0141.jpg', display: 'optimized/layero-asset-0141-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0142.jpg', display: 'optimized/layero-asset-0142-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0143.jpg', display: 'optimized/layero-asset-0143-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0176.jpg', display: 'optimized/layero-asset-0176-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0181.jpg', display: 'optimized/layero-asset-0181-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0182.jpg', display: 'optimized/layero-asset-0182-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0183.jpg', display: 'optimized/layero-asset-0183-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0184.jpg', display: 'optimized/layero-asset-0184-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0185.jpg', display: 'optimized/layero-asset-0185-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0270.jpg', display: 'optimized/layero-asset-0270-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0276.jpg', display: 'optimized/layero-asset-0276-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0277.jpg', display: 'optimized/layero-asset-0277-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0282.jpg', display: 'optimized/layero-asset-0282-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0301.jpg', display: 'optimized/layero-asset-0301-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0305.jpg', display: 'optimized/layero-asset-0305-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '5-lampak',
    szam: '05',
    cim: 'Lámpák',
    leiras: 'Egyedi hangulatlámpák, éjjeli fények és dekoratív világítás.',
    kepek: [
      { file: 'layero-asset-0026.jpg', display: 'optimized/layero-asset-0026-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0031.jpg', display: 'optimized/layero-asset-0031-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0083.jpg', display: 'optimized/layero-asset-0083-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0118.jpg', display: 'optimized/layero-asset-0118-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0276.jpg', display: 'optimized/layero-asset-0276-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '6-anyak-napi',
    szam: '06',
    cim: 'Anyák napi és virágos ajándékok',
    leiras: 'Anyák napi lapok, pillangós és macis dekorok, tulipánok, csokrok és virágos ajándékok.',
    kepek: [
      { file: 'layero-asset-0001.jpg', display: 'optimized/layero-asset-0001-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0076.jpg', display: 'optimized/layero-asset-0076-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0082.jpg', display: 'optimized/layero-asset-0082-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0142.jpg', display: 'optimized/layero-asset-0142-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0181.jpg', display: 'optimized/layero-asset-0181-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0282.jpg', display: 'optimized/layero-asset-0282-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0301.jpg', display: 'optimized/layero-asset-0301-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '7-valentin-paros',
    szam: '07',
    cim: 'Valentin és páros ajándékok',
    leiras: 'Love feliratok, szívek, páros neves dekorok és évfordulós ajándékok.',
    kepek: [
      { file: 'layero-asset-0001.jpg', display: 'optimized/layero-asset-0001-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0183.jpg', display: 'optimized/layero-asset-0183-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0282.jpg', display: 'optimized/layero-asset-0282-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0301.jpg', display: 'optimized/layero-asset-0301-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '8-karacsonyi',
    szam: '08',
    cim: 'Karácsonyi termékek',
    leiras: 'Karácsonyi figurák, rénszarvasok, hóemberek, vásári és ünnepi dekorok.',
    kepek: [
      { file: 'layero-asset-0008.jpg', display: 'optimized/layero-asset-0008-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0028.jpg', display: 'optimized/layero-asset-0028-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0031.jpg', display: 'optimized/layero-asset-0031-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0078.jpg', display: 'optimized/layero-asset-0078-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0142.jpg', display: 'optimized/layero-asset-0142-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0143.jpg', display: 'optimized/layero-asset-0143-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0176.jpg', display: 'optimized/layero-asset-0176-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0181.jpg', display: 'optimized/layero-asset-0181-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0182.jpg', display: 'optimized/layero-asset-0182-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0184.jpg', display: 'optimized/layero-asset-0184-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '9-oszi-halloween',
    szam: '09',
    cim: 'Őszi és Halloween dekorációk',
    leiras: 'Tökök, szellemek, hello fall dekorok és őszi asztali díszek.',
    kepek: [
      { file: 'layero-asset-0032.jpg', display: 'optimized/layero-asset-0032-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0277.jpg', display: 'optimized/layero-asset-0277-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0305.jpg', display: 'optimized/layero-asset-0305-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '10-husveti',
    szam: '10',
    cim: 'Húsvéti dekorációk',
    leiras: 'Húsvéti nyuszik, tojások, tavaszi díszek és ünnepi dekorok.',
    kepek: [
    ]
  },
  {
    id: '11-egyedi',
    szam: '11',
    cim: 'Egyedi megrendelések',
    leiras: 'Kulcstartók, tokenek, tartók, szobrok, rendezvényes projektek és egyedi kérések.',
    kepek: [
    ]
  }
];
