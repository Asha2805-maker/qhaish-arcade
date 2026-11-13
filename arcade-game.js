(() => {
  const canvas = document.querySelector('#arcade-game'), ctx = canvas.getContext('2d');
  const stick = document.querySelector('#arcade-stick'), jumpButton = document.querySelector('#arcade-jump');
  const resetButton = document.querySelector('#arcade-reset'), score = document.querySelector('#arcade-score');
  const coinButton = document.querySelector('#arcade-coin');
  const coinPrompt = document.querySelector('#coin-prompt');
  let started = false;
  const keys = new Set(), ledges = [{x:0,y:218,w:320},{x:91,y:167,w:74},{x:209,y:117,w:79}];
  let bunny, carrots, won, pointer = null, direction = 0, last = 0, visible = true;
  function reset() {
    bunny = {x:27,y:196,vy:0,grounded:true};
    carrots = [{x:61,y:201},{x:128,y:150},{x:248,y:100}];
    won = false; release(); score.textContent = started ? 'Carrots: 0 / 3' : 'Ready for a virtual coin.'; draw();
  }
  function release() {keys.clear(); direction = 0; pointer = null; stick.style.setProperty('--stick-x','0px'); stick.style.setProperty('--stick-y','0px');}
  function jump() { if (started && bunny.grounded && !won) {bunny.vy=-295; bunny.grounded=false;} }
  function focusGame() {canvas.focus({preventScroll:true});}
  coinButton.addEventListener('click', () => {
    if (started) return;
    started = true;
    coinPrompt.hidden = true;
    jumpButton.disabled = false;
    resetButton.disabled = false;
    canvas.tabIndex = 0;
    stick.tabIndex = 0;
    stick.removeAttribute('aria-disabled');
    reset();
    focusGame();
  });

  function moveStick(e) {
    const r=stick.getBoundingClientRect();
    let dx=e.clientX-r.left-r.width/2, dy=e.clientY-r.top-r.height/2;
    const distance=Math.hypot(dx,dy), scale=distance>22?22/distance:1;
    dx*=scale;dy*=scale;
    direction=Math.abs(dx)<5?0:dx/22;
    stick.style.setProperty('--stick-x',dx+'px');stick.style.setProperty('--stick-y',dy+'px');
  }
  stick.addEventListener('pointerdown',e=>{if(!started || pointer!==null)return;e.preventDefault();focusGame();pointer=e.pointerId;stick.setPointerCapture(pointer);moveStick(e);});
  stick.addEventListener('pointermove',e=>{if(e.pointerId===pointer)moveStick(e);});
  ['pointerup','pointercancel','lostpointercapture'].forEach(name=>stick.addEventListener(name,e=>{if(e.pointerId===pointer)release();}));
  jumpButton.addEventListener('pointerdown',e=>{e.preventDefault();focusGame();jump();});
  jumpButton.addEventListener('click',e=>{if(e.detail===0)jump();});
  resetButton.addEventListener('click',()=>{reset();focusGame();});
  const gameKeys=['ArrowLeft','ArrowRight',' ','a','d','r'];
  document.querySelector('.arcade').addEventListener('keydown',e=>{
    const k=e.key.length===1?e.key.toLowerCase():e.key;
    if(!started || !gameKeys.includes(k) || ((e.target===jumpButton||e.target===resetButton)&&k===' '))return;
    e.preventDefault(); keys.add(k); if(!e.repeat && k===' ')jump(); if(k==='r')reset();
  });
  window.addEventListener('keyup',e=>keys.delete(e.key.length===1?e.key.toLowerCase():e.key));
  window.addEventListener('blur',release);
  document.querySelector('.arcade').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget))release();});
  document.addEventListener('visibilitychange',()=>{release();last=0;});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)release();last=0;}).observe(canvas);
  function update(dt) {
    if(!started || won)return;
    const dx=direction || ((keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('a')?1:0));
    bunny.x=Math.max(0,Math.min(304,bunny.x+dx*110*dt));
    const bottom=bunny.y+22; bunny.vy+=700*dt; bunny.y+=bunny.vy*dt; bunny.grounded=false;
    for(const p of ledges) if(bunny.vy>=0 && bottom<=p.y+.1 && bunny.y+22>=p.y && bunny.x+16>p.x && bunny.x<p.x+p.w) {
      bunny.y=p.y-22;bunny.vy=0;bunny.grounded=true;break;
    }
    const before=carrots.length;
    carrots=carrots.filter(c=>!(bunny.x+16>c.x-5 && bunny.x<c.x+6 && bunny.y+22>c.y-8 && bunny.y<c.y+9));
    if(carrots.length!==before) {
      won=carrots.length===0;
      score.textContent=won?'All 3 carrots collected! Press Reset to play again.':`Carrots: ${3-carrots.length} / 3`;
    }
  }
  function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
  function draw() {
    rect(0,0,320,240,'#bde8d1');
    rect(27,45,54,12,'#e9fff0');rect(38,37,30,12,'#e9fff0');rect(209,56,65,11,'#e9fff0');
    ctx.fillStyle='#38614f';ctx.font='bold 12px monospace';ctx.fillText('CARROT HOP',12,20);ctx.fillText(`${3-carrots.length}/3`,278,20);
    for(const p of ledges){rect(p.x,p.y,p.w,12,'#8b664e');rect(p.x,p.y,p.w,5,'#5b9d62');}
    for(const c of carrots){rect(c.x-4,c.y-5,9,9,'#f58b35');rect(c.x-2,c.y+4,5,5,'#e77327');rect(c.x,c.y-10,3,6,'#41985a');rect(c.x-4,c.y-11,3,5,'#41985a');}
    const x=bunny.x,y=bunny.y;rect(x+1,y,5,10,'#fff8ef');rect(x+10,y,5,10,'#fff8ef');rect(x+2,y+2,2,5,'#ecb4cb');rect(x+11,y+2,2,5,'#ecb4cb');rect(x,y+8,16,13,'#fff8ef');rect(x-2,y+18,7,4,'#fff8ef');rect(x+11,y+18,7,4,'#fff8ef');rect(x+3,y+12,2,3,'#574469');rect(x+11,y+12,2,3,'#574469');rect(x+7,y+16,3,2,'#d58eae');
    if(won){rect(37,69,246,68,'#49345e');ctx.fillStyle='#fff8ef';ctx.textAlign='center';ctx.font='bold 17px monospace';ctx.fillText('CARROT CHAMPION!',160,97);ctx.font='12px monospace';ctx.fillText('Press RESET to hop again',160,119);ctx.textAlign='left';}
    canvas.dataset.carrots=String(3-carrots.length); canvas.dataset.bunnyX=String(Math.round(bunny.x));canvas.dataset.bunnyY=String(Math.round(bunny.y));
  }
  function frame(t){const dt=last?Math.min((t-last)/1000,.025):0;last=t;if(visible&&!document.hidden){update(dt);draw();}requestAnimationFrame(frame);}
  reset();requestAnimationFrame(frame);
})();
