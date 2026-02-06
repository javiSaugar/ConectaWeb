
const url = "https://hackathon.lausnchez.es/api/v1/eventosweb?page=";
let numeroPagina = 1;

getEventos(numeroPagina)

function getEventos(numero){
    let hoy = new Date();
    let meses = [
        "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
        "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
        ];
    document.querySelector("#numeroPagina").innerText = numero;
    document.querySelector("#eventos").innerHTML = ""
    temporizador();
    fetch(url+numero)
    .then((response) => response.json())
    .then((datos) => {
        datos.forEach(dato => {
            let fecha = new Date(dato.fecha_inicio_evento);
            console.log(dato)
            console.log(dato.nombre)
            console.log(dato.fecha_inicio_evento)
            console.log(dato.ubicacion)
            console.log(dato.categoria.nombre)
            console.log(dato.es_accesible)
            let dia = fecha.getUTCDate(); 
            console.log(dia)
            let mes = meses[fecha.getUTCMonth()];
            console.log(mes);
            let divTarjeta = document.createElement("div");
            let divDia = document.createElement("div");
            let spanDia = document.createElement("span");
            let spanMes = document.createElement("span");
            
            let divDatos = document.createElement("div");
            let spanCategoria = document.createElement("span");
            let h3Nombre = document.createElement("h3");
            let pFechaHora = document.createElement("p");

            h3Nombre.innerText = dato.nombre;
            pFechaHora.innerText = dato.ubicacion+" - " +fecha.toLocaleDateString("es-ES");
            spanCategoria.innerText = dato.categoria.nombre
            spanDia.innerText = dia;
            spanMes.innerText = mes;
            divDia.append(spanDia,spanMes);    
            divDatos.append(spanCategoria,h3Nombre,pFechaHora)
            divTarjeta.classList.add("flex", "flex-col","md:flex-row", "items-center", "bg-blue-900/50","p-6",
                "rounded-2xl", "border", "border-white/4", "gap-6")
            divDia.classList.add("flex-shrink-0", "text-center", "md:border-r", "md:border-white/10", "md:pr-6");
            spanMes.classList.add("text-xs", "uppercase", "tracking-widest", "text-slate-500");
            divDatos.classList.add("flex-grow", "text-center", "md:text-left")
            h3Nombre.classList.add("text-xl", "font-semibold", "mt-1")
            pFechaHora.classList.add("text-slate-400", "text-sm")
            divTarjeta.append(divDia,divDatos)
            if(fecha < hoy){
                spanCategoria.classList.add("text-[12px]", "font-bold", 
                        "uppercase", "tracking-wider", "text-gray-400", "bg-gray-400/10", "px-2", "py-1", "rounded")
                    spanDia.classList.add("block", "text-2xl", "font-bold", "text-gray-400");
                 
            }else{
                spanCategoria.classList.remove();
                spanDia.classList.remove();
                
                if(dato.categoria.nombre == "Deportes"){
                    spanCategoria.classList.add("text-[12px]", "font-bold", 
                        "uppercase", "tracking-wider", "text-emerald-500", "bg-emerald-500/10", "px-2", "py-1", "rounded")
                    spanDia.classList.add("block", "text-2xl", "font-bold", "text-emerald-500");
                }
                else if(dato.categoria.nombre == "Arte" ||dato.categoria.nombre ==  "Música"){
                    spanDia.classList.add("block", "text-2xl", "font-bold", "texto-mayores")
                    spanCategoria.classList.add("text-[12px]", "font-bold", 
                        "uppercase", "tracking-wider", "texto-mayores", "bg-orange-500/10", "px-2", "py-1", "rounded")
                }
                else if(dato.es_accesible == true){
                    spanCategoria.classList.add("text-[12px]", "font-bold", "uppercase", "tracking-wider", "texto-accesible",
                         "bg-blue-500/10", "px-2", "py-1", "rounded")
                    spanDia.classList.add("block", "text-2xl", "font-bold", "texto-accesible")
                       spanCategoria.innerHTML += '  <span class="text-[15px]">♿</span>'
                }else{
                    spanCategoria.classList.add("text-[12px]", "font-bold", "uppercase", "tracking-wider", "text-red-700",
                         "bg-red-400/10", "px-2", "py-1", "rounded")
                    spanDia.classList.add("block", "text-2xl", "font-bold", "text-red-700")
                } 
            }
            document.querySelector("#eventos").append(divTarjeta)
        });
        
    });
}
document.querySelector("#paginaMas").addEventListener("click",()=>{
    pagMas();
    
})

document.querySelector("#paginaMenos").addEventListener("click",()=>{
    pagMenos();
})

function temporizador() {
  let timerInterval;
  const tiempoTotal = 3000;

  Swal.fire({
    title: "¡Estamos cargando los eventos!",
     color: "#0080FF",
    background: "#16285a",
    html: `
      <div style="margin-top:10px">
        <div id="progress-container">
          <div id="progress-bar" style="
            width:100%;
            height:12px;
            background:#0080FF;
            border-radius:10px;
            transition: width 0.1s linear;">
          </div>
        </div>
        <p><b></b> ms restantes</p>
      </div>
    `,
    showConfirmButton: false,
    timer: tiempoTotal,
    didOpen: () => {
      const bar = document.getElementById("progress-bar");
      const text = Swal.getPopup().querySelector("b");
      const start = Date.now();

      timerInterval = setInterval(() => {
        const elapsed = Date.now() - start;
        const restante = tiempoTotal - elapsed;
        const porcentaje = (restante / tiempoTotal) * 100;

        bar.style.width = porcentaje + "%";
        text.textContent = Math.max(0, Math.floor(restante));
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
}


function pagMas(){
    let num = numeroPagina+1
     fetch(url+num)
    .then((response) => response.json())
    .then((datos) => {
        console.log(datos.length)
        if(datos.length > 0){
            numeroPagina ++;
            console.log("+")
            getEventos(numeroPagina)
        }else{
           
        }
      
    })

}

function mensajeInfo(mensaje){
    Swal.fire({
        position: "mid",
        icon: "info",
        title: mensaje,
        showConfirmButton: false,
        theme:"dark",
        timer: 1500
    });
}

function pagMenos(){
    if(numeroPagina == 1){

    }else{
        numeroPagina --;
        getEventos(numeroPagina)
    }
}