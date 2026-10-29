// Demo tabs, waitlist form (saved in localStorage) and theme toggle
var $=function(s){return document.querySelector(s)};
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function show(i){
 var p=P[i];document.querySelectorAll('.tab').forEach(function(b,k){b.setAttribute('aria-pressed',k===i)});
 $('#prof').innerHTML='<b>'+p.n+'</b> · '+p.u+'<div class="meta">'+p.m+' · '+p.y+' · '+p.l+'</div><div style="margin-top:8px">'+p.s.map(function(x){return '<span class="pill ok">'+x+'</span>'}).join('')+'</div>';
 var box=$('#jobs');box.innerHTML='';
 p.j.forEach(function(j){
  var c=el('div','card job');
  c.innerHTML='<div class="av">'+j[1]+'</div><div><b>'+j[0]+'</b> <span class="pill ok">Verified</span><div class="meta">'+j[2]+' · '+j[3]+' · '+j[4]+' · '+j[5]+' · closes in '+j[12]+' days</div>'
  +'<div class="meta" style="margin-top:10px">Coursework '+j[7]+'%</div><div class="bar"><i style="width:'+j[7]+'%"></i></div>'
  +'<div class="meta">Skills '+j[8]+'%</div><div class="bar"><i style="width:'+j[8]+'%"></i></div>'
  +'<div class="meta">Interests '+j[9]+'%</div><div class="bar"><i style="width:'+j[9]+'%"></i></div>'
  +j[10].map(function(x){return '<span class="pill ok">✓ '+x+'</span>'}).join('')+j[11].map(function(x){return '<span class="pill gap">Learn: '+x+'</span>'}).join('')
  +'</div><div class="score">'+j[6]+'%<small>match</small></div>';
  box.appendChild(c)})}
P.forEach(function(p,i){var b=el('button','tab',p.n+' · '+p.m.split(' ')[0]);b.type='button';b.onclick=function(){show(i)};$('#tabs').appendChild(b)});show(0);

var KEY='futurenza_waitlist',f=$('#wl');
function load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function render(d){f.hidden=!!d;$('#done').hidden=!d;if(d)$('#doneMsg').textContent='Thanks, '+d.name.split(' ')[0]+'. You’re number #'+d.q+' in the queue. We’ll email '+d.email+' when your spot opens.'}
f.onsubmit=function(e){e.preventDefault();var ok=true,v={};
 [['name','Enter your full name'],['email','Enter a valid email'],['uni','Enter your university']].forEach(function(r){
  var i=f.elements[r[0]],val=i.value.trim(),bad=!val||(r[0]==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  i.parentNode.querySelector('.err').textContent=bad?r[1]:'';if(bad)ok=false;v[r[0]]=val});
 if(!ok)return;v.q=Math.floor(Math.random()*400)+120;
 try{localStorage.setItem(KEY,JSON.stringify(v))}catch(x){}render(v)};
$('#reset').onclick=function(){try{localStorage.removeItem(KEY)}catch(x){}f.reset();render(null)};
render(load());

$('#theme').onclick=function(){var r=document.documentElement,d=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);r.setAttribute('data-theme',d?'light':'dark')};
