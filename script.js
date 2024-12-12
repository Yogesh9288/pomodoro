let cont=document.querySelector('.container');
let body=document.querySelector('body');
let btn=document.querySelectorAll('button');
let bk=document.querySelector('#break');
let std=document.querySelector('#study');
let tim=document.querySelector('p');
let st=document.querySelector('#start');
let reset=document.querySelector('i');
let timerId=null;
let started=false;
let timeLeft=1500;
let state='study';
let audio=new Audio('emergency_bell_alarm_small_ring.mp3');
function timeSet()
{
    if(state=='study') timeLeft=1500;
    else timeLeft=500;
}
function breakButton()
{
    body.style.background='#a8d2f7';
    cont.style.background='#6a96cb';
 
    btn.forEach((b)=>{
        b.classList.remove('study');
        b.classList.add('break');
    });
    tim.innerHTML="05:00";
    state='break';
    timeSet();
}
bk.addEventListener('click',breakButton);

function studyButton()
{
    body.style.background='#a8f7ac';
    cont.style.background='#6acb6f';
    btn.forEach((b)=>{
        b.classList.remove('break');
        b.classList.add('study');
    });
    tim.innerHTML="25:00";
    state='study';
    timeSet();
}
std.addEventListener('click',studyButton);

function resetButton()
{
    clearInterval(timerId);
    tim.innerText=(state=='study')?"25:00":"05:00";
    started=false;
    timeSet();
    st.innerHTML='START';
    reset.style.opacity=0;
}
reset.addEventListener('click',resetButton);
st.addEventListener('click',()=>{
    if(started)
    {
       st.innerHTML='START';
       clearInterval(timerId);
       started=false;
    }
    else{
    st.innerHTML='STOP';
    reset.style.opacity=1;
    started=true;
    startTime();
    }
})

function updateTime()
{
    timeLeft--;
    let min=Math.floor(timeLeft/60);
    let sec=timeLeft%60;
    let formatString=`${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    tim.innerHTML=formatString;
   if(min===0&&sec===0)
   {
      audio.play().catch(error=>console.log('audio play failed:',error));
      if(state==='study')
      {
        breakButton();
      }else{
        studyButton();
      }
      resetButton();
      
      setTimeout(()=>{
        audio.pause()
        audio.currentTime=0;
      },5000);

   }
}
function startTime()
{
    timerId=setInterval(updateTime,1000);
}
