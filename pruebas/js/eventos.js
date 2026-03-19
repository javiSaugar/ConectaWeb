// Configuración de paginación y selectores
let currentPage = 1;
const contenedorEventos = document.getElementById('eventos');
const numeroPagina = document.getElementById('numeroPagina');
const btnMas = document.getElementById('paginaMas');
const btnMenos = document.getElementById('paginaMenos');

/**
 * Diccionario de colores por categoría
 * Personalizado para que resalten sobre el fondo azul oscuro
 */
const coloresCategorias = {
    "Arte": "bg-rose-500/20 text-rose-300 border-rose-500/30",
    "Cultura": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Deportes": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Tecnología": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "Música": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "Default": "bg-slate-500/20 text-slate-300 border-slate-500/30"
};

/**
 * Obtener datos de la API
 */
async function cargarEventos(page = 1) {
    const url = `https://hackathon.lausnchez.es/api/v1/eventosweb?page=${page}`;
    
    try {
        const response = await fetch(url);
        const res = await response.json();
        
        renderizarEventos(res.data);
        actualizarControles(res);
        
    } catch (error) {
        console.error("Error cargando eventos:", error);
        contenedorEventos.innerHTML = `<p class="text-blue-300/50 text-center py-10">Error de conexión.</p>`;
    }
}

/**
 * Renderiza las tarjetas con el nuevo diseño
 */
function renderizarEventos(eventos) {
    contenedorEventos.innerHTML = ''; 

    if (!eventos || eventos.length === 0) {
        contenedorEventos.innerHTML = '<p class="text-blue-200/40 text-center col-span-full py-10">No hay eventos disponibles.</p>';
        return;
    }

    eventos.forEach(evento => {
        // Mapeo de categoría y color lateral
        const categoriaNombre = evento.categoria?.nombre || "General";
        const clasesColor = coloresCategorias[categoriaNombre] || coloresCategorias["Default"];
        const colorBarra = clasesColor.split(' ')[1].replace('text', 'bg');

        // Formateo de fecha
        const fecha = new Date(evento.fecha_inicio_evento).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
        });

        const card = `
            <div class="group relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 border border-blue-400/10 p-7 rounded-[2rem] shadow-2xl overflow-hidden hover:border-blue-400/30 transition-all duration-500">
                
                <div class="absolute left-0 top-0 h-full w-1.5 ${colorBarra} opacity-40 group-hover:opacity-100 transition-all"></div>

                <div class="relative z-10">
                    <div class="flex flex-wrap gap-2 mb-5">
                        <span class="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${clasesColor}">
                            ${categoriaNombre}
                        </span>
                        
                        ${evento.es_accesible ? `
                            <span class="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-600/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                                <i class="bi bi-person-wheelchair text-blue-400"></i> Accesible
                            </span>
                        ` : ''}
                    </div>
                    
                    <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                        ${evento.nombre}
                    </h3>
                    
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 text-blue-100/60 text-sm">
                            <i class="bi bi-calendar3 text-blue-400"></i>
                            <span>${fecha}</span>
                        </div>
                        <div class="flex items-center gap-3 text-blue-100/60 text-sm">
                            <i class="bi bi-geo-alt text-rose-400"></i>
                            <span class="truncate">${evento.ubicacion}</span>
                        </div>
                        <div class="pt-2 border-t border-white/5 flex items-center gap-3 text-blue-200/40 text-xs">
                            <i class="bi bi-building"></i>
                            <span class="uppercase tracking-tighter">${evento.entidad?.nombre || 'Organización'}</span>
                        </div>
                    </div>
                </div>

                <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-all"></div>
            </div>
        `;
        contenedorEventos.innerHTML += card;
    });
}

/**
 * Actualiza botones de paginación
 */
function actualizarControles(res) {
    currentPage = res.current_page;
    numeroPagina.innerText = currentPage;

    btnMenos.disabled = !res.prev_page_url;
    btnMas.disabled = !res.next_page_url;

    [btnMenos, btnMas].forEach(btn => {
        btn.style.opacity = btn.disabled ? "0.2" : "1";
        btn.style.cursor = btn.disabled ? "not-allowed" : "pointer";
    });
}

// Listeners
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