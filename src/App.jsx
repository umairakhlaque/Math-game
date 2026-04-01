import { useState, useEffect, useRef } from "react";

/* ================================================================
   GLOBAL CSS
   ================================================================ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{overflow-x:hidden;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0001}::-webkit-scrollbar-thumb{background:#FFD700;border-radius:4px}

@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}
@keyframes popIn{0%{transform:scale(0) rotate(-8deg);opacity:0}65%{transform:scale(1.15) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes slideUp{from{transform:translateY(32px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes slideLeft{from{transform:translateX(-40px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes slideRight{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-14px)}40%{transform:translateX(14px)}60%{transform:translateX(-8px)}80%{transform:translateX(8px)}}
@keyframes victory{0%,100%{transform:scale(1) rotate(0)}25%{transform:scale(1.3) rotate(-14deg)}75%{transform:scale(1.3) rotate(14deg)}}
@keyframes villainHit{0%,100%{transform:translateX(0) scaleX(1)}20%{transform:translateX(-22px) scaleX(-1.1)}50%{transform:translateX(18px) scaleX(1)}80%{transform:translateX(-8px)}}
@keyframes heroGlow{0%,100%{filter:drop-shadow(0 0 6px gold)}50%{filter:drop-shadow(0 0 22px gold) drop-shadow(0 0 44px orange)}}
@keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,.7)}60%{box-shadow:0 0 0 14px rgba(255,215,0,0)}}
@keyframes confetti{0%{transform:translateY(-60px) rotate(0);opacity:1}100%{transform:translateY(105vh) rotate(740deg);opacity:0}}
@keyframes starPop{0%{transform:scale(.5) rotate(-20deg);opacity:1}100%{transform:scale(3) rotate(180deg);opacity:0}}
@keyframes flame{0%,100%{transform:scaleY(1) skewX(0)}50%{transform:scaleY(1.22) skewX(-4deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes twinkle{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1.1)}}
@keyframes bounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.1)}}
@keyframes correctFlash{0%,100%{background:inherit}40%{background:rgba(46,213,115,.2)}}

.ff{font-family:'Boogaloo','Comic Sans MS',cursive}
.fn{font-family:'Nunito','Segoe UI',sans-serif}

.anim-fl{animation:float 3.2s ease-in-out infinite}
.anim-flB{animation:floatB 2.4s ease-in-out .6s infinite}
.anim-wg{animation:wiggle 2.2s ease-in-out infinite}
.anim-pi{animation:popIn .5s cubic-bezier(.34,1.56,.64,1) both}
.anim-su{animation:slideUp .38s ease-out both}
.anim-sl{animation:slideLeft .38s ease-out both}
.anim-sr{animation:slideRight .38s ease-out both}
.anim-fi{animation:fadeIn .5s ease-out both}
.anim-sh{animation:shake .55s ease-in-out both}
.anim-vi{animation:victory .7s ease-in-out both}
.anim-vh{animation:villainHit .65s ease-in-out both}
.anim-hg{animation:heroGlow 1s ease-in-out both}
.anim-gp{animation:goldPulse 1.4s ease-in-out infinite}
.anim-fl2{animation:flame .55s ease-in-out infinite}
.anim-pu{animation:pulse 1s ease-in-out infinite}
.anim-bo{animation:bounce .75s ease-in-out both}

.comic-box{border:3px solid #111;border-radius:18px;box-shadow:5px 5px 0 #111}
.comic-btn{font-family:'Boogaloo','Comic Sans MS',cursive;border:3px solid #111;border-radius:14px;box-shadow:4px 4px 0 #111;cursor:pointer;user-select:none;transition:transform .08s,box-shadow .08s;display:inline-flex;align-items:center;justify-content:center}
.comic-btn:hover:not(:disabled){transform:translate(-2px,-2px);box-shadow:6px 6px 0 #111}
.comic-btn:active:not(:disabled){transform:translate(3px,3px);box-shadow:1px 1px 0 #111}
.comic-btn:disabled{opacity:.5;cursor:not-allowed}

.ans-btn{font-family:'Boogaloo','Comic Sans MS',cursive;border:3px solid #111;border-radius:14px;box-shadow:4px 4px 0 #111;cursor:pointer;user-select:none;transition:transform .08s,box-shadow .08s;display:flex;align-items:center;justify-content:center;width:100%;padding:10px 12px;font-size:18px;text-align:center;color:white;min-height:62px}
.ans-btn:hover:not(:disabled){transform:translate(-2px,-2px);box-shadow:6px 6px 0 #111}
.ans-btn:active:not(:disabled){transform:translate(3px,3px);box-shadow:1px 1px 0 #111}
.ans-btn:disabled{cursor:default}
.ans-btn.COR{background:#2ecc71!important;border-color:#1a8a4a!important;transform:scale(1.04)!important;box-shadow:6px 6px 0 #1a8a4a!important}
.ans-btn.WRG{background:#e74c3c!important;border-color:#a93226!important}
.ans-btn.DIM{background:#555!important;border-color:#444!important;color:#999!important;box-shadow:2px 2px 0 #333!important}

.hp-track{height:13px;border-radius:7px;border:2px solid #111;overflow:hidden;background:#2228}
.hp-fill{height:100%;border-radius:5px;transition:width .7s cubic-bezier(.4,0,.2,1)}
input{font-family:'Boogaloo','Comic Sans MS',cursive}
`;

/* ================================================================
   DATA
   ================================================================ */
const WORLDS = [
  {id:1,label:'Recruit Hero',emoji:'🌟',color:'#27AE60',bg:'#091a0e',light:'#E8F5E9',dark:'#145a32',
   missions:[
    {id:'w1m1',name:'Count Castle',    topic:'counting', villain:'Count Confusion',  vi:'🧛',intro:"Mwahahaha! I have STOLEN every number in the land! You'll NEVER count again! NEVER EVER!"},
    {id:'w1m2',name:'Addition Alley',  topic:'add1',     villain:'Plus Minus Pete',   vi:'🤖',intro:"BEEP BOOP! I am the Plus-Minus Pete-inator 3000! I scrambled ALL your sums! ERROR ERROR!"},
    {id:'w1m3',name:'Shape Village',   topic:'shapes',   villain:'Square Head',       vi:'👾',intro:"Nyah nyah nyah! I squished ALL your shapes into blobs! How do you like THAT, little hero?!"},
    {id:'w1m4',name:'Odd Even Kingdom',topic:'oddeven',  villain:'Wacky Numbers',     vi:'🎃',intro:"BOO! I mixed up ALL the odd and even numbers! It's so spooky you'll NEVER sort them!"},
    {id:'w1m5',name:'Money Mountain',  topic:'money',    villain:'Penny Pincher',     vi:'🦊',intro:"Hehehe! I stole ALL the coins! Every last penny is mine, mine, MINE! Finders keepers!"},
  ]},
  {id:2,label:'Rising Hero',emoji:'🚀',color:'#2196F3',bg:'#050e1a',light:'#E3F2FD',dark:'#0a3055',
   missions:[
    {id:'w2m1',name:'Hundred Hills',     topic:'add2',       villain:'Big Number Boss',   vi:'🦕',intro:"RAAAAWR! Your little sums are NOTHING compared to my ENORMOUS numbers! RAAAWR!"},
    {id:'w2m2',name:'Times Table Tower', topic:'times25',    villain:'Multiply Monster',  vi:'🐙',intro:"With my 8 arms I've tangled ALL the times tables! Can you POSSIBLY untangle THAT?!"},
    {id:'w2m3',name:'Fraction Forest',   topic:'fractions1', villain:'Half-Baked Harry',  vi:'🧁',intro:"My cakes are half-baked and my fractions are WORSE! You'll NEVER sort me out! Never!"},
    {id:'w2m4',name:'Measurement Maze',  topic:'measurement',villain:'Ruler Ruiner',      vi:'📏',intro:"I bent ALL the rulers and squished the scales! PURE CHAOS reigns supreme here!"},
    {id:'w2m5',name:'Time Temple',       topic:'time',       villain:'Clock Blocker',     vi:'⏰',intro:"TICK TOCK! I stopped ALL the clocks! Time is on MY side now, forever! MWAHAHA!"},
  ]},
  {id:3,label:'Math Superman',emoji:'⚡',color:'#FF9800',bg:'#1a0a00',light:'#FFF3E0',dark:'#7a3500',
   missions:[
    {id:'w3m1',name:'Times Table Titan',    topic:'timesAll',   villain:'Table Trembler',   vi:'🦖',intro:"ROAR! I ate the 7, 8 AND 9 times tables for breakfast! Good luck WITHOUT those!"},
    {id:'w3m2',name:'Division Dungeon',     topic:'division',   villain:'Divide and Cry',   vi:'🧟',intro:"GRRRRR! Nobody shares equally! Division is IMPOSSIBLE! Braaains! BRAAAAAINS!"},
    {id:'w3m3',name:'Fraction Fortress',    topic:'fractions2', villain:'Fraction Phantom', vi:'👻',intro:"OooOOOooo! I'm a FRACTION of my former self and I'm STILL terrifying! BOO!"},
    {id:'w3m4',name:'Perimeter Palace',     topic:'perimeter',  villain:'Shapeshifter',     vi:'🔮',intro:"I keep CHANGING shape so you can NEVER measure my perimeter! HA HA HA HA!"},
    {id:'w3m5',name:'Word Problem Volcano', topic:'wordprobs',  villain:'Word Witch',       vi:'🧙',intro:"My word problems are SO confusing they'll make your brain MELT! Hee hee hee!"},
  ]},
];

const ALL_MISSIONS = WORLDS.flatMap(w=>w.missions.map(m=>({...m,world:w.id,wColor:w.color,wBg:w.bg,wLight:w.light,wDark:w.dark,wLabel:w.label,wEmoji:w.emoji})));

const BADGES=[
  {id:'first',  emoji:'🏆',name:'First Hero!',     desc:'Complete your first mission'},
  {id:'perfect',emoji:'💎',name:'Perfect Score!',  desc:'10/10 correct in one mission'},
  {id:'fire',   emoji:'🔥',name:'On Fire!',         desc:'5 correct answers in a row'},
  {id:'w1done', emoji:'⭐',name:'Class 1 Master',  desc:'Complete all Class 1 missions'},
  {id:'w2done', emoji:'🚀',name:'Class 2 Hero',    desc:'Complete all Class 2 missions'},
  {id:'w3done', emoji:'⚡',name:'Math Superman!',  desc:'Complete ALL 15 missions'},
  {id:'s100',   emoji:'🌟',name:'Star Collector',  desc:'Earn 100 total stars'},
  {id:'s500',   emoji:'💫',name:'Star Hoarder',    desc:'Earn 500 total stars'},
  {id:'s1000',  emoji:'✨',name:'Superstar!',      desc:'Earn 1000 total stars'},
  {id:'speed',  emoji:'⚡',name:'Speed Demon',     desc:'Answer in under 4 seconds'},
  {id:'nohints',emoji:'🧠',name:'No Hints Hero',  desc:'Finish a mission without hints'},
];

/* ================================================================
   QUESTION ENGINE
   ================================================================ */
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const sh=a=>[...a].sort(()=>Math.random()-.5);
const uniq=a=>[...new Set(a)];
function wrongs(ans,diffs){return diffs.map(d=>[ans-d,ans+d]).flat().filter(x=>x>=0&&String(x)!==String(ans));}
function opts4(ans,extras){
  const pool=uniq([String(ans),...sh(extras.map(String))]).filter(x=>x!==String(ans));
  const picks=sh(pool).slice(0,3);
  return sh([String(ans),...picks]);
}

const GENS={
  counting:()=>{
    const n=rnd(1,94);
    const choices=[
      {q:`🔢 What comes AFTER ${n}?`,a:n+1,e:wrongs(n+1,[1,2,3])},
      {q:`🔢 What comes BEFORE ${n+1}?`,a:n,e:wrongs(n,[1,2,3])},
      {q:`📊 Fill in: ${n}, ${n+1}, ${n+2}, ___`,a:n+3,e:wrongs(n+3,[1,2,3])},
      {q:`📈 What is 1 more than ${n}?`,a:n+1,e:wrongs(n+1,[1,2,3])},
      {q:`🔢 Count in 2s: ${n*2}, ${n*2+2}, ___`,a:n*2+4,e:wrongs(n*2+4,[2,4,6])},
    ];
    const v=choices[rnd(0,choices.length-1)];
    return{q:v.q,a:String(v.a),opts:opts4(v.a,v.e),hint:'🦉 Count on your fingers! Start at the number and count up!'};
  },
  add1:()=>{const a=rnd(1,10),b=rnd(1,10),ans=a+b;return{q:`➕ ${a} + ${b} = ?`,a:String(ans),opts:opts4(ans,wrongs(ans,[1,2,3,4])),hint:`🦉 Start with ${a}, then count up ${b} more on your fingers!`};},
  shapes:()=>{
    const SH=[{n:'triangle',s:3},{n:'square',s:4},{n:'rectangle',s:4},{n:'pentagon',s:5},{n:'hexagon',s:6},{n:'octagon',s:8}];
    const s=SH[rnd(0,SH.length-1)],others=sh(SH.filter(x=>x.n!==s.n));
    const choices=[
      {q:`🔺 How many sides does a ${s.n} have?`,a:String(s.s),opts:opts4(s.s,[s.s-1,s.s+1,s.s+2,s.s-2].filter(x=>x>0))},
      {q:`🔺 A shape with ${s.s} sides is called?`,a:s.n,opts:sh([s.n,...others.slice(0,3).map(x=>x.n)])},
    ];
    const v=choices[rnd(0,choices.length-1)];
    return{...v,hint:'🦉 Count the corners — each corner equals one side!'};
  },
  oddeven:()=>{const n=rnd(1,60),ans=n%2===0?'even':'odd';return{q:`🎯 Is the number ${n} ODD or EVEN?`,a:ans,opts:['odd','even'],hint:'🦉 Even = ends in 0,2,4,6,8. Odd = ends in 1,3,5,7,9!'};},
  money:()=>{
    const coins=[1,2,5,10,20,50],c1=coins[rnd(0,5)],c2=coins[rnd(0,5)],ans=c1+c2;
    return{q:`💰 ${c1}p + ${c2}p = how many pence?`,a:`${ans}p`,opts:opts4(`${ans}p`,[`${ans-1}p`,`${ans+1}p`,`${ans+2}p`,`${ans+5}p`]),hint:`🦉 Add them together: ${c1} + ${c2} = ?`};
  },
  add2:()=>{const a=rnd(12,58),b=rnd(8,40),ans=a+b;return{q:`➕ ${a} + ${b} = ?`,a:String(ans),opts:opts4(ans,wrongs(ans,[1,2,10,11])),hint:`🦉 Add tens first: ${Math.floor(a/10)*10}+${Math.floor(b/10)*10}, then add the ones!`};},
  times25:()=>{
    const ts=[2,5,10],t=ts[rnd(0,2)],n=rnd(1,12),ans=t*n;
    return{q:`✖️ ${t} × ${n} = ?`,a:String(ans),opts:opts4(ans,[ans-t,ans+t,ans+2*t,ans-2*t].filter(x=>x>0&&x!==ans)),hint:`🦉 Count in ${t}s! ${t}… ${t*2}… ${t*3}…`};
  },
  fractions1:()=>{
    const pool=[2,4,6,8,10,12,16,20],n=pool[rnd(0,7)],half=n/2,qtr=n%4===0?n/4:null;
    const v=qtr&&rnd(0,1)
      ?{q:`🍕 What is ¼ of ${n}?`,a:String(qtr),e:[qtr-1,qtr+1,half,qtr+2].filter(x=>x>0&&String(x)!==String(qtr))}
      :{q:`🍕 What is ½ of ${n}?`,a:String(half),e:[half-1,half+1,half+2,n].filter(x=>x>0&&String(x)!==String(half))};
    return{q:v.q,a:v.a,opts:opts4(v.a,v.e),hint:'🦉 ½ = split into 2 equal groups. ¼ = split into 4 equal groups!'};
  },
  measurement:()=>{
    const choices=[
      ()=>{const a=rnd(15,65),b=rnd(10,40),ans=a+b;return{q:`📏 ${a}cm + ${b}cm = ___cm`,a:String(ans),e:wrongs(ans,[1,2,5,10])};},
      ()=>{const kg=rnd(1,6),g=rnd(1,9)*100,ans=kg*1000+g;return{q:`⚖️ ${kg}kg and ${g}g = how many grams?`,a:String(ans),e:[ans-100,ans+100,ans+500,kg*1000]};},
      ()=>{const l=rnd(1,4),ml=rnd(2,9)*100,ans=l*1000+ml;return{q:`🥤 ${l} litre and ${ml}ml = total ml?`,a:String(ans),e:[ans-100,ans+100,ans+500,l*1000]};},
    ];
    const v=choices[rnd(0,2)]();
    return{q:v.q,a:v.a,opts:opts4(v.a,v.e),hint:'🦉 1 metre=100cm, 1kg=1000g, 1 litre=1000ml!'};
  },
  time:()=>{
    const h=rnd(1,11);
    const choices=[
      {q:`🕐 What is ${h} o'clock in digital?`,a:`${h}:00`,opts:sh([`${h}:00`,`${h}:30`,`${h===12?1:h+1}:00`,`${h===1?12:h-1}:30`])},
      {q:`🕧 "Half past ${h}" in digital time?`,a:`${h}:30`,opts:sh([`${h}:30`,`${h}:00`,`${h===12?1:h+1}:00`,`${h}:15`])},
      {q:`⏱️ ${h}:00 plus 30 minutes = ?`,a:`${h}:30`,opts:sh([`${h}:30`,`${h===12?1:h+1}:00`,`${h}:15`,`${h}:45`])},
      {q:`⏱️ Quarter past ${h} in digital?`,a:`${h}:15`,opts:sh([`${h}:15`,`${h}:00`,`${h}:30`,`${h}:45`])},
    ];
    const v=choices[rnd(0,choices.length-1)];
    return{q:v.q,a:v.a,opts:v.opts,hint:"🦉 Half past = :30. Quarter past = :15. O'clock = :00!"};
  },
  timesAll:()=>{const a=rnd(2,12),b=rnd(2,12),ans=a*b;return{q:`⚡ ${a} × ${b} = ?`,a:String(ans),opts:opts4(ans,[ans-a,ans+a,ans-b,ans+b].filter(x=>x>0&&x!==ans)),hint:`🦉 Use the smaller! ${Math.min(a,b)} × ${Math.max(a,b)} = ?`};},
  division:()=>{const b=rnd(2,12),ans=rnd(1,12),a=b*ans;return{q:`➗ ${a} ÷ ${b} = ?`,a:String(ans),opts:opts4(ans,[ans-1,ans+1,ans-2,ans+2].filter(x=>x>0&&x!==ans)),hint:`🦉 Think: what × ${b} = ${a}? Use the ${b} times table!`};},
  fractions2:()=>{
    const choices=[
      {q:'🍕 Which is BIGGER: ¾ or ½?',a:'¾',opts:['¾','½','equal','¼']},
      {q:'🍕 Which is SMALLER: ⅓ or ½?',a:'⅓',opts:['⅓','½','equal','¼']},
      {q:'🧮 ½ equals how many quarters?',a:'2',opts:['2','1','3','4']},
      {q:'🍕 Biggest of: ¼, ½ and ¾?',a:'¾',opts:['¾','½','¼','⅓']},
      {q:'🧮 3 parts out of 4 equals?',a:'¾',opts:['¾','⅓','½','¼']},
      {q:'🧮 Which fraction equals ½?',a:'2/4',opts:['2/4','1/4','3/4','2/3']},
    ];
    const v=choices[rnd(0,choices.length-1)];
    return{q:v.q,a:v.a,opts:sh(v.opts),hint:'🦉 Bigger bottom number = SMALLER pieces! Compare carefully!'};
  },
  perimeter:()=>{
    const choices=[
      ()=>{const s=rnd(2,10),ans=s*4;return{q:`📐 Square: sides ${s}cm. Perimeter?`,a:String(ans),e:wrongs(ans,[s,s*2,4])};},
      ()=>{const w=rnd(4,12),h=rnd(2,8),ans=2*(w+h);return{q:`📐 Rectangle ${w}cm × ${h}cm. Perimeter?`,a:String(ans),e:wrongs(ans,[2,4,w,h])};},
      ()=>{const s=[rnd(3,8),rnd(3,8),rnd(3,8)],ans=s.reduce((a,b)=>a+b,0);return{q:`📐 Triangle sides: ${s[0]}cm, ${s[1]}cm, ${s[2]}cm. Perimeter?`,a:String(ans),e:wrongs(ans,[1,2,3])};},
    ];
    const v=choices[rnd(0,2)]();
    return{q:v.q,a:v.a,opts:opts4(v.a,v.e),hint:'🦉 Perimeter = add ALL sides around the outside!'};
  },
  wordprobs:()=>{
    const pool=[
      {q:'🐉 A dragon has 3 bags with 7 coins each. Total coins?',a:'21',o:['21','10','18','24']},
      {q:'🦸 A hero jumps 15 metres each leap. Distance in 4 leaps?',a:'60',o:['60','19','45','75']},
      {q:'🤖 Robot: 8 bolts per wheel, 4 wheels. Total bolts?',a:'32',o:['32','12','28','36']},
      {q:'🧙 56 magic beans shared among 7 students. Each gets?',a:'8',o:['8','6','7','9']},
      {q:'🐘 Flying elephant: 25km morning + 37km afternoon. Total?',a:'62',o:['62','52','72','12']},
      {q:'🍕 8 slices of pizza, 3 kids eat 2 each. Slices left?',a:'2',o:['2','3','4','6']},
      {q:'🦁 134 animals + 58 more arrive. Animals now?',a:'192',o:['192','182','202','76']},
      {q:'⭐ 144 stars shared among 12 friends. Each gets?',a:'12',o:['12','11','13','10']},
      {q:'🧁 Baker makes 48 cupcakes, 6 per box. Boxes needed?',a:'8',o:['8','6','7','9']},
      {q:'🚀 Rocket travels 365km per day. Distance in 3 days?',a:'1095',o:['1095','1085','1105','365']},
    ];
    const v=pool[rnd(0,pool.length-1)];
    return{q:v.q,a:v.a,opts:sh(v.o),hint:'🦉 Read slowly! Find the numbers, then decide: add? subtract? multiply? divide?'};
  },
};

function generateQs(topic,count=10){
  const gen=GENS[topic]||GENS.add1;
  const out=[],seen=new Set();
  for(let i=0;i<count;i++){
    let item,tries=0;
    do{item=gen();tries++;}while(seen.has(item.q)&&tries<15);
    seen.add(item.q);
    if(topic==='oddeven')item.opts=['odd','even'];
    out.push({...item,id:i});
  }
  return out;
}

/* ================================================================
   SOUND ENGINE
   ================================================================ */
let _ctx=null;
const ac=()=>{if(!_ctx)try{_ctx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return _ctx;};
const tone=(f,d,type='sine',vol=.25)=>{
  const ctx=ac();if(!ctx)return;
  try{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+d);o.start();o.stop(ctx.currentTime+d);}catch(e){}
};
const SFX={
  click:  ()=>tone(900,.04,'sine',.09),
  correct:()=>{[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.09,'sine',.22),i*80));},
  wrong:  ()=>{tone(200,.13,'sawtooth',.25);setTimeout(()=>tone(150,.2,'sawtooth',.18),130);},
  star:   ()=>[523,659,784,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.1,'sine',.16),i*65)),
  victory:()=>{const n=[523,587,659,698,784,880,988,1047];n.forEach((f,i)=>setTimeout(()=>tone(f,.13,'sine',.22),i*85));},
  powerup:()=>[380,480,620,800,1000].forEach((f,i)=>setTimeout(()=>tone(f,.09,'square',.13),i*55)),
  hint:   ()=>[600,750,900].forEach((f,i)=>setTimeout(()=>tone(f,.08,'sine',.11),i*60)),
  levelup:()=>{const n=[523,587,659,698,784,880,988,1047,988,1047,1175];n.forEach((f,i)=>setTimeout(()=>tone(f,.1,'sine',.2),i*75));},
  badge:  ()=>[880,1047,880,1175,1047].forEach((f,i)=>setTimeout(()=>tone(f,.1,'sine',.2),i*90)),
};

/* ================================================================
   CONFETTI
   ================================================================ */
const COLS=['#FFD700','#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#FF9FF3','#54a0ff','#ff9f43','#5f27cd'];
function Confetti({active}){
  if(!active)return null;
  return <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,overflow:'hidden'}}>
    {Array.from({length:80},(_,i)=>(
      <div key={i} style={{position:'absolute',left:`${Math.random()*100}%`,top:'-20px',
        width:`${5+Math.random()*14}px`,height:`${5+Math.random()*14}px`,
        background:COLS[i%COLS.length],borderRadius:Math.random()>.5?'50%':'3px',
        animation:`confetti ${2+Math.random()*2.5}s linear ${Math.random()*1.8}s forwards`}}/>
    ))}
  </div>;
}

/* ================================================================
   HP BAR
   ================================================================ */
function HPBar({value,max=100,color,label,emoji}){
  const pct=Math.max(0,Math.min(100,(value/max)*100));
  const fill=pct>60?color:pct>30?'#F39C12':'#E74C3C';
  return <div style={{flex:1}}>
    <div className="ff" style={{fontSize:'11px',color:'#aaa',marginBottom:'3px',display:'flex',justifyContent:'space-between'}}>
      <span>{emoji} {label}</span><span style={{color:fill}}>{Math.round(pct)}%</span>
    </div>
    <div className="hp-track"><div className="hp-fill" style={{width:`${pct}%`,background:fill}}/></div>
  </div>;
}

/* ================================================================
   SPEECH BUBBLE
   ================================================================ */
function Bubble({text,bg='#1a0a0a',color='#ff6b6b',dir='left'}){
  return <div style={{position:'relative',background:bg,border:`2.5px solid ${color}`,borderRadius:'16px',padding:'12px 14px',marginLeft:dir==='left'?12:0,marginRight:dir==='right'?12:0,flex:1}}>
    <div style={{position:'absolute',...(dir==='left'?{left:-12,top:12}:{right:-12,top:12}),
      borderTop:'8px solid transparent',borderBottom:'8px solid transparent',
      [dir==='left'?'borderRight':'borderLeft']:`12px solid ${color}`,width:0,height:0}}/>
    <div style={{position:'absolute',...(dir==='left'?{left:-7,top:14}:{right:-7,top:14}),
      borderTop:'6px solid transparent',borderBottom:'6px solid transparent',
      [dir==='left'?'borderRight':'borderLeft']:`10px solid ${bg}`,width:0,height:0}}/>
    <p className="ff" style={{fontSize:'13px',color,lineHeight:1.55,margin:0}}>{text}</p>
  </div>;
}

/* ================================================================
   WELCOME SCREEN
   ================================================================ */
function WelcomeScreen({onStart}){
  const [name,setName]=useState('');
  const ok=name.trim().length>0;
  return <div className="anim-fi" style={{minHeight:'100vh',background:'#070718',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',position:'relative',overflow:'hidden'}}>
    {Array.from({length:30},(_,i)=><div key={i} style={{position:'absolute',left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,fontSize:`${6+Math.random()*14}px`,opacity:.07+Math.random()*.25,animation:`twinkle ${1.5+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite`,pointerEvents:'none',userSelect:'none'}}>{'⭐✨💫🌟'[Math.floor(Math.random()*4)]}</div>)}

    <div className="anim-pi" style={{background:'#12122a',border:'4px solid #FFD700',borderRadius:'28px',
      boxShadow:'8px 8px 0 #FFD700, 0 0 40px rgba(255,215,0,.15)',
      padding:'28px 24px 24px',maxWidth:'440px',width:'100%',textAlign:'center',position:'relative',zIndex:2}}>

      <div style={{fontSize:'80px',lineHeight:1,marginBottom:'2px'}} className="anim-fl">🦸</div>
      <h1 className="ff" style={{fontSize:'30px',color:'#FFD700',margin:'0 0 2px',textShadow:'3px 3px 0 #8B6914',lineHeight:1.1}}>Math Superhero Academy</h1>
      <p className="fn" style={{fontSize:'13px',color:'#777',marginBottom:'18px'}}>Defeat villains with MATHS powers! 🚀</p>

      <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'20px'}}>
        {[['#27AE60','🌟','Class 1'],['#2196F3','🚀','Class 2'],['#FF9800','⚡','Class 3']].map(([c,e,l],i)=>
          <div key={i} className="ff" style={{background:c+'1a',border:`2px solid ${c}44`,color:c,padding:'4px 12px',borderRadius:'20px',fontSize:'12px'}}>{e} {l}</div>)}
      </div>

      <div style={{display:'flex',gap:'16px',justifyContent:'center',marginBottom:'20px'}}>
        {[['⚔️','15 Missions'],['😂','Funny Villains'],['🏆','11 Badges']].map(([e,l],i)=>
          <div key={i} className="fn" style={{fontSize:'11px',color:'#555',textAlign:'center'}}><div style={{fontSize:'18px'}}>{e}</div>{l}</div>)}
      </div>

      <div style={{background:'#0a0a1a',borderRadius:'14px',padding:'14px',marginBottom:'14px',border:'2px solid #222'}}>
        <div className="ff" style={{fontSize:'11px',color:'#444',marginBottom:'8px',letterSpacing:'2px',textTransform:'uppercase'}}>Your Hero Name</div>
        <input value={name} onChange={e=>setName(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&ok&&(SFX.click(),onStart(name.trim()))}
          placeholder="Type your hero name…" maxLength={20}
          style={{width:'100%',background:'#1a1a2e',border:'2.5px solid #333',borderRadius:'10px',padding:'11px 14px',fontSize:'18px',color:'white',outline:'none',transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor='#FFD700'} onBlur={e=>e.target.style.borderColor='#333'}/>
      </div>

      <button className={`comic-btn${ok?' anim-gp':''}`} onClick={()=>ok&&(SFX.click(),onStart(name.trim()))} disabled={!ok}
        style={{width:'100%',padding:'15px',fontSize:'21px',background:ok?'#FFD700':'#222',color:ok?'#070718':'#444',border:'3px solid',borderColor:ok?'#111':'#333',borderRadius:'16px',letterSpacing:'.5px'}}>
        {ok?'🚀 START ADVENTURE!':'👆 Enter your name first!'}
      </button>
    </div>
  </div>;
}

/* ================================================================
   MISSION MAP
   ================================================================ */
function MissionMap({playerName,stars,completed,badges,onMission,onTrophy}){
  const [world,setWorld]=useState(0);
  const W=WORLDS[world];
  const totalDone=WORLDS.flatMap(w=>w.missions).filter(m=>completed.includes(m.id)).length;
  return <div style={{minHeight:'100vh',background:W.bg}}>
    <div style={{background:'#0a0a0a',borderBottom:'3px solid #1a1a1a',padding:'10px 14px',display:'flex',alignItems:'center',gap:'10px',position:'sticky',top:0,zIndex:10}}>
      <div className="anim-fl" style={{fontSize:'38px',flexShrink:0}}>🦸</div>
      <div style={{flex:1}}>
        <div className="ff" style={{fontSize:'18px',color:'#FFD700'}}>{playerName}</div>
        <div className="fn" style={{fontSize:'11px',color:'#555'}}>{totalDone}/15 missions done</div>
      </div>
      <div style={{textAlign:'center',marginRight:'6px'}}>
        <div className="ff" style={{fontSize:'20px',color:'#FFD700'}}>⭐ {stars}</div>
        <div className="fn" style={{fontSize:'10px',color:'#444'}}>stars</div>
      </div>
      <button className="comic-btn" onClick={()=>{SFX.click();onTrophy();}} style={{padding:'8px 12px',fontSize:'13px',background:'#6C63FF',color:'white',border:'2.5px solid #111'}}>🏆</button>
    </div>

    <div style={{padding:'14px'}}>
      <div style={{display:'flex',gap:'8px',marginBottom:'14px'}}>
        {WORLDS.map((w,i)=>{
          const done=w.missions.filter(m=>completed.includes(m.id)).length,act=world===i;
          return <button key={i} onClick={()=>{SFX.click();setWorld(i);}}
            style={{flex:1,padding:'10px 5px',borderRadius:'16px',border:`3px solid ${act?w.color:'#222'}`,background:act?w.color:'#111',color:act?'#fff':'#555',boxShadow:act?`3px 3px 0 ${w.dark}`:'none',cursor:'pointer',transition:'all .12s',fontFamily:"'Boogaloo',cursive",fontSize:'12px',lineHeight:1.4}}>
            <div style={{fontSize:'20px'}}>{w.emoji}</div><div>{w.label}</div><div style={{fontSize:'11px',opacity:.8}}>{done}/5</div>
          </button>;
        })}
      </div>

      <div className="ff" style={{textAlign:'center',fontSize:'22px',color:W.color,marginBottom:'12px'}}>{W.emoji} {W.label} Missions</div>

      <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {W.missions.map((m,idx)=>{
          const done=completed.includes(m.id),unlocked=idx===0||completed.includes(W.missions[idx-1].id),locked=!unlocked&&!done;
          return <button key={m.id}
            onClick={()=>{ if(!locked){SFX.click();onMission({...m,world:W.id,wColor:W.color,wBg:W.bg,wLight:W.light,wDark:W.dark,wLabel:W.label,wEmoji:W.emoji});}}}
            disabled={locked}
            style={{background:done?`linear-gradient(135deg,${W.color},${W.dark})`:(locked?'#0f0f0f':'#1a1a2a'),border:`3px solid ${done?W.dark:locked?'#1a1a1a':'#333'}`,borderRadius:'18px',boxShadow:locked?'none':`4px 4px 0 ${done?W.dark:'#333'}`,padding:'13px 14px',cursor:locked?'not-allowed':'pointer',display:'flex',alignItems:'center',gap:'12px',textAlign:'left',fontFamily:'inherit',transition:'transform .1s'}}
            onMouseEnter={e=>{if(!locked)e.currentTarget.style.transform='translate(-2px,-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';}}
          >
            <div style={{fontSize:'44px',flexShrink:0,lineHeight:1}}>{locked?'🔒':done?'✅':m.vi}</div>
            <div style={{flex:1}}>
              <div className="ff" style={{fontSize:'16px',color:done?'white':locked?'#333':'#eee'}}>Mission {idx+1}: {m.name}</div>
              <div className="fn" style={{fontSize:'12px',marginTop:'2px',color:done?'rgba(255,255,255,.7)':locked?'#2a2a2a':'#777'}}>
                {locked?`🔒 Complete mission ${idx} first!`:done?'✅ Completed! Play again for more stars!':`⚔️ Battle vs ${m.villain}!`}
              </div>
            </div>
            {!locked&&<div style={{fontSize:'20px'}}>{done?'⭐':'▶️'}</div>}
          </button>;
        })}
      </div>
    </div>
  </div>;
}

/* ================================================================
   BRIEFING SCREEN
   ================================================================ */
function Briefing({mission,onStart,onBack}){
  const [stage,setStage]=useState(0);
  useEffect(()=>{if(stage<3){const t=setTimeout(()=>setStage(s=>s+1),stage===0?500:2100);return()=>clearTimeout(t);}},[stage]);
  return <div className="anim-fi" style={{minHeight:'100vh',background:mission.wBg,padding:'18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <div style={{maxWidth:'480px',width:'100%'}}>
      <button className="comic-btn" onClick={()=>{SFX.click();onBack();}} style={{marginBottom:'14px',padding:'8px 14px',fontSize:'13px',background:'#111',color:'#aaa',border:'2px solid #333'}}>← Back</button>

      <div style={{background:mission.wColor,padding:'12px 16px',borderRadius:'16px',border:'3px solid #111',boxShadow:'4px 4px 0 #111',textAlign:'center',marginBottom:'14px'}}>
        <div className="ff" style={{fontSize:'21px',color:'white'}}>⚔️ Mission: {mission.name}</div>
        <div className="fn" style={{fontSize:'13px',color:'rgba(255,255,255,.8)'}}>World {mission.world} • vs {mission.villain}</div>
      </div>

      {stage>=1&&<div className="anim-sl" style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'14px'}}>
        <div style={{fontSize:'60px',flexShrink:0,lineHeight:1}} className="anim-wg">{mission.vi}</div>
        <Bubble text={mission.intro} bg='#1a0505' color='#ff6b6b' dir='left'/>
      </div>}

      {stage>=2&&<div className="anim-sr" style={{display:'flex',gap:'10px',alignItems:'flex-start',flexDirection:'row-reverse',marginBottom:'14px'}}>
        <div style={{fontSize:'60px',flexShrink:0,lineHeight:1}} className="anim-fl">🦸</div>
        <Bubble text={`"Not a chance! I am ${mission.world===3?'Math Superman':mission.world===2?'Rising Hero':'Recruit Hero'} and my MATHS POWERS are UNSTOPPABLE! Prepare to be defeated! ⚡🧮"`} bg='#050a1a' color='#4ecdc4' dir='right'/>
      </div>}

      {stage>=2&&<div className="anim-su" style={{background:'#1a1500',border:'2px solid #FFD70055',borderRadius:'14px',padding:'12px',marginBottom:'14px',display:'flex',gap:'10px',alignItems:'center'}}>
        <div style={{fontSize:'32px'}} className="anim-wg">🦉</div>
        <div>
          <div className="ff" style={{fontSize:'13px',color:'#FFD700',marginBottom:'2px'}}>Professor Hoot says:</div>
          <div className="fn" style={{fontSize:'12px',color:'#ccc',lineHeight:1.5}}>Answer 10 questions to defeat the villain! Tap 🦉 for a hint anytime (costs stars). Get 6+ correct to WIN! 🌟</div>
        </div>
      </div>}

      {stage>=3&&<div className="anim-pi">
        <button className="comic-btn anim-gp" onClick={()=>{SFX.click();onStart();}}
          style={{width:'100%',padding:'18px',fontSize:'24px',background:'#FFD700',color:'#070718',border:'3px solid #111',borderRadius:'18px',letterSpacing:'.5px'}}>
          ⚡ LET'S FIGHT! ⚡
        </button>
        <div className="fn" style={{textAlign:'center',fontSize:'12px',color:'#444',marginTop:'8px'}}>10 questions • Get 6+ correct to WIN!</div>
      </div>}
    </div>
  </div>;
}

/* ================================================================
   QUESTION SCREEN
   ================================================================ */
function QuestionScreen({mission,onComplete}){
  const TOTAL=10;
  const [questions]=useState(()=>generateQs(mission.topic,TOTAL));
  const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [showHint,setShowHint]=useState(false);
  const hintUsed=useRef(false);
  const hintEver=useRef(false);
  const speedGot=useRef(false);
  const starsR=useRef(0);
  const streakR=useRef(0);
  const heroHPR=useRef(100);
  const villHPR=useRef(100);
  const results=useRef([]);
  const startTime=useRef(Date.now());
  const [heroHP,setHeroHP]=useState(100);
  const [villHP,setVillHP]=useState(100);
  const [starsN,setStarsN]=useState(0);
  const [streak,setStreak]=useState(0);
  const [fb,setFb]=useState(null);
  const [villAnim,setVillAnim]=useState('anim-fl');
  const [heroAnim,setHeroAnim]=useState('anim-fl');
  const q=questions[qi];
  const hpPerQ=100/TOTAL;

  useEffect(()=>{startTime.current=Date.now();setShowHint(false);hintUsed.current=false;},[qi]);

  function doAnswer(opt){
    if(answered)return;
    try{ac()?.resume?.();}catch(e){}
    const correct=String(opt)===String(q.a);
    const fast=(Date.now()-startTime.current)/1000<4;
    setSel(opt);setAnswered(true);
    const earned=correct?(hintUsed.current?5:streakR.current>=4?20:10):0;
    if(correct){
      SFX.correct();
      starsR.current+=earned;streakR.current++;villHPR.current=Math.max(0,villHPR.current-hpPerQ*1.2);
      setStarsN(starsR.current);setStreak(streakR.current);setVillHP(villHPR.current);
      setVillAnim('anim-vh');setHeroAnim('anim-hg');setFb('correct');
      if(fast&&!speedGot.current)speedGot.current=true;
      if(streakR.current>=5)setTimeout(()=>SFX.powerup(),300);
    }else{
      SFX.wrong();
      streakR.current=0;heroHPR.current=Math.max(0,heroHPR.current-hpPerQ*1.6);
      setStreak(0);setHeroHP(heroHPR.current);
      setVillAnim('anim-pu');setHeroAnim('anim-sh');setFb('wrong');
    }
    results.current.push({q:q.q,chosen:opt,correct,expected:q.a});
    setTimeout(()=>{setVillAnim('anim-fl');setHeroAnim('anim-fl');},750);
    setTimeout(()=>{
      if(qi+1>=TOTAL){
        onComplete({correct:results.current.filter(r=>r.correct).length,total:TOTAL,stars:starsR.current,streak:streakR.current,villainHP:villHPR.current,heroHP:heroHPR.current,hadHint:hintEver.current,speedBonus:speedGot.current,results:results.current});
      }else{
        setQi(i=>i+1);setSel(null);setAnswered(false);setFb(null);
      }
    },1850);
  }

  const ANS=['#C0392B','#1A5276','#6C3483','#117A65'];

  return <div style={{minHeight:'100vh',background:mission.wBg,display:'flex',flexDirection:'column'}}>
    {/* HUD */}
    <div style={{background:'#0a0a0a',borderBottom:'3px solid #1a1a1a',padding:'10px 12px',flexShrink:0}}>
      <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'8px'}}>
        <HPBar value={heroHP} color='#27AE60' label='HERO' emoji='🦸'/>
        <div style={{flexShrink:0,textAlign:'center',minWidth:'56px'}}>
          <div className="ff" style={{fontSize:'17px',color:'#FFD700'}}>⭐{starsN}</div>
          {streak>=3&&<div className="ff anim-fl2" style={{fontSize:'12px',color:'#E74C3C'}}>🔥{streak}×</div>}
        </div>
        <HPBar value={villHP} color='#E74C3C' label={mission.villain.split(' ')[0].toUpperCase()} emoji={mission.vi}/>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <span className="ff" style={{fontSize:'11px',color:'#444',flexShrink:0}}>Q{qi+1}/{TOTAL}</span>
        <div style={{flex:1,height:'6px',background:'#111',borderRadius:'3px',overflow:'hidden',border:'1px solid #222'}}>
          <div style={{width:`${(qi/TOTAL)*100}%`,height:'100%',background:mission.wColor,borderRadius:'3px',transition:'width .4s'}}/>
        </div>
        <span className="ff" style={{fontSize:'11px',color:'#444',flexShrink:0}}>{mission.name}</span>
      </div>
    </div>

    {/* CHARACTERS */}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 24px 4px',flexShrink:0}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'56px',lineHeight:1}} className={heroAnim}>🦸</div>
        <div className="ff" style={{fontSize:'10px',color:mission.wColor}}>MATH BOY</div>
      </div>
      <div style={{textAlign:'center',minWidth:'80px',position:'relative'}}>
        {fb==='correct'&&<div className="anim-pi ff" style={{fontSize:'16px',color:'#2ecc71',textShadow:'1px 1px 0 #0a3a1a'}}>⚡ HIT!</div>}
        {fb==='wrong'&&<div className="anim-sh ff" style={{fontSize:'15px',color:'#e74c3c'}}>MISS!</div>}
        {!fb&&<div style={{fontSize:'22px',opacity:.15}}>⚔️</div>}
        {streak>=3&&<div className="anim-fl2 ff" style={{fontSize:'11px',color:'#f39c12',marginTop:'3px'}}>🔥 COMBO!</div>}
      </div>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'56px',lineHeight:1}} className={villAnim}>{mission.vi}</div>
        <div className="ff" style={{fontSize:'10px',color:'#e74c3c'}}>{mission.villain.split(' ')[0].toUpperCase()}</div>
      </div>
    </div>

    {/* QUESTION + ANSWERS */}
    <div style={{flex:1,padding:'0 12px 12px',display:'flex',flexDirection:'column',gap:'10px'}}>
      <div className="comic-box" style={{background:'#12122a',padding:'16px',textAlign:'center',flexShrink:0}}>
        <div className="ff" style={{fontSize:'21px',color:'#fff',lineHeight:1.45}}>{q.q}</div>
        {showHint&&<div className="anim-su" style={{marginTop:'10px',background:'#1a1500',padding:'10px 12px',borderRadius:'10px',border:'2px solid #FFD70055',fontSize:'13px',color:'#FFD700',textAlign:'left'}}>{q.hint}</div>}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'9px'}}>
        {q.opts.map((opt,i)=>{
          let cls='',bg=ANS[i%ANS.length];
          if(answered){
            if(String(opt)===String(q.a)){cls='COR';}
            else if(opt===sel){cls='WRG';}
            else{cls='DIM';}
          }
          return <button key={i} className={`ans-btn ${cls}`} onClick={()=>doAnswer(opt)} disabled={answered}
            style={{background:answered?undefined:bg}}>
            {answered&&String(opt)===String(q.a)&&'✓ '}
            {answered&&opt===sel&&String(opt)!==String(q.a)&&'✗ '}
            {opt}
          </button>;
        })}
      </div>

      {!answered&&!showHint&&<button className="comic-btn" onClick={()=>{SFX.hint();setShowHint(true);hintUsed.current=true;hintEver.current=true;}}
        style={{width:'100%',padding:'10px',fontSize:'13px',background:'#1a1500',border:'2px solid #FFD70044',color:'#FFD700',borderRadius:'12px'}}>
        🦉 Professor Hoot hint! <span style={{color:'#555',fontSize:'11px'}}>(costs stars if correct)</span>
      </button>}
      {showHint&&<div style={{textAlign:'center',fontSize:'30px'}} className="anim-wg">🦉</div>}
    </div>
  </div>;
}

/* ================================================================
   RESULTS SCREEN
   ================================================================ */
function Results({mission,res,onMap,onNext,nextMission,newBadges}){
  const won=res.villainHP<=0||res.correct>=res.total*.6;
  const pct=Math.round((res.correct/res.total)*100);
  const stars3=pct>=90?3:pct>=60?2:pct>=30?1:0;
  useEffect(()=>{won?setTimeout(()=>SFX.victory(),200):SFX.wrong();},[]);
  const msgs=[
    {min:100,t:"🌟 ABSOLUTELY LEGENDARY! You're the greatest Math Superhero EVER!"},
    {min:80,t:"⚡ BRILLIANT! That villain didn't stand a SINGLE chance against you!"},
    {min:60,t:"💪 NICE WORK! You're becoming a real mathematics champion!"},
    {min:40,t:"📚 Nearly there! Keep training and you'll smash it next time!"},
    {min:0,t:"🤗 Every hero needs practice! You'll get them next time!"},
  ];
  const msg=msgs.find(m=>pct>=m.min).t;
  return <div className="anim-fi" style={{minHeight:'100vh',background:won?'linear-gradient(160deg,#07071a,#07180a)':'linear-gradient(160deg,#1a0000,#300000)',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Confetti active={won&&pct>=70}/>
    <div style={{maxWidth:'460px',width:'100%'}}>
      <div className="anim-pi" style={{background:'#12122a',borderRadius:'26px',border:`4px solid ${won?'#FFD700':'#FF4444'}`,boxShadow:`8px 8px 0 ${won?'#FFD700':'#FF4444'}`,padding:'24px',textAlign:'center'}}>

        <div style={{display:'flex',justifyContent:'center',gap:'20px',marginBottom:'8px',fontSize:'58px'}}>
          <div className={won?'anim-vi':'anim-sh'}>🦸</div>
          <div style={{display:'flex',alignItems:'center',fontSize:'26px'}}>{won?'🏆':'💪'}</div>
          <div className={won?'anim-bo':'anim-fl'}>{mission.vi}</div>
        </div>

        <h2 className="ff" style={{fontSize:'28px',color:won?'#FFD700':'#FF6B6B',margin:'0 0 4px',textShadow:`2px 2px 0 ${won?'#8B6914':'#8B0000'}`}}>
          {won?(pct===100?'🌟 PERFECT SCORE!!':'⚡ VILLAIN DEFEATED!'):'💪 Train Harder!'}
        </h2>
        <div className="fn" style={{fontSize:'14px',color:'#666',marginBottom:'16px'}}>
          {won?`${mission.vi} ${mission.villain} has been defeated!`:`${mission.vi} ${mission.villain} escaped... for now!`}
        </div>

        <div style={{fontSize:'30px',letterSpacing:'6px',marginBottom:'14px'}}>{'⭐'.repeat(stars3)}{'☆'.repeat(3-stars3)}</div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'14px'}}>
          {[{e:'✅',v:`${res.correct}/${res.total}`,l:'Correct',c:'#2ecc71'},{e:'🎯',v:`${pct}%`,l:'Accuracy',c:'#3498db'},{e:'⭐',v:`+${res.stars}`,l:'Stars',c:'#f39c12'}].map((s,i)=>
            <div key={i} style={{background:s.c+'14',border:`2px solid ${s.c}44`,borderRadius:'12px',padding:'10px 6px'}}>
              <div style={{fontSize:'18px'}}>{s.e}</div>
              <div className="ff" style={{fontSize:'20px',color:s.c}}>{s.v}</div>
              <div className="fn" style={{fontSize:'10px',color:'#666'}}>{s.l}</div>
            </div>
          )}
        </div>

        <div className="ff" style={{fontSize:'14px',color:won?'#FFD700':'#FF6B6B',background:won?'#1a1500':'#1a0000',padding:'10px 14px',borderRadius:'12px',marginBottom:'14px',lineHeight:1.5,border:`1px solid ${won?'#FFD70033':'#FF444433'}`}}>{msg}</div>

        {newBadges?.length>0&&<div className="anim-pi" style={{background:'#1a1500',border:'2px solid #FFD70066',borderRadius:'12px',padding:'12px',marginBottom:'14px'}}>
          <div className="ff" style={{fontSize:'15px',color:'#FFD700',marginBottom:'8px'}}>🏅 NEW BADGE{newBadges.length>1?'S':''} UNLOCKED!</div>
          {newBadges.map(b=><div key={b.id} className="fn" style={{fontSize:'13px',color:'#ccc',marginBottom:'3px'}}>{b.emoji} <strong>{b.name}</strong> — {b.desc}</div>)}
        </div>}

        <div style={{display:'flex',flexDirection:'column',gap:'9px'}}>
          {won&&nextMission&&<button className="comic-btn anim-gp" onClick={()=>{SFX.click();onNext();}}
            style={{width:'100%',padding:'14px',fontSize:'18px',background:'#FFD700',color:'#070718',border:'3px solid #111',borderRadius:'16px'}}>
            ➡️ Next: {nextMission.name}!
          </button>}
          <button className="comic-btn" onClick={()=>{SFX.click();onMap();}}
            style={{width:'100%',padding:'12px',fontSize:'16px',background:'#111',color:'#aaa',border:'3px solid #333',borderRadius:'14px'}}>
            🗺️ Mission Map
          </button>
        </div>
      </div>
    </div>
  </div>;
}

/* ================================================================
   TROPHY ROOM
   ================================================================ */
function TrophyRoom({playerName,stars,completed,badges,onBack}){
  useEffect(()=>SFX.star(),[]);
  return <div className="anim-fi" style={{minHeight:'100vh',background:'#07070f',padding:'16px'}}>
    <div style={{maxWidth:'500px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <button className="comic-btn" onClick={()=>{SFX.click();onBack();}} style={{padding:'8px 14px',fontSize:'13px',background:'#111',color:'#aaa',border:'2px solid #333'}}>← Back</button>
        <h1 className="ff" style={{color:'#FFD700',fontSize:'26px',textShadow:'2px 2px 0 #8B6914'}}>🏆 Trophy Room</h1>
      </div>

      <div style={{background:'#12122a',borderRadius:'22px',border:'3px solid #FFD700',boxShadow:'6px 6px 0 #FFD700',padding:'20px',marginBottom:'14px',textAlign:'center'}}>
        <div style={{fontSize:'70px',lineHeight:1}} className="anim-fl">🦸</div>
        <div className="ff" style={{fontSize:'26px',color:'#FFD700',textShadow:'2px 2px 0 #8B6914'}}>{playerName}</div>
        <div className="fn" style={{fontSize:'13px',color:'#555',marginBottom:'10px'}}>Math Superhero</div>
        <div className="ff" style={{fontSize:'36px',color:'#F39C12'}}>⭐ {stars}</div>
        <div className="fn" style={{fontSize:'12px',color:'#444'}}>{completed.length}/{ALL_MISSIONS.length} missions complete</div>
      </div>

      <div style={{background:'#12122a',borderRadius:'18px',border:'3px solid #222',boxShadow:'4px 4px 0 #222',padding:'16px',marginBottom:'12px'}}>
        <div className="ff" style={{fontSize:'17px',color:'#FFD700',marginBottom:'14px'}}>📊 World Progress</div>
        {WORLDS.map(w=>{
          const d=w.missions.filter(m=>completed.includes(m.id)).length;
          return <div key={w.id} style={{marginBottom:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
              <span className="ff" style={{fontSize:'14px',color:w.color}}>{w.emoji} {w.label}</span>
              <span className="fn" style={{fontSize:'12px',color:'#555'}}>{d}/5 {d===5?'✅':''}</span>
            </div>
            <div style={{height:'12px',background:'#0a0a0a',borderRadius:'6px',border:'1.5px solid #222',overflow:'hidden'}}>
              <div style={{height:'100%',background:w.color,borderRadius:'5px',width:`${(d/5)*100}%`,transition:'width .8s'}}/>
            </div>
          </div>;
        })}
      </div>

      <div style={{background:'#12122a',borderRadius:'18px',border:'3px solid #222',boxShadow:'4px 4px 0 #222',padding:'16px'}}>
        <div className="ff" style={{fontSize:'17px',color:'#FFD700',marginBottom:'12px'}}>🏅 Badges ({badges.length}/{BADGES.length})</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'9px'}}>
          {BADGES.map(b=>{
            const earned=badges.includes(b.id);
            return <div key={b.id} style={{background:earned?'#1a1500':'#0a0a0a',border:`2px solid ${earned?'#FFD700':'#1a1a1a'}`,borderRadius:'14px',padding:'12px',opacity:earned?1:.45,transition:'all .3s',boxShadow:earned?'2px 2px 0 #FFD70044':'none'}}>
              <div style={{fontSize:'28px'}}>{earned?b.emoji:'🔒'}</div>
              <div className="ff" style={{fontSize:'12px',color:earned?'#FFD700':'#333',marginTop:'3px'}}>{b.name}</div>
              <div className="fn" style={{fontSize:'10px',color:'#555',marginTop:'2px'}}>{b.desc}</div>
            </div>;
          })}
        </div>
      </div>
      <div style={{height:'20px'}}/>
    </div>
  </div>;
}

/* ================================================================
   ROOT APP
   ================================================================ */
export default function App(){
  const [screen,setScreen]=useState('welcome');
  const [name,setName]=useState('');
  const [stars,setStars]=useState(0);
  const [completed,setCompleted]=useState([]);
  const [badges,setBadges]=useState([]);
  const [mission,setMission]=useState(null);
  const [lastRes,setLastRes]=useState(null);
  const [newBadges,setNewBadges]=useState([]);

  function grantBadges(nc,ts,res,curBadges){
    const has=id=>curBadges.includes(id);
    const g=[];
    if(!has('first')&&nc.length>=1)g.push('first');
    if(!has('perfect')&&res?.correct===res?.total)g.push('perfect');
    if(!has('fire')&&res?.streak>=5)g.push('fire');
    if(!has('speed')&&res?.speedBonus)g.push('speed');
    if(!has('nohints')&&res&&!res.hadHint)g.push('nohints');
    if(!has('w1done')&&WORLDS[0].missions.every(m=>nc.includes(m.id)))g.push('w1done');
    if(!has('w2done')&&WORLDS[1].missions.every(m=>nc.includes(m.id)))g.push('w2done');
    if(!has('w3done')&&WORLDS[2].missions.every(m=>nc.includes(m.id)))g.push('w3done');
    if(!has('s100')&&ts>=100)g.push('s100');
    if(!has('s500')&&ts>=500)g.push('s500');
    if(!has('s1000')&&ts>=1000)g.push('s1000');
    return g;
  }

  function handleComplete(res){
    const won=res.villainHP<=0||res.correct>=res.total*.6;
    const nc=won&&!completed.includes(mission.id)?[...completed,mission.id]:completed;
    if(won&&!completed.includes(mission.id))setCompleted(nc);
    const ns=stars+res.stars;setStars(ns);
    const g=grantBadges(nc,ns,res,[...badges]);
    const nb=BADGES.filter(b=>g.includes(b.id));
    if(g.length>0){setBadges(b=>[...b,...g]);setNewBadges(nb);setTimeout(()=>SFX.badge(),400);}
    else setNewBadges([]);
    setLastRes(res);setScreen('results');
  }

  const getNext=()=>{if(!mission)return null;const idx=ALL_MISSIONS.findIndex(m=>m.id===mission.id);return idx<ALL_MISSIONS.length-1?ALL_MISSIONS[idx+1]:null;};
  const nextM=getNext();

  return <>
    <style>{G}</style>
    {screen==='welcome'&&<WelcomeScreen onStart={n=>{setName(n);setScreen('map');}}/>}
    {screen==='map'&&<MissionMap playerName={name} stars={stars} completed={completed} badges={badges} onMission={m=>{setMission(m);setScreen('briefing');}} onTrophy={()=>{SFX.click();setScreen('trophy');}}/>}
    {screen==='briefing'&&mission&&<Briefing mission={mission} onStart={()=>setScreen('playing')} onBack={()=>setScreen('map')}/>}
    {screen==='playing'&&mission&&<QuestionScreen key={mission.id+'_'+Date.now()} mission={mission} onComplete={handleComplete}/>}
    {screen==='results'&&lastRes&&<Results mission={mission} res={lastRes} onMap={()=>setScreen('map')} onNext={()=>{if(nextM){setMission(nextM);setScreen('briefing');}}} nextMission={nextM} newBadges={newBadges}/>}
    {screen==='trophy'&&<TrophyRoom playerName={name} stars={stars} completed={completed} badges={badges} onBack={()=>setScreen('map')}/>}
  </>;
}
