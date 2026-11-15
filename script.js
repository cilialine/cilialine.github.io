// Release the loading overlay after the initial load; never block the site indefinitely.
(function () {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    root.classList.remove('js-loading');
  };
  const releaseOnLoad = () => window.setTimeout(release, reducedMotion ? 0 : 650);
  if (document.readyState === 'complete') releaseOnLoad();
  else window.addEventListener('load', releaseOnLoad, { once: true });
  window.setTimeout(release, reducedMotion ? 750 : 3000);
})();

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
