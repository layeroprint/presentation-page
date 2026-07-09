/*
 * Date pentru categoriile galeriei.
 * Câmpul display este previzualizarea WebP optimizată, iar câmpul file este imaginea originală pentru lightbox.
 * După adăugarea unei imagini noi, rulează din nou actualizarea galeriei ca să intre în această listă.
 */
var GALERIA_CATEGORII = [
  {
    id: '1-gyerek-lampak',
    numar: '01',
    titlu: 'Lămpi pentru copii cu nume',
    descriere: 'Lămpi cu Stitch, Winnie, dino, Minion, Hello Kitty, Olaf și nume de copii.',
    imagini: [
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
    numar: '02',
    titlu: 'Decoruri gamer și de film',
    descriere: 'Minecraft, Fortnite, GTA, Assassin\'s Creed, Spider-Man, Jurassic Park și lămpi pop-culture.',
    imagini: [
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
    numar: '03',
    titlu: 'Produse corporate și cu logo',
    descriere: 'Logo-uri luminoase, plăcuțe branduite, cadouri corporate, display-uri QR + NFC și decoruri promoționale.',
    imagini: [
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
    numar: '04',
    titlu: 'Decor pentru casă și lămpi ambientale',
    descriere: 'Ghivece, vaze, suporturi de lumânări, lămpi cilindrice, decoruri de masă și perete.',
    imagini: [
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
    numar: '05',
    titlu: 'Lămpi',
    descriere: 'Lămpi ambientale personalizate, lumini de noapte și iluminare decorativă.',
    imagini: [
      { file: 'layero-asset-0026.jpg', display: 'optimized/layero-asset-0026-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0031.jpg', display: 'optimized/layero-asset-0031-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0083.jpg', display: 'optimized/layero-asset-0083-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0118.jpg', display: 'optimized/layero-asset-0118-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0276.jpg', display: 'optimized/layero-asset-0276-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '6-anyak-napi',
    numar: '06',
    titlu: 'Cadouri florale și de Ziua Mamei',
    descriere: 'Felicitări de Ziua Mamei, decoruri cu fluturi și ursuleți, lalele, buchete și cadouri florale.',
    imagini: [
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
    numar: '07',
    titlu: 'Cadouri de Valentin și pentru cupluri',
    descriere: 'Texte Love, inimi, decoruri cu nume pentru cupluri și cadouri aniversare.',
    imagini: [
      { file: 'layero-asset-0001.jpg', display: 'optimized/layero-asset-0001-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0183.jpg', display: 'optimized/layero-asset-0183-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0282.jpg', display: 'optimized/layero-asset-0282-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0301.jpg', display: 'optimized/layero-asset-0301-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '8-karacsonyi',
    numar: '08',
    titlu: 'Produse de Crăciun',
    descriere: 'Figurine de Crăciun, reni, oameni de zăpadă, decoruri de târg și festive.',
    imagini: [
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
    numar: '09',
    titlu: 'Decoruri de toamnă și Halloween',
    descriere: 'Dovleci, fantome, decoruri hello fall și ornamente de masă de toamnă.',
    imagini: [
      { file: 'layero-asset-0032.jpg', display: 'optimized/layero-asset-0032-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0277.jpg', display: 'optimized/layero-asset-0277-display.webp', width: 900, height: 900 },
      { file: 'layero-asset-0305.jpg', display: 'optimized/layero-asset-0305-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '10-husveti',
    numar: '10',
    titlu: 'Decoruri de Paște',
    descriere: 'Iepurași de Paște, ouă, ornamente de primăvară și decoruri festive.',
    imagini: [
    ]
  },
  {
    id: '11-egyedi',
    numar: '11',
    titlu: 'Comenzi personalizate',
    descriere: 'Brelocuri, tokenuri, suporturi, statuete, proiecte de eveniment și cereri personalizate.',
    imagini: [
    ]
  }
];
