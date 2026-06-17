# Neurokids — Site institucional

Landing page da **NeuroKids Centro Integrado de Desenvolvimento**, com informações sobre serviços, convênios, contato e política de privacidade.

## Estrutura

```
neurokids-site/
├── index.html                  # Página principal
├── politica-de-privacidade.html
├── styles.css
├── script.js
├── google-form.config.js       # Integração com Google Forms
└── assets/
    ├── images/                 # Logo, favicon, hero, etc.
    └── convenios/              # Logos dos convênios
```

## Visualizar localmente

Abra `index.html` no navegador ou use um servidor estático:

```bash
python -m http.server 8765
```

Acesse: http://localhost:8765

## Google Forms

Configure os IDs do formulário em `google-form.config.js` conforme as instruções no próprio arquivo.

## Publicação

Site estático — pode ser hospedado em GitHub Pages, Netlify, Vercel ou qualquer servidor de arquivos estáticos.
