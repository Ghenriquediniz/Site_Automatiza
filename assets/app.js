// Ano automático no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Acordeon do FAQ
  document.querySelectorAll('.faq-item .btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      btn.closest('.faq-item').classList.toggle('open');
    });
  });

  // Envio do formulário (exemplo com fetch). Troque pelo seu endpoint.
  const form = document.getElementById('form-contato');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Enviando…';
      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const r = await fetch('https://formspree.io/f/seu-endpoint', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        if (r.ok){
          if (status) status.textContent = 'Recebido! Vou retornar em breve.';
          form.reset();
        } else {
          if (status) status.textContent = 'Não foi possível enviar agora. Tente pelo WhatsApp.';
        }
      } catch (err){
        if (status) status.textContent = 'Falha de rede. Tente novamente.';
      }
    });
  }
});
