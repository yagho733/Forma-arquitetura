(()=>{
  if(!document.querySelector('link[href="/polish.css"]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/polish.css';
    document.head.appendChild(link);
  }
  if(!document.querySelector('link[rel="icon"]')){
    const icon=document.createElement('link');
    icon.rel='icon';
    icon.href='/favicon.svg';
    icon.type='image/svg+xml';
    document.head.appendChild(icon);
  }
})();

window.formaScrollLock=(()=>{
  let depth=0,savedY=0;
  function lock(){
    if(depth===0){
      savedY=window.scrollY||document.documentElement.scrollTop||0;
      document.body.style.top=`-${savedY}px`;
      document.body.classList.add('scroll-locked');
    }
    depth++;
  }
  function unlock(){
    depth=Math.max(0,depth-1);
    if(depth===0){
      document.body.classList.remove('scroll-locked');
      document.body.style.top='';
      window.scrollTo(0,savedY);
    }
  }
  return{lock,unlock};
})();

(()=>{
  const menu=document.getElementById('menu');
  const openBtn=document.getElementById('openMenu');
  const closeBtn=document.getElementById('closeMenu');
  if(!menu||!openBtn||!closeBtn)return;
  menu.setAttribute('aria-hidden','true');
  openBtn.setAttribute('aria-controls','menu');
  openBtn.setAttribute('aria-expanded','false');
  openBtn.type='button';
  closeBtn.type='button';
  document.querySelector('.nav')?.setAttribute('aria-label','Navegação principal');
  menu.querySelector('nav')?.setAttribute('aria-label','Navegação mobile');
  const open=()=>{
    menu.classList.add('open');
    menu.setAttribute('aria-hidden','false');
    openBtn.setAttribute('aria-expanded','true');
    document.body.classList.add('menu-open');
    window.formaScrollLock.lock();
    requestAnimationFrame(()=>closeBtn.focus({preventScroll:true}));
  };
  const close=(restoreFocus=true)=>{
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden','true');
    openBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
    window.formaScrollLock.unlock();
    if(restoreFocus)requestAnimationFrame(()=>openBtn.focus({preventScroll:true}));
  };
  openBtn.onclick=open;
  closeBtn.onclick=()=>close();
  menu.querySelectorAll('a').forEach(a=>a.onclick=()=>close(false));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&menu.classList.contains('open'))close();
  });
})();

const FALLBACK_UNSPLASH='https://images.unsplash.com/photo-1749433157422-2e2162b2e030?auto=format&fit=crop&fm=jpg&q=72&w=2200';
const FALLBACK_PEXELS='https://images.pexels.com/photos/13752348/pexels-photo-13752348.jpeg?auto=compress&cs=tinysrgb&w=1800';

function protectImage(img){
  if(!img||img.dataset.fallbackReady==='true')return;
  img.dataset.fallbackReady='true';
  img.addEventListener('error',()=>{
    if(img.dataset.fallbackApplied==='true')return;
    img.dataset.fallbackApplied='true';
    img.classList.add('image-fallback');
    const current=img.currentSrc||img.src||'';
    img.src=current.includes('pexels.com')?FALLBACK_UNSPLASH:FALLBACK_PEXELS;
  });
}

document.querySelectorAll('img').forEach(protectImage);

const cards=[...document.querySelectorAll('.card')];
const horizonteImg=cards[0]?.querySelector('img');
if(horizonteImg){
  horizonteImg.src='https://images.unsplash.com/photo-1749433157422-2e2162b2e030?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000';
  protectImage(horizonteImg);
}

const P=[
  {title:'Casa Horizonte',year:'2026',type:'Residencial',loc:'Pelotas — RS',area:'320 m²',sum:'Concreto, vidro e ambientes de convivência voltados para o jardim.',concept:'Uma casa que transforma o jardim em parte da rotina.',story:'A Casa Horizonte nasce de uma linha horizontal clara, que organiza os volumes e cria uma relação contínua entre interior e paisagem. Grandes planos de vidro aproximam sala, jantar e área externa, enquanto os ambientes íntimos ganham privacidade e silêncio. Concreto, madeira e luz quente equilibram precisão e acolhimento.'},
  {title:'Casa Bruma',year:'2025',type:'Residencial',loc:'Gramado — RS',area:'245 m²',sum:'Madeira, transparência e um jardim que acompanha o acesso.',concept:'Leveza, textura e uma chegada marcada pela paisagem.',story:'Na Casa Bruma, a chegada acontece aos poucos. Madeira, superfícies claras e vidro formam uma fachada leve, enquanto o jardim conduz o percurso até a entrada. Os espaços sociais se abrem para o exterior e criam uma atmosfera tranquila, pensada para dias frios, encontros longos e luz natural.'},
  {title:'Casa Pátio',year:'2026',type:'Residencial + Interiores',loc:'Porto Alegre — RS',area:'285 m²',sum:'Volumes definidos e aberturas que trazem luz aos ambientes.',concept:'Um pátio central que organiza luz, circulação e convivência.',story:'A Casa Pátio foi desenhada a partir de um vazio central que distribui luz e cria respiro entre os ambientes. Os volumes são simples e bem definidos, mas ganham profundidade com sombras, vegetação e diferentes enquadramentos do céu. Arquitetura e interiores trabalham juntos para deixar a circulação intuitiva e os espaços de convivência mais generosos.'},
  {title:'Refúgio Atlântico',year:'2025',type:'Residencial',loc:'Florianópolis — SC',area:'380 m²',sum:'Varanda, área social e paisagem conectadas.',concept:'Arquitetura aberta para a brisa, a sombra e o horizonte.',story:'O Refúgio Atlântico prioriza a vida ao ar livre. Varandas profundas protegem do sol e criam uma transição confortável entre interior, piscina e jardim. A implantação favorece ventilação cruzada e vistas amplas, enquanto materiais claros e naturais mantêm a arquitetura leve e adequada ao clima litorâneo.'},
  {title:'Casa Lume',year:'2024',type:'Residencial',loc:'Torres — RS',area:'210 m²',sum:'Luz, proporção e uma área externa pensada para convivência.',concept:'Luz como matéria principal da arquitetura.',story:'Na Casa Lume, cada abertura foi pensada para transformar a luz ao longo do dia. Os ambientes alternam momentos de expansão e recolhimento, criando atmosferas diferentes sem perder unidade. A área social se conecta à piscina e ao terraço, enquanto planos claros e esquadrias escuras reforçam a leitura limpa da casa.'}
];

const modal=document.querySelector('#modal');
const mi=document.querySelector('#modalImg');
const mt=document.querySelector('#modalTitle');
const mf=document.querySelector('#modalFacts');
const mc=document.querySelector('#modalConcept');
const ms=document.querySelector('#modalStory');
const backProject=document.querySelector('#backProject');
let lastFocus=null;
protectImage(mi);

function slug(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

function openProject(i,pushHash=true){
  const p=P[i];
  if(!p||!modal||!mi)return;
  lastFocus=document.activeElement;
  const sourceImg=cards[i]?.querySelector('img');
  mi.src=sourceImg?.currentSrc||sourceImg?.src||FALLBACK_PEXELS;
  mi.alt=`${p.title} — imagem de referência`;
  mt.textContent=p.title;
  mf.innerHTML=`<span>${p.loc}</span><span>${p.area}</span><span>${p.type}</span><span>${p.year}</span>`;
  mc.textContent=p.concept;
  ms.textContent=p.story;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  window.formaScrollLock.lock();
  if(pushHash)history.replaceState(null,'','#'+slug(p.title));
  requestAnimationFrame(()=>backProject?.focus({preventScroll:true}));
}

function closeProject(){
  if(!modal?.classList.contains('open'))return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  window.formaScrollLock.unlock();
  history.replaceState(null,'',location.pathname+location.search);
  if(lastFocus&&lastFocus.focus)requestAnimationFrame(()=>lastFocus.focus({preventScroll:true}));
}

cards.forEach((card,i)=>card.addEventListener('click',()=>openProject(i)));
backProject?.addEventListener('click',closeProject);
modal?.addEventListener('click',e=>{
  if(e.target===modal)closeProject();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&modal?.classList.contains('open'))closeProject();
});

const form=document.querySelector('#form');
const status=document.querySelector('#status');
const WHATSAPP_NUMBER=''; // Coloque aqui o número do cliente com DDI+DDD, somente dígitos.

if(status){
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
}

if(form){
  const nome=form.querySelector('[name="nome"]');
  const cidade=form.querySelector('[name="cidade"]');
  const tipo=form.querySelector('[name="tipo"]');
  const mensagem=form.querySelector('[name="mensagem"]');
  const submit=form.querySelector('.submit');
  nome?.setAttribute('aria-label','Seu nome');
  nome?.setAttribute('autocomplete','name');
  cidade?.setAttribute('aria-label','Cidade e estado');
  cidade?.setAttribute('autocomplete','address-level2');
  tipo?.setAttribute('aria-label','Tipo de projeto');
  mensagem?.setAttribute('aria-label','Conte um pouco sobre o projeto');
  if(submit){
    submit.type='submit';
    submit.textContent='Enviar pelo WhatsApp';
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const d=new FormData(form);
    const texto=`Olá, sou ${d.get('nome')} e gostaria de conversar sobre um projeto ${d.get('tipo')} em ${d.get('cidade')}. ${d.get('mensagem')}`.trim();
    const numero=WHATSAPP_NUMBER.replace(/\D/g,'');
    const url=numero
      ?`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
      :`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    if(status)status.textContent='Abrindo o WhatsApp com sua mensagem…';
    const opened=window.open(url,'_blank');
    if(opened){
      try{opened.opener=null;}catch(_e){}
    }else{
      window.location.href=url;
    }
  });
}

const hash=location.hash.slice(1);
if(hash){
  const idx=P.findIndex(p=>slug(p.title)===hash);
  if(idx>=0)openProject(idx,false);
}
