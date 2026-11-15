const links=[...document.querySelectorAll('.navlinks a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}}},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('section[id]').forEach(section=>observer.observe(section));
const viewer=document.querySelector('#figureviewer');
const fullfigure=document.querySelector('#fullfigure');
const figurecaption=document.querySelector('#figurecaption');
let figureOpener;
document.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>{
 figureOpener=button;fullfigure.src=button.dataset.full;fullfigure.alt=button.dataset.caption;figurecaption.textContent=button.dataset.caption;viewer.showModal();
}));
document.querySelector('.closeviewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
viewer.addEventListener('close',()=>figureOpener?.focus());
