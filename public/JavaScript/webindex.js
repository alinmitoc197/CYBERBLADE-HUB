document.addEventListener("DOMContentLoaded", () => {
    const contenedorPrincipal = document.getElementById('contenido-principal');

    const hamburguesa = document.getElementById('hamburguesa');
    const menu = document.getElementById('menu');

    if (hamburguesa && menu) {
        hamburguesa.addEventListener('click', () => {
            hamburguesa.classList.toggle('activo');
            menu.classList.toggle('abierto');
        });
    }

    document.querySelectorAll('.menu > li').forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (!submenu) return;
        item.querySelector('a').addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();
                const estaAbierto = item.classList.contains('abierto');
                document.querySelectorAll('.menu > li').forEach(i => i.classList.remove('abierto'));
                if (!estaAbierto) item.classList.add('abierto');
            }
        });
    });

    function enlazarEventos() {
        const enlaces = document.querySelectorAll('.enlace');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', function(evento) {
                evento.preventDefault();
                const archivoDestino = this.getAttribute('data-archivo');
                if (archivoDestino) {
                    cargarPagina(archivoDestino);
                }
            });
        });
    }

    function inicializarVideos() {
        const videos = document.querySelectorAll('.video');
        videos.forEach(video => {
            video.removeAttribute('controls');
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    video.setAttribute('controls', 'true');
                } else {
                    video.pause();
                    video.removeAttribute('controls');
                }
            });
        });
    }

    function inicializarVideosThumbs() {
        document.querySelectorAll('.video-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const src = this.dataset.src;
                const iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope";
                iframe.allowFullscreen = true;
                iframe.setAttribute('disablepictureinpicture', '');
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                this.innerHTML = '';
                this.appendChild(iframe);
            });
        });
    }

    let ofertasCargadas = false;

    async function cargarOfertas() {
        const contenedor = document.getElementById('ofertas-api');
        if (!contenedor) return;
        if (ofertasCargadas) return; 
        
        try {
            const respuesta = await fetch(
                'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=6'
            );
            
            if (respuesta.status === 429) {
                contenedor.innerHTML = '<p style="color: white; text-align:center; margin-top:5vh;">Demasiadas peticiones. Espera un momento y recarga la página.</p>';
                return;
            }

            if (!respuesta.ok) throw new Error('Error: ' + respuesta.status);
            
            const juegos = await respuesta.json();
            const top6 = juegos.slice(0, 6);
            
            contenedor.innerHTML = '';
            ofertasCargadas = true;
            
            top6.forEach(juego => {
                const descuento = Math.round(juego.savings);
                contenedor.innerHTML += `
                    <div class="ofer-c" style="
                        background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%), 
                        url('${juego.thumb}'); 
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-color: #111;">
                        <div class="ofer-l">
                            <div class="ofer-n" style="color:white;text-align:center;font-size:0.8vw;line-height:3vh;">PC</div>
                            <div class="ofer-s"></div>
                            <div class="ofer-d" style="color:white;text-align:center;font-size:0.8vw;line-height:3vh;">-${descuento}%</div>
                        </div>
                        <div class="nombre-juego" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">${juego.title}</div>
                        <div class="precios">
                            <div class="precio1" style="text-decoration:line-through;">${juego.normalPrice}€</div>
                            <div class="precio2">${juego.salePrice}€</div>
                        </div>
                    </div>
                `;
            });

        } catch (error) {
            contenedor.innerHTML = '<p style="color:white;text-align:center;margin-top:5vh;">Error al cargar las ofertas.</p>';
            console.error('cargarOfertas:', error);
        }
    }

    function cargarPagina(url) {
        fetch(url)
            .then(respuesta => {
                if (!respuesta.ok) throw new Error('Error: ' + respuesta.status);
                return respuesta.text();
            })
            .then(html => {
                contenedorPrincipal.innerHTML = html;
                window.scrollTo(0, 0);
                enlazarEventos();
                inicializarVideos();
                inicializarVideosThumbs();
                cargarOfertas();
            })
            .catch(error => {
                console.error('Hubo un problema:', error);
                contenedorPrincipal.innerHTML = `
                    <div class="container text-center text-white mt-5">
                        <h2>Error 404</h2>
                        <p>No se pudo cargar el contenido.</p>
                    </div>`;
            });
    }

    enlazarEventos();
});