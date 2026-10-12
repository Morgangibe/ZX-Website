# ZX Consulting Solutions — web

Web estática (`index.html`), sin build. Publicada con **GitHub Pages** en https://zxconsulting.solutions
(HTTPS gratuito y automático). Cada push a `main` publica la web.

## Formulario de contacto
Usa FormSubmit (`https://formsubmit.co/ajax/info@zxconsulting.solutions`). La primera vez que alguien
lo envíe llegará un correo de activación a `info@zxconsulting.solutions`: hay que confirmarlo una vez.

## DNS (en IONOS → Dominios → zxconsulting.solutions → DNS)
- 4 registros **A** para `@` (sin tocar los MX del correo):
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 1 registro **CNAME** para `www` → `morgangibe.github.io`
- Eliminar los A/AAAA/CNAME previos de `@` y `www` que apunten al hosting de IONOS.

## GitHub
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
Custom domain: `zxconsulting.solutions` y marcar **Enforce HTTPS** cuando esté disponible.

## Secciones y demos
`index.html` incluye 4 demos interactivas (Dintel, Trainbay, Agente de voz, Configurador web) con datos ficticios,
rotuladas como tal. Todo el texto está en el objeto `T` (es/en) al inicio del script. El formulario envía
`service` (servicio de interés) además de nombre, email, empresa y mensaje. También: `robots.txt`, `sitemap.xml`, `llms.txt`
y JSON-LD (ProfessionalService) para buscadores y asistentes de IA.

## Páginas legales y de contacto (borrador)
`aviso-legal.html`, `privacidad.html`, `cookies.html`, `condiciones.html` y `contacto.html`, con pie común en todas las
páginas y banner de consentimiento (`site.js` + `site.css`, preferencia en `localStorage['zx-consent']`, caduca a los 12 meses).
Los textos legales son **borrador pendiente de revisión por abogado**; los datos que faltan aparecen resaltados como
PENDIENTE/PENDING. Si se añade analítica o publicidad, debe cargarse solo cuando `zxConsent.has('analytics'|'marketing')`
sea verdadero (`zxConsent.onChange(fn)` avisa de cambios). Las páginas internas son estáticas; el generador usado vive
fuera del repo (`empresas/zx/web/tools/gen_pages.py`), edita los HTML directamente si prefieres.
