// Ano automático no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Acordeon do FAQ
  document.querySelectorAll('.faq-item .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item').classList.toggle('open');
    });
  });

  // Envio do formulário via Formspree (FormData + Accept: application/json)
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Enviando…';

      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),               // <-- envia como FormData
          headers: { 'Accept': 'application/json' } // <-- pede JSON na resposta
        });

        if (resp.ok) {
          form.reset();
          if (status) status.textContent = 'Recebido! Vou retornar em até 1 dia útil.';
          // Se preferir forçar redirecionamento por JS ao invés do _redirect oculto:
          // window.location.href = 'https://ghenriquediniz.github.io/Site_Automatiza/obrigado.html';
        } else {
          // tenta ler mensagens do Formspree
          let msg = 'Não foi possível enviar agora. Tente novamente mais tarde.';
          try {
            const data = await resp.json();
            if (data?.errors?.length) {
              msg = data.errors.map(e => e.message).join(' ');
            }
          } catch (_) { }
          if (status) status.textContent = msg;
        }
      } catch (err) {
        if (status) status.textContent = 'Falha de rede. Confira sua conexão e tente de novo.';
      }
    });
  }
});
