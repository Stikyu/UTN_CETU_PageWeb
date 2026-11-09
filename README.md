# Página web del Centro de Estudiantes — UTN San Nicolás

Sitio web del **Centro de Estudiantes de la UTN Facultad Regional San Nicolás**.
Reúne en un solo lugar a los integrantes del centro, los apuntes y videos de cada
materia, los grupos de WhatsApp y un formulario de contacto.

Es un sitio **estático**: solo HTML, CSS y JavaScript, sin frameworks, sin
instalaciones y sin paso de compilación. Para editarlo alcanza con un editor de
texto. Para verlo alcanza con un navegador.

> **Estado:** en desarrollo. Los nombres, teléfonos y links de grupos son de
> ejemplo y hay que reemplazarlos por los reales (ver [Pendientes](#pendientes)).

---

## Índice

- [Páginas del sitio](#páginas-del-sitio)
- [Estructura de archivos](#estructura-de-archivos)
- [Apuntes y videos cargados](#apuntes-y-videos-cargados)
- [Funcionalidades](#funcionalidades)
- [Diseño](#diseño)
- [Cómo editar el contenido](#cómo-editar-el-contenido)
- [Ver la página en tu compu](#ver-la-página-en-tu-compu)
- [Publicar en internet](#publicar-en-internet)
- [Cómo trabajamos con Git](#cómo-trabajamos-con-git)
- [Pendientes](#pendientes)
- [Historial de cambios](#historial-de-cambios)

---

## Páginas del sitio

| Página | Archivo | Qué tiene |
|---|---|---|
| **Inicio** | `index.html` | Presentación del centro y accesos rápidos a los grupos de WhatsApp y a los integrantes. |
| **Quiénes somos** | `quienes-somos.html` | Lista de integrantes con su nombre, cargo (Presidente/a, Secretario/a, Tesorero/a, Vocal), teléfono y botón de WhatsApp. |
| **Apuntes y videos** | `recursos.html` | Material de estudio organizado por materia, con buscador. Se divide en **Materias básicas** y **Materias específicas** (una sección desplegable por carrera). |
| **Grupos** | `grupos.html` | Tarjetas con el link de invitación a cada grupo de WhatsApp (1er año, 2do año, 3er año, General del centro), con buscador. |
| **Contacto** | `contacto.html` | Integrantes para escribir directo y un formulario que arma el mensaje y lo abre en WhatsApp o en el mail. |
| **Error 404** | `404.html` | Se muestra cuando alguien entra a un link que no existe, con botones para volver. |

Todas las páginas comparten el mismo encabezado con menú, el mismo pie de página
(contacto y secciones), la misma hoja de estilos y el mismo script.

---

## Estructura de archivos

```
PaginasWEBs/
├── index.html              Inicio
├── quienes-somos.html      Integrantes del centro
├── recursos.html           Apuntes y videos por materia
├── grupos.html             Grupos de WhatsApp
├── contacto.html           Formulario de contacto
├── 404.html                Página de "no encontrado"
├── style.css               Todos los estilos del sitio
├── script.js               Todo el comportamiento (menú, buscadores, formulario…)
├── favicon.svg             Ícono de la pestaña del navegador
├── og-image.png            Imagen de vista previa al compartir el link (1200×630)
├── README.md               Este archivo
└── apuntes/                PDFs propios, una carpeta por materia
    ├── algebra/
    ├── algoritmos/
    ├── analisis-1/
    ├── led/
    └── paradigmas/
```

---

## Apuntes y videos cargados

Los PDFs están en la carpeta `apuntes/` y se abren en una pestaña nueva. Las
materias sin material muestran sus botones en gris con la etiqueta
**"Próximamente"**.

### Materias básicas

| Materia | Material | Archivo | Peso |
|---|---|---|---|
| Análisis Matemático I | Material de estudio 2026 | `apuntes/analisis-1/Analisis-1-Material-de-Estudio-2026.pdf` | 10,2 MB |
| Análisis Matemático II | — | *Próximamente* | |
| Álgebra y Geometría Analítica | Apunte completo | `apuntes/algebra/Algebra-y-Geometria-Analitica.pdf` | 14,4 MB |
| Física I | — | *Próximamente* | |
| Física II | — | *Próximamente* | |
| Inglés I, II y III | — | *Próximamente* | |
| Ingeniería y Sociedad | — | *Próximamente* | |

### Materias específicas

#### Ingeniería en Sistemas de Información

| Materia | Material | Archivo | Peso |
|---|---|---|---|
| Algoritmos y Estructuras de Datos | Apunte de cátedra (v3) | `apuntes/algoritmos/AED-Apunte-v3.pdf` | 3,7 MB |
| Lógica y Estructuras Discretas | Apunte de cátedra 2026 | `apuntes/led/LED-Apuntes-de-Catedra-2026.pdf` | 3,9 MB |
| Sistemas y Procesos de Negocio | — | *Próximamente* | |
| Arquitectura de Computadoras | — | *Próximamente* | |
| Paradigmas de Programación | Apuntes teóricos, unidades 1 a 6 | `apuntes/paradigmas/U1-…pdf` a `U6-…pdf` | 5,2 MB en total |
| | Video: Paradigma orientado a objetos | [YouTube](https://youtu.be/SI7O81GMG2A) | |
| Análisis de Sistemas de Información | — | *Próximamente* | |
| Sintaxis y Semántica de los Lenguajes | — | *Próximamente* | |
| Sistemas Operativos | — | *Próximamente* | |

Las unidades de Paradigmas son: U1 Introducción, U2 Bases de programación,
U3 Orientado a objetos, U4 Orientado a eventos, U5 Funcional y U6 Lógico.

#### Otras carreras

Las secciones de **Mecánica, Industrial, Eléctrica, Metalúrgica y Electrónica**
ya existen en la página. Por ahora muestran *"Todavía no cargamos las materias de
esta carrera"* hasta que tengamos la lista de materias de cada una.

---

## Funcionalidades

Todo el comportamiento está en `script.js`, en JavaScript puro (sin librerías).

### Menú para celulares
En pantallas chicas el menú se convierte en un botón ☰ que abre y cierra la
lista de secciones. Se cierra solo al elegir una sección o al tocar afuera.

### Buscadores
`recursos.html` y `grupos.html` tienen un buscador que filtra mientras escribís.

- Ignora mayúsculas y tildes: "algebra" encuentra "Álgebra".
- En apuntes también busca por **nombre de carrera**: si escribís "sistemas",
  aparecen todas las materias de Sistemas.
- Las carreras que tienen resultados se despliegan solas. Las que no tienen
  resultados se ocultan.
- Si no hay ningún resultado, muestra un mensaje.

Para que algo sea buscable se usan dos atributos en el HTML:
`data-search-group` marca una sección que se oculta si queda vacía, y
`data-search-label="…"` le da un nombre por el que también se puede buscar.

### Formulario de contacto
Pide **Nombre**, **Apellido**, **Mail de la facultad**, **Año**, **Carrera** y
**Mensaje**.

- **Mail:** solo acepta direcciones que terminan en `@frsn.utn.edu.ar`. Si no,
  muestra *"Usá tu mail de la facultad"*. El dominio se cambia en `script.js`,
  en la variable `DOMINIO`.
- **Año:** 1er año, 2do año, 3er año, 4to año, 5to año o Graduado/a.
- **Carrera:** Ingeniería Mecánica, en Sistemas de Información, Electrónica,
  Eléctrica, Metalúrgica o Industrial.
- Al enviar, arma un mensaje con todos los datos y lo abre en **WhatsApp**
  (al número del pie de página) o en el **cliente de mail** (al mail del pie de
  página). La página no guarda ni envía datos a ningún servidor.
- Marca en rojo los campos incompletos. Al enviar no borra lo escrito, por si
  la persona cierra WhatsApp sin mandar. Para empezar de cero está el botón
  "Borrar".

### Links "Próximamente"
Cualquier botón de apunte, video o grupo con `href="#"` se muestra
automáticamente en gris, con la etiqueta **"Próximamente"**, y no se puede
clickear. Cuando se le pone el link real, se activa solo, sin tocar nada más.

### Peso de los PDF
Al lado de cada PDF propio aparece su tamaño (por ejemplo "3,7 MB"), para que
nadie descargue algo pesado con datos móviles sin saberlo. Esto funciona con la
página publicada o con un servidor local, no abriendo el archivo con doble clic.

### Botones de copiar
En el pie de página, el teléfono y el mail tienen un botón **"Copiar"** que los
copia al portapapeles.

### Otros detalles
- Animación suave de aparición al bajar por la página. Se desactiva si la
  persona tiene configurado "reducir movimiento" en su dispositivo.
- Botón flotante **↑** para volver arriba.
- Metadatos para que, al compartir el link por WhatsApp o redes, aparezca una
  vista previa con título, descripción e imagen.

---

## Diseño

- **Tema oscuro** con acentos en índigo (`#6366f1`) y cian (`#22d3ee`).
- Tipografía **Inter** (Google Fonts).
- Los colores, bordes y sombras están definidos como variables al principio de
  `style.css` (`:root`). Cambiando ahí se cambia el color de todo el sitio.
- **Responsive:** se adapta a celular, tablet y compu (cortes en 820 px y
  640 px).
- En apuntes, las materias se acomodan en una grilla que llena los huecos
  automáticamente. Las tarjetas con mucho material (como Paradigmas) ocupan el
  ancho completo con la clase `subject-wide`.

---

## Cómo editar el contenido

Los lugares que hay que completar con datos reales están marcados en el HTML con
comentarios `<!-- EDITAR: … -->`.

### Agregar un apunte (PDF)

1. Copiar el PDF a `apuntes/<materia>/`. Usar un nombre **sin espacios ni
   tildes**, por ejemplo `apuntes/fisica-1/Guia-de-ejercicios-2026.pdf`.
2. En `recursos.html`, buscar la tarjeta de la materia y reemplazar el
   `href="#"` del botón por la ruta del archivo:

   ```html
   <a class="res-link" href="apuntes/fisica-1/Guia-de-ejercicios-2026.pdf" target="_blank" rel="noopener">
     …ícono…
     Guía de ejercicios 2026 (PDF)
   </a>
   ```

3. Si una materia tiene varios archivos, se pueden agrupar con un título
   pequeño, `<p class="res-label">Apuntes teóricos (PDF)</p>`, como en
   Paradigmas.

### Agregar un video o un link de Google Drive
Igual que un PDF, pero poniendo la URL completa en el `href`
(`https://youtu.be/…` o `https://drive.google.com/…`).

### Agregar una materia
Copiar una tarjeta `<div class="subject">…</div>` existente dentro del bloque que
corresponda, ya sea Materias básicas o la carrera dentro de Materias
específicas, y cambiarle el nombre. Para una carrera que todavía no tiene
materias, reemplazar el párrafo `career-empty` por una grilla
`<div class="subject-grid">` con las tarjetas, y actualizar el contador de
materias que aparece al lado del nombre de la carrera.

### Integrantes y teléfonos
En `quienes-somos.html` y `contacto.html`, cambiar nombre, cargo, teléfono y
link de WhatsApp de cada fila. El link de WhatsApp tiene el formato
`https://wa.me/549XXXXXXXXXX`: 54 es Argentina, después va 9 y el número con
característica, sin el 0 ni el 15.

> Ejemplo: (0336) 15‑412‑3456 → `https://wa.me/5493364123456`

El teléfono y el mail del **pie de página** también los usa el formulario de
contacto. Hay que cambiarlos en el pie de **todas** las páginas.

### Grupos de WhatsApp
En `grupos.html`, reemplazar cada `href="#"` por el link de invitación del grupo
(`https://chat.whatsapp.com/…`).

### Cuidado con los apuntes
- **Material de cátedra:** los profesores están de acuerdo con que se publiquen
  sus apuntes.
- **Libros comerciales de editoriales:** no subirlos. Tienen derechos de autor.
  En su lugar se puede indicar que están en la biblioteca o enlazar al e-Libro
  del campus.
- **Límite de tamaño:** GitHub no acepta archivos de más de **100 MB**. Los PDFs
  de más de ~25 MB conviene comprimirlos o subirlos a Google Drive y enlazarlos,
  para que el repositorio no se vuelva pesado.

---

## Ver la página en tu compu

**Opción rápida:** abrir `index.html` con doble clic. Funciona todo menos el
peso de los PDF.

**Opción completa:** levantar un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

y entrar a <http://localhost:8000>. También sirve la extensión **Live Server**
de VS Code.

---

## Publicar en internet

La forma más simple y gratuita es **GitHub Pages**. Todavía no está activado.

1. En el repositorio de GitHub: **Settings → Pages**.
2. En *Source* elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Guardar. En unos minutos la página queda en
   `https://stikyu.github.io/UTN_CETU_PageWeb/`.
4. Una vez publicada, en cada HTML cambiar la etiqueta `og:image` por la URL
   completa de la imagen, por ejemplo
   `https://stikyu.github.io/UTN_CETU_PageWeb/og-image.png`. Si no, WhatsApp no
   muestra la vista previa.

`404.html` funciona automáticamente en GitHub Pages.

---

## Cómo trabajamos con Git

- La rama principal es `main`. Es la que se publica.
- Los cambios se hacen en una rama aparte y se suben con un **Pull Request**.
  Se revisan y se fusionan a `main` desde GitHub.
- **Este README se actualiza junto con cada cambio del proyecto:** material
  nuevo, páginas nuevas, funcionalidades o pendientes resueltos.

---

## Pendientes

- [ ] Reemplazar los integrantes de ejemplo por los reales (nombres, cargos, teléfonos).
- [ ] Poner el teléfono y el mail reales en el pie de todas las páginas.
- [ ] Cargar los links reales de los grupos de WhatsApp.
- [ ] Material y links de **Física I**, **Física II** y **Análisis Matemático II**.
- [ ] Material del resto de las materias básicas y de Sistemas.
- [ ] Lista de materias de **Mecánica, Industrial, Eléctrica, Metalúrgica y Electrónica**.
- [ ] Activar GitHub Pages y actualizar `og:image` con la URL completa.

---

## Historial de cambios

### Noviembre 2026
- **README** completo con todo el proyecto (este archivo).
- **Apuntes nuevos:** Análisis Matemático I (Material de estudio 2026), Álgebra y
  Geometría Analítica (apunte completo), Algoritmos y Estructuras de Datos
  (apunte v3) y Lógica y Estructuras Discretas (apunte 2026).
- **Mejoras generales:**
  - Botones "Próximamente" automáticos.
  - Peso de los PDF.
  - Vista previa al compartir (favicon y `og-image`).
  - Página 404.
  - Botones de copiar.
  - Teléfonos de ejemplo con la característica de San Nicolás (3364).
- **Apuntes y videos reorganizado** en Materias básicas y Materias específicas,
  con una sección desplegable por carrera y buscador por materia o por carrera.
- **Paradigmas de Programación:** apuntes teóricos de las 6 unidades y video de
  orientado a objetos.
- **Formulario de contacto nuevo:**
  - Nombre y apellido separados.
  - Mail obligatorio de la facultad (`@frsn.utn.edu.ar`).
  - Año: de 1ro a 5to, más Graduado/a.
  - Carrera.
- **JavaScript:** menú para celulares, buscadores, formulario que abre WhatsApp
  o el mail, animaciones y botón de volver arriba.
- **Nuevo diseño** con tema oscuro.

### Septiembre 2026
- Primera versión del sitio: páginas HTML y hoja de estilos.
