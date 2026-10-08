'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu ☰';
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close ×' : 'Menu ☰';
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
navigation.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', () => closeMenu());

const form = document.querySelector('#enquiry-form');
if (form) {
  const service = form.elements.service;
  const requested = new URLSearchParams(location.search).get('service');
  if ([...service.options].some(option => option.value === requested)) service.value = requested;
  const date = form.elements.date;
  const today = new Date();
  date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const message = form.elements.message;
  const preview = document.querySelector('#request-preview');
  const status = document.querySelector('#form-status');
  form.addEventListener('input', () => {
    document.querySelector('#message-count').textContent = `${message.value.length} / 600`;
    preview.hidden = true;
    status.textContent = '';
  });
  form.addEventListener('change', () => { preview.hidden = true; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
      field.addEventListener('input', () => field.setCustomValidity(''), {once:true});
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const request = [
      'Hi Boitumelo, I would like to enquire about an errand.', '',
      `Name: ${get('name')}`, `Phone: ${get('phone')}`, `Service: ${service.selectedOptions[0].textContent}`,
      `Collection / shopping area: ${get('pickup')}`, `Delivery area: ${get('dropoff')}`,
      `Preferred date: ${get('date') || 'To be arranged'}`, '',
      `Details: ${get('message')}`, '', 'Please confirm availability and a quote.'
    ].join('\n');
    document.querySelector('#request-text').textContent = request;
    document.querySelector('#send-whatsapp').href = `https://wa.me/27676362605?text=${encodeURIComponent(request)}`;
    document.querySelector('#send-email').href = `mailto:boitumeloangela814@gmail.com?subject=${encodeURIComponent('Errand enquiry — ' + get('service'))}&body=${encodeURIComponent(request)}`;
    preview.hidden = false;
    preview.focus();
    preview.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
  });
  document.querySelector('#copy-request').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#request-text').textContent);
      status.textContent = 'Request copied. You can paste it into WhatsApp or email.';
    } catch {
      status.textContent = 'Copy is unavailable here. Select the request text above to copy it, or use the WhatsApp or email button.';
    }
  });
}
