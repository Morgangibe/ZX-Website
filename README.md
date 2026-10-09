# ZX Consulting Solutions — web

Web estática (index.html) + formulario PHP (contact.php). Sin build.

## Despliegue a IONOS (SFTP automático)
Cada `git push` a `main` sube los archivos vía GitHub Actions (`.github/workflows/deploy.yml`).

### Pasos (una sola vez)
1. **IONOS → Hosting → SFTP y SSH**: copia servidor, usuario y contraseña SFTP.
2. La carpeta del dominio en IONOS es `/public` (ya puesta en el workflow).
3. Crea un repo en GitHub y súbelo:
   ```bash
   git init -b main && git add . && git commit -m "Web inicial"
   git remote add origin https://github.com/<usuario>/zx-consulting-web.git
   git push -u origin main
   ```
4. **GitHub → Settings → Secrets and variables → Actions**: crea `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD`.
5. Re-lanza el workflow (pestaña Actions → Run workflow) y comprueba que sale en verde.
6. Activa el certificado SSL de IONOS para el dominio y crea el buzón `info@zxconsulting.solutions`
   (el formulario `contact.php` envía a esa dirección con `mail()`).

### Alternativa manual
Sube `index.html` y `contact.php` con FileZilla/WinSCP por SFTP (puerto 22) a la carpeta del dominio.
