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
