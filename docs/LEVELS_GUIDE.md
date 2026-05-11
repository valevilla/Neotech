# 📚 Guía de Creación de Niveles

Documento completo para crear y agregar nuevos niveles a CocreHTML.

---

## 🎯 Estructura de un Nivel

Cada nivel en `data/levels.json` tiene esta estructura:

```json
{
  "id": 1,
  "world": 1,
  "title": "Primer Paso",
  "difficulty": 1,
  "theory": "¡Bienvenido! Hoy aprenderás HTML...",
  "goal": "<h1>Hola Mundo</h1>",
  "validation_type": "contains",
  "hints": [
    "Usa la etiqueta h1",
    "El contenido va entre h1 y /h1"
  ],
  "xp": 100,
  "example_solution": "<h1>Hola Mundo</h1>",
  "additional_tips": "HTML es el esqueleto de una página web"
}
```

### Campos Explicados

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | number | ID único (1-25) | 5 |
| `world` | number | Mundo (1-5) | 2 |
| `title` | string | Nombre del nivel | "Mi Primer Párrafo" |
| `difficulty` | number | Dificultad (1-5) | 2 |
| `theory` | string | Contenido educativo | "Un párrafo es..." |
| `goal` | string | Patrón a validar | `<p>` |
| `validation_type` | string | Tipo de validación | "contains" |
| `hints` | array | 2-3 pistas | ["Usa p", "..."] |
| `xp` | number | Experiencia ganada | 100 |
| `example_solution` | string | Solución correcta | `<p>Texto</p>` |
| `additional_tips` | string | Consejo extra | "Los párrafos..." |

---

## 🔍 Tipos de Validación

### 1. `contains` - Debe Contener

```json
{
  "validation_type": "contains",
  "goal": "<h1>",
  "example_solution": "<h1>Hola Mundo</h1><p>Texto</p>"
}
```

✅ Valida si el código **contiene** la etiqueta
❌ No requiere exactitud en el contenido
📝 Ideal para: Etiquetas simples, primeros niveles

**Cuándo usarlo**: Aprendizaje básico de sintaxis

---

### 2. `exact` - Coincidencia Exacta

```json
{
  "validation_type": "exact",
  "goal": "<h1>Hola Mundo</h1>",
  "example_solution": "<h1>Hola Mundo</h1>"
}
```

✅ Requiere coincidencia exacta
❌ Intolerante con espacios/saltos
📝 Ideal para: Pequeños fragmentos específicos

**Cuándo usarlo**: Cuando exactitud es importante

---

### 3. `dom` - Estructura del DOM

```json
{
  "validation_type": "dom",
  "goal": {
    "selector": "h1",
    "expectation": "exists"
  },
  "example_solution": "<h1>Mi Título</h1>"
}
```

✅ Valida estructura HTML, no contenido
✅ Flexible con valores
❌ Necesita parseador DOM
📝 Ideal para: Verificar etiquetas presentes

**Valores de `expectation`**:
- `"exists"` - La etiqueta debe existir
- `"not_exists"` - La etiqueta NO debe existir
- `"count": 2` - Debe haber 2 elementos
- `"has_attribute": "class"` - Debe tener atributo

**Ejemplos**:

```json
// Verificar que existe h1
{
  "selector": "h1",
  "expectation": "exists"
}

// Verificar que NO existe script
{
  "selector": "script",
  "expectation": "not_exists"
}

// Verificar que hay 3 párrafos
{
  "selector": "p",
  "expectation": { "count": 3 }
}

// Verificar que tiene clase
{
  "selector": "div",
  "expectation": { "has_attribute": "class" }
}
```

---

### 4. `css` - Propiedades CSS

```json
{
  "validation_type": "css",
  "goal": {
    "selector": "h1",
    "property": "color",
    "value": "red"
  },
  "example_solution": "<h1 style=\"color: red;\">Título</h1>"
}
```

✅ Valida estilos aplicados
✅ Acepta múltiples formatos (red, #ff0000, rgb(255,0,0))
❌ Necesita parseador CSS
📝 Ideal para: Niveles sobre CSS

---

### 5. `regex` - Expresión Regular

```json
{
  "validation_type": "regex",
  "goal": "<(h[1-6])>.+?</\\1>",
  "example_solution": "<h2>Subtítulo</h2>"
}
```

✅ Máxima flexibilidad
❌ Confuso para principiantes
📝 Ideal para: Patrones complejos

---

## 🎓 Ejemplo: Crear Nivel Completo

### Nivel 6: "Dándole Color"

```json
{
  "id": 6,
  "world": 2,
  "title": "Dándole Color",
  "difficulty": 2,
  "theory": "¡Excelente! Ya sabes crear títulos y párrafos. Ahora vamos a darles color.\n\nPara cambiar el color en HTML, usamos CSS. Hay varias formas:\n\n1. <strong>Inline</strong>: <code>&lt;h1 style=\"color: red;\"&gt;Rojo&lt;/h1&gt;</code>\n2. <strong>En &lt;style&gt;</strong>: <code>&lt;style&gt; h1 { color: blue; } &lt;/style&gt;</code>\n\nEn este nivel, vamos a usar la forma inline para que veas el cambio inmediato.",
  "goal": "color: red",
  "validation_type": "contains",
  "hints": [
    "Busca la etiqueta h1",
    "Agrega style= para cambiar estilos",
    "Usa color: red; dentro de style"
  ],
  "xp": 150,
  "example_solution": "<h1 style=\"color: red;\">Hola Mundo</h1>\n<p>Este sitio está en rojo.</p>",
  "additional_tips": "Los colores pueden ser: palabras (red, blue), códigos hex (#FF0000), o rgb(255,0,0)"
}
```

---

## 📊 Estructura de los 5 Mundos

### Mundo 1: Fundamentos HTML (Niveles 1-5)

```json
[
  { "id": 1, "title": "Hola Mundo", "goal": "<h1>", "xp": 100 },
  { "id": 2, "title": "Párrafos", "goal": "<p>", "xp": 125 },
  { "id": 3, "title": "Listas", "goal": "<ul>", "xp": 150 },
  { "id": 4, "title": "Enlaces", "goal": "<a", "xp": 175 },
  { "id": 5, "title": "Imágenes", "goal": "<img", "xp": 200 }
]
```

**Objetivos de Aprendizaje**:
- Entender estructura HTML básica
- Conocer etiquetas principales
- Crear contenido semántico

---

### Mundo 2: Estilos CSS (Niveles 6-10)

```json
[
  { "id": 6, "title": "Color", "goal": "color:", "xp": 150 },
  { "id": 7, "title": "Tamaño de Fuente", "goal": "font-size:", "xp": 175 },
  { "id": 8, "title": "Fondo", "goal": "background:", "xp": 200 },
  { "id": 9, "title": "Bordes", "goal": "border:", "xp": 225 },
  { "id": 10, "title": "Espaciado", "goal": "padding:|margin:", "xp": 250 }
]
```

**Objetivos de Aprendizaje**:
- Aplicar estilos CSS
- Entender selectores
- Usar propiedades comunes

---

### Mundo 3: Layouts Responsivos (Niveles 11-15)

```json
[
  { "id": 11, "title": "Flexbox Básico", "goal": "display: flex", "xp": 200 },
  { "id": 12, "title": "Grid Básico", "goal": "display: grid", "xp": 225 },
  { "id": 13, "title": "Media Queries", "goal": "@media", "xp": 250 },
  { "id": 14, "title": "Viewport Meta", "goal": "viewport", "xp": 275 },
  { "id": 15, "title": "Proyecto: Web Responsiva", "goal": "mobile|tablet", "xp": 300 }
]
```

---

### Mundo 4: Interactividad (Niveles 16-20)

```json
[
  { "id": 16, "title": "Botones Interactivos", "goal": "onclick:|button", "xp": 250 },
  { "id": 17, "title": "Formularios", "goal": "<form>", "xp": 275 },
  { "id": 18, "title": "JavaScript Básico", "goal": "<script>", "xp": 300 },
  { "id": 19, "title": "Eventos", "goal": "addEventListener", "xp": 325 },
  { "id": 20, "title": "Proyecto: Juego Interactivo", "goal": "game", "xp": 350 }
]
```

---

### Mundo 5: Proyectos Finales (Niveles 21-25)

```json
[
  { "id": 21, "title": "Portfolio", "goal": "portfolio|cv", "xp": 350 },
  { "id": 22, "title": "Blog", "goal": "blog|articles", "xp": 375 },
  { "id": 23, "title": "Tienda Online", "goal": "store|shop", "xp": 400 },
  { "id": 24, "title": "Red Social", "goal": "social", "xp": 425 },
  { "id": 25, "title": "Master Web Developer", "goal": "complete", "xp": 500 }
]
```

---

## 🎨 Escribiendo Buenas Teorías

### Estructura Recomendada

```markdown
[Introducción Hook]
¡Excelente trabajo hasta ahora! Hoy aprenderás una habilidad importante...

[Explicación Clara]
Un párrafo es un contenedor de texto. En HTML se crea con la etiqueta <p>.

[Ejemplo Práctico]
```html
<p>Este es un párrafo.</p>
<p>Este es otro párrafo.</p>
```

[Caso de Uso]
Los párrafos son perfectos para:
- Texto corporal
- Descripciones
- Explicaciones

[Tu Misión]
En este nivel, crea 2 párrafos con contenido de tu interés.
```

### Mejores Prácticas

✅ **Corto y Claro**: 3-4 párrafos máximo
✅ **Ejemplo Visual**: Siempre incluye código
✅ **Motivación**: Explica por qué es importante
✅ **Desafío Claro**: Qué hacer exactamente
✅ **Vocabulario Apropiado**: Apropiado para nivel

---

## 💡 Creando Buenas Pistas

### Niveles de Dificultad

**Pista 1 (Fácil)**: Muy general
```
"Recuerda usar una etiqueta HTML"
```

**Pista 2 (Media)**: Específica
```
"Necesitas la etiqueta <h1> para títulos"
```

**Pista 3 (Difícil)**: Casi la respuesta
```
"<h1>Tu contenido aquí</h1>"
```

---

## 🚀 Paso a Paso: Agregar un Nivel

### Paso 1: Planifica

```javascript
// Qué quiero enseñar
Concepto: "Divs para agrupar contenido"

// Dificultad progresiva
- Nivel anterior requería: <p>
- Este nivel requiere: <div> + <p>
- Próximo nivel requiere: <div> + CSS

// Objetivos de aprendizaje
- Entender propósito de <div>
- Agrupar contenido relacionado
```

### Paso 2: Diseña el Nivel

```json
{
  "id": 4,
  "world": 1,
  "title": "Agrupando Contenido",
  "difficulty": 2,
  "theory": "Un <div> es un contenedor...",
  "goal": "<div>",
  "validation_type": "contains",
  "hints": [
    "Usa <div> para agrupar",
    "Encierra tus párrafos en un div",
    "<div><p>...</p></div>"
  ],
  "xp": 125,
  "example_solution": "<div>\n  <h1>Título</h1>\n  <p>Contenido</p>\n</div>",
  "additional_tips": "Los divs son invisibles, pero útiles para organizar"
}
```

### Paso 3: Prueba Localmente

```bash
# 1. Agrega el nivel a data/levels.json
# 2. Abre index.html en navegador
# 3. Navega al nivel
# 4. Intenta resolver
# 5. Verifica que se valida correctamente
```

### Paso 4: Solicita Review (Pull Request)

Describe:
- Qué concepto enseña
- Por qué es importante
- Dificultad progresiva

---

## ✅ Checklist para Nuevos Niveles

```javascript
[ ] ID único (no duplicado)
[ ] Mundo correcto (1-5)
[ ] Título descriptivo
[ ] Teoría clara y concisa
[ ] Goal realista
[ ] Tipo de validación apropiado
[ ] Hints útiles (2-3)
[ ] XP razonable
[ ] Example solution funciona
[ ] Tips adicionales ayudan
[ ] Testeado manualmente
[ ] No hay errores
[ ] Respeta dificultad progresiva
```

---

## 📈 Tabla de XP Recomendado

| Mundo | Dificultad Base | Multiplicador |
|-------|-----------------|----------------|
| 1 | 100 | 1.0x |
| 2 | 150 | 1.5x |
| 3 | 200 | 2.0x |
| 4 | 250 | 3.5x |
| 5 | 350 | 5.0x |

**Fórmula**:
```
XP = Base * Multiplicador + (Dificultad * 25)
```

---

## 🎯 Ejemplos de Niveles Completos

### Nivel Fácil

```json
{
  "id": 2,
  "world": 1,
  "title": "Mi Primer Párrafo",
  "difficulty": 1,
  "theory": "Perfecto, aprendiste a crear títulos. Ahora vamos a agregar texto debajo.\n\nUsa la etiqueta <p> para párrafos.",
  "goal": "<p>",
  "validation_type": "contains",
  "hints": ["Usa <p>", "Cierra con </p>"],
  "xp": 100,
  "example_solution": "<h1>Hola Mundo</h1>\n<p>Este es mi primer sitio web</p>",
  "additional_tips": "Los párrafos separan el texto en bloques legibles"
}
```

### Nivel Medio

```json
{
  "id": 12,
  "world": 3,
  "title": "Primeros Pasos con Grid",
  "difficulty": 3,
  "theory": "CSS Grid es poderoso para crear layouts complejos...",
  "goal": "display: grid",
  "validation_type": "css",
  "hints": [
    "Usa display: grid",
    "Define grid-template-columns",
    "Crea un layout de 3 columnas"
  ],
  "xp": 250,
  "example_solution": "<style>\n.container { display: grid; grid-template-columns: 1fr 1fr 1fr; }\n</style>\n<div class=\"container\">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>",
  "additional_tips": "1fr significa 1 fracción del espacio disponible"
}
```

### Nivel Difícil

```json
{
  "id": 25,
  "world": 5,
  "title": "Master Web Developer",
  "difficulty": 5,
  "theory": "¡Felicidades! Has llegado al final. Ahora crearás tu primer sitio profesional...",
  "goal": "complete",
  "validation_type": "dom",
  "hints": [
    "Crea una estructura HTML completa",
    "Incluye HTML, head, body",
    "Agrega estilos CSS"
  ],
  "xp": 500,
  "example_solution": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Sitio</title>\n  <style>...</style>\n</head>\n<body>...</body>\n</html>",
  "additional_tips": "¡Acabas de convertirte en Web Developer! 🎉"
}
```

---

## 🔄 Mejorando Niveles Existentes

Para optimizar un nivel:

1. **Verifica claridad**: ¿Se entiende el objetivo?
2. **Prueba dificultad**: ¿Es apropiado para el mundo?
3. **Revisa pistas**: ¿Son útiles sin spoilear?
4. **Valida XP**: ¿Es equitativo con otros?

---

## 🎊 Publicando tu Nivel

```bash
# 1. Forka el repo
# 2. Agrega tu nivel a data/levels.json
# 3. Testea en localhost
# 4. Haz commit

git add data/levels.json
git commit -m "feat: Add level 26 - Advanced CSS"

# 5. Push y abre Pull Request
git push origin tu-rama

# 6. Espera review
# 7. ¡Publicado! 🎉
```

---

**Última actualización**: 11 de Mayo, 2026
