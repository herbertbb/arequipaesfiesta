# BITÁCORA — arequipaesfiesta

## Estado del proyecto

- **Tipo:** Sitio web estático (HTML+CSS+JS vanilla)
- **Propósito:** Página informativa del 486° Aniversario de Arequipa con calendario de actividades
- **URL proyecto:** `/home/maverick/proyectos_web/arequipaesfiesta`
- **Fecha de inicio:** 25 junio 2026

## Estructura

```
arequipaesfiesta/
├── index.html       # Página principal
├── css/
│   └── estilo.css   # Estilos completos
├── js/
│   └── app.js       # Cuenta regresiva, filtros, nav
├── img/             # Imágenes (vacío)
├── .cpanel.yml      # Config de deploy cPanel
├── _movidos/        # Archivos movidos (temporal)
└── docs-dev/
    ├── BITACORA.md
    └── CAMBIOS.md
```

## Decisiones técnicas

- **Sin frameworks ni librerías externas** — el sitio es puramente informativo, no necesita bundle ni build step.
- **Google Fonts** solo Playfair Display + Inter (carga externa mínima).
- **Cuenta regresiva** apunta al 15 de agosto 2026 09:00 h (Corso de la Amistad).
- **Filtros** por mes (julio/agosto) y por tipo de actividad (danza, música, gastronomía, artesanía, cultural, inscripciones).
- **Diseño responsive** con tabla que colapsa a cards en mobile.
- **Tema visual** inspirado en Arequipa: sillar blanco, azul cielo, dorado, rojo ladrillo.
