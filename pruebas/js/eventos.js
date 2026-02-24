let currentPage = 1;
const contenedorEventos = document.getElementById('eventos');
const numeroPagina = document.getElementById('numeroPagina');
const btnMas = document.getElementById('paginaMas');
const btnMenos = document.getElementById('paginaMenos');

// Función principal para obtener datos
async function cargarEventos(page = 1) {
    const url = `https://hackathon.lausnchez.es/api/v1/eventosweb?page=${page}`;
    
    try {
        const response = await fetch(url);
        const res = await response.json();
        
        // Renderizamos
        renderizarEventos(res.data);
        actualizarControles(res);
        
    } catch (error) {
        console.error("Error cargando eventos:", error);
        contenedorEventos.innerHTML = `<p class="text-white text-center">Error al cargar los eventos.</p>`;
    }
}

function renderizarEventos(eventos) {
    contenedorEventos.innerHTML = ''; // Limpiar contenedor

    if (eventos.length === 0) {
        contenedorEventos.innerHTML = '<p class="text-slate-400 text-center">No hay eventos disponibles.</p>';
        return;
    }

    eventos.forEach(evento => {
        // Formatear fecha
        const fecha = new Date(evento.fecha_inicio_evento).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
        });

        const card = `
            <div class="group bg-slate-800/40 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                                ${evento.categoria.nombre}
                            </span>
                            ${evento.es_accessible ? '<span class="text-emerald-400" title="Accesible"><i class="bi bi-person-wheelchair"></i></span>' : ''}
                        </div>
                        <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">${evento.nombre}</h3>
                        <div class="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-slate-400 text-sm">
                            <span class="flex items-center gap-1.5"><i class="bi bi-calendar3 text-blue-500"></i> ${fecha}</span>
                            <span class="flex items-center gap-1.5"><i class="bi bi-geo-alt text-red-500"></i> ${evento.ubicacion}</span>
                            <span class="flex items-center gap-1.5"><i class="bi bi-building text-slate-500"></i> ${evento.entidad.nombre}</span>
                        </div>
                    </div>
                    <button class="w-full md:w-auto px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
        contenedorEventos.innerHTML += card;
    });
}

function actualizarControles(res) {
    currentPage = res.current_page;
    numeroPagina.innerText = currentPage;

    // Lógica de botones
    btnMenos.disabled = !res.prev_page_url;
    btnMas.disabled = !res.next_page_url;
}

// Event Listeners
btnMas.addEventListener('click', () => {
    cargarEventos(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnMenos.addEventListener('click', () => {
    if (currentPage > 1) {
        cargarEventos(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Carga inicial
document.addEventListener('DOMContentLoaded', () => cargarEventos(1));