/* ══════════════════════════════════════════
   PRIMEIRO EMPREGO HOPE — Script
══════════════════════════════════════════ */

/* ── Máscara de telefone ── */
const whatsappInput = document.getElementById('whatsapp');
if (whatsappInput) {
  whatsappInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    e.target.value = v.replace(/-$/, '');
  });
}

/* ── Validação e envio do formulário ── */
const form    = document.getElementById('inscricao-form');
const success = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (input)  input.classList.add('error');
  if (error)  error.textContent = message;
}

function clearErrors() {
  ['nome','whatsapp','idade','escola','bairro'].forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + '-error');
    if (input) { input.classList.remove('error'); input.classList.remove('success'); }
    if (error) error.textContent = '';
  });
}

function markSuccess(fieldId) {
  const input = document.getElementById(fieldId);
  if (input) input.classList.add('success');
}

function validateForm(data) {
  let valid = true;

  if (!data.nome || data.nome.trim().length < 3) {
    showError('nome', 'Por favor, informe seu nome completo.');
    valid = false;
  } else markSuccess('nome');

  const phone = data.whatsapp.replace(/\D/g, '');
  if (!phone || phone.length < 10) {
    showError('whatsapp', 'Informe um número de WhatsApp válido.');
    valid = false;
  } else markSuccess('whatsapp');

  const age = parseInt(data.idade, 10);
  if (!data.idade || isNaN(age) || age < 13 || age > 22) {
    showError('idade', 'A idade deve estar entre 13 e 22 anos.');
    valid = false;
  } else markSuccess('idade');

  if (!data.escola || data.escola.trim().length < 2) {
    showError('escola', 'Informe o nome da sua escola.');
    valid = false;
  } else markSuccess('escola');

  if (!data.bairro || data.bairro.trim().length < 2) {
    showError('bairro', 'Informe seu bairro.');
    valid = false;
  } else markSuccess('bairro');

  return valid;
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      nome:     document.getElementById('nome').value,
      whatsapp: document.getElementById('whatsapp').value,
      idade:    document.getElementById('idade').value,
      escola:   document.getElementById('escola').value,
      bairro:   document.getElementById('bairro').value,
    };

    if (!validateForm(data)) return;

    /* Estado de carregamento */
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

    try {
      /*
       * INTEGRAÇÃO: substitua a URL abaixo pelo endpoint real
       * (ex.: Google Forms, Make/Zapier webhook, seu backend, etc.)
       *
       * const response = await fetch('SEU_ENDPOINT_AQUI', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify(data),
       * });
       * if (!response.ok) throw new Error('Erro no envio');
       */

      /* Simulação de envio para demonstração */
      await new Promise(resolve => setTimeout(resolve, 1500));

      /* Exibir sucesso */
      form.style.display        = 'none';
      success.style.display     = 'block';

      /* Scroll suave para o card */
      document.getElementById('form-card').scrollIntoView({ behavior: 'smooth', block: 'center' });

      /* Evento de conversão (Google Analytics / Meta Pixel) */
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { event_category: 'form', event_label: 'inscricao_primeiro_emprego' });
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-rocket"></i> QUERO PARTICIPAR GRATUITAMENTE';
      alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
    }
  });
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.problem-card, .benefit-card, .journey__step, .testimonial-card, ' +
  '.stat-item, .about__feature, .events-photo, .section-title, .section-subtitle'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── Suavizar âncoras internas ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('.header')?.offsetHeight || 64;
    window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' });
  });
});

/* ── Header sombra no scroll ── */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header?.classList.add('header--scrolled');
  } else {
    header?.classList.remove('header--scrolled');
  }
}, { passive: true });

/* Estilo header scrollado via JS para não precisar de CSS extra */
const style = document.createElement('style');
style.textContent = `.header--scrolled { box-shadow: 0 4px 20px rgba(0,0,0,.10); }`;
document.head.appendChild(style);

/* ── Contagem animada das estatísticas ── */
function animateCount(el, target, suffix) {
  const duration = 2000;
  const start    = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.firstChild.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.firstChild.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const numEl = entry.target;
    const text  = numEl.textContent;
    const val   = parseInt(text, 10);
    if (!isNaN(val) && val > 0) {
      /* Preserva o <span> de sufixo */
      const span = numEl.querySelector('span');
      numEl.innerHTML = `0`;
      if (span) numEl.appendChild(span);
      animateCount(numEl, val, '');
    }
    statsObserver.unobserve(numEl);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item__number').forEach(el => {
  statsObserver.observe(el);
});
