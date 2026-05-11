# 🔌 Referencia de API Interna

Esta documentación describe las funciones y objetos principales disponibles en CocreHTML.

---

## Objeto Global: `AppState`

Estado centralizado de la aplicación.

```javascript
{
  player: {
    name: string,
    level: number,
    xp: number,
    achievements: string[]
  },
  game: {
    currentWorldId: number,
    currentLevelId: number,
    levelStartTime: timestamp,
    userCode: string,
    isLevelCompleted: boolean
  }
}
```

---

## Módulo: `Player`

Gestiona el perfil y estadísticas del jugador.

### `Player.init(name)`
Inicializa un nuevo jugador.

```javascript
Player.init('PlayerName');
// Retorna: { name: 'PlayerName', xp: 0, level: 1 }
```

### `Player.addXP(amount)`
Agrega experiencia al jugador.

```javascript
Player.addXP(100);
// Retorna: { newXP: 150, levelUp: false }
```

### `Player.getCurrentLevel()`
Obtiene el nivel actual del jugador.

```javascript
const currentLevel = Player.getCurrentLevel();
// Retorna: { name: 'Novato', xp_required: 0, icon: '🟢' }
```

### `Player.unlockAchievement(id)`
Desbloquea un logro.

```javascript
Player.unlockAchievement('first_step');
// Retorna: { success: true, achievement: {...} }
```

### `Player.getProgress()`
Retorna el progreso total del jugador.

```javascript
const progress = Player.getProgress();
// Retorna: { completedLevels: 5, totalLevels: 25, percentage: 20 }
```

### `Player.save()`
Guarda el progreso en localStorage.

```javascript
Player.save();
// Retorna: { success: true }
```

### `Player.load()`
Carga el progreso desde localStorage.

```javascript
Player.load();
// Retorna: { success: true, playerData: {...} }
```

---

## Módulo: `Levels`

Gestiona la base de datos de niveles.

### `Levels.load()`
Carga todos los niveles desde levels.json.

```javascript
Levels.load();
// Retorna: [{ id: 1, title: '...', ... }]
```

### `Levels.getById(id)`
Obtiene un nivel específico por ID.

```javascript
const level = Levels.getById(5);
// Retorna: { id: 5, title: 'Imágenes en tu Sitio', ... }
```

### `Levels.getCurrentLevel()`
Obtiene el nivel actual basado en progreso del jugador.

```javascript
const current = Levels.getCurrentLevel();
// Retorna: el nivel que el jugador debe completar
```

### `Levels.getNextLevel()`
Obtiene el próximo nivel.

```javascript
const next = Levels.getNextLevel();
// Retorna: el siguiente nivel o null si es el último
```

### `Levels.getByWorld(worldId)`
Obtiene todos los niveles de un mundo.

```javascript
const worldLevels = Levels.getByWorld(1);
// Retorna: array con 5 niveles del Mundo 1
```

### `Levels.getTotalCount()`
Retorna el número total de niveles.

```javascript
const total = Levels.getTotalCount();
// Retorna: 25
```

---

## Módulo: `Editor`

Controla el editor de código.

### `Editor.getValue()`
Obtiene el código actual del editor.

```javascript
const code = Editor.getValue();
// Retorna: "<h1>Hola Mundo</h1>"
```

### `Editor.setValue(code)`
Establece el contenido del editor.

```javascript
Editor.setValue("<h1>Mi Título</h1>");
// Retorna: { success: true }
```

### `Editor.clear()`
Limpia el editor.

```javascript
Editor.clear();
// Retorna: { success: true }
```

### `Editor.getLineCount()`
Retorna el número de líneas.

```javascript
const lines = Editor.getLineCount();
// Retorna: 3
```

### `Editor.hasAutoSave()`
Verifica si autoguardado está activo.

```javascript
const autoSave = Editor.hasAutoSave();
// Retorna: true
```

### `Editor.focus()`
Coloca el foco en el editor.

```javascript
Editor.focus();
```

---

## Módulo: `Validator`

Valida las soluciones del usuario.

### `Validator.validate(userCode, level)`
Valida el código del usuario contra los objetivos del nivel.

```javascript
const result = Validator.validate(
  "<h1>Hola Mundo</h1>",
  { goal: "<h1>", validation_type: "contains" }
);
// Retorna: { isValid: true, message: "¡Correcto!" }
```

### `Validator.validateContains(code, target)`
Verifica si el código contiene el objetivo.

```javascript
const isValid = Validator.validateContains(
  "<h1>Hola</h1><p>Texto</p>",
  "<h1>"
);
// Retorna: true
```

### `Validator.validateExact(code, target)`
Verifica coincidencia exacta.

```javascript
const isValid = Validator.validateExact(
  "<h1>Hola</h1>",
  "<h1>Hola</h1>"
);
// Retorna: true
```

### `Validator.validateDOM(code, selector, expectation)`
Valida la estructura del DOM.

```javascript
const isValid = Validator.validateDOM(
  "<h1>Hola</h1>",
  "h1",
  "exists"
);
// Retorna: true
```

### `Validator.validateCSS(code, property, value)`
Valida propiedades CSS.

```javascript
const isValid = Validator.validateCSS(
  "h1 { color: red; }",
  "color",
  "red"
);
// Retorna: true
```

---

## Módulo: `UI`

Control de elementos de la interfaz.

### `UI.renderLevel(level)`
Renderiza el panel de nivel actual.

```javascript
UI.renderLevel(level);
// Actualiza: título, teoría, objetivo
```

### `UI.renderProgress(current, total)`
Actualiza la barra de progreso.

```javascript
UI.renderProgress(5, 25);
// Actualiza barra a 20%
```

### `UI.renderStats(player)`
Actualiza estadísticas del jugador.

```javascript
UI.renderStats(player);
// Actualiza: nombre, XP, nivel
```

### `UI.showSuccess(message, xp)`
Muestra mensaje de éxito.

```javascript
UI.showSuccess("¡Nivel Completado!", 100);
// Muestra notificación + XP ganado
```

### `UI.showError(message)`
Muestra mensaje de error.

```javascript
UI.showError("Código incorrecto. Intenta de nuevo.");
// Muestra notificación de error
```

### `UI.showHint(hint)`
Muestra una pista.

```javascript
UI.showHint("Usa la etiqueta <h1>");
// Muestra pista en modal
```

### `UI.enableNextButton()`
Habilita el botón "Siguiente Nivel".

```javascript
UI.enableNextButton();
```

### `UI.disableNextButton()`
Desactiva el botón "Siguiente Nivel".

```javascript
UI.disableNextButton();
```

---

## Módulo: `Preview`

Control de la vista previa.

### `Preview.render(code)`
Renderiza HTML en la vista previa.

```javascript
Preview.render("<h1>Hola</h1><p>Mundo</p>");
// Muestra el HTML en iframe
```

### `Preview.clear()`
Limpia la vista previa.

```javascript
Preview.clear();
```

### `Preview.getContent()`
Obtiene el contenido actual.

```javascript
const content = Preview.getContent();
// Retorna: HTML renderizado
```

---

## Módulo: `Storage`

Gestiona almacenamiento persistente.

### `Storage.save(key, value)`
Guarda datos en localStorage.

```javascript
Storage.save('playerProfile', playerData);
// Retorna: { success: true }
```

### `Storage.load(key)`
Carga datos de localStorage.

```javascript
const data = Storage.load('playerProfile');
// Retorna: {...playerData}
```

### `Storage.remove(key)`
Elimina datos de localStorage.

```javascript
Storage.remove('playerProfile');
// Retorna: { success: true }
```

### `Storage.clear()`
Borra todo el almacenamiento.

```javascript
Storage.clear();
// Retorna: { success: true }
```

### `Storage.exists(key)`
Verifica si una clave existe.

```javascript
const exists = Storage.exists('playerProfile');
// Retorna: true/false
```

---

## Utilidades: `Utils`

Funciones auxiliares.

### `Utils.formatCode(code)`
Formatea código HTML/CSS.

```javascript
const formatted = Utils.formatCode("<h1>Hola</h1>");
// Retorna: "< h1 > Hola < / h1 >"
```

### `Utils.sanitizeHTML(code)`
Elimina scripts maliciosos.

```javascript
const safe = Utils.sanitizeHTML("<h1>Hi</h1><script>alert('xss')</script>");
// Retorna: "<h1>Hi</h1>"
```

### `Utils.debounce(fn, delay)`
Crea función con debounce.

```javascript
const debouncedSave = Utils.debounce(() => Player.save(), 1000);
```

### `Utils.throttle(fn, delay)`
Crea función con throttle.

```javascript
const throttledScroll = Utils.throttle(() => checkPosition(), 100);
```

### `Utils.generateId()`
Genera un ID único.

```javascript
const id = Utils.generateId();
// Retorna: "id_1234567890"
```

### `Utils.getCurrentTimestamp()`
Obtiene timestamp actual.

```javascript
const timestamp = Utils.getCurrentTimestamp();
// Retorna: 1234567890
```

---

## Events (Eventos)

Eventos personalizados de la aplicación.

### `level:completed`
Se dispara cuando se completa un nivel.

```javascript
document.addEventListener('level:completed', (e) => {
  console.log(e.detail); // { levelId, xp, time }
});
```

### `xp:gained`
Se dispara cuando se ganan XP.

```javascript
document.addEventListener('xp:gained', (e) => {
  console.log(e.detail); // { amount, total }
});
```

### `achievement:unlocked`
Se dispara al desbloquear logro.

```javascript
document.addEventListener('achievement:unlocked', (e) => {
  console.log(e.detail); // { achievementId, name }
});
```

### `level:changed`
Se dispara cuando cambia el nivel.

```javascript
document.addEventListener('level:changed', (e) => {
  console.log(e.detail); // { from, to }
});
```

---

## Ejemplos de Uso

### Ejemplo 1: Obtener y ejecutar un nivel

```javascript
// Cargar niveles
Levels.load();

// Obtener nivel actual
const level = Levels.getCurrentLevel();

// Renderizar en interfaz
UI.renderLevel(level);

// Obtener código del usuario
const userCode = Editor.getValue();

// Validar
const isValid = Validator.validate(userCode, level);

if (isValid.isValid) {
  // Agregar XP
  Player.addXP(level.xp);
  UI.showSuccess("¡Correcto!", level.xp);
} else {
  UI.showError("Intenta de nuevo");
}
```

### Ejemplo 2: Guardar progreso

```javascript
// Cada vez que se completa un nivel
document.addEventListener('level:completed', (e) => {
  Player.save();
  Storage.save('gameState', AppState);
});
```

### Ejemplo 3: Desbloquear logro

```javascript
// Al completar todos los niveles del mundo 1
if (Player.getProgress().completedLevels.includes(1, 2, 3, 4, 5)) {
  Player.unlockAchievement('html_master');
  UI.showSuccess("¡Logro desbloqueado: Maestro HTML!");
}
```

---

## Constantes

```javascript
const CONSTANTS = {
  MAX_LEVELS: 25,
  MAX_WORLDS: 5,
  BASE_XP: 100,
  DIFFICULTY_MULTIPLIERS: {
    1: 1.0,
    2: 1.5,
    3: 2.0,
    4: 3.5,
    5: 5.0
  },
  AUTO_SAVE_INTERVAL: 5000, // 5 segundos
  PREVIEW_UPDATE_DELAY: 500  // 0.5 segundos
}
```

---

## Códigos de Error

```javascript
// Errores comunes
{
  "LEVEL_NOT_FOUND": 404,
  "INVALID_CODE": 400,
  "VALIDATION_FAILED": 422,
  "STORAGE_ERROR": 500,
  "PLAYER_NOT_FOUND": 404
}
```

---

**Última actualización**: 11 de Mayo, 2026
