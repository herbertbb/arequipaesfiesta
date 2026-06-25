# CAMBIOS — arequipaesfiesta

## [1.4.0] — 2026-06-25

### Añadido
- SEO: meta tags (author, keywords), Open Graph, Twitter Card, canonical URL.
- JSON-LD Website + 25 Eventos (generados dinámicamente vía JS desde los datos del calendario).
- `robots.txt`: permite crawlers, apunta a sitemap.
- `sitemap.xml`: sitemap básico con URL canónica.
- `llms.txt`: archivo markdown para crawlers de IA con calendario completo, información útil y notas.

### Cambiado
- `index.html`: head reestructurado con meta tags sociales y canonical.
- `js/app.js`: nueva función `generarJSONLDEventos()` que crea structured data para cada actividad.

## [1.3.0] — 2026-06-25

### Cambiado
- Tabla del calendario rediseñada:
  - **Sticky header**: thead se pega al hacer scroll (top: 64px).
  - **Separadores de mes**: filas vinotinto entre julio y agosto con indicador visual.
  - **Badge de tipo**: cada actividad muestra un badge coloreado (🩰 Danza, 🎵 Música, 🍲 Gastro, 🗿 Taller, 🎭 Cultural, 📋 Adm).
  - **Zebra striping**: filas alternadas sutiles, se recalcula al filtrar.
  - **Hover mejorado**: fondo más notorio (6% → 7%).
  - **Fecha destacada**: celda de fecha en negrita, más visible.
  - **Mobile rediseñado**: fecha como título, actividad más grande, lugar/detalles en línea, separador de mes adaptado, badge visible.
  - Filtros ahora ocultan/muestran correctamente los separadores de mes.

## [1.2.0] — 2026-06-25

### Cambiado
- Paleta de colores completa: reemplazo de todos los colores por la paleta territorial-identitaria de Arequipa según estudio cromático:
  - `--vinotinto: #6E1F2A` (bandera, identidad institucional)
  - `--blanco-sillar: #F4F0E8` (piedra volcánica del centro histórico)
  - `--azul-heraldico: #1F4E79` (escudo, lealtad)
  - `--azul-profundo: #0C2D4A` (fondos oscuros ceremoniales)
  - `--oro-barroco: #C89B3C` (nobleza, ornamentos festivos)
  - `--marfil-mineral: #E8E0D2` (sillar envejecido, fondos alternos)
  - `--verde-campina: #6F7C4B` (campiña, gastronomía)
  - `--gris-volcanico: #9E9488` (estructura, territorio)
  - `--grafito: #2F2A28` / `--grafito-suave: #5C5248` (textos)
- Hero: gradiente de vinotinto (reemplaza el azul anterior).
- Botón CTA del hero: vinotinto con borde dorado (hover invierte colores).
- Filtros activos: cambian de azul a vinotinto.
- Nav underline: cambia de azul a vinotinto.
- Tabla header: vinotinto (reemplaza azul oscuro).
- Footer: azul profundo (se mantiene de la paleta heráldica).
- Ratio visual: ~60% sillar/marfil, 25% grafito, 10% vinotinto, 5% azul/oro/verde.

## [1.1.0] — 2026-06-25

### Añadido
- Columna "Guardar" en el calendario con botón 🗓️ por cada actividad.
- Al hacer clic, muestra popup con dos opciones: "Google Calendar" (abre enlace directo) y "Descargar .ics" (archivo para Apple Calendar, Outlook, etc.).
- `js/app.js`: parseo automático de fechas y horarios desde el texto de cada fila; generación de URLs de Google Calendar y archivos .ics al vuelo.
- `css/estilo.css`: estilos para el botón de calendario (icono SVG) y popup flotante.

## [1.0.0] — 2026-06-25

### Añadido
- Creación del proyecto desde cero.
- `index.html`: página principal con hero, calendario completo, actividades TBD, información útil, notas importantes y footer.
- `css/estilo.css`: tema visual arequipeño (colores sillar, azul cielo, dorado, rojo ladrillo), responsive, animaciones suaves.
- `js/app.js`: cuenta regresiva al Corso de la Amistad (15 ago), filtros por mes/tipo, menú mobile, scroll suave.
- `.cpanel.yml`: configuración de deploy estándar con exclusiones.
- `docs-dev/BITACORA.md` y `docs-dev/CAMBIOS.md`: documentación inicial del proyecto.
