(() => {
  const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
  const scoreEl=document.getElementById('score'),bestEl=document.getElementById('best');
  const gridSize=20,cols=canvas.width/gridSize,rows=canvas.height/gridSize;
  let snake=[{x:6,y:8},{x:5,y:8},{x:4,y:8}],dir={x:1,y:0},nextDir={...dir},food=spawnFood(),running=false,score=0,speed=8,tick=null;
  let best=parseInt(localStorage.getItem('snake_best')||'0',10);bestEl.textContent=`Best: ${best}`;
  function draw(x,y,c){ctx.fillStyle=c;ctx.fillRect(x*gridSize+1,y*gridSize+1,gridSize-2,gridSize-2);}
  function clear(){ctx.clearRect(0,0,canvas.width,canvas.height);}
  function spawnFood(){while(1){let p={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};
    if(!snake.some(s=>s.x==p.x&&s.y==p.y))return p;}}
  function reset(){snake=[{x:6,y:8},{x:5,y:8},{x:4,y:8}];dir={x:1,y:0};nextDir={...dir};food=spawnFood();score=0;speed=8;
    scoreEl.textContent=`Score: ${score}`;running=true;}
  function gameOver(){running=false;clearInterval(tick);
    if(score>best){best=score;localStorage.setItem('snake_best',String(best));bestEl.textContent=`Best: ${best}`;}
    ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,canvas.height/2-30,canvas.width,60);
    ctx.fillStyle='#ff5555';ctx.font='24px sans-serif';ctx.textAlign='center';
    ctx.fillText('GAME OVER — Click Start',canvas.width/2,canvas.height/2+8);}
  function step(){if((nextDir.x!=-dir.x||nextDir.y!=-dir.y)||snake.length==1)dir={...nextDir};
    const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(head.x<0)head.x=cols-1;if(head.x>=cols)head.x=0;if(head.y<0)head.y=rows-1;if(head.y>=rows)head.y=0;
    if(snake.some(s=>s.x==head.x&&s.y==head.y)){gameOver();return;}
    snake.unshift(head);
    if(head.x==food.x&&head.y==food.y){score++;scoreEl.textContent=`Score: ${score}`;food=spawnFood();if(score%4==0){speed=Math.min(20,speed+1);restart();}}
    else snake.pop();
    clear();draw(food.x,food.y,'#16a34a');snake.forEach((s,i)=>draw(s.x,s.y,i? '#f97316':'#ef4444'));}
  function restart(){if(tick)clearInterval(tick);tick=setInterval(step,1000/speed);}
  window.addEventListener('keydown',e=>{if(!running&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){reset();restart();}
    if(e.key=='ArrowUp')nextDir={x:0,y:-1};if(e.key=='ArrowDown')nextDir={x:0,y:1};
    if(e.key=='ArrowLeft')nextDir={x:-1,y:0};if(e.key=='ArrowRight')nextDir={x:1,y:0};});
  ['up','down','left','right'].forEach(id=>document.getElementById(id).addEventListener('click',()=>{
    if(!running){reset();restart();}if(id=='up')nextDir={x:0,y:-1};if(id=='down')nextDir={x:0,y:1};
    if(id=='left')nextDir={x:-1,y:0};if(id=='right')nextDir={x:1,y:0};}));
  document.getElementById('start').addEventListener('click',()=>{reset();restart();});
  clear();ctx.fillStyle='#cbd5e1';ctx.font='16px sans-serif';ctx.textAlign='center';
  ctx.fillText('Click Start or use arrow keys',canvas.width/2,canvas.height/2);
})();