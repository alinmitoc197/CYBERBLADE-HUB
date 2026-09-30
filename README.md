# CYBERBLADE HUB

CYBERBLADE HUB es una página web multipágina dedicada a los videojuegos. Reúne categorías de juegos, fichas detalladas con tráilers, una sección de ofertas obtenidas en tiempo real y un ranking de los juegos del año (GOTY). Está desarrollada con HTML, CSS y JavaScript, sin frameworks ni proceso de compilación.

Se realizó como proyecto de primer curso del ciclo formativo de grado superior en Desarrollo de Aplicaciones Multiplataforma (DAM), en el IES Ramón del Valle-Inclán de Sevilla.

## Contenido de la web

La página principal presenta el proyecto y da acceso al resto de secciones a través de un menú de navegación. Desde él se llega a seis categorías de juegos: acción, aventuras, acción y aventura, RPG, deportes y carreras, y shooters. Cada categoría muestra una selección de títulos con su portada.

Además de las categorías, seis juegos cuentan con una ficha propia con diseño, tipografías y paleta de colores independientes: Ghost of Tsushima, Marvel's Spider-Man 2, God of War Ragnarök, Grand Theft Auto V, The Witcher 3 y Red Dead Redemption 2. Cada ficha incluye un tráiler de YouTube que solo se carga cuando el usuario pulsa sobre la miniatura, con el fin de reducir el peso inicial de la página.

La sección de ofertas consulta la API pública de CheapShark y muestra los primeros juegos de PC cuyo precio es inferior a 15 euros, junto con el descuento aplicado, el precio original y el precio final. La sección de GOTY presenta el ranking de los años 2016 a 2025 a partir de un archivo XML. Por último, la página de contacto ofrece un formulario con estilo propio.

## Tecnologías utilizadas

- HTML5 para la estructura de todas las páginas.
- CSS3, con una hoja de estilos independiente para cada página y tipografías personalizadas cargadas mediante `@font-face`.
- Bootstrap 5.3.2, cargado desde CDN, únicamente para el sistema de rejilla.
- JavaScript estándar (ES6): manipulación del DOM, `fetch`, `async/await` y `DOMParser`.
- XML como formato de datos para el ranking de GOTY.
- API REST de CheapShark para las ofertas.
- GitHub Pages, con despliegue automático mediante GitHub Actions.

## Estructura del proyecto

La carpeta raíz del proyecto se llama `Web`. Contiene la carpeta `public`, donde está todo el código de la página, y los archivos de documentación y despliegue del repositorio.

```
Web/
├── public/
│   ├── CSS/
│   ├── fonts/
│   ├── imagenes/
│   ├── JavaScript/
│   │   ├── gotys.js
│   │   └── webindex.js
│   ├── index.html
│   ├── accion.html
│   ├── accionyaventura.html
│   ├── aventuras.html
│   ├── deporte-carrera.html
│   ├── rpg.html
│   ├── shooters.html
│   ├── GhostOfTsushima.html
│   ├── Spiderman.html
│   ├── godofwar.html
│   ├── gta.html
│   ├── witcher.html
│   ├── read.html
│   ├── ofertas.html
│   ├── topjuegos.html
│   ├── gotys.html
│   ├── gotys.xml
│   ├── contacto.html
│   └── ejemplo.html
├── .github/
│   └── workflows/
│       └── pages.yml
├── .gitignore
├── LICENSE
└── README.md
```

### Carpeta `public`

Es la carpeta que se publica en internet. Todo lo que la web necesita para funcionar está dentro de ella.

**Páginas HTML.** `index.html` es la página principal y la que carga al resto. Las páginas `accion.html`, `accionyaventura.html`, `aventuras.html`, `deporte-carrera.html`, `rpg.html` y `shooters.html` corresponden a las categorías. `GhostOfTsushima.html`, `Spiderman.html`, `godofwar.html`, `gta.html`, `witcher.html` y `read.html` son las fichas individuales de juegos. `ofertas.html`, `topjuegos.html`, `gotys.html` y `contacto.html` son el resto de secciones. `ejemplo.html` es una página auxiliar que no está enlazada desde el menú.

**`CSS`.** Almacena una hoja de estilos por página: `indexweb.css` para la principal; `accion.css`, `accionyaventura.css`, `aventura.css`, `depor-carrera.css`, `rpg.css` y `shooters.css` para las categorías; `ghost.css`, `Spiderman.css`, `godofwar.css`, `gta.css`, `witcher.css` y `read2.css` para las fichas; y `ofertas.css`, `topjuegos.css`, `webgotys.css` y `contacto.css` para el resto.

**`fonts`.** Reúne los archivos de las tipografías personalizadas que se aplican desde las hojas de estilo.

**`imagenes`.** Guarda las portadas, fondos y demás imágenes que usan las páginas.

**`JavaScript`.** Contiene dos archivos. `webindex.js` es el principal: controla el menú de navegación, los submenús en dispositivos móviles, la carga dinámica de páginas, la reproducción de los tráilers y la consulta a la API de ofertas. `gotys.js` lee el archivo `gotys.xml` y genera las tarjetas del ranking de GOTY.

**`gotys.xml`.** Contiene los datos del ranking: año, juego y posición.

### Carpeta `.github`

Contiene el archivo `workflows/pages.yml`, que define el despliegue automático de la carpeta `public` en GitHub Pages cada vez que se sube un cambio a la rama `main`.

## Funcionamiento interno

`index.html` funciona como estructura fija de la web: contiene la cabecera, el menú y un contenedor central llamado `contenido-principal`. Cuando el usuario pulsa un enlace del menú, la función `cargarPagina()` de `webindex.js` solicita con `fetch` el HTML de la sección elegida y lo inserta en ese contenedor, de modo que la navegación no recarga la página completa. Tras insertar el contenido, el script vuelve a asociar los eventos necesarios y, si la sección lo requiere, inicializa los vídeos o consulta la API de ofertas.

En el caso de las ofertas, la petición se realiza con `async/await` y se controlan tanto los errores de red como el código 429 de exceso de peticiones, mostrando un mensaje al usuario en lugar de dejar el bloque vacío. En el caso del ranking, `gotys.js` descarga `gotys.xml`, lo interpreta con `DOMParser` y crea una tarjeta por cada juego.

## Ejecución en local

Como la web utiliza `fetch` para cargar las secciones, no funciona abriendo `index.html` directamente con doble clic: es necesario servirla desde un servidor local. Desde la carpeta `Web`:

```bash
cd public
python -m http.server 8000
```

Después se abre `http://localhost:8000` en el navegador. Otra opción es usar la extensión Live Server de Visual Studio Code.

## Publicación

El repositorio incluye el archivo `.github/workflows/pages.yml`, que publica automáticamente la carpeta `public` cada vez que se sube un cambio a la rama `main`. Para activarlo, en el repositorio de GitHub hay que entrar en Settings, después en Pages, y en el apartado Source seleccionar GitHub Actions. La dirección resultante tiene la forma `https://usuario.github.io/nombre-del-repositorio/`.

Al publicarse en una subruta, todas las rutas de imágenes, fuentes, estilos y scripts deben ser relativas. Por ello las hojas de estilo referencian los recursos como `../imagenes/...` y `../fonts/...`, y no como `/imagenes/...`.

## Aviso legal

Proyecto educativo y sin ánimo de lucro. Los nombres, portadas, capturas, tráilers y marcas de los videojuegos pertenecen a sus respectivos propietarios y se utilizan únicamente con fines académicos. El código se distribuye bajo licencia MIT (ver archivo `LICENSE`).

## Autor

Alin Mitoc. Estudiante de Desarrollo de Aplicaciones Multiplataforma, Sevilla.
LinkedIn: https://linkedin.com/in/alin-mitoc-758811385
