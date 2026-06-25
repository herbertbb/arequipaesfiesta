(function () {
  'use strict';

  // ===== CUENTA REGRESIVA =====
  var fechaCorso = new Date('2026-08-15T09:00:00-05:00').getTime();

  function actualizarCuenta() {
    var ahora = Date.now();
    var diff = fechaCorso - ahora;

    if (diff <= 0) {
      document.getElementById('dias').textContent = '00';
      document.getElementById('horas').textContent = '00';
      document.getElementById('minutos').textContent = '00';
      document.getElementById('segundos').textContent = '00';
      return;
    }

    var segundos = Math.floor(diff / 1000);
    var dias = Math.floor(segundos / 86400);
    segundos %= 86400;
    var horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    var minutos = Math.floor(segundos / 60);
    segundos %= 60;

    document.getElementById('dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
  }

  actualizarCuenta();
  setInterval(actualizarCuenta, 1000);

  // ===== NAV MOBILE TOGGLE =====
  var toggleBtn = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function () {
      var visible = navLinks.classList.toggle('visible');
      toggleBtn.classList.toggle('abierto', visible);
      toggleBtn.setAttribute('aria-label', visible ? 'Cerrar menú' : 'Abrir menú');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('visible');
        toggleBtn.classList.remove('abierto');
        toggleBtn.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // ===== FILTROS =====
  var filtros = document.querySelectorAll('.filtro-btn');
  var filas = document.querySelectorAll('.actividad');
  var separadores = document.querySelectorAll('.separador-mes');

  function aplicarFiltro(filtro) {
    var activo = filtro || 'todo';

    filas.forEach(function (fila) {
      if (activo === 'todo') {
        fila.style.display = '';
        return;
      }
      var mes = fila.getAttribute('data-mes');
      var tipo = fila.getAttribute('data-tipo');

      if (activo === 'julio' || activo === 'agosto') {
        fila.style.display = mes === activo ? '' : 'none';
      } else {
        fila.style.display = tipo === activo ? '' : 'none';
      }
    });

    separadores.forEach(function (sep) {
      if (activo === 'todo') {
        sep.style.display = '';
      } else if (activo === 'julio' || activo === 'agosto') {
        var mes = sep.getAttribute('data-mes');
        sep.style.display = mes === activo ? '' : 'none';
      } else {
        sep.style.display = 'none';
      }
    });

    aplicarZebra();
  }

  filtros.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filtros.forEach(function (b) { b.classList.remove('activo'); });
      btn.classList.add('activo');
      aplicarFiltro(btn.getAttribute('data-filtro'));
    });
  });

  // ===== SCROLL SUAVE CON OFFSET =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        e.preventDefault();
        var offset = 70;
        var top = destino.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== ETIQUETA DE BADGE POR TIPO =====
  var TIPOS_BADGE = {
    danza: { icono: '🩰', texto: 'Danza' },
    musica: { icono: '🎵', texto: 'Música' },
    gastronomia: { icono: '🍲', texto: 'Gastro' },
    artesania: { icono: '🗿', texto: 'Taller' },
    cultural: { icono: '🎭', texto: 'Cultural' },
    adm: { icono: '📋', texto: 'Adm' }
  };

  filas.forEach(function (fila) {
    var tipo = fila.getAttribute('data-tipo');
    var info = TIPOS_BADGE[tipo];
    if (info) {
      var badge = document.createElement('span');
      badge.className = 'badge-tipo badge-tipo--' + tipo;
      badge.textContent = info.icono + ' ' + info.texto;
      var actTd = fila.querySelector('td[data-label="Actividad"]');
      if (actTd) {
        actTd.insertBefore(badge, actTd.firstChild);
      }
    }
  });

  // ===== ZEBRA STRIPING (ignora separadores) =====
  function aplicarZebra() {
    var visibles = document.querySelectorAll('.actividad');
    var index = 0;
    visibles.forEach(function (f) {
      if (f.style.display !== 'none') {
        f.classList.toggle('zebra', index % 2 === 1);
        index++;
      }
    });
  }
  aplicarZebra();

  // ===== CALENDARIO: BOTONES GUARDAR =====
  var MESES = { 'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11 };

  function parsearFecha(texto) {
    var p = texto.trim().split(' ');
    var dia = parseInt(p[1], 10);
    return new Date(2026, MESES[p[2]], dia);
  }

  function aPad(n) {
    return String(n).padStart(2, '0');
  }

  function aFormatoFecha(d) {
    return d.getFullYear() + aPad(d.getMonth() + 1) + aPad(d.getDate());
  }

  function aFormatoHora(d) {
    return aPad(d.getHours()) + aPad(d.getMinutes()) + '00';
  }

  function aFechaHora(fecha, horaStr) {
    var d = new Date(fecha);
    if (horaStr) {
      var h = horaStr.split(':');
      d.setHours(parseInt(h[0], 10), parseInt(h[1], 10), 0);
    }
    return d;
  }

  function limpiarTitulo(txt) {
    return txt.replace(/[📝📋🎲🎭🩰🎵🎶🍲🗿🏆🕯️🎊🏛️🎉🎨🍽️]/g, '').trim().replace(/\s+/g, ' ');
  }

  function extraerHoraInicio(lugar, detalles) {
    var texto = lugar + ' ' + detalles;
    var m = texto.match(/(\d{1,2}):(\d{2})\s*(?:–|-)\s*\d{1,2}:\d{2}/);
    if (m) return m[1] + ':' + m[2];
    m = texto.match(/\((\d{1,2}:\d{2})\s*h/);
    if (m) return m[1];
    m = texto.match(/^(\d{1,2}:\d{2})\s*(?:–|-)/);
    if (m) return m[1];
    m = texto.match(/Hasta las (\d{1,2}:\d{2})/);
    if (m) return m[1];
    return null;
  }

  function extraerHoraFin(lugar, detalles) {
    var texto = lugar + ' ' + detalles;
    var m = texto.match(/(\d{1,2}:\d{2})\s*(?:–|-)\s*(\d{1,2}:\d{2})/);
    if (m) return m[2];
    return null;
  }

  function urlGoogleCalendar(fecha, titulo, lugar, desc, horaIni, horaFin) {
    var inicio = aFechaHora(fecha, horaIni);
    var fin;
    if (horaFin) {
      fin = aFechaHora(fecha, horaFin);
    } else if (horaIni) {
      fin = new Date(inicio.getTime() + 3600000);
    } else {
      fin = new Date(fecha);
      fin.setDate(fin.getDate() + 1);
    }

    var inicioStr = aFormatoFecha(inicio) + 'T' + aFormatoHora(inicio);
    var finStr = aFormatoFecha(fin) + 'T' + aFormatoHora(fin);
    var url = 'https://www.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + encodeURIComponent(titulo)
      + '&dates=' + inicioStr + '/' + finStr
      + '&details=' + encodeURIComponent(desc)
      + '&location=' + encodeURIComponent(lugar)
      + '&sf=true&output=xml';
    return url;
  }

  function descargarICS(fecha, titulo, lugar, desc, horaIni, horaFin) {
    var inicio = aFechaHora(fecha, horaIni);
    var fin;
    if (horaFin) {
      fin = aFechaHora(fecha, horaFin);
    } else if (horaIni) {
      fin = new Date(inicio.getTime() + 3600000);
    } else {
      fin = new Date(fecha);
      fin.setDate(fin.getDate() + 1);
    }

    var inicioStr = aFormatoFecha(inicio) + 'T' + aFormatoHora(inicio);
    var finStr = aFormatoFecha(fin) + 'T' + aFormatoHora(fin);

    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Arequipa es Fiesta//486 Aniversario//ES',
      'BEGIN:VEVENT',
      'DTSTART:' + inicioStr,
      'DTEND:' + finStr,
      'SUMMARY:' + titulo,
      'DESCRIPTION:' + desc.replace(/\n/g, '\\n'),
      'LOCATION:' + lugar,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'evento.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  // Añadir columna Guardar a cada fila
  filas.forEach(function (fila) {
    var td = document.createElement('td');
    td.setAttribute('data-label', 'Guardar');

    var btn = document.createElement('button');
    btn.className = 'btn-calendario';
    btn.setAttribute('aria-label', 'Guardar en calendario');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
    td.appendChild(btn);

    var popup = document.createElement('div');
    popup.className = 'cal-popup';
    popup.innerHTML = '<button class="cal-popup-btn cal-popup-gcal">📅 Google Calendar</button><button class="cal-popup-btn cal-popup-ics">⬇️ Descargar .ics</button>';
    td.appendChild(popup);

    fila.appendChild(td);

    // Datos del evento
    var celdas = fila.querySelectorAll('td');
    var fechaTexto = celdas[0].textContent.trim();
    var actividadTexto = celdas[1].textContent.trim();
    var lugarTexto = celdas[2].textContent.trim();
    var detallesTexto = celdas[3].textContent.trim();

    var fecha = parsearFecha(fechaTexto);
    var titulo = limpiarTitulo(actividadTexto);
    var horaIni = extraerHoraInicio(lugarTexto, detallesTexto);
    var horaFin = extraerHoraFin(lugarTexto, detallesTexto);
    var desc = 'Actividad del 486° Aniversario de Arequipa\n\n' + detallesTexto;

    // Popup
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var abierto = popup.classList.contains('visible');
      cerrarTodosLosPopups();
      if (!abierto) {
        popup.classList.add('visible');
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
      }
    });

    popup.querySelector('.cal-popup-gcal').addEventListener('click', function (e) {
      e.stopPropagation();
      window.open(urlGoogleCalendar(fecha, titulo, lugarTexto, desc, horaIni, horaFin), '_blank');
      popup.classList.remove('visible');
    });

    popup.querySelector('.cal-popup-ics').addEventListener('click', function (e) {
      e.stopPropagation();
      descargarICS(fecha, titulo, lugarTexto, desc, horaIni, horaFin);
      popup.classList.remove('visible');
    });
  });

  function cerrarTodosLosPopups() {
    document.querySelectorAll('.cal-popup.visible').forEach(function (p) {
      p.classList.remove('visible');
    });
  }

  document.addEventListener('click', function () {
    cerrarTodosLosPopups();
  });

})();
