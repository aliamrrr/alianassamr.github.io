/* eslint-disable */
// Pixel art, match simulation, detection/tracking overlay, CodmAI demo and penalty sprites.
// Generated from the Atay Motion Lab prototype so the site behaves exactly like the demos.

/* ── basics ──────────────────────────────────────────────── */
const C = { ink: '#32404f', ink2: '#66727f', ink3: '#9aa3ad', red: '#C1272D', green: '#006233', gold: '#D4A72C', tea: '#B06828',
  glass: '#B8C0C8', steam: '#C3CAD1', mint: '#2EA05A', white: '#ffffff', sand: '#B07A3B', shade: '#dfe3e7', line: '#e6e9ec' };
const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const R = Math.round, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rnd = (s) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ── sprites ─────────────────────────────────────────────── */
const STAR = ['.....X.....', '.X..XXX..X.', '..XXXXXXX..', '..XXXXXXX..', '.XXXX.XXXX.', 'XXXX...XXXX', '.XXXX.XXXX.', '..XXXXXXX..', '..XXXXXXX..', '.X..XXX..X.', '.....X.....'];
const STAR_OPEN = ['.....X.....', '.X..XXX..X.', '..XXX.XXX..', '..XX...XX..', '.XX.....XX.', 'XXX.....XXX', '.XX.....XX.', '..XX...XX..', '..XXX.XXX..', '.X..XXX..X.', '.....X.....'];
const STAR_SMALL = ['...X...', '.X.X.X.', '..XXX..', 'XXX.XXX', '..XXX..', '.X.X.X.', '...X...'];
const GEM5 = ['..X..', '.XXX.', 'XX.XX', '.XXX.', '..X..'], GEM3 = ['.X.', 'XXX', '.X.'], DOT = ['X'];
const ARROW = ['X..........', 'XX.........', 'XWX........', 'XWWX.......', 'XWWWX......', 'XWWWWX.....', 'XWWWWWX....', 'XWWWWWWX...', 'XWWWWWWWX..', 'XWWWWXXXXX.', 'XWWXWX.....', 'XWX.XWX....', 'XX..XWX....', 'X....XWX...', '.....XWX...', '......XX...'];
const CAMEL = [
  ['..........XX.', '.........XXXX', '...XX....XX..', '..XXXX..XX...', '.XXXXXXXXX...', 'XXXXXXXXXX...', '.XXXXXXXX....', '.X..X..X..X..', '.X..X..X..X..'],
  ['..........XX.', '.........XXXX', '...XX....XX..', '..XXXX..XX...', '.XXXXXXXXX...', 'XXXXXXXXXX...', '.XXXXXXXX....', '..X.X...X.X..', '..X.X...X.X..'],
];
const LANT = {"idle": [".......O.......", "......O.O......", "......O.O......", ".......O.......", "......OhO......", ".....OhYyO.....", "....OhYYYyO....", "...OhYYYYYyO...", "..OYyYyYyYyYO..", ".OhyyyyyyyyyyO.", ".OYyryylyygyyO.", ".OYrrylllyggyO.", ".OYrrylllyggyO.", ".OYyyylLlyyyyO.", ".OYrrylllyggyO.", ".OYrrylllyggyO.", ".OYyyyyyyyyyyO.", "..OOOOOOOOOOO..", "..OYyYyYyYyYO..", "....OYYYYYO....", "......OYO......", ".......O......."], "hot": [".......O.......", "......O.O......", "......O.O......", ".......O.......", "......OhO......", ".....OhYyO.....", "....OhYYYyO....", "...OhYYYYYyO...", "..OYyYyYyYyYO..", ".OhyyyyyyyyyyO.", ".OYyRyyLyyGyyO.", ".OYRRyLLLyGGyO.", ".OYRRyLWLyGGyO.", ".OYyyyLWLyyyyO.", ".OYRRyLLLyGGyO.", ".OYRRyLLLyGGyO.", ".OYyyyyyyyyyyO.", "..OOOOOOOOOOO..", "..OYyYyYyYyYO..", "....OYYYYYO....", "......OYO......", ".......O......."], "miniIdle": ["...O...", "..OhO..", ".OYYyO.", "OOOOOOO", "OrlLlgO", "OrlLlgO", "OyyyyyO", "OrlllgO", "OOOOOOO", ".OYYyO.", "..OOO.."], "miniHot": ["...O...", "..OhO..", ".OYYyO.", "OOOOOOO", "ORLWLGO", "ORLWLGO", "OyyyyyO", "ORLLLGO", "OOOOOOO", ".OYYyO.", "..OOO.."], "tile": ["......K......", ".....KZK.....", "..KKKZZZKKK..", "..KZZZEZZZK..", "..KZEEZEEZK..", ".KZZEZAZEZZK.", "KZZEZAAAZEZZK", ".KZZEZAZEZZK.", "..KZEEZEEZK..", "..KZZZEZZZK..", "..KKKZZZKKK..", ".....KZK.....", "......K......"], "pal": {"O": "#3A2A12", "Y": "#D9A83A", "y": "#8E6416", "h": "#F7D98A", "R": "#D23A3F", "r": "#7E1A1E", "G": "#1E9A5A", "g": "#0B5530", "L": "#FFE39A", "l": "#E9A84A", "W": "#FFFBEA", "d": "#5B3A12", "Z": "#F4EFE6", "B": "#1F5FA8", "b": "#163F70", "A": "#C98A2E", "E": "#0E7A44", "K": "#2B2B33"}};
const CUR = {"zIdle":["K............","KK...........","KgK..........","KggK.........","KgzgK........","KgzzgK.......","KgzzzgK......","KgzazzgK.....","KgzzzzzgK....","KgzzzazzgK...","KgzzzzzgggK..","KgzagzgKKKKK.","KgzgKggK.....","KggKKggK.....","KgK..KggK....","KK...KggK....","K.....KggK...","......KggK...",".......KK...."],"zHot":["K............","KK...........","KrK..........","KrrK.........","KrzrK........","KrzgrK.......","KrzzzrK......","KrzdzgrK.....","KrzzzzzrK....","KrzgzdzgrK...","KrzzzzzrrrK..","KrzdrgrKKKKK.","KrzrKrrK.....","KrrKKrrK.....","KrK..KrrK....","KK...KrrK....","K.....KrrK...","......KrrK...",".......KK...."],"babIdle":["O.................",".YOO..............",".OYyOO............",".OYYyyOO..........","..OYYyyyyOO.......","..OhYsyyyyOO......","...OhYsyyyyOO.....","...OhhYsyyvvOO....","....hhhYYvviiOO...","....OhYYvviiiyO...","....OOYvviiiiiO...",".....OOviiiiiiO...","......OOiiiiii....",".......OOYiiiY....","........OOOO......","..................","..................",".................."],"babHot":["O.................",".ROO..............",".ORqOO............",".ORRqqOO..........","..ORRqqqqOO.......","..OHRdqqqqOO......","...OHRdqqqqOO.....","...OHHRdqqvvOO....","....HHHRRvviiOO...","....OHRRvviiiqO...","....OORvviiiiiO...",".....OOviiiiiiO...","......OOiiiiii....",".......OORiiiR....","........OOOO......","..................","..................",".................."],"fez":["......KK......",".....K..K.....","....KRRRRK....","...KHRRRRqK...","...KHRRRRqK...","..KHRRRRRRqK..","..KHRRRRRRqK..","..KRRRRRRRqK..",".KqqqqqqqqqqK.",".KqqqqqqqqqqK.","..KKKKKKKKKK.."],"catIdle":[".O...........O.",".OO.........OO.",".OpO.......OpO.",".OppOOOOOOOppO.","OcccccscscccccO","OcccsccsccscccO","OcceEcccccEeccO","OcceEcccccEeccO","OcccccCmCcccccO","WOcCmmmnmmmCcOW",".OccmmOmOmmccO.","..OOcccOcccOO..","....OOOOOOO...."],"catHappy":[".O...........O.",".OO.........OO.",".OpO.......OpO.",".OppOOOOOOOppO.","OcccccscscccccO","OcccsccsccscccO","OccOcOcccOcOccO","OcOccOcccOccOcO","OcccccCmCcccccO","WOcCmmmnmmmCcOW",".OccmmOmOmmccO.","..OOcccOcccOO..","....OOOOOOO...."],"robIdle":["......A......","......D......",".....DDD.....","..KKKKKKKKK..",".KLLLLLLLLLK.","DKLNNNNNNNLKD","DKLNBBNBBNLKD",".KLNBBNBBNLK.",".KLNNNNNNNLK.",".KLNNBBBNNLK.",".KLLLLLLLLLK.","..KKKKKKKKK..","....KGGGK....","...KGGGGGK..."],"robHot":["......x......","......D......",".....DDD.....","..KKKKKKKKK..",".KLLLLLLLLLK.","DKLNNNNNNNLKD","DKLNAANAANLKD",".KLNAANAANLK.",".KLNNANANNLK.",".KLNNBBBNNLK.",".KLLLLLLLLLK.","..KKKKKKKKK..","....KGGGK....","...KGGGGGK..."],"pal":{"K":"#1E2430","W":"#FFFFFF","g":"#0E7A44","a":"#C98A2E","b":"#1F5FA8","z":"#F4EFE6","r":"#C1272D","d":"#D4A72C","Y":"#E8B83A","y":"#B8861E","h":"#FFF0B8","s":"#7A4E10","i":"#5A2E12","R":"#C8333A","q":"#8E1A1F","H":"#F07A7E","O":"#3A2414","c":"#E39A4B","C":"#F7C98E","t":"#B8652A","p":"#F2A0A8","e":"#46B565","E":"#1E2430","m":"#FCE6C8","n":"#E07A8A","G":"#D9DEE3","L":"#F5F7F9","D":"#7E8894","N":"#1B2638","B":"#5FD3F0","A":"#C1272D","x":"#2EA05A","T":"#1E2430","u":"#3A3A3A","v":"#F0D9A8"}};
const MORO = {"tajine":[".........KK.........","........KuTK........","........KTtK........",".......KuTtK........",".......KuTtK........","......KvuTTtK.......",".....KvuTTTttK......",".....KvuTTTttK......","....KvvGTTGttGK.....","...KZvZuZTZTZtZK....","...KvvuTTTTTtttK....","..KvvuuTTTTTttttK...",".KvvvuuTTTTTtttttK..",".KBZBZBZBZBZBZBZBK..","KvvvuuuTTTTTTtttttK.","ZBZBZBZBZBZBZBZBZBZK","TTTTTTTTTTTTTttttttK","KKtttttttttttttttKK.","..KKKKKKKKKKKKKKK...","...................."],"tajineOpen":[".......KuTtK........",".......KuTtK........","......KvuTTtK.......",".....KvuTTTttK......",".....KvuTTTttK......","....KvvGTTGttGK.....","...KZvZuZTZTZtZK....","...KvvuTTTTTtttK....","..KvvuuTTTTTttttK...",".KvvvuuTTTTTtttttK..",".KBZBZBZBZBZBZBZBK..","KvvvuuuTTTTTTtttttK.",".KKKKKKKKKKKKKKKKK..","....................","KKKKKKKKKKKKKKKKKKK.","ZBZBZBZBZBZBZBZBZBZK","TTTTTTTTTTTTTttttttK","KKtttttttttttttttKK.","..KKKKKKKKKKKKKKK...","...................."],"door":["....KKKWWWKKK....","...KWWWWWWWwwK...","..KWWWWWWWWwwwK..",".KWWWWDDbDDwwwwK.","KWWWWDDDbDDDwwwwK","KWWWeDDDbDDDdwwwK","KWWeeDDDbDDDddwwK","WWWeeDDYbYDDddwww","WWWeeDDDbDDDddwww","WWeeeDDDbDDDdddww","WWeeeDDDbDDDdddww","WWeeeYDDbDDYdddww","WWeeeDDDbDDDdddww","WWeeeDDDbYDDdddww","WWeeeDDDYyYDdddww","WWeeeYDDbYDYdddww","WWeeeDDDbDDDdddww","WWeeeDDDbDDDdddww","WWeeeDDDbDDDdddww","WWeeeYDDbDDYdddww","WWeeeDDDbDDDdddww","Wwwwwwwwwwwwwwwww"],"doorOpen":["....KKKWWWKKK....","...KWWWWWWWwwK...","..KWWWWWWWWwwwK..",".KWWWWlllllwwwwK.","KWWWWlllllllwwwwK","KWWWDllllllllwwwK","KWWdDlllllllllwwK","WWWdDlllllllllwww","WWWdDlllllllllwww","WWddDllllLLLLllww","WWddDllLLLLLLLLww","WWddDllLLLLLLLLww","WWddDlLLLLLLLLLww","WWddDlLLLLLLLLLww","WWddDlLLLLLLLLLww","WWddDlLLLLLLLLLww","WWddDllLLLLLLLLww","WWddDllLLLLLLLLww","WWddDllllLLLLllww","WWddDllllllllllww","WWddDllllllllllww","Wwwwwwwwwwwwwwwww"],"lion":["......KMK..KKKK......",".....KnMMKKmMMMK.....","....KnnMMnmnMMMnK....","..KKKmnMMnmnMMnmKKK..",".KnnmffMMnmnMMffmnMK.","KnnnnmmnFFFFFnmmnMMK.",".KnnnnmFFFFFFfmMMMMMK",".KnMMMFFFFFFFffMMMnnK",".KmmnFFmmFFFFmmfnmmK.",".KmmmFFFEFFFFEffmmmK.","KnnnnFFFFFFFFfffnnnnK","MMMMMFFFFFFFFfffMMMMM","MMMMMFFFFZNNZfffMMMMK","KKnnmFFFFZNNZfffmnnMK",".KmmmnFFFFNNFffnmmmK.","..KmnMFFFfFFfffMnmK..","..KnMMMFFFFFFfMMMnK..","..KMMMnmmFFFmmnMMMK..","..KMMMKmmMMMmmmMMK...","...KKK.KnMMMKKKKK....","........KKMMK........"],"lionRoar":["......KMK..KKKK......",".....KnMMKKmMMMK.....","....KnnMMnmnMMMnK....","..KKKmnMMnmnMMnmKKK..",".KnnmffMMnmnMMffmnMK.","KnnnnmmnFFFFFnmmnMMK.",".KnnnnmFFFFFFfmMMMMMK",".KnMMMFFFFFFFffMMMnnK",".KmmnFFmmFFFFmmfnmmK.",".KmmmFFFEFFFFEffmmmK.","KnnnnFFFFFFFFfffnnnnK","MMMMMFFFFFFFFfffMMMMM","MMMMMFFFFZNNZfffMMMMK","KKnnmFFFFZNNZfffmnnMK",".KmmmnFFFXrrXffnmmmK.","..KmnMFFFRrrRffMnmK..","..KnMMMFFFRRFfMMMnK..","..KMMMnmmFFFmmnMMMK..","..KMMMKmmMMMmmmMMK...","...KKK.KnMMMKKKKK....","........KKMMK........"],"glassMid":[".............","..........K..",".........KxK.","........KxxK.",".......KxxK..",".KKKKKKxxGKK.","KWZQQQQQQQQwK","KWZQQQQQQQQwK","KWZQQQQQQQQwK","KWZQQQQQQQQwK","KWhQhQhQhQhwK","KWZQQQQQQQQwK","KYyYyYyYyYyYK",".KKWlnnnIwKK.","..KWlnnnIwK..","..KWlnnnIwK..","..KWlnnnIwK..","..KWlnnnIwK..",".KwwwwwwwwwK.","..KKKKKKKKK.."],"glassFull":[".............","..........K..",".........KxK.","........KxxK.",".......KxxK..",".KKKKKKxxGKK.","KWZQQQQQQQQwK","KWZQQQQQQQQwK","KWZQQQQQQQQwK","KWlllnnnIIIwK","KWhlhnhnhIhwK","KWlllnnnIIIwK","KYyYyYyYyYyYK",".KKWlnnnIwKK.","..KWlnnnIwK..","..KWlnnnIwK..","..KWlnnnIwK..","..KWlnnnIwK..",".KwwwwwwwwwK.","..KKKKKKKKK.."],"potPtr":["........OYyO......","........OYYO......","........OOOO......","OO.....OMSSLO.....","SSO....OMSSLO.....","OSO...OMMSSSSO....","..SO..OMSSSSMOOO..","..SO..OSSLLLLOSSO.","..MSOOSSSSLLLLOOSO","..OSOOSSSSSSLLOOSO","..OMSOYyYyYyYyOOMO","...OMSMMMSSSSSMMO.","....OMSMMMMMSMOO..",".....OMOMMMMOO....","......OMSSSSMO....",".......OOOOOO....."],"pal":{"K":"#24180F","k":"#3B2A1E","T":"#C4622D","t":"#8E3F1C","u":"#E58A55","v":"#F2B184","Z":"#F4EFE6","B":"#1F5FA8","b":"#163F70","G":"#0E7A44","Y":"#D4A72C","y":"#9C7716","h":"#F5D27A","D":"#2E6FB7","d":"#1B4A80","e":"#6FA8E0","W":"#F4F1EA","w":"#D9D3C7","L":"#FFD27A","l":"#F0A040","I":"#5A3A1A","M":"#A8621E","m":"#7A4210","n":"#D08A35","F":"#E8B068","f":"#C98E48","E":"#24180F","N":"#5A2E1A","R":"#C1272D","r":"#8E1A1F","X":"#FFFFFF","S":"#CBD2D8","x":"#2EA05A","Q":"#EAF1F5"},"potPal":{"O":"#3E4651","S":"#AEB6C0","L":"#E6EAEE","M":"#7F8995","Y":"#E0B33A","y":"#A27A17","T":"#B5651D","t":"#7E400F","G":"#EEF3F6","g":"#9FAEB9","N":"#2EA05A","W":"#C6CED6"}};
const TILE = LANT.tile, TILE_MASK = TILE.map((r) => r.replace(/[^.]/g, 'X'));
const MOON = ['..XXX.', '.XX...', 'XX....', 'XX....', 'XX....', '.XX...', '..XXX.'];

/* Sprites are rendered once into a small offscreen canvas (per rows × palette × scale)
   and then blitted with a single drawImage — instead of one fillRect per pixel per frame. */
const _sprCache = new WeakMap();
const _palSig = new WeakMap();
function _sig(pal) {
  if (typeof pal === 'string') return pal;
  let s = _palSig.get(pal);
  if (s === undefined) { s = Object.keys(pal).map((k) => k + pal[k]).join(','); _palSig.set(pal, s); }
  return s;
}
function _sprite(rows, pal, s) {
  let m = _sprCache.get(rows);
  if (!m) { m = new Map(); _sprCache.set(rows, m); }
  const key = s + '|' + _sig(pal);
  let c = m.get(key);
  if (!c) {
    let W = 0; for (const r of rows) if (r.length > W) W = r.length;
    c = document.createElement('canvas');
    c.width = Math.max(1, Math.ceil(W * s)); c.height = Math.max(1, Math.ceil(rows.length * s));
    const g = c.getContext('2d'); const mono = typeof pal === 'string';
    for (let j = 0; j < rows.length; j++) {
      const row = rows[j];
      for (let i = 0; i < row.length; i++) {
        const ch = row[i]; if (ch === '.') continue;
        const col = mono ? pal : pal[ch]; if (!col) continue;
        g.fillStyle = col; g.fillRect(i * s, j * s, s, s);
      }
    }
    if (m.size > 48) m.delete(m.keys().next().value);
    m.set(key, c);
  }
  return c;
}
function _blit(ctx, c, x, y) {
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false;
  ctx.drawImage(c, x, y);
  ctx.imageSmoothingEnabled = sm;
}
function spr(ctx, rows, x, y, s, color) { _blit(ctx, _sprite(rows, color, s), x, y); }
function sprM(ctx, rows, x, y, s, pal) { _blit(ctx, _sprite(rows, pal, s), x, y); }
const sprC = (ctx, rows, cx, cy, s, color) => spr(ctx, rows, R(cx - rows[0].length * s / 2), R(cy - rows.length * s / 2), s, color);

/* teapot pouring atay (same art as the site) */
const POT = ['....D...................', '...DYD..................', '..DSSSD.................', '.DSLSSSD................', 'DDDDDDDDD...............', 'DSLSSSSSD.........DD....', 'DSLSSSSSSD.......DSD....', 'DSSSSSSSSD......DSD.....', 'DSSSSSSSSSDDDDDDSD......', 'DSSSSSSSSSSSSSSSD.......', '.DSSSSSSSDDDDDDD........', '..DDDDDDD...............', '........................', '........................', '........................', '........................'];
const TEA_PAL = { D: '#4A5460', S: '#AAB2BC', L: '#D6DCE2', Y: '#D4A72C', N: '#C3CAD1', T: '#B06828', M: '#2EA05A', W: '#CDD2D8' };
function pour(fill, stream, steam, leaf) {
  const g = POT.map((r) => r.split(''));
  [10, 11, 12].forEach((y) => { g[y][18] = 'N'; g[y][23] = 'N'; });
  [13, 14].forEach((y) => { g[y][19] = 'N'; g[y][22] = 'N'; });
  for (let x = 19; x < 23; x++) g[15][x] = 'N';
  const inner = { 14: [20, 21], 13: [20, 21], 12: [19, 20, 21, 22], 11: [19, 20, 21, 22], 10: [19, 20, 21, 22] };
  const order = [14, 13, 12, 11, 10];
  order.slice(0, fill).forEach((y) => inner[y].forEach((x) => { g[y][x] = 'T'; }));
  for (let x = 18; x < 24; x++) g[12][x] = 'Y';
  if (stream) { const top = fill ? order[fill - 1] : 15; for (let y = 6; y < top; y++) g[y][20] = 'T'; }
  if (leaf) { g[9][20] = 'M'; g[9][21] = 'M'; g[10][21] = 'M'; }
  if (steam === 1) { g[8][19] = 'W'; g[7][20] = 'W'; g[6][19] = 'W'; }
  if (steam === 2) { g[8][20] = 'W'; g[7][19] = 'W'; g[6][20] = 'W'; g[5][19] = 'W'; }
  return g.map((r) => r.join(''));
}
const TEA = [pour(0, 0, 0, 0), pour(1, 1, 0, 0), pour(2, 1, 0, 0), pour(3, 1, 0, 0), pour(4, 1, 0, 0), pour(5, 1, 0, 0), pour(5, 0, 1, 1), pour(5, 0, 2, 1)];
const TEA_HOLD = [3, 1, 1, 1, 1, 1, 3, 3];
function teaFrame(t) { // t in ms, 6 fps with holds
  const tot = TEA_HOLD.reduce((a, b) => a + b, 0); let k = Math.floor(t / 166) % tot;
  for (let i = 0; i < TEA.length; i++) { if (k < TEA_HOLD[i]) return TEA[i]; k -= TEA_HOLD[i]; }
  return TEA[0];
}

/* ── plumbing ────────────────────────────────────────────── */
function layer(host, z = 6) {
  const c = document.createElement('canvas'); c.className = 'fx'; c.style.zIndex = z; c.setAttribute('aria-hidden', 'true'); host.appendChild(c);
  const L = { c, ctx: null, w: 0, h: 0 };
  L.fit = () => {
    const dpr = Math.min(2, devicePixelRatio || 1); const r = c.getBoundingClientRect();
    c.width = Math.max(1, R(r.width * dpr)); c.height = Math.max(1, R(r.height * dpr));
    L.ctx = c.getContext('2d'); L.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); L.ctx.imageSmoothingEnabled = false; L.w = r.width; L.h = r.height;
  };
  return L;
}
function fitCanvas(c) {
  const dpr = Math.min(2, devicePixelRatio || 1); const r = c.getBoundingClientRect();
  c.width = Math.max(1, R(r.width * dpr)); c.height = Math.max(1, R(r.height * dpr));
  const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
  return { ctx, w: r.width, h: r.height };
}
function pointer(el) {
  const p = { x: 0, y: 0, inside: false, down: false, clicks: [] };
  const pos = (e) => { const r = el.getBoundingClientRect(); p.x = e.clientX - r.left; p.y = e.clientY - r.top; };
  el.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; pos(e); p.inside = true; });
  el.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; pos(e); p.inside = true; });
  el.addEventListener('pointerleave', () => { p.inside = false; p.down = false; });
  el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; pos(e); p.down = true; p.clicks.push({ x: p.x, y: p.y }); });
  el.addEventListener('pointerup', () => { p.down = false; });
  return p;
}
function tour(getPts, move = 900) {
  let i = 0, t0 = performance.now(), fired = -1;
  return (now) => {
    const pts = getPts(); const n = pts.length; const a = pts[i % n], b = pts[(i + 1) % n];
    const dw = a.dwell ?? 650; const e = now - t0;
    if (e >= dw + move) { i++; t0 = now; return { x: b.x, y: b.y, click: false }; }
    if (e < dw) { let click = false; if (a.click && e > dw * .45 && fired !== i) { fired = i; click = true; } return { x: a.x, y: a.y, click }; }
    const k = easeInOut((e - dw) / move);
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k - Math.sin(k * Math.PI) * 12, click: false };
  };
}
function cur(ptr, tr, now) {
  if (ptr.inside) return { x: ptr.x, y: ptr.y, clicks: ptr.clicks.splice(0), down: ptr.down, real: true };
  ptr.clicks.length = 0; const t = tr(reduce ? 900 : now);
  return { x: t.x, y: t.y, clicks: t.click ? [{ x: t.x, y: t.y }] : [], down: false, real: false };
}
function relRect(host, el) { const a = host.getBoundingClientRect(), b = el.getBoundingClientRect(); return { x: b.left - a.left, y: b.top - a.top, w: b.width, h: b.height }; }
const within = (p, r) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
function makePill(host) {
  const el = document.createElement('span'); el.className = 'pill'; el.hidden = true; host.appendChild(el);
  const st = { target: '', from: '', shown: '', t0: 0 };
  return (label, x, y, now, w) => {
    if (label !== st.target) { st.from = st.shown; st.target = label; st.t0 = now; }
    let s;
    if (st.target) { const d = Math.min(40 + 12 * st.target.length, 160); s = st.target.slice(0, R(easeOut(Math.min(1, (now - st.t0) / d)) * st.target.length)); }
    else { const f = st.from || ''; const d = Math.min(40 + 12 * f.length, 160); s = f.slice(0, R((1 - easeOut(Math.min(1, (now - st.t0) / d))) * f.length)); }
    if (s !== st.shown) { st.shown = s; el.textContent = s; el.hidden = !s; }
    if (s) { const pw = el.offsetWidth; const left = x + 18 + pw > w - 6 ? x - 18 - pw : x + 18; el.style.transform = `translate(${R(left)}px, ${R(y - 12)}px)`; }
  };
}
function velocity(st, x, y, dt) {
  if (st.px !== undefined) { const ivx = (x - st.px) / Math.max(dt, 1) * 16, ivy = (y - st.py) / Math.max(dt, 1) * 16; st.vx = (st.vx || 0) + (ivx - (st.vx || 0)) * .25; st.vy = (st.vy || 0) + (ivy - (st.vy || 0)) * .25; }
  const moved = st.px !== undefined ? Math.hypot(x - st.px, y - st.py) : 0; st.px = x; st.py = y; return moved;
}

/* ── shared draw pieces ──────────────────────────────────── */
function drawStar(ctx, x, y, hot, down, now = performance.now()) {
  if (hot) { const g = ctx.createRadialGradient(x, y + 2, 2, x, y + 2, 28); g.addColorStop(0, 'rgba(255,214,120,.55)'); g.addColorStop(.5, 'rgba(255,196,90,.16)'); g.addColorStop(1, 'rgba(255,196,90,0)'); ctx.fillStyle = g; ctx.fillRect(x - 30, y - 28, 60, 60); }
  const sway = R(Math.sin(now / 520));
  sprM(ctx, hot || down ? LANT.hot : LANT.idle, R(x - 7.5 + sway), R(y - 13), 1, LANT.pal);
}

/* all base cursors; (x, y) is the hotspot. st keeps per-stage state (velocity, particles). */
const HEART = ['.X.X.', 'XXXXX', 'XXXXX', '.XXX.', '..X..'];
const catBlink = CUR.catIdle.map((r, y) => (y === 6 ? r.replace(/[eE]/g, 'c') : y === 7 ? r.replace(/[eE]/g, 'O') : r));
const robBlink = CUR.robIdle.map((r, y) => (y === 6 ? r.replace(/B/g, 'N') : y === 7 ? r.replace(/B/g, 'N').replace('NNNNN', 'NBBNN') : r));
function drawBase(mode, ctx, x, y, hot, down, now, st, clicks = []) {
  st.fx = st.fx || [];
  const P = CUR.pal;
  if (mode === 'none') { sprM(ctx, ARROW, R(x), R(y), 1, { X: C.ink, W: C.white }); return; }
  if (mode === 'lantern' || mode === 'glow' || !mode) { drawStar(ctx, x, y, hot, down, now); return; }
  if (mode === 'berrad') {
    // the spout tip is the hotspot; over a link it pours drops of atay
    sprM(ctx, MORO.potPtr, R(x), R(y) - 4, 1, MORO.potPal);
    if (hot) { for (let k = 0; k < 3; k++) { const ph = ((now / 420) + k / 3) % 1; ctx.fillStyle = ph < .7 ? '#B5651D' : 'rgba(181,101,29,.4)'; ctx.fillRect(R(x), R(y + 1 + ph * 12), 1, 2); }
      steamStep(ctx, st, x + 9, y - 6, .05, now, 16); }
    return;
  }
  if (mode === 'tajine') {
    sprM(ctx, hot ? MORO.tajineOpen : MORO.tajine, R(x - 10), R(y - 10), 1, MORO.pal);
    if (hot) steamStep(ctx, st, x, y - 2, .09, now, 16);
    return;
  }
  if (mode === 'door') {
    if (hot) { const g2 = ctx.createRadialGradient(x, y + 2, 2, x, y + 2, 26); g2.addColorStop(0, 'rgba(255,210,122,.6)'); g2.addColorStop(1, 'rgba(255,210,122,0)'); ctx.fillStyle = g2; ctx.fillRect(x - 28, y - 26, 56, 56); }
    sprM(ctx, hot ? MORO.doorOpen : MORO.door, R(x - 8.5), R(y - 11), 1, MORO.pal);
    return;
  }
  if (mode === 'lion') {
    const shake = hot ? (Math.floor(now / 60) % 2 ? 1 : -1) : 0;
    sprM(ctx, hot ? MORO.lionRoar : MORO.lion, R(x - 10.5) + shake, R(y - 10.5), 1, MORO.pal);
    if (hot) { ctx.fillStyle = 'rgba(193,39,45,.75)'; const k = Math.floor(now / 140) % 3; [[13, -3], [14, 0], [13, 3]].forEach(([dx, dy], i) => { if (i <= k) ctx.fillRect(R(x + dx + i), R(y + dy), 3, 1); }); }
    return;
  }
  if (mode === 'istikan') {
    sprM(ctx, hot ? MORO.glassFull : MORO.glassMid, R(x - 6.5), R(y - 10), 1, MORO.pal);
    steamStep(ctx, st, x + 1, y - 8, hot ? .08 : .02, now, 16);
    return;
  }
  if (mode === 'zarrow') { sprM(ctx, hot ? CUR.zHot : CUR.zIdle, R(x), R(y), 1, P); return; }
  if (mode === 'babouche') { const tap = hot && Math.floor(now / 180) % 2 ? 1 : 0; sprM(ctx, hot ? CUR.babHot : CUR.babIdle, R(x) - 1, R(y) - 1 + tap, 1, P); return; }
  if (mode === 'fez') {
    st.ang = st.ang ?? 0; st.av = st.av ?? 0;
    if (hot) st.ang += .2; else { const target = clamp(-(st.vx || 0) * .09, -1.2, 1.2); st.av += (target - st.ang) * .08; st.av *= .86; st.ang += st.av; }
    const hop = hot ? R(Math.abs(Math.sin(now / 160)) * -2) : 0;
    const fx = R(x - 7), fy = R(y - 6) + hop;
    // tassel behind the hat: a pendulum from the top button
    const ox = fx + 7, oy = fy + 1;
    for (let k = 1; k <= 9; k++) { const a = st.ang + .55; const px = R(ox + Math.sin(a) * k), py = R(oy + Math.cos(a) * k * .95); ctx.fillStyle = k >= 8 ? C.gold : '#1E2430'; ctx.fillRect(px, py, k >= 8 ? 2 : 1, k >= 8 ? 2 : 1); }
    sprM(ctx, CUR.fez, fx, fy, 1, P); return;
  }
  if (mode === 'cat') {
    const blink = !hot && now % 3200 < 140;
    sprM(ctx, hot ? CUR.catHappy : blink ? catBlink : CUR.catIdle, R(x - 7.5), R(y - 6.5), 1, P);
    if (hot) spr(ctx, HEART, R(x + 7), R(y - 14 + Math.sin(now / 220) * 1.5), 1, '#E0566A');
    clicks.forEach((c) => { for (let k = 0; k < 3; k++) st.fx.push({ kind: 'heart', x: c.x - 6 + k * 6, y: c.y - 10, t: now + k * 90 }); });
  }
  if (mode === 'robot') {
    const blink = !hot && now % 2600 < 120;
    const rows = (hot ? CUR.robHot : blink ? robBlink : CUR.robIdle).map((r, j) => (j === 0 && !hot && Math.floor(now / 500) % 2 ? r.replace('A', '.') : r));
    sprM(ctx, rows, R(x - 6.5), R(y - 7), 1, P);
    clicks.forEach((c) => { for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .45; st.fx.push({ kind: 'spark', x: c.x, y: c.y - 7, vx: Math.cos(a) * .09, vy: Math.sin(a) * .09, t: now }); } });
  }
  st.fx = st.fx.filter((f) => now - f.t < 900);
  for (const f of st.fx) {
    const a = (now - f.t) / 900; if (a < 0) continue;
    if (f.kind === 'heart') { ctx.globalAlpha = 1 - a; spr(ctx, HEART, R(f.x + Math.sin(a * 8) * 2), R(f.y - a * 26), 1, '#E0566A'); ctx.globalAlpha = 1; }
    else { ctx.fillStyle = a < .5 ? '#5FD3F0' : `rgba(46,160,90,${1 - a})`; ctx.fillRect(R(f.x + f.vx * (now - f.t)), R(f.y + f.vy * (now - f.t)), 2, 2); }
  }
}
function drawBall(ctx, st, x, y, lift) {
  const S = 2, N = 11, rad = 5.4; const bx = R(x - N * S / 2), by = R(y - N * S / 2 - lift);
  const sw = R(16 - lift * .4); ctx.fillStyle = 'rgba(50,64,79,.16)';
  ctx.fillRect(R(x - sw / 2), R(y + 12), sw, 2); ctx.fillRect(R(x - sw / 2 + 2), R(y + 14), Math.max(2, sw - 4), 2);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const dx = i - 5, dy = j - 5, d2 = dx * dx + dy * dy; if (d2 > rad * rad) continue;
    let col;
    if (d2 > (rad - 1.05) ** 2) col = C.ink;
    else { const bend = 1 + d2 / 60; const u = (st.u || 0) + dx * bend, v = (st.v || 0) + dy * bend;
      const cu = Math.floor(u / 4), cv = Math.floor(v / 4), mu = ((u % 4) + 4) % 4, mv = ((v % 4) + 4) % 4;
      col = ((cu + cv) & 1) === 0 && mu < 2.2 && mv < 2.2 ? C.ink : (dx + dy > 3 ? C.shade : C.white); }
    ctx.fillStyle = col; ctx.fillRect(bx + i * S, by + j * S, S, S);
  }
  ctx.fillStyle = C.white; ctx.fillRect(bx + 3 * S, by + 2 * S, S, S);
}
const GLASS = ['N......N', 'N......N', 'N......N', 'NYYYYYYN', '.N....N.', '.N....N.', '.N....N.', '..NNNN..'];
const INNER = (r, c) => (r <= 3 ? c >= 1 && c <= 6 : r <= 6 ? c >= 2 && c <= 5 : false);
function drawGlass(ctx, x, y, level, slope, S = 2) {
  const gx = R(x - 4 * S), gy = R(y - 4 * S); const surf = 8 - level;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) {
    if (!INNER(r, c)) continue; if (r >= surf + slope * (c - 3.5) * .55) { ctx.fillStyle = C.tea; ctx.fillRect(gx + c * S, gy + r * S, S, S); }
  }
  sprM(ctx, GLASS, gx, gy, S, { N: C.glass, Y: C.gold });
  if (level > 6.6) { ctx.fillStyle = C.mint; ctx.fillRect(gx + 4 * S, gy - S, S, S); ctx.fillRect(gx + 5 * S, gy - 2 * S, S, S); ctx.fillRect(gx + 5 * S, gy - S, S, S); }
}
function steamStep(ctx, st, x, y, rate, now, dt) {
  st.steam = st.steam || []; st.sAcc = (st.sAcc || 0) + rate * dt / 16;
  while (st.sAcc > 1) { st.sAcc -= 1; st.steam.push({ x: x + Math.random() * 6 - 3, y, t: now, ph: Math.random() * 6 }); }
  st.steam = st.steam.filter((p) => now - p.t < 900);
  for (const p of st.steam) { const a = (now - p.t) / 900; ctx.fillStyle = `rgba(195,202,209,${1 - a})`; ctx.fillRect(R(p.x + Math.sin(a * 5 + p.ph) * 3), R(p.y - a * 22), 2, 2); }
}

/* ── coherent match simulation (metres, 105×68) seen through a broadcast camera ── */
const F433 = [[4, 34], [17, 9], [15, 26], [15, 42], [17, 59], [32, 20], [28, 34], [32, 48], [46, 12], [50, 34], [46, 56]];
const F442 = [[4, 34], [17, 11], [15, 27], [15, 41], [17, 57], [32, 12], [30, 28], [30, 40], [32, 56], [45, 27], [45, 41]];
const NUM433 = [1, 2, 4, 5, 3, 8, 6, 10, 7, 9, 11], NUM442 = [1, 2, 4, 5, 3, 7, 6, 8, 11, 9, 10];
const TEAMS = ['BEL', 'ITA'];
const dirOf = (team) => (team ? -1 : 1);
const attX = (team, x) => (team ? 105 - x : x);
function segDist(px, py, ax, ay, bx, by) { const vx = bx - ax, vy = by - ay; const L2 = vx * vx + vy * vy || 1; const t = clamp(((px - ax) * vx + (py - ay) * vy) / L2, 0, 1); return Math.hypot(px - ax - vx * t, py - ay - vy * t); }
function newSim() {
  const P = [];
  F433.forEach((f, i) => P.push({ team: 0, n: NUM433[i], gk: i === 0, fx: f[0], fy: f[1], x: f[0] + 8, y: f[1], vx: 0, vy: 0, ph: Math.random() * 6 }));
  F442.forEach((f, i) => P.push({ team: 1, n: NUM442[i], gk: i === 0, fx: f[0], fy: f[1], x: 105 - f[0] - 8, y: 68 - f[1], vx: 0, vy: 0, ph: Math.random() * 6 }));
  return { P, holder: 6, hold: 0, nextPass: 1.2, ball: { x: P[6].x + 1, y: P[6].y, h: 0 }, pass: null, clock: 12 * 60 + 4, events: [], turnoverAt: -9, camX: 40, score: [0, 0], trail: [], restartAt: 0, possTeam: 0, presser: -1 };
}
function logEv(s, text) { const m = Math.floor(s.clock / 60), sec = Math.floor(s.clock % 60); s.events.unshift(`${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}  ${text}`); s.events = s.events.slice(0, 3); }
function stepSim(s, dt) {
  dt = Math.min(dt, .05); s.clock += dt;
  const P = s.P, b = s.ball;
  if (s.pass) {
    const p = s.pass; p.t += dt; const k = Math.min(1, p.t / p.dur);
    b.x = p.x0 + (p.x1 - p.x0) * k; b.y = p.y0 + (p.y1 - p.y0) * k; b.h = Math.sin(k * Math.PI) * (p.shot ? 1.1 : Math.min(2.4, p.len / 15));
    if (k >= 1) {
      if (p.shot) { s.pass = null; s.holder = -1; s.restartAt = s.clock + 1.2; if (p.goal) { s.score[P[p.from].team]++; logEv(s, `GOAL ${TEAMS[P[p.from].team]} #${P[p.from].n}`); } else logEv(s, 'wide · goal kick'); }
      else { s.holder = p.to; s.pass = null; s.hold = 0; s.nextPass = .8 + Math.random() * 1.3; }
    }
  } else if (s.holder < 0) {
    if (s.clock > s.restartAt) { const team = s.lastShooter === 0 ? 1 : 0; s.holder = P.findIndex((q) => q.team === team && q.gk); s.hold = 0; s.nextPass = .7; s.turnoverAt = s.clock; }
  } else {
    const H = P[s.holder]; const d = dirOf(H.team); b.x = H.x + d * .9; b.y = H.y + .3; b.h = 0; s.hold += dt;
    if (s.hold > s.nextPass) {
      const ax = attX(H.team, H.x);
      if (ax > 84 && Math.abs(H.y - 34) < 17 && Math.random() < .75) {
        const gx = H.team ? 0 : 105, gy = 34 + (Math.random() - .5) * 9; const xg = Math.max(.04, (1 - (105 - ax) / 28) * .38);
        const goal = Math.random() < xg && Math.abs(gy - 34) < 3.4;
        s.pass = { from: s.holder, to: -1, x0: b.x, y0: b.y, x1: gx, y1: gy, t: 0, dur: .42, len: 20, shot: true, goal }; s.lastShooter = H.team;
        logEv(s, `shot ${TEAMS[H.team]} #${H.n} · xG ${xg.toFixed(2)}`); s.holder = -1;
      } else {
        let best = -1, bestScore = -1e9;
        P.forEach((q, i) => {
          if (i === s.holder || q.team !== H.team || (q.gk && Math.random() < .92)) return;
          const dist = Math.hypot(q.x - H.x, q.y - H.y); if (dist < 7 || dist > 36) return;
          const prog = attX(q.team, q.x) - attX(H.team, H.x);
          let opp = 99; P.forEach((o) => { if (o.team !== H.team) opp = Math.min(opp, Math.hypot(o.x - q.x, o.y - q.y)); });
          const sc = prog * .8 + Math.min(opp, 9) * 1.6 - dist * .12 + Math.random() * 7;
          if (sc > bestScore) { bestScore = sc; best = i; }
        });
        if (best >= 0) {
          const T = P[best]; const x1 = T.x + dirOf(T.team) * 2.2, y1 = T.y; const len = Math.hypot(x1 - b.x, y1 - b.y);
          let to = best, inter = false;
          for (let i = 0; i < P.length; i++) { const o = P[i]; if (o.team === H.team || o.gk) continue; if (segDist(o.x, o.y, b.x, b.y, x1, y1) < 1.5 && Math.random() < .5) { to = i; inter = true; break; } }
          s.pass = { from: s.holder, to, x0: b.x, y0: b.y, x1: inter ? P[to].x : x1, y1: inter ? P[to].y : y1, t: 0, dur: Math.max(.35, len / 17), len, shot: false };
          logEv(s, inter ? `interception ${TEAMS[P[to].team]} #${P[to].n}` : `pass #${H.n} → #${T.n}`);
          if (inter) s.turnoverAt = s.clock;
          s.holder = -1;
        } else s.nextPass = s.hold + .4;
      }
    }
  }
  const possTeam = s.pass ? (s.pass.shot ? P[s.pass.from].team : P[s.pass.to].team === P[s.pass.from].team ? P[s.pass.from].team : P[s.pass.from].team) : s.holder >= 0 ? P[s.holder].team : (s.lastShooter === 0 ? 1 : 0);
  let presser = -1, pd = 1e9; P.forEach((q, i) => { if (q.team === possTeam || q.gk) return; const dd = Math.hypot(q.x - b.x, q.y - b.y); if (dd < pd) { pd = dd; presser = i; } });
  P.forEach((q, i) => {
    const inPoss = q.team === possTeam; const bAtt = attX(q.team, b.x);
    let a = q.fx + (bAtt - 45) * (q.gk ? .12 : inPoss ? .6 : .48) + (inPoss ? 5 : -3);
    a = q.gk ? clamp(a, 2, 16) : clamp(a, 6, 99);
    let tx = q.team ? 105 - a : a, ty = (q.team ? 68 - q.fy : q.fy) + (b.y - 34) * (q.gk ? .15 : .3);
    if (i === s.holder) { tx = q.x + dirOf(q.team) * 3; ty = q.y + (34 - q.y) * .06; }
    if (s.pass && i === s.pass.to) { tx = s.pass.x1; ty = s.pass.y1; }
    if (i === presser) { tx = b.x - dirOf(possTeam) * 1.3; ty = b.y; }
    const dx = tx - q.x, dy = ty - q.y, dd = Math.hypot(dx, dy); const vmax = i === presser ? 6.8 : i === s.holder ? 4.8 : 5.4;
    const sp = Math.min(vmax, dd * 1.5); const vx = dd > .01 ? dx / dd * sp : 0, vy = dd > .01 ? dy / dd * sp : 0;
    q.vx += (vx - q.vx) * Math.min(1, dt * 4); q.vy += (vy - q.vy) * Math.min(1, dt * 4);
    q.x = clamp(q.x + q.vx * dt, .5, 104.5); q.y = clamp(q.y + q.vy * dt, .5, 67.5); q.ph += Math.hypot(q.vx, q.vy) * dt * 2.4;
  });
  s.presser = presser; s.possTeam = possTeam;
  s.trail.unshift({ x: b.x, y: b.y, h: b.h || 0 }); s.trail = s.trail.slice(0, 7);
  // frame the action in the left ~third of the image (tracking map lives on the right)
  const dep = 1 - b.y / 68; const lead = 2.6 / (.5 + .5 * dep);
  s.camX += (clamp(b.x + lead, 18, 104) - s.camX) * Math.min(1, dt * 1.5);
}
function proj(w, h, camX, x, y, z = 0) {
  const top = h * .34, bot = h * 1.05; const d = 1 - y / 68; const sy = top + Math.pow(d, 1.08) * (bot - top);
  const sc = (.5 + .5 * d) * (w / 46); return { x: w / 2 + (x - camX) * sc, y: sy - z * sc, s: sc };
}
function broadcast(ctx, W, h, now, cache, panelK = 0) {
  const pw = R(W * .36 * panelK), w = W - pw;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
  if (!cache.sim) { cache.sim = newSim(); cache.last = now; for (let i = 0; i < 40; i++) stepSim(cache.sim, .05); }
  const dtS = Math.min(.1, (now - cache.last) / 1000); cache.last = now;
  if (!reduce) { stepSim(cache.sim, dtS / 2); stepSim(cache.sim, dtS / 2); }
  const s = cache.sim, cam = s.camX, top = h * .34;
  if (!cache.crowd || cache.w !== w) { cache.w = w; cache.crowd = []; for (let i = 0; i < 340; i++) cache.crowd.push([rnd(i), rnd(i + 99), rnd(i + 7)]); }
  ctx.fillStyle = '#232934'; ctx.fillRect(0, 0, w, top);
  const span = w * 1.7;
  for (const [u, v, k] of cache.crowd) { const x = (((u * span - cam * 4) % span) + span) % span - w * .35; ctx.fillStyle = k > .82 ? '#d8c6b2' : k > .55 ? '#8d3440' : '#4a5468'; ctx.fillRect(x, v * (top - h * .06), 2, 2); }
  ctx.fillStyle = '#5b2a7a'; ctx.fillRect(0, top - h * .055, w, h * .045);
  ctx.fillStyle = 'rgba(255,255,255,.8)'; for (let i = -2; i < 12; i++) { const x = (((i * 92 - cam * 9) % (w + 184)) + w + 184) % (w + 184) - 92; ctx.fillRect(x, top - h * .043, 44, h * .02); }
  { const a = proj(w, h, cam, -30, 68), b = proj(w, h, cam, 135, 68), c = proj(w, h, cam, 135, -4), d = proj(w, h, cam, -30, -4);
    ctx.fillStyle = '#3a7d35'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.fill(); }
  for (let k = 0; k < 20; k++) {
    const a = proj(w, h, cam, k * 5.25, 68), b = proj(w, h, cam, k * 5.25 + 5.25, 68), c = proj(w, h, cam, k * 5.25 + 5.25, 0), d = proj(w, h, cam, k * 5.25, 0);
    ctx.fillStyle = k % 2 ? '#3f8a3a' : '#479541'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.fill();
  }
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.3;
  const line = (pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => { const q = proj(w, h, cam, x, y); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }); ctx.stroke(); };
  line([[0, 68], [105, 68]]); line([[0, 0], [105, 0]]); line([[0, 0], [0, 68]]); line([[105, 0], [105, 68]]); line([[52.5, 0], [52.5, 68]]);
  line([[0, 13.84], [16.5, 13.84], [16.5, 54.16], [0, 54.16]]); line([[105, 13.84], [88.5, 13.84], [88.5, 54.16], [105, 54.16]]);
  line([[0, 24.84], [5.5, 24.84], [5.5, 43.16], [0, 43.16]]); line([[105, 24.84], [99.5, 24.84], [99.5, 43.16], [105, 43.16]]);
  const circ = []; for (let k = 0; k <= 40; k++) { const an = k / 40 * Math.PI * 2; circ.push([52.5 + Math.cos(an) * 9.15, 34 + Math.sin(an) * 9.15]); } line(circ);
  [0, 105].forEach((gx) => { const a = proj(w, h, cam, gx, 30.34), b = proj(w, h, cam, gx, 37.66), a2 = proj(w, h, cam, gx, 30.34, 2.44), b2 = proj(w, h, cam, gx, 37.66, 2.44);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a2.x, a2.y); ctx.lineTo(b2.x, b2.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
  const order = s.P.map((q, i) => i).sort((i, j) => s.P[j].y - s.P[i].y);
  const boxes = [];
  for (const i of order) {
    const q = s.P[i]; const pp = proj(w, h, cam, q.x, q.y); if (pp.x < -20 || pp.x > w + 20) { boxes[i] = null; continue; }
    const H = pp.s * 1.85, bw = Math.max(3, H * .34);
    const kit = q.gk ? (q.team ? '#e0d23a' : '#2fbf71') : q.team ? '#2c4fa3' : '#c0262d', shorts = q.team ? '#f2f2f2' : '#1d1d24';
    ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.ellipse(pp.x, pp.y, bw * .8, Math.max(1, bw * .25), 0, 0, 7); ctx.fill();
    const st = Math.sin(q.ph) * bw * .3; ctx.fillStyle = '#e2b089';
    ctx.fillRect(pp.x - bw * .3 + st, pp.y - H * .32, Math.max(1, bw * .22), H * .32); ctx.fillRect(pp.x + bw * .08 - st, pp.y - H * .32, Math.max(1, bw * .22), H * .32);
    ctx.fillStyle = shorts; ctx.fillRect(pp.x - bw / 2, pp.y - H * .46, bw, H * .15);
    ctx.fillStyle = kit; ctx.fillRect(pp.x - bw / 2, pp.y - H * .8, bw, H * .36);
    ctx.fillStyle = '#e2b089'; ctx.fillRect(pp.x - bw * .28, pp.y - H, bw * .56, H * .2);
    boxes[i] = { x: pp.x - bw / 2, y: pp.y - H, w: bw, h: H, team: q.team, n: q.n, i };
  }
  const bp = proj(w, h, cam, s.ball.x, s.ball.y, s.ball.h || 0), bg = proj(w, h, cam, s.ball.x, s.ball.y);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(bg.x - 2, bg.y - 1, 4, 2);
  const br = Math.max(2, bp.s * .38); ctx.fillStyle = '#fff'; ctx.fillRect(bp.x - br / 2, bp.y - br, br, br);
  ctx.restore();
  return { boxes, ball: { x: bp.x, y: bp.y - br / 2 }, sim: s, w, h, cam, W, pw };
}
function hull(pts) {
  const p = pts.slice().sort((a, b) => a.x - b.x || a.y - b.y); if (p.length < 3) return p;
  const cr = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lo = []; for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  const up = []; for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
function cvOverlay(ctx, sc, k, now) {
  if (k < .02) return; const s = sc.sim, { w, h, cam } = sc;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip(); ctx.globalAlpha = k;
  const defTeam = s.possTeam ? 0 : 1;
  const hl = hull(s.P.filter((q) => q.team === defTeam && !q.gk).map((q) => proj(w, h, cam, q.x, q.y)));
  ctx.fillStyle = 'rgba(212,167,44,.2)'; ctx.strokeStyle = 'rgba(212,167,44,.9)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); hl.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y))); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (s.pass && !s.pass.shot) { const a = proj(w, h, cam, s.pass.x0, s.pass.y0), b = proj(w, h, cam, s.pass.x1, s.pass.y1);
    ctx.setLineDash([4, 3]); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.ellipse(b.x, b.y, 6, 2.5, 0, 0, 7); ctx.stroke(); }
  ctx.font = '9px "DM Mono", monospace'; ctx.textBaseline = 'bottom'; ctx.textAlign = 'left';
  sc.boxes.forEach((bx) => {
    if (!bx) return; const isH = bx.i === s.holder, isP = bx.i === s.presser, isR = s.pass && !s.pass.shot && bx.i === s.pass.to;
    const x0 = R(bx.x - 2), y0 = R(bx.y - 2), bw = R(bx.w + 4), bh = R(bx.h + 4);
    ctx.strokeStyle = isH ? C.gold : bx.team ? '#8fb8ff' : '#ff8f93'; ctx.lineWidth = isH ? 2 : 1; ctx.strokeRect(x0 + .5, y0 + .5, bw, bh);
    if (isH || isP || isR) {
      const conf = (.9 + rnd(bx.i + Math.floor(now / 1200)) * .08).toFixed(2);
      const tag = isH ? `${TEAMS[bx.team]} #${bx.n} · ball ${conf}` : isP ? `#${bx.n} pressing` : `#${bx.n} receiving`;
      const tw = ctx.measureText(tag).width + 6; ctx.fillStyle = isH ? 'rgba(212,167,44,.95)' : 'rgba(20,24,32,.78)'; ctx.fillRect(x0, y0 - 11, tw, 11);
      ctx.fillStyle = isH ? '#1b1b1b' : '#fff'; ctx.fillText(tag, x0 + 3, y0 - 1.5);
    }
  });
  s.trail.forEach((t, i) => { const q = proj(w, h, cam, t.x, t.y, t.h); ctx.fillStyle = `rgba(212,167,44,${.55 - i * .07})`; ctx.fillRect(R(q.x) - 1, R(q.y) - 2, 2, 2); });
  const b = sc.ball; ctx.strokeStyle = C.gold; ctx.lineWidth = 1; ctx.strokeRect(R(b.x - 5) + .5, R(b.y - 5) + .5, 10, 10);
  ctx.font = '10px "DM Mono", monospace'; ctx.textBaseline = 'middle';
  const m = Math.floor(s.clock / 60), sec = Math.floor(s.clock % 60);
  const sb = `BEL ${s.score[0]}–${s.score[1]} ITA   ${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  ctx.fillStyle = 'rgba(20,24,32,.85)'; ctx.fillRect(8, 8, ctx.measureText(sb).width + 14, 17); ctx.fillStyle = '#fff'; ctx.fillText(sb, 15, 17);
  const hud = `detect · track · 25 fps · ${sc.boxes.filter(Boolean).length + 1} obj`; ctx.fillStyle = 'rgba(20,24,32,.6)'; ctx.fillRect(8, 28, ctx.measureText(hud).width + 14, 15); ctx.fillStyle = '#d8dde3'; ctx.fillText(hud, 15, 36);
  const pt = s.possTeam, bxA = attX(pt, s.ball.x);
  const phase = s.clock - s.turnoverAt < 2.5 ? 'Transition' : bxA < 35 ? 'Build-up' : bxA < 70 ? 'Progression' : 'Final third';
  const ph = `${phase} · ${TEAMS[pt]}`; const pw = ctx.measureText(ph).width + 14;
  ctx.fillStyle = pt ? 'rgba(44,79,163,.92)' : 'rgba(193,39,45,.92)'; ctx.fillRect(w - pw - 8, 8, pw, 17); ctx.fillStyle = '#fff'; ctx.fillText(ph, w - pw - 1, 17);
  s.events.slice(0, 2).forEach((e, i) => { const tw = ctx.measureText(e).width + 14; ctx.fillStyle = `rgba(20,24,32,${.82 - i * .3})`; ctx.fillRect(8, h - 24 - i * 18, tw, 16); ctx.fillStyle = i ? '#b9c0c8' : '#fff'; ctx.fillText(e, 15, h - 16 - i * 18); });
  ctx.restore();
  if (sc.pw > 6) trackingPanel(ctx, sc, now, defTeam);
}
/* right-hand tracking panel: same simulation, top-down, with live readouts */
function trackingPanel(ctx, sc, now, defTeam) {
  const s = sc.sim, x0 = sc.w, PW = sc.pw, h = sc.h, cam = sc.cam, fw = sc.w;
  ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, PW, h); ctx.clip();
  ctx.fillStyle = '#12161d'; ctx.fillRect(x0, 0, PW, h); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x0, 0, 1, h);
  const pad = 12, mw = PW - pad * 2; if (mw < 60) { ctx.restore(); return; }
  ctx.font = '9px "DM Mono", monospace'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = '#d8dde3'; ctx.fillText('TRACKING · TOP-DOWN', x0 + pad, 14);
  ctx.fillStyle = Math.floor(now / 500) % 2 ? C.red : 'rgba(193,39,45,.35)'; ctx.fillRect(x0 + PW - pad - 5, 11.5, 5, 5);
  const mh = mw * 68 / 105, mx0 = x0 + pad, my0 = 26;
  const M = (x, y) => [mx0 + x / 105 * mw, my0 + (68 - y) / 68 * mh];
  ctx.fillStyle = '#2f6a2c'; ctx.fillRect(mx0, my0, mw, mh);
  for (let k = 0; k < 10; k += 2) { ctx.fillStyle = 'rgba(255,255,255,.04)'; ctx.fillRect(mx0 + k * mw / 10, my0, mw / 10, mh); }
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1; ctx.strokeRect(mx0 + .5, my0 + .5, mw - 1, mh - 1);
  ctx.beginPath(); ctx.moveTo(R(mx0 + mw / 2) + .5, my0); ctx.lineTo(R(mx0 + mw / 2) + .5, my0 + mh); ctx.stroke();
  ctx.beginPath(); ctx.arc(mx0 + mw / 2, my0 + mh / 2, mh * .135, 0, 7); ctx.stroke();
  const pbw = 16.5 / 105 * mw, pbh = 40.32 / 68 * mh; ctx.strokeRect(mx0 + .5, my0 + (mh - pbh) / 2, pbw, pbh); ctx.strokeRect(mx0 + mw - pbw - .5, my0 + (mh - pbh) / 2, pbw, pbh);
  const span = (d) => { const half = (fw / 2) / ((.5 + .5 * d) * (fw / 46)); return [clamp(cam - half, 0, 105), clamp(cam + half, 0, 105)]; };
  const far = span(0), near = span(1); const fov = [M(far[0], 68), M(far[1], 68), M(near[1], 0), M(near[0], 0)];
  ctx.fillStyle = 'rgba(255,255,255,.09)'; ctx.beginPath(); fov.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
  ctx.setLineDash([2, 2]); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.stroke(); ctx.setLineDash([]);
  const defs = s.P.filter((q) => q.team === defTeam && !q.gk);
  const hh = hull(defs.map((q) => { const [x, y] = M(q.x, q.y); return { x, y }; }));
  ctx.fillStyle = 'rgba(212,167,44,.22)'; ctx.strokeStyle = 'rgba(212,167,44,.85)'; ctx.beginPath(); hh.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y))); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (s.pass && !s.pass.shot) { const [a1, a2] = M(s.pass.x0, s.pass.y0), [b1, b2] = M(s.pass.x1, s.pass.y1); ctx.setLineDash([2, 2]); ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(a1, a2); ctx.lineTo(b1, b2); ctx.stroke(); ctx.setLineDash([]); }
  s.P.forEach((q, i) => {
    const [x, y] = M(q.x, q.y); const r2 = mw > 150 ? 2.6 : 2.1;
    ctx.fillStyle = q.gk ? (q.team ? '#e0d23a' : '#2fbf71') : q.team ? '#6f9bff' : '#ff5a60'; ctx.beginPath(); ctx.arc(x, y, r2, 0, 7); ctx.fill();
    if (i === s.holder) { ctx.strokeStyle = C.gold; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, y, r2 + 2.4, 0, 7); ctx.stroke(); ctx.lineWidth = 1; }
    if (i === s.presser) { ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(x, y, r2 + 1.6, 0, 7); ctx.stroke(); }
  });
  { const [x, y] = M(s.ball.x, s.ball.y); ctx.fillStyle = '#fff'; ctx.fillRect(R(x) - 1, R(y) - 1, 3, 3); }
  // live readouts (all derived from the same simulation)
  const H = s.holder >= 0 ? s.P[s.holder] : null, Pr = s.presser >= 0 ? s.P[s.presser] : null;
  const xs = defs.map((q) => q.x), ys = defs.map((q) => q.y);
  const rows = [
    ['ball', H ? `${TEAMS[H.team]} #${H.n}` : s.pass ? 'in flight' : 'out of play', C.gold],
    ['pressing', Pr ? `${TEAMS[Pr.team]} #${Pr.n}` : '—', '#ffffff'],
    ['pass', s.pass && !s.pass.shot ? `#${s.P[s.pass.from].n} → #${s.P[s.pass.to].n}` : '—', '#ffffff'],
    ['block', `${TEAMS[defTeam]} ${Math.round(Math.max(...xs) - Math.min(...xs))} × ${Math.round(Math.max(...ys) - Math.min(...ys))} m`, 'rgba(212,167,44,1)'],
    ['speed', H ? `#${H.n} ${Math.hypot(H.vx, H.vy).toFixed(1)} m/s` : '—', '#ffffff'],
  ];
  let ry = my0 + mh + 18; ctx.font = '10px "DM Mono", monospace';
  for (const [k, v, col] of rows) {
    if (ry > h - 8) break;
    ctx.fillStyle = '#7d8996'; ctx.textAlign = 'left'; ctx.fillText(k, x0 + pad, ry);
    ctx.fillStyle = col; ctx.textAlign = 'right'; ctx.fillText(v, x0 + PW - pad, ry);
    ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(x0 + pad, ry + 8, mw, 1); ry += 17;
  }
  ctx.textAlign = 'left'; ctx.restore();
}


/* CodmAI answer: Pedri, 1st-half heatmap + key passes vs PSG (illustrative data).
   Heat is built from individual touches (gaussian per touch), classic match-heatmap palette. */
const PEDRI_TOUCHES = [[57.68,29.92],[51.56,34.84],[46.62,34.56],[48.43,31.0],[52.41,29.98],[50.28,33.6],[50.55,34.33],[51.64,34.61],[48.72,32.82],[51.83,35.06],[52.78,30.91],[57.11,33.23],[57.01,23.11],[65.64,17.56],[56.56,20.02],[51.23,17.74],[51.91,29.22],[59.4,21.52],[66.0,21.0],[54.97,20.38],[61.7,14.55],[56.84,16.87],[57.88,24.17],[56.86,15.49],[57.58,17.72],[61.74,24.38],[55.18,18.11],[63.05,34.65],[56.2,45.11],[69.63,42.5],[64.13,44.92],[73.02,40.73],[59.16,43.5],[66.65,42.67],[54.82,41.61],[63.47,41.87],[71.76,45.48],[60.93,38.08],[63.22,43.36],[52.74,24.15],[47.42,24.88],[39.63,17.28],[47.73,24.68],[42.33,17.55],[47.38,21.0],[48.22,21.49],[38.39,21.32],[48.56,27.41],[42.82,25.72],[78.42,8.69],[70.84,11.37],[81.75,8.94],[71.89,21.78],[73.23,16.16],[73.61,9.25],[82.36,15.71],[73.48,11.29],[76.75,13.06],[79.64,27.02],[80.32,31.3],[83.6,28.95],[87.39,26.26],[79.53,29.36],[80.52,30.75],[26.57,28.87],[31.82,31.95],[35.36,32.1],[32.11,39.26],[37.28,29.37],[29.13,31.48],[26.82,31.02],[39.82,45.96],[30.41,54.04],[38.47,37.46],[41.75,44.91],[30.69,45.37],[39.45,48.07],[87.86,21.59],[90.03,20.01],[87.22,17.49],[87.13,43.41],[86.69,41.93],[86.21,42.87],[73.98,36.41],[69.82,37.23],[69.6,31.78],[69.13,30.44],[65.32,31.18],[62.74,23.11],[27.03,14.1],[21.75,17.57],[28.53,10.02],[26.58,24.86],[78.16,6.36],[34.25,42.66],[28.53,23.35],[66.82,25.85],[48.11,44.16],[20.33,50.48],[53.49,42.84],[14.35,36.64],[19.34,48.91],[24.48,52.9],[79.87,8.59],[43.67,38.91],[82.47,18.37]];
const KEYP = [[58, 24, 88, 31, 0], [66, 18, 94, 40, 0], [73, 27, 99, 34, 1], [52, 32, 84, 49, 0]];
const HEAT_STOPS = [[0, [255, 247, 170, 0]], [.13, [255, 247, 170, 0]], [.2, [255, 244, 150, 120]], [.38, [250, 232, 70, 200]], [.6, [247, 160, 40, 225]], [.82, [240, 95, 32, 235]], [1, [225, 45, 30, 245]]];
function heatCanvas(cache) {
  if (cache.heat) return cache.heat;
  const c = document.createElement('canvas'); c.width = 105; c.height = 68; const g = c.getContext('2d'); const img = g.createImageData(105, 68);
  const SIG2 = 2 * 3.0 * 3.0; const vals = new Float32Array(105 * 68); let mx = 0;
  for (let y = 0; y < 68; y++) for (let x = 0; x < 105; x++) {
    let v = 0; for (const [px, py] of PEDRI_TOUCHES) { const dx = x + .5 - px, dy = y + .5 - py; v += Math.exp(-(dx * dx + dy * dy) / SIG2); }
    vals[y * 105 + x] = v; if (v > mx) mx = v;
  }
  for (let i = 0; i < vals.length; i++) {
    const v = Math.min(1, vals[i] / (mx * .62)); let col = HEAT_STOPS[HEAT_STOPS.length - 1][1];
    for (let k = 1; k < HEAT_STOPS.length; k++) if (v <= HEAT_STOPS[k][0]) { const [t0, c0] = HEAT_STOPS[k - 1], [t1, c1] = HEAT_STOPS[k]; const kk = (v - t0) / (t1 - t0); col = c0.map((q, j) => q + (c1[j] - q) * kk); break; }
    img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2]; img.data[i * 4 + 3] = col[3];
  }
  g.putImageData(img, 0, 0); cache.heat = c; return c;
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawCodmai(ctx, w, h, e, cache) {
  const T = e % 15000; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const q = "Show me Pedri's heatmap for the first half, and his key passes against PSG.";
  ctx.font = '13px Geist, sans-serif'; const qw = Math.min(w - 40, ctx.measureText(q).width + 22);
  ctx.fillStyle = '#eceff1'; ctx.fillRect(w - 20 - qw, 14, qw, 28);
  ctx.save(); ctx.beginPath(); ctx.rect(w - 20 - qw, 14, qw, 28); ctx.clip(); ctx.fillStyle = C.ink; ctx.fillText(q.slice(0, Math.floor(q.length * clamp(T / 1500, 0, 1))), w - 9 - qw, 28.5); ctx.restore();
  const agents = [['planner', 'split into 2 tasks'], ['data', '1st half · Pedri #8 · 106 touches'], ['viz', 'heatmap + pass map'], ['clips', '4 key passes cut']];
  ctx.font = '11px "DM Mono", monospace'; let ax = 20;
  agents.forEach(([a], i) => { const s0 = 1600 + i * 420; const lit = T > s0, busy = lit && T < s0 + 420; const tw = ctx.measureText(a).width + 16;
    ctx.fillStyle = busy ? C.red : lit ? '#fff' : '#f6f7f8'; ctx.strokeStyle = lit ? C.green : C.line; ctx.fillRect(ax, 52, tw, 20); ctx.strokeRect(ax + .5, 52.5, tw - 1, 19);
    ctx.fillStyle = busy ? '#fff' : lit ? C.green : C.ink3; ctx.fillText(a, ax + 8, 62.5); ax += tw + 6; });
  if (T > 1600) { const cur = Math.min(3, Math.floor((T - 1600) / 420)); ctx.fillStyle = C.ink3; ctx.fillText(`→ ${agents[cur][1]}`, ax + 4, 62.5); }
  if (T < 3300) return;
  const top = 118, avH = h - top - 46; const pw = Math.min(w < 560 ? w - 52 : w * .58, avH * 105 / 68), ph = pw * 68 / 105, px = 26, py = top;
  const PX = (x, y) => [px + x / 105 * pw, py + y / 68 * ph];
  const a0 = easeOut(clamp((T - 3300) / 500, 0, 1)); ctx.globalAlpha = a0;
  // light green pitch, white lines, direction arrow (classic match-centre heatmap)
  ctx.fillStyle = '#c9e9c1'; roundRect(ctx, px - 8, py - 8, pw + 16, ph + 16, 10); ctx.fill();
  const hk = clamp((T - 3700) / 900, 0, 1);
  if (hk > 0) { ctx.save(); ctx.globalAlpha = a0 * easeOut(hk); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(heatCanvas(cache), px, py, pw, ph); ctx.restore(); ctx.globalAlpha = a0; }
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.6; ctx.strokeRect(px, py, pw, ph);
  ctx.beginPath(); ctx.moveTo(px + pw / 2, py); ctx.lineTo(px + pw / 2, py + ph); ctx.stroke(); ctx.beginPath(); ctx.arc(px + pw / 2, py + ph / 2, ph * .135, 0, 7); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px + pw / 2, py + ph / 2, 2.2, 0, 7); ctx.fill();
  const bx = 16.5 / 105 * pw, by = 40.32 / 68 * ph, sx = 5.5 / 105 * pw, sy = 18.32 / 68 * ph;
  ctx.strokeRect(px, py + (ph - by) / 2, bx, by); ctx.strokeRect(px + pw - bx, py + (ph - by) / 2, bx, by);
  ctx.strokeRect(px, py + (ph - sy) / 2, sx, sy); ctx.strokeRect(px + pw - sx, py + (ph - sy) / 2, sx, sy);
  [[11, 1], [94, -1]].forEach(([sx2]) => { const [qx, qy] = PX(sx2, 34); ctx.beginPath(); ctx.arc(qx, qy, 2, 0, 7); ctx.fill(); });
  [[0, 0, 0], [105, 0, 1], [0, 68, 3], [105, 68, 2]].forEach(([cx2, cy2, k]) => { const [qx, qy] = PX(cx2, cy2); ctx.beginPath(); ctx.arc(qx, qy, 5, k * Math.PI / 2, k * Math.PI / 2 + Math.PI / 2); ctx.stroke(); });
  const arX = px + pw / 2, arY = py - 19; ctx.fillStyle = '#c9e9c1'; ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = C.ink3; ctx.fillRect(arX - 34, arY - 1.5, 60, 3); ctx.beginPath(); ctx.moveTo(arX + 36, arY); ctx.lineTo(arX + 24, arY - 7); ctx.lineTo(arX + 24, arY + 7); ctx.fill();
  ctx.font = '10px "DM Mono", monospace'; ctx.fillStyle = C.ink3; ctx.textAlign = 'right'; ctx.fillText('Barça attack', arX - 42, arY + .5); ctx.textAlign = 'left';
  // key passes: dark arrows readable on the heat, assist in Moroccan green
  KEYP.forEach(([x0, y0, x1, y1, assist], i) => {
    const k = easeInOut(clamp((T - 4900 - i * 750) / 600, 0, 1)); if (k <= 0) return;
    const [ax0, ay0] = PX(x0, y0), [ax1, ay1] = PX(x1, y1); const mx = (ax0 + ax1) / 2, my = (ay0 + ay1) / 2 - 16 * (i % 2 ? -1 : 1);
    const bez = (u) => [(1 - u) * (1 - u) * ax0 + 2 * (1 - u) * u * mx + u * u * ax1, (1 - u) * (1 - u) * ay0 + 2 * (1 - u) * u * my + u * u * ay1];
    const col = assist ? C.green : '#1f2a36';
    ctx.strokeStyle = col; ctx.lineWidth = assist ? 2.4 : 1.8; ctx.beginPath(); ctx.moveTo(ax0, ay0);
    for (let t2 = 1; t2 <= 28 * k; t2++) { const [qx, qy] = bez(t2 / 28); ctx.lineTo(qx, qy); } ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ax0, ay0, 7, 0, 7); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = col; ctx.font = '500 9px "DM Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), ax0, ay0 + .5); ctx.textAlign = 'left';
    if (k >= 1) {
      const [tx, ty] = bez(.95); const ang = Math.atan2(ay1 - ty, ax1 - tx);
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ax1, ay1); ctx.lineTo(ax1 - Math.cos(ang - .45) * 9, ay1 - Math.sin(ang - .45) * 9); ctx.lineTo(ax1 - Math.cos(ang + .45) * 9, ay1 - Math.sin(ang + .45) * 9); ctx.fill();
      if (assist) { sprM(ctx, TILE, R(ax1 - 6), R(ay1 - 26), 1, LANT.pal); ctx.fillStyle = C.green; ctx.font = '500 10px "DM Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('assist', ax1 - 10, ay1 + 14); ctx.textAlign = 'left'; }
    }
  });
  ctx.globalAlpha = 1;
  const rx = px + pw + 30, rw = w - rx - 20;
  if (rw >= 130) {
    ctx.globalAlpha = easeOut(clamp((T - 3500) / 500, 0, 1));
    ctx.fillStyle = C.ink; ctx.font = '500 16px Geist, sans-serif'; ctx.fillText('Pedri', rx, py + 4);
    ctx.fillStyle = C.ink3; ctx.font = '12px Geist, sans-serif'; ctx.fillText('#8 · Barça vs PSG · 1st half', rx, py + 23);
    const stats = [['Touches', 106, ''], ['Passes completed', 39, '/42'], ['Key passes', 4, ''], ['Expected assists', .58, '']];
    stats.forEach(([lab, v, suf], i) => { const kk = easeOut(clamp((T - 4200 - i * 180) / 900, 0, 1)); const y = py + 52 + i * 26;
      ctx.fillStyle = C.ink2; ctx.font = '12.5px Geist, sans-serif'; ctx.fillText(lab, rx, y);
      const val = v < 1 ? (v * kk).toFixed(2) : String(Math.round(v * kk)) + suf; ctx.fillStyle = lab === 'Key passes' ? C.red : C.ink; ctx.font = '500 13px "DM Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(val, rx + rw, y); ctx.textAlign = 'left';
      ctx.fillStyle = C.line; ctx.fillRect(rx, y + 12, rw, 1); });
    const ly = py + 52 + 4 * 26 + 4; const lg = ctx.createLinearGradient(rx, 0, rx + rw, 0);
    lg.addColorStop(0, 'rgba(255,244,150,.6)'); lg.addColorStop(.35, 'rgba(250,232,70,.9)'); lg.addColorStop(.65, 'rgba(247,160,40,1)'); lg.addColorStop(.85, 'rgba(240,95,32,1)'); lg.addColorStop(1, 'rgba(225,45,30,1)');
    ctx.fillStyle = lg; ctx.fillRect(rx, ly, rw, 6); ctx.fillStyle = C.ink3; ctx.font = '10px "DM Mono", monospace'; ctx.fillText('fewer touches', rx, ly + 17); ctx.textAlign = 'right'; ctx.fillText('more touches', rx + rw, ly + 17); ctx.textAlign = 'left';
    ctx.fillText('illustrative data', rx, ly + 33);
    ctx.globalAlpha = 1;
  }
  if (T > 8200) { let cx = px; ctx.font = '11px "DM Mono", monospace';
    ['▶ 23:41  key pass 2', '▶ 38:02  assist 3'].forEach((c, i) => { const kk = clamp((T - 8200 - i * 250) / 300, 0, 1); if (!kk) return; const tw = ctx.measureText(c).width + 16;
      ctx.globalAlpha = kk; ctx.fillStyle = i ? C.green : C.ink; ctx.fillRect(cx, py + ph + 14, tw, 22); ctx.fillStyle = '#fff'; ctx.fillText(c, cx + 8, py + ph + 25.5); cx += tw + 8; ctx.globalAlpha = 1; }); }
}


const KS = { stand: ['..BB..', '.BBBB.', 'YGGGGY', 'YGGGGY', '.GGGG.', '.RRRR.', '.R..R.', '.D..D.'], jump: ['Y.BB.Y', 'YBBBBY', '.GGGG.', '.GGGG.', '.GGGG.', '.RRRR.', '.R..R.', '.D..D.'],
  dive: ['YY..BB......', 'YYGGBBGG....', '..GGGGGGRRDD', '....GG..R..D'] };
const KPAL = { B: '#C68E5F', Y: '#D4A72C', G: '#006233', R: '#C1272D', D: '#4A5460' };
const _flipCache = new WeakMap();
const flip = (rows) => { let f = _flipCache.get(rows); if (!f) { f = rows.map((r) => r.split('').reverse().join('')); _flipCache.set(rows, f); } return f; };

export {
  C,
  reduce,
  R,
  easeOut,
  easeInOut,
  rnd,
  STAR,
  STAR_OPEN,
  STAR_SMALL,
  GEM5,
  ARROW,
  CAMEL,
  LANT,
  CUR,
  MORO,
  TILE,
  MOON,
  spr,
  sprM,
  sprC,
  POT,
  TEA_PAL,
  pour,
  TEA,
  TEA_HOLD,
  teaFrame,
  layer,
  fitCanvas,
  pointer,
  tour,
  cur,
  relRect,
  within,
  makePill,
  velocity,
  drawStar,
  HEART,
  catBlink,
  robBlink,
  drawBase,
  drawBall,
  GLASS,
  INNER,
  drawGlass,
  steamStep,
  F433,
  F442,
  NUM433,
  TEAMS,
  dirOf,
  attX,
  segDist,
  newSim,
  logEv,
  stepSim,
  proj,
  broadcast,
  hull,
  cvOverlay,
  trackingPanel,
  PEDRI_TOUCHES,
  KEYP,
  HEAT_STOPS,
  heatCanvas,
  roundRect,
  drawCodmai,
  KS,
  KPAL,
  flip,
  clamp,
  TILE_MASK,
  GEM3,
  DOT,
  NUM442,
};
