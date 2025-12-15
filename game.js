let i=0,score=0,time=20,totalTime=0;
const q=document.getElementById('question');
const opt=document.getElementById('options');
const sc=document.getElementById('score');
const fb=document.getElementById('feedback');
const t=document.getElementById('timer');
const bar=document.getElementById('bar');
const title=document.getElementById('levelTitle');
const ok=document.getElementById('correct');
const bad=document.getElementById('wrong');
let timer;


function load(){
if(i>=questions.length){end();return;}
title.textContent=story[i];
q.textContent=questions[i].q;
opt.innerHTML='';
fb.textContent='';
time=20;
bar.style.width=((i)/10*100)+'%';
questions[i].o.forEach(c=>{
const b=document.createElement('button');
b.textContent=c;
b.onclick=()=>check(c);
opt.appendChild(b);
});
timer=setInterval(()=>{
time--;totalTime++;
t.textContent='⏱ '+time;
if(time==0){
  clearInterval(timer);
  show(); // نمایش پاسخ درست
  setTimeout(()=>{
    i++;        // رفتن به مرحله بعد
    load();     // بارگذاری مرحله بعد
  },2000);      // ۲ ثانیه مکث
}
  
},1000);
}


function check(c){
clearInterval(timer);
if(c===questions[i].a){score+=10;ok.play();fb.textContent='✔ درست';}
else{bad.play();show();}
sc.textContent=score;
setTimeout(()=>{i++;load();},2000);
}


function show(){fb.textContent='❌ پاسخ درست: '+questions[i].a;}


function end(){
const name=localStorage.getItem('playerName');
document.body.innerHTML=`<div class='card'><h2>🎉 پایان مأموریت</h2><p>قهرمان: ${name}</p><p>⭐ امتیاز: ${score}</p><p>⏱ زمان کل: ${totalTime} ثانیه</p></div>`;
}


load();
