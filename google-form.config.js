/**
 * Configuração do Google Forms
 *
 * 1. Crie um formulário em https://forms.google.com com estas perguntas (nesta ordem):
 *    - Nome completo (resposta curta)
 *    - E-mail (resposta curta)
 *    - Telefone / WhatsApp (resposta curta)
 *    - Como podemos ajudar? (parágrafo)
 *
 * 2. Clique em Enviar → link (ícone de corrente) e copie a URL do formulário.
 *    Exemplo: https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform
 *
 * 3. Troque "/viewform" por "/formResponse" em `action`.
 *
 * 4. No formulário, clique nos ⋮ → "Obter link pré-preenchido", preencha cada campo
 *    e copie a URL gerada. Os IDs aparecem como entry.1234567890 na URL.
 *
 * 5. Cole os valores abaixo.
 */
window.NEUROKIDS_GOOGLE_FORM = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSeDGHrrN-1oFfNedeuZb-eTcj1rjH6eub-dAZcc8_Gx1Ga3Og/formResponse",
  entries: {
    nome: "entry.1950850640",
    email: "entry.1611967743",
    telefone: "entry.1135732214",
    mensagem: "entry.1412283826"
  }
};
