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
      { file: 'grok-image-22e650f7-7182-489a-aed7-748c0576234c.jpg', display: 'optimized/grok-image-22e650f7-7182-489a-aed7-748c0576234c-display.webp', width: 900, height: 900 },
      { file: 'grok-image-3aa5174a-bfa3-4558-96be-37ad6b3c38a8.jpg', display: 'optimized/grok-image-3aa5174a-bfa3-4558-96be-37ad6b3c38a8-display.webp', width: 900, height: 900 },
      { file: 'grok-image-3b13dd19-5b7b-4057-b4a9-0ce53e58fc25.jpg', display: 'optimized/grok-image-3b13dd19-5b7b-4057-b4a9-0ce53e58fc25-display.webp', width: 900, height: 900 },
      { file: 'grok-image-3d4abcd8-b740-4c91-b3ba-38b26e4def1c.jpg', display: 'optimized/grok-image-3d4abcd8-b740-4c91-b3ba-38b26e4def1c-display.webp', width: 900, height: 900 },
      { file: 'grok-image-443eef11-3ef3-496d-b340-ea204a278df6.jpg', display: 'optimized/grok-image-443eef11-3ef3-496d-b340-ea204a278df6-display.webp', width: 900, height: 900 },
      { file: 'grok-image-44d572ff-7764-48f2-a1c5-5f22badbc0db.jpg', display: 'optimized/grok-image-44d572ff-7764-48f2-a1c5-5f22badbc0db-display.webp', width: 900, height: 900 },
      { file: 'grok-image-6de30039-b8ce-4325-a4a5-1577be034931.jpg', display: 'optimized/grok-image-6de30039-b8ce-4325-a4a5-1577be034931-display.webp', width: 900, height: 900 },
      { file: 'grok-image-8a4699d4-2b91-4810-b20a-3a174f22de29.jpg', display: 'optimized/grok-image-8a4699d4-2b91-4810-b20a-3a174f22de29-display.webp', width: 900, height: 900 },
      { file: 'grok-image-ae8a9e84-17f2-4417-b909-da9b1227d930.jpg', display: 'optimized/grok-image-ae8a9e84-17f2-4417-b909-da9b1227d930-display.webp', width: 900, height: 900 },
      { file: 'grok-image-d4f85b69-c89b-4d3b-959b-56028d4d3f46.jpg', display: 'optimized/grok-image-d4f85b69-c89b-4d3b-959b-56028d4d3f46-display.webp', width: 900, height: 900 },
      { file: 'grok-image-d6f83a05-e6e4-4d44-9034-975c76f72c15.jpg', display: 'optimized/grok-image-d6f83a05-e6e4-4d44-9034-975c76f72c15-display.webp', width: 900, height: 900 },
      { file: 'grok-image-d9ff8fa9-3f5c-48e5-b0e3-1229804378eb.jpg', display: 'optimized/grok-image-d9ff8fa9-3f5c-48e5-b0e3-1229804378eb-display.webp', width: 900, height: 900 },
      { file: 'grok-image-f63b0b7b-f0af-4239-9ea2-c1b0f2a681b7.jpg', display: 'optimized/grok-image-f63b0b7b-f0af-4239-9ea2-c1b0f2a681b7-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '2-gamer-filmes',
    szam: '02',
    cim: 'Gamer és filmes dekorok',
    leiras: 'Minecraft, Fortnite, GTA, Assassin\'s Creed, Pókember, Jurassic Park és popkultúrás lámpák.',
    kepek: [
      { file: '72uM8.jpg', display: 'optimized/72uM8-display.webp', width: 900, height: 900 },
      { file: 'dXyHf.jpg', display: 'optimized/dXyHf-display.webp', width: 900, height: 900 },
      { file: 'e075d082-c204-401e-a147-5537254a0147.png', display: 'optimized/e075d082-c204-401e-a147-5537254a0147-display.webp', width: 657, height: 900 },
      { file: 'ED0vo.jpg', display: 'optimized/ED0vo-display.webp', width: 900, height: 900 },
      { file: 'f3xof.jpg', display: 'optimized/f3xof-display.webp', width: 900, height: 900 },
      { file: 'grok-image-6d2e8ed6-a9a3-472c-a84b-36be24263199.jpg', display: 'optimized/grok-image-6d2e8ed6-a9a3-472c-a84b-36be24263199-display.webp', width: 900, height: 900 },
      { file: 'grok-image-928ba578-1109-49bc-b0ad-f7300489ed66.jpg', display: 'optimized/grok-image-928ba578-1109-49bc-b0ad-f7300489ed66-display.webp', width: 900, height: 900 },
      { file: 'grok-image-fef3750f-32df-40aa-bca8-bd2da13feca1.jpg', display: 'optimized/grok-image-fef3750f-32df-40aa-bca8-bd2da13feca1-display.webp', width: 900, height: 900 },
      { file: 'hero-1-hFSu3nNxTHgz.png', display: 'optimized/hero-1-hFSu3nNxTHgz-display.webp', width: 657, height: 900 },
      { file: 'JNfgV.jpg', display: 'optimized/JNfgV-display.webp', width: 900, height: 900 },
      { file: 'kylzM.jpg', display: 'optimized/kylzM-display.webp', width: 900, height: 900 },
      { file: 'm5lOT.jpg', display: 'optimized/m5lOT-display.webp', width: 900, height: 900 },
      { file: 'N1gJd.jpg', display: 'optimized/N1gJd-display.webp', width: 900, height: 900 },
      { file: 'OH52F.jpg', display: 'optimized/OH52F-display.webp', width: 900, height: 900 },
      { file: 'qvXsE.jpg', display: 'optimized/qvXsE-display.webp', width: 900, height: 900 },
      { file: 'simple-2-FpsxVOJbc5yI.webp', display: 'optimized/simple-2-FpsxVOJbc5yI-display.webp', width: 657, height: 900 },
      { file: 'uFZvc.jpg', display: 'optimized/uFZvc-display.webp', width: 900, height: 900 },
      { file: 'XzjyN.jpg', display: 'optimized/XzjyN-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '3-ceges-logos',
    szam: '03',
    cim: 'Céges és logós termékek',
    leiras: 'Világító logók, brandelt táblák, céges ajándékok, QR + NFC displayek és promóciós dekorok.',
    kepek: [
      { file: 'csomag.jpg', display: 'optimized/csomag-display.webp', width: 900, height: 900 },
      { file: 'digitalis etlap QR+NFC.jpg', display: 'optimized/digitalis etlap QR+NFC-display.webp', width: 900, height: 900 },
      { file: 'grok-image-2616584b-a488-4c8f-bd25-cf83f521af27.jpg', display: 'optimized/grok-image-2616584b-a488-4c8f-bd25-cf83f521af27-display.webp', width: 900, height: 900 },
      { file: 'grok-image-35bffffc-c8a3-4757-80be-223ad6282cd2.jpg', display: 'optimized/grok-image-35bffffc-c8a3-4757-80be-223ad6282cd2-display.webp', width: 900, height: 900 },
      { file: 'grok-image-ce0ff7d3-fb16-48a3-b828-cdd9db0ead2b.jpg', display: 'optimized/grok-image-ce0ff7d3-fb16-48a3-b828-cdd9db0ead2b-display.webp', width: 675, height: 900 },
      { file: 'hero_new.png', display: 'optimized/hero_new-display.webp', width: 900, height: 675 },
      { file: 'kulcstarto.jpg', display: 'optimized/kulcstarto-display.webp', width: 900, height: 900 },
      { file: 'pohar alatet tarto + adagolo.jpg', display: 'optimized/pohar alatet tarto + adagolo-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '4-lakasdekor',
    szam: '04',
    cim: 'Lakásdekor és hangulatlámpák',
    leiras: 'Kaspók, vázák, mécsesek, hengerlámpák, asztali és fali dekorok.',
    kepek: [
      { file: 'first.webp', display: 'optimized/first-display.webp', width: 900, height: 675 },
      { file: '00E7Y.jpg', display: 'optimized/00E7Y-display.webp', width: 900, height: 900 },
      { file: '0aqiB.jpg', display: 'optimized/0aqiB-display.webp', width: 900, height: 900 },
      { file: '8iUWN.jpg', display: 'optimized/8iUWN-display.webp', width: 900, height: 900 },
      { file: 'AIGLR.jpg', display: 'optimized/AIGLR-display.webp', width: 900, height: 900 },
      { file: 'aqFsG.jpg', display: 'optimized/aqFsG-display.webp', width: 900, height: 900 },
      { file: 'aXMme.jpg', display: 'optimized/aXMme-display.webp', width: 900, height: 900 },
      { file: 'E07ri.jpg', display: 'optimized/E07ri-display.webp', width: 900, height: 900 },
      { file: 'Etj09.jpg', display: 'optimized/Etj09-display.webp', width: 900, height: 900 },
      { file: 'gIhkX.jpg', display: 'optimized/gIhkX-display.webp', width: 900, height: 900 },
      { file: 'GqkCV.jpg', display: 'optimized/GqkCV-display.webp', width: 900, height: 900 },
      { file: 'gwvrM.jpg', display: 'optimized/gwvrM-display.webp', width: 900, height: 900 },
      { file: 'ht2xT.jpg', display: 'optimized/ht2xT-display.webp', width: 900, height: 900 },
      { file: 'HvIVy.jpg', display: 'optimized/HvIVy-display.webp', width: 900, height: 900 },
      { file: 'iA4LT.jpg', display: 'optimized/iA4LT-display.webp', width: 900, height: 900 },
      { file: 'iicPX.jpg', display: 'optimized/iicPX-display.webp', width: 900, height: 900 },
      { file: 'K3ST8.jpg', display: 'optimized/K3ST8-display.webp', width: 900, height: 900 },
      { file: 'k9AgW.jpg', display: 'optimized/k9AgW-display.webp', width: 900, height: 900 },
      { file: 'Km2iG.jpg', display: 'optimized/Km2iG-display.webp', width: 900, height: 900 },
      { file: 'KrXLM.jpg', display: 'optimized/KrXLM-display.webp', width: 900, height: 900 },
      { file: 'kUhFr.jpg', display: 'optimized/kUhFr-display.webp', width: 900, height: 900 },
      { file: 'n1Vxt.jpg', display: 'optimized/n1Vxt-display.webp', width: 900, height: 900 },
      { file: 'NTdFz.jpg', display: 'optimized/NTdFz-display.webp', width: 900, height: 900 },
      { file: 'o6e0i.jpg', display: 'optimized/o6e0i-display.webp', width: 900, height: 900 },
      { file: 'qQd8N.jpg', display: 'optimized/qQd8N-display.webp', width: 900, height: 900 },
      { file: 'tROvG.jpg', display: 'optimized/tROvG-display.webp', width: 900, height: 900 },
      { file: 'zLVJM.jpg', display: 'optimized/zLVJM-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '5-lampak',
    szam: '05',
    cim: 'Lámpák',
    leiras: 'Egyedi hangulatlámpák, éjjeli fények és dekoratív világítás.',
    kepek: [
      { file: '8iUWN.jpg', display: 'optimized/8iUWN-display.webp', width: 900, height: 900 },
      { file: 'aqFsG.jpg', display: 'optimized/aqFsG-display.webp', width: 900, height: 900 },
      { file: 'GqkCV.jpg', display: 'optimized/GqkCV-display.webp', width: 900, height: 900 },
      { file: 'gwvrM.jpg', display: 'optimized/gwvrM-display.webp', width: 900, height: 900 },
      { file: 'NTdFz.jpg', display: 'optimized/NTdFz-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '6-anyak-napi',
    szam: '06',
    cim: 'Anyák napi és virágos ajándékok',
    leiras: 'Anyák napi lapok, pillangós és macis dekorok, tulipánok, csokrok és virágos ajándékok.',
    kepek: [
      { file: '00E7Y.jpg', display: 'optimized/00E7Y-display.webp', width: 900, height: 900 },
      { file: 'E07ri.jpg', display: 'optimized/E07ri-display.webp', width: 900, height: 900 },
      { file: 'gIhkX.jpg', display: 'optimized/gIhkX-display.webp', width: 900, height: 900 },
      { file: 'HvIVy.jpg', display: 'optimized/HvIVy-display.webp', width: 900, height: 900 },
      { file: 'K3ST8.jpg', display: 'optimized/K3ST8-display.webp', width: 900, height: 900 },
      { file: 'qQd8N.jpg', display: 'optimized/qQd8N-display.webp', width: 900, height: 900 },
      { file: 'tROvG.jpg', display: 'optimized/tROvG-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '7-valentin-paros',
    szam: '07',
    cim: 'Valentin és páros ajándékok',
    leiras: 'Love feliratok, szívek, páros neves dekorok és évfordulós ajándékok.',
    kepek: [
      { file: '00E7Y.jpg', display: 'optimized/00E7Y-display.webp', width: 900, height: 900 },
      { file: 'Km2iG.jpg', display: 'optimized/Km2iG-display.webp', width: 900, height: 900 },
      { file: 'qQd8N.jpg', display: 'optimized/qQd8N-display.webp', width: 900, height: 900 },
      { file: 'tROvG.jpg', display: 'optimized/tROvG-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '8-karacsonyi',
    szam: '08',
    cim: 'Karácsonyi termékek',
    leiras: 'Karácsonyi figurák, rénszarvasok, hóemberek, vásári és ünnepi dekorok.',
    kepek: [
      { file: '0aqiB.jpg', display: 'optimized/0aqiB-display.webp', width: 900, height: 900 },
      { file: 'AIGLR.jpg', display: 'optimized/AIGLR-display.webp', width: 900, height: 900 },
      { file: 'aqFsG.jpg', display: 'optimized/aqFsG-display.webp', width: 900, height: 900 },
      { file: 'Etj09.jpg', display: 'optimized/Etj09-display.webp', width: 900, height: 900 },
      { file: 'HvIVy.jpg', display: 'optimized/HvIVy-display.webp', width: 900, height: 900 },
      { file: 'iA4LT.jpg', display: 'optimized/iA4LT-display.webp', width: 900, height: 900 },
      { file: 'iicPX.jpg', display: 'optimized/iicPX-display.webp', width: 900, height: 900 },
      { file: 'K3ST8.jpg', display: 'optimized/K3ST8-display.webp', width: 900, height: 900 },
      { file: 'k9AgW.jpg', display: 'optimized/k9AgW-display.webp', width: 900, height: 900 },
      { file: 'KrXLM.jpg', display: 'optimized/KrXLM-display.webp', width: 900, height: 900 }
    ]
  },
  {
    id: '9-oszi-halloween',
    szam: '09',
    cim: 'Őszi és Halloween dekorációk',
    leiras: 'Tökök, szellemek, hello fall dekorok és őszi asztali díszek.',
    kepek: [
      { file: 'aXMme.jpg', display: 'optimized/aXMme-display.webp', width: 900, height: 900 },
      { file: 'o6e0i.jpg', display: 'optimized/o6e0i-display.webp', width: 900, height: 900 },
      { file: 'zLVJM.jpg', display: 'optimized/zLVJM-display.webp', width: 900, height: 900 }
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
