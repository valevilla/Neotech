# 🚀 Deployment Guide

Guía completa para desplegar CocreHTML en producción.

---

## 🌐 Opción 1: GitHub Pages (Recomendado - Gratuito)

### Ventajas
✅ Totalmente gratuito
✅ Integración directa con GitHub
✅ SSL automático
✅ CDN global

### Desventajas
❌ Solo sitios estáticos
❌ Sin backend

### Pasos

#### 1.1 Configurar el repositorio

```bash
# En GitHub, ve a Settings > Pages
# Source: Deploy from a branch
# Branch: main
# Folder: / (root)
```

#### 1.2 Verificar estructura

```
CocreHTML/
├── index.html          # Punto de entrada
├── css/
├── js/
├── data/
├── docs/
└── README.md
```

#### 1.3 Actualizar base de datos JSON

Si cargaste archivos en `/data`, asegúrate que sean accesibles:

```javascript
// En tu app.js, carga así:
fetch('./data/levels.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

#### 1.4 Commit y Push

```bash
git add .
git commit -m "Deploy CocreHTML v1.0"
git push origin main
```

#### 1.5 Esperar 1-2 minutos

Tu sitio estará disponible en: `https://valevilla.github.io/CocreHTML/`

---

## 🔵 Opción 2: Netlify (Gratuito con más features)

### Ventajas
✅ Gratuito
✅ Deploy automático en cada push
✅ Preview de PRs
✅ Funciones serverless opcionales

### Pasos

#### 2.1 Crear cuenta

Ve a https://netlify.com y regístrate con GitHub

#### 2.2 Conectar repositorio

1. Click "New site from Git"
2. Selecciona "GitHub"
3. Busca "CocreHTML"
4. Autoriza

#### 2.3 Configuración de Build

```
Build command: (dejar vacío)
Publish directory: ./
```

#### 2.4 Deploy

Netlify automáticamente deployará cada vez que hagas push.

Tu sitio estará en: `https://<nombre>.netlify.app/`

---

## 🟨 Opción 3: Vercel (Gratuito)

### Ventajas
✅ Gratuito
✅ Muy rápido
✅ Análisis integrado
✅ Edge functions

### Pasos

#### 3.1 Crear cuenta

Ve a https://vercel.com y regístrate con GitHub

#### 3.2 Importar proyecto

1. Click "Add New..."
2. Selecciona "Project"
3. Conecta GitHub
4. Selecciona CocreHTML

#### 3.3 Configurar

```
Framework Preset: Other
Root Directory: ./
```

#### 3.4 Deploy

Click "Deploy" y espera.

Tu sitio estará en: `https://<proyecto>.vercel.app/`

---

## 🎯 Opción 4: Servidor Propio (Avanzado)

Si tienes un servidor Linux:

### 4.1 Clonar el repositorio

```bash
cd /var/www
git clone https://github.com/valevilla/CocreHTML.git
cd CocreHTML
```

### 4.2 Instalar Nginx

```bash
sudo apt update
sudo apt install nginx
```

### 4.3 Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/cocrehtml
```

```nginx
server {
    listen 80;
    server_name tudominio.com;

    root /var/www/CocreHTML;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 4.4 Habilitar y reiniciar

```bash
sudo ln -s /etc/nginx/sites-available/cocrehtml /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### 4.5 SSL con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

---

## 📦 Optimizaciones Pre-Deploy

### 5.1 Minificar archivos

```bash
# Instalar herramientas
npm install -g terser cssnano

# Minificar JS
terser js/app.js -o js/app.min.js -c -m

# Minificar CSS
cssnano css/main.css > css/main.min.css
```

### 5.2 Comprimir imágenes

```bash
# Usar ImageOptim o similar
# O usar en línea: https://tinypng.com
```

### 5.3 Cache de localStorage

Ya está implementado con:
```javascript
localStorage.setItem('playerProfile', JSON.stringify(data));
```

### 5.4 Lazy loading de datos

```javascript
// En vez de cargar todo al inicio
fetch('./data/levels.json').then(...) // Solo cuando lo necesites
```

---

## 🔒 Consideraciones de Seguridad

### 6.1 Sanitización XSS

Ya implementada en:
```javascript
// En utils/sanitizer.js
function sanitizeHTML(code) {
  return code.replace(/<script[\s\S]*?<\/script>/g, '');
}
```

### 6.2 Content Security Policy

Agregaa a tu `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
```

### 6.3 Rate limiting (si tienes backend)

```javascript
// Limitar peticiones por IP
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

---

## 🚨 Monitoring en Producción

### 7.1 Errores JavaScript

Agregar a tu `index.html`:

```javascript
<script>
window.addEventListener('error', (e) => {
  console.error('Error:', e.message);
  // Opcional: enviar a servidor de logs
});
</script>
```

### 7.2 Google Analytics (opcional)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 7.3 Sentry (Error tracking profesional)

```javascript
<script src="https://browser.sentry-cdn.com/6.19.7/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
</script>
```

---

## 📱 Testing Antes de Deploy

### 8.1 Checklist

- [ ] Funciona en Chrome
- [ ] Funciona en Firefox
- [ ] Funciona en Safari
- [ ] Funciona en dispositivos móviles
- [ ] localStorage funciona
- [ ] Todas las imágenes cargan
- [ ] Los estilos se ven correctos
- [ ] No hay errores en console
- [ ] Performance aceptable
- [ ] Accesibilidad básica OK

### 8.2 Herramientas

- **Chrome DevTools**: F12
- **Lighthouse**: DevTools > Lighthouse
- **WebPageTest**: https://www.webpagetest.org
- **GTmetrix**: https://gtmetrix.com

---

## 🔄 Deployment Automático (CI/CD)

### 9.1 GitHub Actions

Crear archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

Luego cada push a `main` deployará automáticamente.

---

## 🎯 Roadmap: Backend (Futuro)

Cuando quieras agregar features avanzadas:

```
Opción 1: Firebase
- Autenticación
- Firestore (base datos)
- Cloud Storage

Opción 2: Node.js + Express
- Control total
- Base de datos (MongoDB/PostgreSQL)
- APIs custom

Opción 3: Supabase
- PostgreSQL
- Auth integrada
- Real-time
```

---

## 📞 Troubleshooting

### Problema: 404 en GitHub Pages

**Solución**: Asegúrate que:
1. El repositorio sea público
2. Está en la rama correcta
3. `index.html` está en la raíz

### Problema: Datos JSON no cargan

**Solución**: Usa rutas relativas:
```javascript
fetch('./data/levels.json') // Correcto
fetch('/data/levels.json')  // Puede no funcionar en algunos hosts
```

### Problema: Estilos se ven raros

**Solución**: Verifica rutas CSS:
```html
<link rel="stylesheet" href="./css/main.css">
```

---

## 🎊 Celebrar el Deploy

Una vez deployed:

1. ✅ Comparte el link con amigos
2. ✅ Sube a redes sociales
3. ✅ Agrega al portafolio
4. ✅ Pide feedback

¡Felicidades! 🚀

---

**Última actualización**: 11 de Mayo, 2026
