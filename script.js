// Recepta — landing page interactions

// Nav: border on scroll and mobile menu
const nav = document.getElementById('nav');
const burger = nav.querySelector('.burger');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Hero demo: conversation + PMS actions, looping
const chat = document.getElementById('chat');
const feed = document.getElementById('feed');
const script = [
  { who: 'guest', text: 'Hi! We arrive on Friday but our flight lands at 10:40pm 😅 Will anyone be at reception?' },
  { who: 'agent', text: 'Hi Sofia! No problem: reception closes at 10pm, but since your online check-in is done, we’ll send you a door code to let yourself in.' },
  { pms: 'Arrival time → 23:30' },
  { who: 'guest', text: 'Great. Could we also check out later on Sunday?' },
  { who: 'agent', text: 'The room is free on Sunday — I can offer check-out until 4pm for €25. Shall I add it?' },
  { who: 'guest', text: 'Yes, perfect!' },
  { pms: 'Late check-out 4pm · +€25' },
  { who: 'agent', text: 'Done ✅ I’ll send your access code on Friday at 6pm. Safe travels!' },
  { pms: 'Smart-lock code scheduled' },
];
const wait = ms => new Promise(r => setTimeout(r, ms));
const now = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

async function runDemo() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    script.filter(s => !s.pms).forEach(s => addMsg(s));
    script.filter(s => s.pms).forEach(s => addFeed(s.pms));
    return;
  }
  for (;;) {
    chat.innerHTML = ''; feed.innerHTML = '';
    for (const step of script) {
      if (step.pms) { await wait(500); addFeed(step.pms); continue; }
      if (step.who === 'agent') {
        const t = document.createElement('div');
        t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>';
        chat.appendChild(t); await wait(1300); t.remove();
      } else {
        await wait(1100);
      }
      addMsg(step);
    }
    await wait(5000);
  }
}
function addMsg({ who, text }) {
  const m = document.createElement('div');
  m.className = 'msg ' + who;
  m.textContent = text;
  if (who === 'agent') {
    const meta = document.createElement('span');
    meta.className = 'meta'; meta.textContent = 'Recepta · ' + now();
    m.appendChild(meta);
  }
  chat.appendChild(m);
  while (chat.scrollHeight > chat.clientHeight && chat.children.length > 1) chat.firstElementChild.remove();
}
function addFeed(text) {
  const li = document.createElement('li');
  li.textContent = text;
  feed.appendChild(li);
}
runDemo();

// Pricing: monthly / yearly
document.querySelectorAll('.billing-toggle button').forEach(btn => btn.addEventListener('click', () => {
  const p = btn.dataset.period;
  document.querySelectorAll('.billing-toggle button').forEach(b => b.classList.toggle('on', b === btn));
  document.querySelectorAll('.price').forEach(el => {
    const v = el.dataset[p];
    el.innerHTML = v === 'custom' ? 'Custom' : `€${v}<small> /mo</small>`;
  });
  document.querySelectorAll('.price-note').forEach(el => { el.textContent = el.dataset[p]; });
}));

// Demo form (no backend: on-screen confirmation)
const form = document.getElementById('demo-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name, email = form.elements.email;
  let ok = true;
  [name, email].forEach(f => {
    const valid = f.value.trim() && (f.type !== 'email' || /.+@.+\..+/.test(f.value));
    f.style.borderColor = valid ? '' : 'var(--coral)';
    if (!valid) ok = false;
  });
  if (ok) form.classList.add('sent');
});
