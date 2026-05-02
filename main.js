// ── NAV SCROLL (offsets for fixed 64px nav) ──
function navTo(id){
  const el=document.getElementById(id);
  if(!el)return;
  const top=el.getBoundingClientRect().top+window.scrollY-68;
  window.scrollTo({top,behavior:'smooth'});
}

// ── STARS ──
const sf = document.getElementById('stars');
for(let i=0;i<180;i++){
  const s=document.createElement('div');
  s.className='star';
  const sz=Math.random()*2+.4;
  s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--op:${Math.random()*.8+.15};--d:${Math.random()*5+2}s;--dl:${Math.random()*6}s`;
  sf.appendChild(s);
}
for(let i=0;i<3;i++){
  const sh=document.createElement('div');
  sh.className='shooting';
  sh.style.cssText=`top:${Math.random()*40+5}%;left:${Math.random()*30}%;animation-delay:${i*2.2}s`;
  sf.appendChild(sh);
}

// ── TIMELINE DATA ──
const tlData=[
  {year:'1959',icon:'https://upload.wikimedia.org/wikipedia/commons/c/cc/RIAN_archive_510848_Interplanetary_station_Luna_1_-_blacked.jpg',name:'Luna 1 — First to escape Earth',agency:'tag-soviet',agencyLabel:'USSR',desc:'The very first spacecraft to leave Earth\'s gravity and reach the Moon\'s neighbourhood. It flew past the Moon at 5,995 km and became the first human-made object to orbit the Sun.',facts:['Launched Jan 2, 1959','Speed: 11.17 km/s at launch','First heliocentric orbit']},
  {year:'1959',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Moon_landing_map.jpg/960px-Moon_landing_map.jpg',name:'Luna 3 — Far side revealed',agency:'tag-soviet',agencyLabel:'USSR',desc:'For billions of years, nobody had ever seen the far side of the Moon. Luna 3 changed everything, transmitting blurry but historic photographs showing mountain ranges and craters never seen before.',facts:['Oct 1959','Photographed 70% of far side','Discovered "Mare Moscoviense"']},
  {year:'1966',icon:'https://upload.wikimedia.org/wikipedia/commons/c/cc/RIAN_archive_510848_Interplanetary_station_Luna_1_-_blacked.jpg',name:'Luna 9 — First soft landing',agency:'tag-soviet',agencyLabel:'USSR',desc:'Humanity\'s first spacecraft to land gently on the Moon and survive. It proved the surface wasn\'t too soft to land on — a fear at the time — and sent back close-up photographs from the surface.',facts:['Feb 3, 1966','Oceanus Procellarum','Transmitted for 3 days']},
  {year:'1966',icon:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Surveyor_NASA_lunar_lander.jpg',name:'Surveyor 1 — America\'s pathfinder',agency:'tag-nasa',agencyLabel:'NASA',desc:'The first US spacecraft to soft-land on the Moon. It sent back over 11,000 images and tested the surface for the upcoming Apollo missions, proving the ground could support a lander\'s weight.',facts:['Jun 2, 1966','11,240 photographs','Surveyor 3 was visited by Apollo 12']},
  {year:'1968',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NASA-Apollo8-Dec24-Earthrise.jpg/960px-NASA-Apollo8-Dec24-Earthrise.jpg',name:'Apollo 8 — Earthrise',agency:'tag-nasa',agencyLabel:'NASA',desc:'The first humans to leave Earth\'s orbit and orbit another world. Frank Borman, Jim Lovell and Bill Anders orbited the Moon 10 times. Anders\' photograph "Earthrise" became one of the most influential photos ever taken.',facts:['Dec 1968','First crewed lunar orbit','10 orbits completed','Earthrise photo changed environmentalism']},
  {year:'1969',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/960px-Aldrin_Apollo_11_original.jpg',name:'Apollo 11 — One giant leap',agency:'tag-nasa',agencyLabel:'NASA',desc:'The mission that defined the 20th century. Neil Armstrong and Buzz Aldrin landed in the Sea of Tranquility on July 20, 1969. Armstrong\'s words — "one small step for man, one giant leap for mankind" — were heard by 600 million people.',facts:['Jul 20, 1969','Sea of Tranquility','Armstrong & Aldrin walked on Moon','21.5 kg samples returned']},
  {year:'1970',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Apollo_13-insignia.png/960px-Apollo_13-insignia.png',name:'Apollo 13 — Failure is not an option',agency:'tag-nasa',agencyLabel:'NASA',desc:'The mission that never landed — but became history\'s greatest space rescue. An oxygen tank exploded, crippling the spacecraft. The crew used the lunar module as a lifeboat and made it home safely after a harrowing 4-day journey.',facts:['Apr 1970','Oxygen tank exploded','Crew survived against odds','Greatest space rescue ever']},
  {year:'1970',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Soviet_moonrover.JPG/960px-Soviet_moonrover.JPG',name:'Luna 17 / Lunokhod 1 — First rover',agency:'tag-soviet',agencyLabel:'USSR',desc:'The world\'s first planetary rover! Lunokhod 1 (meaning "Moon Walker") trundled across the lunar surface for 10 months, covering 10.5 km and sending back thousands of photographs — operated remotely from Earth.',facts:['Nov 1970','Operated 10 months','10.5 km driven','First remote-controlled rover']},
  {year:'1972',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/960px-Aldrin_Apollo_11_original.jpg',name:'Apollo 17 — The last footprints',agency:'tag-nasa',agencyLabel:'NASA',desc:'As of today, the last time humans walked on the Moon. Gene Cernan was the final person to step off the lunar surface. The mission returned 110 kg of rocks — the largest haul of any Apollo flight. Cernan said: "We leave as we came, and God willing, as we shall return."',facts:['Dec 1972','110 kg samples returned','Last crewed lunar mission','Geologist Harrison Schmitt first scientist on Moon']},
  {year:'1994',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Clementine_lunar.jpg/960px-Clementine_lunar.jpg',name:'Clementine — Mapping everything',agency:'tag-nasa',agencyLabel:'NASA',desc:'A joint NASA/US Department of Defense mission that produced the first complete digital map of the Moon\'s surface. It also found hints of water ice in permanently shadowed polar craters — a huge discovery for future exploration.',facts:['1994','First complete Moon map','Water ice evidence','38 million photographs']},
  {year:'2008',icon:'https://upload.wikimedia.org/wikipedia/commons/f/fd/CY1_2007_%28cropped%29.jpg',name:'Chandrayaan-1 — Water on the Moon!',agency:'tag-isro',agencyLabel:'ISRO',desc:'India\'s very first lunar mission made one of the biggest Moon discoveries in decades — confirming the presence of water molecules across the lunar surface, including inside permanently shadowed polar craters. This changed everything for future Moon bases.',facts:['Oct 2008','Confirmed water on Moon','312 days in orbit','11 scientific payloads']},
  {year:'2013',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Yutu_rover.jpg/960px-Yutu_rover.jpg',name:'Chang\'e 3 / Yutu — China lands',agency:'tag-cnsa',agencyLabel:'CNSA',desc:'China became only the third country to soft-land a spacecraft on the Moon. The Yutu ("Jade Rabbit") rover roamed the surface for months, making China a major spacefaring nation and beginning a new era of lunar exploration.',facts:['Dec 2013','China\'s first soft landing','Jade Rabbit rover deployed','Mare Imbrium landing site']},
  {year:'2019',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ChangE-4_-_PCAM.png/960px-ChangE-4_-_PCAM.png',name:'Chang\'e 4 — The hidden face',agency:'tag-cnsa',agencyLabel:'CNSA',desc:'The first spacecraft ever to land on the far side of the Moon — the side permanently facing away from Earth. Because radio signals can\'t pass through the Moon, China used a relay satellite to communicate with the lander. The Yutu-2 rover is still operating!',facts:['Jan 2019','First far-side landing ever','Von Kármán Crater','Yutu-2 rover still active in 2024']},
  {year:'2023',icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Chandrayaan-3_%E2%80%93_Image_of_Vikram_lander_on_lunar_surface_taken_by_Pragyan_rover_navcam_at_1104_IST%2C_30_August_2023_from_15_meters_away_%28with_text%29.webp/960px-Chandrayaan-3_%E2%80%93_Image_of_Vikram_lander_on_lunar_surface_taken_by_Pragyan_rover_navcam_at_1104_IST%2C_30_August_2023_from_15_meters_away_%28with_text%29.webp.png',name:'Chandrayaan-3 — South pole triumph',agency:'tag-isro',agencyLabel:'ISRO',desc:'India\'s proudest space moment: becoming the first nation to land a spacecraft near the lunar south pole on August 23, 2023. The Vikram lander and Pragyan rover explored a region rich in water ice. India became only the fourth country to soft-land on the Moon.',facts:['Aug 23, 2023','First south pole landing','Pragyan rover deployed','4th nation to soft-land']},
];

const tlContainer=document.getElementById('tl-items');
tlData.forEach((m,i)=>{
  const el=document.createElement('div');
  el.className='tl-item';
  const content=`
    <div class="tl-year">${m.year}</div>
    <div class="tl-name">${m.name}</div>
    <span class="tl-agency ${m.agency}">${m.agencyLabel}</span>
    <div class="tl-desc">${m.desc}</div>
    <div class="tl-facts">${m.facts.map(f=>`<span class="tl-fact">${f}</span>`).join('')}</div>
  `;
  if(i%2===0){
    el.innerHTML=`<div class="tl-content">${content}</div><div class="tl-dot"><img src="${m.icon}" alt="Icon"></div><div class="tl-spacer"></div>`;
  }else{
    el.innerHTML=`<div class="tl-spacer"></div><div class="tl-dot"><img src="${m.icon}" alt="Icon"></div><div class="tl-content">${content}</div>`;
  }
  tlContainer.appendChild(el);
});

// ── MISSION CARDS DATA ──
const missions=[
  {
    era:'1959 – 1976 · Space Race Era',name:'Luna Programme',agency:'tag-soviet',agencyLabel:'USSR',
    desc:'24 missions by the Soviet Union — the first to fly past the Moon, photograph its far side, soft-land, return samples, and deploy a rover. The Luna programme blazed every trail.',
    tags:[{t:'First soft landing',c:'badge-success'},{t:'First rover',c:'badge-success'},{t:'Sample return',c:'badge-info'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Soviet_moonrover.JPG/960px-Soviet_moonrover.JPG'
  },
  {
    era:'1961 – 1972 · Apollo Era',name:'Apollo Programme',agency:'tag-nasa',agencyLabel:'NASA',
    desc:'The greatest adventure in human history. 17 missions, 6 successful landings, 12 astronauts walking on the Moon. No human achievement before or since has captured the world\'s imagination quite like Apollo.',
    tags:[{t:'6 crewed landings',c:'badge-success'},{t:'382 kg returned',c:'badge-info'},{t:'12 moonwalkers',c:'badge-warn'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/960px-Aldrin_Apollo_11_original.jpg'
  },
  {
    era:'1966 – 1968 · Surveyor Era',name:'Surveyor Programme',agency:'tag-nasa',agencyLabel:'NASA',
    desc:'Five robotic landers that scouted the Moon for Apollo. They proved the surface was safe to land on, photographed landing sites in detail, and even analysed soil chemistry.',
    tags:[{t:'Apollo pathfinder',c:'badge-info'},{t:'5 successful landers',c:'badge-success'},{t:'Surface analysis',c:'badge-info'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Surveyor_NASA_lunar_lander.jpg'
  },
  {
    era:'1994 – 1999 · Mapping Era',name:'Clementine & Lunar Prospector',agency:'tag-nasa',agencyLabel:'NASA',
    desc:'Two landmark orbiters that mapped the entire Moon and confirmed water ice at the poles. Lunar Prospector intentionally crashed into the south pole in 1999 to check for a water plume.',
    tags:[{t:'Complete Moon map',c:'badge-info'},{t:'Water ice confirmed',c:'badge-success'},{t:'Polar focus',c:'badge-info'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Clementine_lunar.jpg/960px-Clementine_lunar.jpg'
  },
  {
    era:'2003 – 2009 · New Nations Era',name:'SMART-1, Kaguya & Chandrayaan-1',agency:'tag-esa',agencyLabel:'ESA / JAXA / ISRO',
    desc:'Europe, Japan, and India all entered lunar exploration in the 2000s. SMART-1 tested solar-electric propulsion; Japan\'s Kaguya made a HD film of the Moon; India\'s Chandrayaan-1 discovered water.',
    tags:[{t:'3 new space agencies',c:'badge-warn'},{t:'Water discovered',c:'badge-success'},{t:'HD Moon video',c:'badge-info'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/f/fd/CY1_2007_%28cropped%29.jpg'
  },
  {
    era:'2013 – present · Chinese Era',name:'Chang\'e Programme',agency:'tag-cnsa',agencyLabel:'CNSA',
    desc:'China\'s ambitious multi-stage lunar programme. Chang\'e 3 soft-landed; Chang\'e 4 reached the far side (a world first); Chang\'e 5 returned 1.7 kg of samples in 2020 — the first sample return since 1976!',
    tags:[{t:'Far-side landing',c:'badge-success'},{t:'Sample return 2020',c:'badge-success'},{t:'Yutu-2 still active',c:'badge-warn'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Yutu_rover.jpg/960px-Yutu_rover.jpg'
  },
  {
    era:'2008 – 2023 · India\'s Story',name:'Chandrayaan Programme',agency:'tag-isro',agencyLabel:'ISRO',
    desc:'India\'s rise as a lunar power. Chandrayaan-1 discovered water (2008); Chandrayaan-2 orbited successfully though its lander crashed; Chandrayaan-3 nailed the south pole landing in 2023.',
    tags:[{t:'South pole landing',c:'badge-success'},{t:'Water discovered',c:'badge-success'},{t:'Budget mission',c:'badge-info'}],
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Chandrayaan-3_%E2%80%93_Image_of_Vikram_lander_on_lunar_surface_taken_by_Pragyan_rover_navcam_at_1104_IST%2C_30_August_2023_from_15_meters_away_%28with_text%29.webp/960px-Chandrayaan-3_%E2%80%93_Image_of_Vikram_lander_on_lunar_surface_taken_by_Pragyan_rover_navcam_at_1104_IST%2C_30_August_2023_from_15_meters_away_%28with_text%29.webp.png'
  },
  {
    era:'2025 onwards · Artemis Era',name:'Artemis Programme',agency:'tag-nasa',agencyLabel:'NASA',
    desc:'NASA\'s plan to return humans to the Moon — this time to stay. Artemis aims to land the first woman and first person of colour on the Moon, establish a lunar Gateway space station, and build a permanent south pole base.',
    tags:[{t:'First woman on Moon',c:'badge-warn'},{t:'Lunar Gateway planned',c:'badge-info'},{t:'South pole base',c:'badge-info'}],
    img:'artemis.jpg'
  },
];

const grid=document.getElementById('cards-grid');
missions.forEach(m=>{
  const card=document.createElement('div');
  card.className='m-card';
  card.innerHTML=`
    <div class="m-card-vis"><img src="${m.img}" alt="${m.name}" loading="lazy"></div>
    <div class="m-card-body">
      <div class="m-card-era">${m.era}</div>
      <div class="m-card-name">${m.name}</div>
      <span class="tl-agency ${m.agency}" style="display:inline-block;font-size:.68rem;font-weight:600;letter-spacing:.07em;padding:2px 8px;border-radius:20px;margin-bottom:10px;text-transform:uppercase;">${m.agencyLabel}</span>
      <div class="m-card-desc">${m.desc}</div>
      <div class="m-card-tags">${m.tags.map(t=>`<span class="badge ${t.c}">${t.t}</span>`).join('')}</div>
    </div>`;
  grid.appendChild(card);
  
  // ── 3D TILT EFFECT ──
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(1000px) rotateX(${-yPct * 6}deg) rotateY(${xPct * 6}deg) translateY(-5px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ── FACTS ──
const factsData=[
  {emoji:'🌑',color:'fc-blue',title:'The Moon is moving away',text:'The Moon drifts 3.8 cm farther from Earth every year. In about 600 million years, solar eclipses will no longer be possible because the Moon will appear too small.'},
  {emoji:'⏱️',color:'fc-gold',title:'One lunar day = one month',text:'The Moon rotates at the same speed it orbits Earth — so the same face always points toward us. A single day on the Moon lasts about 29.5 Earth days!'},
  {emoji:'💧',color:'fc-teal',title:'Ice at the poles',text:'Chandrayaan-1 and Lunar Prospector confirmed water ice hidden in permanently shadowed craters at both poles. This water could fuel future rockets as hydrogen and oxygen fuel.'},
  {emoji:'👟',color:'fc-coral',title:'Footprints for millions of years',text:'The Moon has no atmosphere, so there\'s no wind or rain. Neil Armstrong\'s footprints from 1969 will be perfectly preserved for at least 10 million years.'},
  {emoji:'🌊',color:'fc-lilac',title:'The Moon causes our tides',text:'The Moon\'s gravity pulls on Earth\'s oceans, creating high and low tides twice a day. Without the Moon, tides would still exist (caused by the Sun) but be much weaker.'},
  {emoji:'🎯',color:'fc-green',title:'Incredibly accurate landings',text:'Apollo 12 landed just 183 metres from the Surveyor 3 probe, which had been sitting there for 3 years. Astronaut Pete Conrad walked over and retrieved its camera!'},
  {emoji:'🧲',color:'fc-blue',title:'The Moon has almost no magnetism',text:'Earth has a strong magnetic field that protects us from solar radiation. The Moon has almost none, so future Moon colonists will need radiation shelters underground.'},
  {emoji:'🔊',color:'fc-gold',title:'Completely silent',text:'"In space, no one can hear you scream" — and on the Moon\'s surface, that\'s literally true. With no atmosphere, sound cannot travel. Astronauts could only communicate by radio.'},
  {emoji:'🪨',color:'fc-teal',title:'Moon rocks on Earth',text:'Scientists have identified 306 meteorites on Earth that originally came from the Moon — blasted off by asteroid impacts. You don\'t need to go to space to touch Moon rock!'},
  {emoji:'☀️',color:'fc-coral',title:'Extreme temperatures',text:'Without an atmosphere to hold heat, the Moon\'s surface swings from +127°C in sunlight to –173°C at night. That\'s a 300°C difference in one day!'},
  {emoji:'🌍',color:'fc-lilac',title:'The Moon stabilises Earth',text:'The Moon keeps Earth\'s axial tilt steady at ~23.5°. Without it, Earth\'s axis could wobble chaotically, causing wild climate swings that might prevent life as we know it.'},
  {emoji:'🚀',color:'fc-green',title:'Chandrayaan-3 cost less than a film',text:'India\'s Chandrayaan-3 mission cost about $75 million — less than the budget of many Hollywood blockbusters. This showed space exploration can be done efficiently.'},
];

const fg=document.getElementById('facts-grid');
factsData.forEach(f=>{
  const c=document.createElement('div');
  c.className=`fact-card ${f.color}`;
  c.innerHTML=`<span class="fact-emoji">${f.emoji}</span><div class="fact-title">${f.title}</div><div class="fact-text">${f.text}</div>`;
  fg.appendChild(c);
});

// ── QUIZ ──
const questions=[
  {q:'Who was the first human to walk on the Moon?',opts:['Buzz Aldrin','Yuri Gagarin','Neil Armstrong','Alan Shepard'],ans:2,explain:'Neil Armstrong stepped onto the Moon on July 20, 1969, at 02:56 UTC. His crewmate Buzz Aldrin followed about 20 minutes later. Yuri Gagarin was the first human in space (1961), and Alan Shepard was the first American in space.'},
  {q:'Which country\'s spacecraft first soft-landed on the Moon?',opts:['United States','Soviet Union','China','India'],ans:1,explain:'The Soviet Union\'s Luna 9 made the first successful soft landing on February 3, 1966. The USA\'s first soft landing was Surveyor 1, four months later in June 1966.'},
  {q:'What important discovery did India\'s Chandrayaan-1 make in 2008?',opts:['A new lunar crater','Water molecules on the Moon','An ancient lava tube','Evidence of life'],ans:1,explain:'Chandrayaan-1\'s Moon Mineralogy Mapper instrument confirmed the presence of water molecules and hydroxyl on the lunar surface — one of the most significant lunar discoveries in decades.'},
  {q:'Apollo 13 is famous for what reason?',opts:['First Moon landing','First Moon rover','A near-fatal oxygen tank explosion','The largest sample return'],ans:2,explain:'On April 13, 1970, an oxygen tank in Apollo 13\'s service module exploded, disabling power and life support. The crew used the lunar module as a lifeboat and returned safely — considered the greatest space rescue ever.'},
  {q:'Which mission made the first-ever landing on the Moon\'s far side?',opts:['Luna 9','Apollo 15','Chang\'e 4','Chandrayaan-3'],ans:2,explain:'China\'s Chang\'e 4 landed in the Von Kármán Crater on January 3, 2019 — the first spacecraft ever to land on the far side of the Moon. Because radio signals can\'t pass through the Moon, a relay satellite called Queqiao was used to communicate.'},
  {q:'How many astronauts have walked on the Moon (as of 2024)?',opts:['6','12','8','18'],ans:1,explain:'Twelve astronauts walked on the Moon during six successful Apollo landings (Apollo 11, 12, 14, 15, 16, and 17) between 1969 and 1972. The last person to walk on the Moon was Gene Cernan in December 1972.'},
];

let qIdx=0,score=0,answered=false;
function startQuiz(){
  qIdx=0;score=0;answered=false;
  document.getElementById('quiz-main').style.display='block';
  document.getElementById('quiz-score').style.display='none';
  loadQ();
}
function loadQ(){
  answered=false;
  const q=questions[qIdx];
  document.getElementById('qbar').style.width=(qIdx/questions.length*100)+'%';
  document.getElementById('q-text').textContent=(qIdx+1)+'. '+q.q;
  const opts=document.getElementById('q-opts');
  opts.innerHTML='';
  q.opts.forEach((o,i)=>{
    const b=document.createElement('button');
    b.className='quiz-opt';b.textContent=o;
    b.onclick=()=>answer(i);
    opts.appendChild(b);
  });
  document.getElementById('q-feedback').className='quiz-feedback';
  document.getElementById('q-feedback').textContent='';
  document.getElementById('q-next').style.display='none';
}
function answer(i){
  if(answered)return;
  answered=true;
  const q=questions[qIdx];
  const btns=document.querySelectorAll('.quiz-opt');
  btns.forEach((b,j)=>{b.disabled=true;if(j===q.ans)b.classList.add('correct');});
  const fb=document.getElementById('q-feedback');
  if(i===q.ans){
    score++;btns[i].classList.add('correct');
    fb.className='quiz-feedback qf-correct show';
    fb.innerHTML='✓ Correct! '+q.explain;
  }else{
    btns[i].classList.add('wrong');
    fb.className='quiz-feedback qf-wrong show';
    fb.innerHTML='✗ Not quite. '+q.explain;
  }
  document.getElementById('q-next').style.display='inline-block';
}
function nextQ(){
  qIdx++;
  if(qIdx>=questions.length){
    document.getElementById('qbar').style.width='100%';
    document.getElementById('quiz-main').style.display='none';
    const sc=document.getElementById('quiz-score');
    sc.style.display='block';
    document.getElementById('score-n').textContent=score+'/'+questions.length;
    const msgs=['Keep exploring — the Moon has more secrets!','Good effort — you\'re a budding astronaut!','Great score — you know your missions!','Excellent! Mission Control would be proud!','Perfect! You\'re ready to go to the Moon! 🌕'];
    const idx=Math.min(Math.floor(score/(questions.length/msgs.length)),msgs.length-1);
    document.getElementById('score-lbl').textContent=msgs[idx];
    
    if(score === questions.length) {
      triggerStarburst();
    }
  }else{loadQ();}
}

function triggerStarburst() {
  for(let i=0; i<60; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; width:6px; height:6px; 
      background:${['#ffd54f','#5bb8ff','#4eff9a','#ff6b45'][Math.floor(Math.random()*4)]};
      left:50%; top:50%; z-index:9999; border-radius:50%;
      pointer-events:none;
      transition: transform 1.2s cubic-bezier(0,.9,.1,1), opacity 1.2s;
    `;
    document.body.appendChild(c);
    
    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 150 + Math.random() * 300;
      c.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`;
      c.style.opacity = '0';
    });
    
    setTimeout(() => c.remove(), 1200);
  }
}

startQuiz();

// ── SCROLL REVEAL ──
// ── SCROLL REVEAL ──
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('revealed');
      observer.unobserve(e.target); // Only animate once
    }
  });
},{threshold:.1});
document.querySelectorAll('.m-card,.fact-card,.tl-item').forEach(el=>{
  el.classList.add('reveal-prep');
  observer.observe(el);
});

// ── L.U.N.A — Lunar Universal Navigation Assistant ──
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

let aiListening = false;
let lunaGreeted = false;
const aiBtn = document.getElementById('ai-mic-btn');
const aiTerminal = document.getElementById('ai-terminal');
const aiLog = document.getElementById('ai-log');

function toggleAI() {
  if (!recognition) {
    alert("L.U.N.A requires Google Chrome for voice recognition. Please open in Chrome.");
    return;
  }
  
  if (aiListening) {
    recognition.stop();
  } else {
    recognition.start();
    aiBtn.classList.add('listening');
    aiTerminal.classList.add('show');
    aiTerminal.classList.remove('minimized');
    aiListening = true;
    
    if (!lunaGreeted) {
      lunaGreeted = true;
      const greet = "Hello! I'm L.U.N.A — your Lunar Universal Navigation Assistant. Ask me anything about the Moon, Apollo missions, or space exploration!";
      setTimeout(() => {
        addAiMsg(greet, 'bot');
        speakText(greet);
      }, 300);
    }
    
    // Stop any current speech
    if('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
}

function toggleMinimizeAI() {
  const terminal = document.getElementById('ai-terminal');
  const btn = document.querySelector('.ai-minimize-btn');
  const isMinimized = terminal.classList.toggle('minimized');
  btn.innerHTML = isMinimized ? '&#9633;' : '&#8211;'; // □ expand / – minimize
  btn.title = isMinimized ? 'Expand' : 'Minimize';
}

if (recognition) {
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    addAiMsg(transcript, 'user');
    processLocalQuery(transcript);
  };
  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    aiBtn.classList.remove('listening');
    aiListening = false;
    if (event.error !== 'no-speech') {
      addAiMsg("Error capturing speech.", 'bot');
    }
  };
  recognition.onend = () => {
    aiBtn.classList.remove('listening');
    aiListening = false;
  };
}

function addAiMsg(text, sender) {
  const m = document.createElement('div');
  m.className = `ai-msg ${sender}`;
  m.textContent = text;
  aiLog.appendChild(m);
  aiLog.scrollTop = aiLog.scrollHeight;
  return m;
}

const moonKnowledge = [
  { keywords: ["apollo 11", "armstrong", "aldrin", "who", "man on the moon", "moonwalk", "1969", "first human", "stepped", "one giant leap", "first to land", "first landing", "first mission"], fact: "Apollo 11 was the first mission to land humans on the Moon in 1969. Neil Armstrong and Buzz Aldrin were the first to walk on its surface!" },
  { keywords: ["how far", "distance", "away", "earth to moon", "km", "384,400", "long way", "reach"], fact: "The Moon is about 384,400 kilometers away from Earth. You could actually fit all the other planets in the solar system in the space between us!" },
  { keywords: ["temperature", "hot", "cold", "weather", "degree", "celsius", "fahrenheit", "heat", "freeze", "climate"], fact: "The Moon has extreme temperatures! It can get as hot as 127 degrees Celsius during the day and as cold as minus 173 degrees Celsius at night." },
  { keywords: ["water", "ice", "drink", "h2o", "frozen", "liquid", "hydration"], fact: "Yes, there is water on the Moon! It's frozen as ice in deep, permanently shadowed craters near the lunar poles." },
  { keywords: ["gravity", "jump", "float", "weigh", "weightless", "one sixth", "light", "heavy"], fact: "The Moon's gravity is only one-sixth as strong as Earth's. If you weigh 60 kilograms on Earth, you'd only weigh 10 kilograms on the Moon!" },
  { keywords: ["how old", "age", "formed", "created", "birthday", "origin", "billion", "history"], fact: "The Moon is about 4.5 billion years old. Scientists believe it was formed from the debris left over after a Mars-sized body crashed into Earth." },
  { keywords: ["dark side", "far side", "one side", "face", "side", "hidden side", "back side", "view"], fact: "There isn't actually a 'dark side' of the Moon! Both sides receive sunlight. We just call it the 'far side' because we always see the same face from Earth." },
  { keywords: ["atmosphere", "air", "breathe", "wind", "sky", "oxygen", "vacuum", "space", "clouds"], fact: "The Moon has almost no atmosphere. That's why there is no weather, no wind, and why the sky is always black, even during the day!" },
  { keywords: ["cheese", "made of", "rock", "dust", "material"], fact: "Despite the old myths, the Moon is definitely not made of cheese! It's mostly made of rock, dust, and metals like iron and titanium." },
  { keywords: ["eclipse", "solar", "block", "shadow", "sun", "alignment"], fact: "A solar eclipse happens when the Moon passes perfectly between the Earth and the Sun, temporarily blocking the Sun's light from reaching us!" },
  { keywords: ["apollo 13", "movie", "accident", "failed", "explosion", "oxygen tank", "rescue", "safety"], fact: "Apollo 13 never landed on the Moon. An oxygen tank exploded on the way there, but the crew famously used the Lunar Module as a lifeboat and safely returned to Earth." },
  { keywords: ["how many", "astronauts", "people", "walked", "total", "visited", "crewed", "landing"], fact: "A total of 12 people have walked on the Moon. They were all American astronauts as part of the Apollo missions between 1969 and 1972." },
  { keywords: ["golf", "sports", "played", "shepard", "club", "ball"], fact: "In 1971, Apollo 14 astronaut Alan Shepard hit two golf balls on the Moon using a makeshift golf club. Due to the low gravity, they flew for miles!" },
  { keywords: ["flag", "blow", "waving", "usa flag", "american flag", "stiff"], fact: "The American flags planted on the Moon appear to be waving, but that's just because they have a horizontal rod sewn in to hold them out, since there is no wind to fly them!" },
  { keywords: ["craters", "holes", "spots", "impact", "asteroids", "surface"], fact: "The Moon is covered in craters because it has no atmosphere to burn up incoming meteoroids, and no weather to wash the impact marks away." },
  { keywords: ["size", "how big", "large", "width", "diameter", "small"], fact: "The Moon is about one-quarter the size of Earth. If Earth were the size of a nickel, the Moon would be about as big as a coffee bean." },
  { keywords: ["color", "grey", "gray", "tint", "brown", "orange", "look"], fact: "Looking closely, the Moon's surface isn't entirely grey! The Apollo astronauts noted that some of the soil had a distinctly brownish and even orange tint." },
  { keywords: ["quakes", "earthquake", "shake", "vibration", "ringing", "seismic"], fact: "The Moon actually experiences 'moonquakes'. They are caused by the gravitational pull of the Earth and can last up to 10 minutes!" },
  { keywords: ["dust", "smell", "dirt", "gunpowder", "sticky", "soil"], fact: "Apollo astronauts reported that Moon dust is extremely clingy and smells exactly like spent gunpowder!" },
  { keywords: ["future", "return", "artemis", "going back", "next mission", "colony", "base"], fact: "NASA's Artemis program plans to return humans to the Moon this decade, including landing the first woman and the first person of color on the lunar surface!" },
  { keywords: ["phases", "crescent", "full moon", "new moon", "waxing", "waning", "shape"], fact: "The phases of the Moon, like crescent or full moon, are caused by the angle of sunlight hitting the Moon as it orbits the Earth." },
  { keywords: ["tide", "ocean", "waves", "water level", "beach", "gravity", "sea"], fact: "The Moon's gravity pulls on Earth's oceans, which is the main cause of the high and low tides we see at the beach every day!" },
  { keywords: ["time", "day", "orbit", "spin", "rotation", "29.5 days", "27.3 days"], fact: "It takes the Moon 27.3 days to orbit the Earth, but because the Earth is also moving around the Sun, a full lunar day actually lasts about 29.5 Earth days!" },
  { keywords: ["computer", "code", "software", "memory", "ram", "rom", "power", "tech"], fact: "The Apollo Guidance Computer had less computing power than a modern digital watch! It only had about 72 kilobytes of ROM and 4 kilobytes of RAM." },
  { keywords: ["rover", "car", "drive", "vehicle", "electric car", "wheels", "parked"], fact: "Astronauts drove a special electric car called the Lunar Roving Vehicle during the final three Apollo missions. All three rovers are still parked on the Moon today!" },
  { keywords: ["spacesuit", "suit", "clothes", "wear", "helmet", "protection", "vacuum"], fact: "The Apollo spacesuits were custom-made and incredibly complex. They had to protect the astronauts from extreme temperatures, micrometeoroids, and a complete vacuum." },
  { keywords: ["trash", "garbage", "left behind", "waste", "probes", "landfill", "humans left"], fact: "Humans have left nearly 200,000 kilograms of man-made material on the Moon, including crashed probes, rovers, tools, and even bags of astronaut waste." },
  { keywords: ["mirror", "laser", "reflect", "retroreflector", "measure", "accurate"], fact: "Apollo astronauts left special retroreflectors (mirrors) on the Moon. Scientists on Earth still shoot lasers at them today to measure the exact distance to the Moon!" },
  { keywords: ["animals", "dog", "laika", "first dog", "dog in space", "monkey", "turtle", "tortoise", "pet", "creature", "living thing"], fact: "While Laika was the first dog in space (1957), she only orbited Earth. The first animals to actually travel around the Moon were two tortoises on the Soviet Zond 5 mission in 1968 — they returned to Earth safely!" },
  { keywords: ["speed", "fast", "velocity", "travel", "km/h", "orbit speed"], fact: "The Moon travels around the Earth at an average speed of about 3,683 kilometers per hour." },
  { keywords: ["shape", "round", "circle", "lemon", "egg", "sphere"], fact: "The Moon isn't a perfect sphere! It's actually shaped slightly like an egg or a lemon, with the larger end pointing towards Earth." },
  { keywords: ["what is", "definition", "satellite", "what is the moon", "rocky world"], fact: "The Moon is Earth's only natural satellite. It is a rocky, dusty world about one-quarter the size of Earth, and it plays a vital role in stabilising our planet's wobble and creating tides!" },
  { keywords: ["core", "inside", "center", "iron", "nickel", "interior"], fact: "Just like Earth, the Moon has a dense metallic core, mostly made of iron and some nickel, but it is much smaller relative to its total size." },
  { keywords: ["plants", "grow", "seeds", "tree", "plant", "cotton", "biology"], fact: "In 2019, China's Chang'e 4 mission successfully sprouted a cotton seed on the far side of the Moon, marking the first time any biological matter has grown on another world!" },
  { keywords: ["how heavy", "mass", "weight", "kg", "sextillion", "heavy", "mass of moon"], fact: "The Moon's mass is about 73.5 sextillion kilograms. That means it would take about 81 Moons to equal the mass of a single Earth!" },
  { keywords: ["maria", "seas", "oceans", "dark spots", "solidified lava", "plains"], fact: "The large dark patches on the Moon are called 'Maria' (Latin for seas). Early astronomers thought they were oceans, but they are actually vast plains of solidified lava." },
  { keywords: ["volcano", "eruption", "lava", "active", "magma"], fact: "Billions of years ago, the Moon had active volcanoes! The dark 'seas' you see on its surface were created by massive lava flows cooling down." },
  { keywords: ["name", "called", "luna", "meaning", "latin"], fact: "Our moon doesn't have a specific name other than 'The Moon', but its Latin name is 'Luna', which is where we get the word 'lunar'." },
  { keywords: ["magnetic", "compass", "magnetism", "poles", "north pole"], fact: "Unlike Earth, the Moon no longer has a global magnetic field, meaning a regular compass wouldn't work at all if you were standing on its surface!" },

  // === EXTENDED KNOWLEDGE BANK ===
  { keywords: ["chandrayaan", "india", "vikram", "pragyan", "isro", "south pole"], fact: "India's Chandrayaan-3 made history on August 23, 2023 by becoming the first mission to land near the lunar south pole — a region full of permanently shadowed craters that may hold billions of tonnes of water ice!" },
  { keywords: ["luna", "soviet", "lunokhod", "ussr", "russia", "robot"], fact: "The Soviet Union's Luna programme was remarkable. Luna 16 (1970) was the first robotic mission to collect Moon samples and return them to Earth automatically — no astronauts needed!" },
  { keywords: ["armstrong", "step", "quote", "words", "said", "neil", "famous words"], fact: "Neil Armstrong's famous words — 'That's one small step for man, one giant leap for mankind' — were heard live by an estimated 600 million people around the world on July 20, 1969!" },
  { keywords: ["cernan", "last", "final", "goodbye", "1972", "gene"], fact: "The last words spoken on the Moon were by Gene Cernan of Apollo 17 in 1972: 'We leave as we came, and God willing, as we shall return, with peace and hope for all mankind.'" },
  { keywords: ["sun", "star", "light", "radiation", "filter", "uv"], fact: "Without an atmosphere to filter it, the Moon is bombarded directly by solar radiation. Astronauts on the surface are exposed to levels of radiation roughly 200 times higher than on Earth!" },
  { keywords: ["sound", "music", "hear", "noise", "radio", "interference"], fact: "In 1969, the Apollo 10 crew reported hearing a mysterious 'outer space-type music' on the far side of the Moon. Scientists later concluded it was likely radio interference between their two spacecraft!" },
  { keywords: ["sleep", "rest", "tired", "night", "bed", "hammock"], fact: "Sleeping on the Moon was tricky for Apollo astronauts! They had to sleep in their spacesuits and helmets inside the cramped lunar module, dealing with uncomfortable temperatures and excitement!" },
  { keywords: ["food", "eat", "meal", "drink", "pouches", "freeze-dried", "ice cream"], fact: "Apollo astronauts ate specially prepared food from sealed pouches — think freeze-dried ice cream and bite-sized cubes. Crumbs in a spacecraft can be dangerous, potentially floating into instruments!" },
  { keywords: ["cost", "money", "expensive", "budget", "dollar", "billion"], fact: "The Apollo programme cost about $25.4 billion at the time — roughly $150 billion in today's money. Yet it created technologies we still use daily, including memory foam, scratch-resistant lenses, and GPS!" },
  { keywords: ["gateway", "space station", "orbit", "base camp", "pit stop"], fact: "NASA is building a small space station called the Lunar Gateway that will orbit the Moon. It will act as a pit stop and command centre for future crewed missions to the surface!" },
  { keywords: ["neil", "buzz", "michael", "collins", "apollo 11 crew", "three members"], fact: "The Apollo 11 crew had three members: Neil Armstrong and Buzz Aldrin landed on the Moon, while Michael Collins heroically orbited alone above for 21 hours, never losing sight of the mission!" },
  { keywords: ["earth", "blue", "view", "see", "look", "fragile", "beautiful"], fact: "From the Moon, the Earth looks about 4 times bigger than the Moon does from Earth! Early astronauts were struck by how fragile and beautiful Earth looked floating alone in dark space." },
  { keywords: ["birthday", "age", "younger", "older", "ancient", "oldest"], fact: "The Moon rocks returned by Apollo missions are some of the oldest objects ever studied — some are over 4 billion years old, pre-dating nearly all rock formations on Earth's surface!" },
  { keywords: ["mineral", "helium", "resource", "mine", "mining", "valuable"], fact: "The Moon is rich in Helium-3, an extremely rare isotope on Earth that could potentially fuel future nuclear fusion reactors. Some scientists believe it could be the most valuable resource in the solar system!" },
  { keywords: ["crater", "tycho", "copernicus", "biggest", "largest", "basin"], fact: "The South Pole-Aitken Basin on the Moon's far side is one of the largest known impact craters in the solar system — about 2,500 km wide and 8 km deep. It was formed over 4 billion years ago!" },
  { keywords: ["distance", "drifting", "moving away", "farther", "3.8 cm"], fact: "The Moon is slowly drifting away from Earth at a rate of 3.8 cm per year. Billions of years ago, the Moon was much closer and would have appeared 3 times larger in the sky!" },
  { keywords: ["supermoon", "big", "closer", "perigee", "bright"], fact: "A 'Supermoon' happens when the Moon is at its closest point to Earth in its elliptical orbit (perigee). It can appear up to 14% bigger and 30% brighter than a normal full moon!" },
  { keywords: ["total lunar eclipse", "blood moon", "red", "orange", "shadow"], fact: "During a total lunar eclipse, the Moon turns a deep red or orange colour. This 'Blood Moon' effect happens because Earth's atmosphere bends red sunlight into the shadow, painting the Moon!" },
  { keywords: ["oxygen", "breathe", "survive", "live", "extract", "soil"], fact: "There is actually oxygen locked inside the Moon's rocks and soil, but it is chemically bound and cannot be breathed. Future colonists could potentially extract it to create breathable air!" },
  { keywords: ["moon base", "colony", "live", "human settlement", "south pole base"], fact: "Scientists believe the lunar south pole is the best location for a future Moon base — it has near-permanent sunlight for solar power, and nearby craters hold water ice that could be converted to drinking water and rocket fuel!" }
];

const fallbackFacts = [
  "I don't have that exact data in my offline databanks, but did you know the Moon is drifting away from Earth by 3.8 centimeters every year?",
  "That's outside my current mission parameters! But here's a fact: The footprints left by the Apollo astronauts will likely stay there for millions of years!",
  "My local sensors can't answer that. However, did you know that a single day on the Moon lasts about 29.5 Earth days?",
  "I'm not sure about that. But consider this: Moonquakes actually cause the Moon to ring like a bell!"
];

function processLocalQuery(query) {
  const loader = addAiMsg("Processing...", 'bot');
  const lowerQuery = query.toLowerCase().trim().replace(/[?.,!]/g, '');
  const queryWords = lowerQuery.split(/\s+/);
  
  let bestMatch = null;
  let highestScore = 0;

  for (const item of moonKnowledge) {
    let score = 0;
    for (const kw of item.keywords) {
      const lowerKw = kw.toLowerCase();
      if (lowerQuery === lowerKw) {
        score += 500; // Total match
      } else if (lowerQuery.includes(lowerKw)) {
        // Prefer longer/more specific keywords
        score += lowerKw.length * 5;
        // Boost if the keyword is a standalone word in the query
        if (queryWords.includes(lowerKw)) score += 20;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }
  
  let answer = bestMatch ? bestMatch.fact : "";
  
  if (!answer || highestScore < 5) {
    answer = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
  
  // Simulate processing delay
  setTimeout(() => {
    loader.textContent = answer;
    speakText(answer);
  }, 800);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  
  // Prioritize premium/high-quality female voices for a more 'AI assistant' feel
  const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google UK English Female') || v.name.includes('Victoria') || (v.lang.startsWith('en') && v.name.includes('Female')));
  
  if (preferredVoice) utterance.voice = preferredVoice;
  
  utterance.rate = 1.0;  // Standard speed for clarity
  utterance.pitch = 1.1; // Slightly higher pitch for a crisp, digital assistant feel
  utterance.volume = 1.0;
  
  window.speechSynthesis.speak(utterance);
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ── L.U.N.A FAQ LOGIC ──
const faqs = [
  "What is the Moon?",
  "How far is the Moon?",
  "How heavy is it?",
  "Who was the first person?",
  "First dog in space?",
  "Is there water on the Moon?",
  "What is the temperature?",
  "Why do we only see one side?",
  "What is Artemis?"
];

function initFaqs() {
  const faqList = document.getElementById('ai-faq-list');
  if (!faqList) return;
  faqList.innerHTML = '';
  faqs.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'ai-faq-btn';
    btn.textContent = q;
    btn.onclick = () => {
      addAiMsg(q, 'user');
      processLocalQuery(q);
    };
    faqList.appendChild(btn);
  });
}

// Initialise FAQs on load
initFaqs();

