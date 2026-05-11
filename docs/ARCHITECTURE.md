# 🏗️ Arquitectura Técnica de CocreHTML

Documento técnico que describe la arquitectura, componentes y flujos de datos de la aplicación.

---

## 📐 Visión General

CocreHTML es una **aplicación web educativa gamificada** que funciona completamente en el navegador sin necesidad de backend.

```
┌─────────────────────────────────────────────────┐
│          CLIENTE (Navegador del Usuario)         │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │        UI Layer (HTML + CSS)             │   │
│  │  - Panel de Perfil                       │   │
│  │  - Panel de Misión                       │   │
│  │  - Editor de Código                      │   │
│  │  - Preview en Vivo                       │   │
│  └──────────────────────────────────────────┘   │
│                      ↓↑                         │
│  ┌──────────────────────────────────────────┐   │
│  │      Application Layer (JavaScript)      │   │
│  │  - Game State Management                 │   │
│  │  - Event Handling                        │   │
│  │  - Logic de Validación                   │   │
│  └──────────────────────────────────────────┘   │
│                      ↓↑                         │
│  ┌──────────────────────────────────────────┐   │
│  │      Data Layer (localStorage)           │   │
│  │  - Player Data                           │   │
│  │  - Progress                              │   │
│  │  - Achievements                          │   │
│  └──────────────────────────────────────────┘   │
│                      ↓↑                         │
│  ┌──────────────────────────────────────────┐   │
│  │    Static Assets (JSON, Fonts, etc)      │   │
│  │  - levels.json                           │   │
│  │  - achievements.json                     │   │
│  │  - Fonts desde CDN                       │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 🔌 Componentes Principales

### 1. **UI Layer** (Vista)

**Archivos**: `index.html`, `css/main.css`

#### Panels Principales

```html
┌─────────────────────────────────────┐
│     Panel de Perfil                 │
│  [Avatar] Player1  │  100 XP        │
├─────────────────────────────────────┤
│     Panel de Misión                 │
│  "Hola Mundo!"                      │
│  [Progreso: ████░░░░] 40%           │
├─────────────────────────────────────┤
│ Editor         │      Preview        │
│ <h1>Hola</h1> │  Hola              │
│               │                      │
│ [Ejecutar]    │  [Siguiente Nivel] │
└─────────────────────────────────────┘
```

**Elementos Clave**:
- ✅ Responsive (mobile-first)
- ✅ Estilos CSS variables
- ✅ Tema oscuro (principal)
- ✅ Animaciones suaves
- ✅ Soporte touch

---

### 2. **Game State** (Estado del Juego)

```javascript
const GameState = {
  player: {
    name: "Player1",
    currentLevel: 1,
    totalXP: 0,
    achievements: [],
    levelStartTime: timestamp
  },
  game: {
    currentLevelId: 1,
    userCode: "",
    isLevelCompleted: false,
    attempts: 0,
    hints: 0
  }
}
```

---

### 3. **Módulos de Aplicación**

#### Módulo: `Player`
Gestiona perfil y estadísticas del jugador.

```javascript
Player = {
  init(name),           // Inicializar nuevo jugador
  addXP(amount),        // Agregar experiencia
  getCurrentLevel(),    // Obtener nivel actual
  unlockAchievement(id),// Desbloquear logro
  getProgress(),        // % completado
  save(),              // Guardar en localStorage
  load()               // Cargar de localStorage
}
```

#### Módulo: `Levels`
Gestiona base de datos de niveles.

```javascript
Levels = {
  load(),              // Cargar levels.json
  getById(id),         // Obtener nivel por ID
  getCurrentLevel(),   // Nivel actual del jugador
  getNextLevel(),      // Próximo nivel
  getByWorld(id),      // Niveles por mundo
  getTotalCount()      // Cantidad de niveles
}
```

#### Módulo: `Validator`
Valida soluciones del usuario.

```javascript
Validator = {
  validate(code, level),        // Validar contra objetivo
  validateContains(code, target), // ¿Contiene?
  validateExact(code, target),    // ¿Exacto?
  validateDOM(code, selector),    // ¿DOM correcto?
  validateCSS(code, property)     // ¿CSS correcto?
}
```

#### Módulo: `Preview`
Control del iframe de visualización.

```javascript
Preview = {
  render(code),        // Renderizar HTML
  clear(),             // Limpiar
  getContent(),        // Obtener contenido
  injectCSS(css),      // Inyectar estilos
  sanitize(code)       // Sanitizar XSS
}
```

#### Módulo: `UI`
Control de elementos visuales.

```javascript
UI = {
  renderLevel(level),      // Mostrar nivel
  renderStats(player),     // Actualizar estadísticas
  showSuccess(msg, xp),    // Mostrar éxito
  showError(msg),          // Mostrar error
  showHint(hint),          // Mostrar pista
  enableNextButton(),      // Habilitar botón
  updateProgress(%)        // Actualizar barra
}
```

#### Módulo: `Storage`
Gestión de datos persistentes.

```javascript
Storage = {
  save(key, value),    // Guardar en localStorage
  load(key),          // Cargar de localStorage
  remove(key),        // Eliminar
  clear(),            // Borrar todo
  exists(key)         // Verificar existencia
}
```

---

## 🔄 Flujos de Datos

### Flujo 1: Cargar Juego

```
1. Página carga (DOMContentLoaded)
    ↓
2. Intenta cargar Player de localStorage
    ↓
3. Si no existe → inicializar nuevo Player
    ↓
4. Cargar levels.json
    ↓
5. Renderizar nivel actual
    ↓
6. Mostrar teoría y objetivos
```

### Flujo 2: Ejecutar Código

```
1. Usuario escribe código
    ↓
2. Click en "EJECUTAR CÓDIGO"
    ↓
3. Obtener código del editor
    ↓
4. Sanitizar (prevenir XSS)
    ↓
5. Inyectar en iframe (Preview.render)
    ↓
6. Validar contra objetivo (Validator)
    ↓
7. Si válido → completeLevel()
8. Si inválido → showError()
```

### Flujo 3: Completar Nivel

```
1. Código validado como correcto
    ↓
2. Agregar XP al player (Player.addXP)
    ↓
3. Actualizar UI (UI.renderStats)
    ↓
4. Habilitar botón "Siguiente Nivel"
    ↓
5. Guardar progreso (Player.save)
    ↓
6. Emitir evento 'level:completed'
```

### Flujo 4: Avanzar de Nivel

```
1. Usuario click "SIGUIENTE NIVEL"
    ↓
2. Incrementar currentLevelId
    ↓
3. Obtener nuevo nivel (Levels.getById)
    ↓
4. Limpiar editor y preview
    ↓
5. Renderizar nuevo nivel
    ↓
6. Actualizar barra de progreso
```

---

## 📁 Estructura de Archivos de Datos

### levels.json

```json
[
  {
    "id": 1,
    "world": 1,
    "title": "Primer Paso",
    "theory": "...",
    "goal": "<h1>",
    "validation_type": "contains",
    "hints": ["Usa h1"],
    "xp": 100
  },
  ...
]
```

**Campos**:
- `id`: Identificador único (1-25)
- `world`: Mundo (1-5)
- `title`: Nombre del nivel
- `theory`: Contenido educativo
- `goal`: Código/patrón a validar
- `validation_type`: Tipo de validación
- `hints`: Pistas disponibles
- `xp`: Experiencia ganada

### achievements.json

```json
[
  {
    "id": "first_step",
    "name": "Primer Paso",
    "description": "Completa el nivel 1",
    "icon": "👣",
    "requirements": { "levelCompleted": 1 }
  },
  ...
]
```

---

## 🔒 Seguridad

### Sanitización XSS

Prevenir inyección de scripts maliciosos:

```javascript
function sanitizeHTML(code) {
  // Remover etiquetas script
  return code.replace(/<script[\s\S]*?<\/script>/g, '');
}
```

### Content Security Policy (CSP)

En `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline'">
```

### Sandbox del iframe

```html
<iframe sandbox="allow-scripts" id="preview-window"></iframe>
```

El iframe está restringido y no puede:
- Acceder al DOM principal ✅
- Hacer peticiones CORS ✅
- Ejecutar plugins ✅

---

## ⚡ Performance

### Optimizaciones

1. **Lazy Loading de Datos**
   ```javascript
   // No cargar todos los JSON al inicio
   fetch('./data/levels.json').then(...)
   ```

2. **Debouncing de Autoguardado**
   ```javascript
   const debouncedSave = debounce(() => Player.save(), 1000);
   ```

3. **CSS Variables**
   ```css
   :root {
     --primary-color: #e94560;
   }
   /* Reutilizar en toda la app */
   ```

4. **Minificación en Producción**
   ```bash
   terser app.js -o app.min.js
   ```

### Métricas Esperadas

- ⚡ First Contentful Paint: <1s
- ⚡ Time to Interactive: <2s
- 📱 Lighthouse Score: >90

---

## 🧪 Testing

### Pruebas Manuales

Checklist antes de cada release:

```javascript
[ ] Nivel 1: Completable
[ ] Nivel 5: Accesible
[ ] Nivel 25: Accesible
[ ] localStorage: Guarda/Carga correctamente
[ ] Mobile: Responsive en < 768px
[ ] Desktop: Layout de 2 columnas en > 768px
[ ] XSS: Código malicioso se sanitiza
[ ] Validación: Funciona para todos los tipos
```

### Pruebas Automatizadas (Futuro)

```javascript
// tests/validator.test.js
describe('Validator', () => {
  test('validateContains: debe encontrar contenido', () => {
    const result = Validator.validateContains(
      '<h1>Hola</h1>',
      '<h1>'
    );
    expect(result).toBe(true);
  });
});
```

---

## 📈 Escalabilidad

### Estructura Modular

Cada módulo es independiente y reutilizable:

```javascript
// Importar módulo (cuando se use ES6)
import Player from './modules/player.js';
import Levels from './modules/levels.js';
```

### Agregar Nuevos Niveles

Simplemente agregar al JSON:

```json
{
  "id": 26,
  "world": 5,
  "title": "Mi Nuevo Nivel",
  ...
}
```

No requiere cambiar código JavaScript.

---

## 🔮 Evolución Futura

### v1.1: Refactorización a Módulos ES6

```
├── js/
│   ├── modules/
│   │   ├── Player.js
│   │   ├── Levels.js
│   │   ├── Validator.js
│   │   ├── UI.js
│   │   ├── Storage.js
│   │   └── Preview.js
│   ├── utils/
│   │   ├── sanitizer.js
│   │   ├── helpers.js
│   │   └── constants.js
│   └── app.js (orquestador principal)
```

### v2.0: Backend + Database

```
Cliente (Progressive Web App)
    ↓↑ API REST
Backend (Node.js + Express)
    ↓↑
Database (MongoDB / PostgreSQL)
```

### v2.0: Autenticación

```javascript
// Integración con Firebase o similar
Auth.signUp(email, password)
Auth.signIn(email, password)
Auth.getCurrentUser()
```

---

## 📚 Patrones de Diseño

### Pattern 1: Singleton
```javascript
const Player = {
  // Una sola instancia en toda la app
  data: { ... },
  init() { ... }
};
```

### Pattern 2: Observer (Eventos)
```javascript
document.addEventListener('level:completed', (e) => {
  console.log('Nivel completado:', e.detail);
});
```

### Pattern 3: Module Pattern
```javascript
const UI = (() => {
  const private_method = () => { };
  
  return {
    public_method: () => { }
  };
})();
```

---

## 🎯 Consideraciones de Diseño

### Por Qué Sin Framework

✅ **Ventajas**:
- Sin dependencias externas
- Máxima compatibilidad (soporta navegadores viejos)
- Rápido de cargar
- Fácil de entender y modificar

❌ **Desventajas**:
- Más código repetitivo
- Sin hot reload en desarrollo
- Menos opciones de testing

**Decisión**: Para un proyecto educativo pequeño, vanilla JS es la mejor opción.

### Por Qué localStorage

✅ **Ventajas**:
- Funcionamiento offline
- Persiste datos localmente
- Privacidad (datos en cliente)
- Rápido

❌ **Desventajas**:
- Límite de ~5-10MB
- Datos no sincronizados entre dispositivos
- Sin autenticación

**Decisión**: Perfecto para v1. En v2 agregaremos backend.

---

## 🔗 Diagrama de Componentes

```
┌─────────────────────────────────────────────────┐
│                  APLICACIÓN                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐    ┌──────────────┐          │
│  │   Modules    │    │   Utilities  │          │
│  ├──────────────┤    ├──────────────┤          │
│  │ • Player     │    │ • sanitizer  │          │
│  │ • Levels     │    │ • helpers    │          │
│  │ • Validator  │    │ • constants  │          │
│  │ • UI         │    │ • debounce   │          │
│  │ • Storage    │    │ • throttle   │          │
│  │ • Preview    │    │              │          │
│  └──────────────┘    └──────────────┘          │
│         ↓                    ↓                  │
│  ┌─────────────────────────────────────┐       │
│  │      App.js (Orquestador)           │       │
│  │  - Maneja eventos                   │       │
│  │  - Coordina módulos                 │       │
│  │  - Controla flujos                  │       │
│  └─────────────────────────────────────┘       │
│         ↓                                      │
│  ┌─────────────────────────────────────┐       │
│  │  DOM / UI Rendering                 │       │
│  └─────────────────────────────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📞 Soporte para Desarrolladores

Para modificar esta arquitectura:

1. **Agregar nuevo módulo**: Ver sección "Módulos"
2. **Cambiar flujo de datos**: Ver sección "Flujos"
3. **Entender storage**: Ver sección "Estructura de Datos"
4. **Mejorar performance**: Ver sección "Performance"

---

**Última actualización**: 11 de Mayo, 2026
