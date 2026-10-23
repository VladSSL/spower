const video=document.querySelector('#heroVideo');
const play=document.querySelector('#playVideo');
const pause=document.querySelector('#pauseVideo');
const goal=name=>{ window.dispatchEvent(new CustomEvent('spower:goal',{detail:{name}})); if(window.SPOWER_METRIKA_ID&&typeof window.ym==='function')window.ym(window.SPOWER_METRIKA_ID,'reachGoal',name); };
async function playHero(){try{document.querySelector('#videoError').hidden=true;await video.play();goal('video_play');}catch{document.querySelector('#videoError').hidden=false;}}
play.addEventListener('click',playHero);
pause.addEventListener('click',()=>video.pause());
video.addEventListener('play',()=>{play.hidden=true;pause.hidden=false;video.controls=true;});
video.addEventListener('pause',()=>{play.hidden=false;pause.hidden=true;video.controls=false;});
video.addEventListener('ended',()=>{play.hidden=false;pause.hidden=true;video.controls=false;});
video.addEventListener('error',()=>document.querySelector('#videoError').hidden=false);
document.querySelector('#watch').addEventListener('click',()=>{document.querySelector('#demo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});playHero();});
const operation=document.querySelector('#operationVideo');
const toggle=document.querySelector('#operationToggle');
toggle.addEventListener('click',async()=>{if(operation.paused){try{await operation.play();}catch{toggle.textContent='Открыть видео ↗';window.open('https://disk.yandex.ru/d/T78gKc9lnqTpVQ','_blank','noopener');}}else operation.pause();});
operation.addEventListener('play',()=>toggle.textContent='Пауза Ⅱ');operation.addEventListener('pause',()=>toggle.textContent='Смотреть точение ▶');
document.querySelector('#requestForm').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const data=new FormData(form);const contact=data.get('contact').trim();const status=document.querySelector('#formStatus');if(!contact.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)&&contact.replace(/\D/g,'').length<10){status.textContent='Укажите email или телефон с кодом города / оператора.';document.querySelector('#contact').focus();return;}const body=`Здравствуйте! Прошу подготовить коммерческое предложение на S Power PL50.\n\nИмя: ${data.get('name').trim()}\nКонтакт: ${contact}\nЗадача: ${data.get('task').trim()||'Уточню при общении'}\n\nПрошу сообщить актуальную цену, комплектацию, гарантию и условия поставки.`;const mailto=`mailto:spower@maspel.ru?subject=${encodeURIComponent('Запрос КП на S Power PL50')}&body=${encodeURIComponent(body)}`;const button=form.querySelector('button');button.disabled=true;button.textContent='Подготовка письма…';window.location.href=mailto;status.textContent='Запрос подготовлен. Отправьте его из открывшейся почтовой программы. Если она не открылась, напишите на spower@maspel.ru.';button.disabled=false;button.innerHTML='Подготовить письмо ещё раз <span>↗</span>';goal('kp_email_prepare');});
