(()=>{
  const header=document.querySelector('.header');
  const forced=header?.dataset.solid==='true';
  const updateHeader=()=>{if(header&&!forced)header.classList.toggle('header-solid',scrollY>70)};
  updateHeader();
  addEventListener('scroll',updateHeader,{passive:true});

  const menu=document.querySelector('.mobile-menu');
  const open=document.querySelector('.menu-trigger');
  const close=document.querySelector('.close-menu');
  const setMenu=v=>{
    if(!menu)return;
    menu.classList.toggle('open',v);
    menu.setAttribute('aria-hidden',String(!v));
    open?.setAttribute('aria-expanded',String(v));
    document.body.style.overflow=v?'hidden':'';
  };
  open?.addEventListener('click',()=>setMenu(true));
  close?.addEventListener('click',()=>setMenu(false));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open')){setMenu(false);open?.focus()}});

  document.querySelectorAll('details.service-row').forEach(row=>{
    row.addEventListener('toggle',()=>{
      if(row.open)document.querySelectorAll('details.service-row').forEach(other=>{if(other!==row)other.open=false});
    });
  });

  const reveals=[...document.querySelectorAll('.reveal')];
  reveals.forEach(x=>x.classList.add('before-reveal'));
  if('IntersectionObserver'in window){
    const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('before-reveal');ro.unobserve(e.target)}}),{threshold:.08});
    reveals.forEach(x=>ro.observe(x));
  }else reveals.forEach(x=>x.classList.remove('before-reveal'));

  const steps=[...document.querySelectorAll('.step')];
  const num=document.querySelector('.process-number');
  const ttl=document.querySelector('.process-current');
  if(steps.length&&'IntersectionObserver'in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){
        const i=Number(e.target.dataset.step||0);
        steps.forEach((s,j)=>s.classList.toggle('active',i===j));
        if(num)num.textContent='0'+(i+1);
        if(ttl)ttl.textContent=steps[i].querySelector('h3')?.textContent||'';
      }
    }),{rootMargin:'-25% 0px -45% 0px'});
    steps.forEach(s=>io.observe(s));
  }

  const track=document.querySelector('.hero-track');
  const comp=document.querySelector('.hero-composition');
  const hc=document.querySelector('.hero-content');
  const hf=document.querySelector('.hero-foot');
  const hd=document.querySelector('.hero-detail');
  if(track&&comp&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const on=()=>{
      const r=track.getBoundingClientRect();
      const max=track.offsetHeight-innerHeight;
      const p=Math.max(0,Math.min(1,-r.top/Math.max(1,max)));
      comp.style.transform=`scale(${1+0.035*p})`;
      const a=Math.max(0,1-p/.24);
      if(hc)hc.style.opacity=a;
      if(hf)hf.style.opacity=a;
      if(hd){
        const q=Math.max(0,Math.min(1,(p-.27)/.15));
        hd.style.visibility=q>0?'visible':'hidden';
        hd.style.opacity=q;
        hd.style.transform=`translateY(${30*(1-q)}px)`;
      }
    };
    on();
    addEventListener('scroll',on,{passive:true});
  }

  const form=document.getElementById('contact-form');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      const st=form.querySelector('.form-status');
      if(st)st.textContent='Revise os campos obrigatórios.';
      return;
    }
    const fd=new FormData(form);
    const phone=String(fd.get('whatsapp')||'').replace(/\D/g,'');
    const st=form.querySelector('.form-status');
    if(phone.length<10||phone.length>15){if(st)st.textContent='Informe um WhatsApp com DDD válido.';return}
    const msg=`Olá! Meu nome é ${fd.get('nome')}.\nProjeto: ${fd.get('tipo')}\nCidade: ${fd.get('cidade')}\nWhatsApp: ${fd.get('whatsapp')}\nE-mail: ${fd.get('email')}\n\n${fd.get('mensagem')}`;
    const draft=form.querySelector('#draft');
    if(draft)draft.value=msg;
    const box=form.querySelector('.draft');
    if(box)box.hidden=false;
    if(st)st.textContent='Mensagem preparada para demonstração. Nenhum dado foi enviado.';
  });

  document.querySelector('.copy-draft')?.addEventListener('click',async()=>{
    const t=document.querySelector('#draft');
    if(!t)return;
    try{await navigator.clipboard.writeText(t.value);const st=form?.querySelector('.form-status');if(st)st.textContent='Mensagem copiada.'}
    catch{t.select()}
  });
})();
