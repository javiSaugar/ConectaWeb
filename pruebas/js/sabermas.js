document.querySelector("#btnComunidad").addEventListener("click", (e) => {
    e.preventDefault(); 
    mensajeError("Esta funcion no se encuentra implementada");
})

function mensajeError(mensaje){
    console.log("entra")
   Swal.fire({
    title: mensaje,
    icon: "info",
   theme:"dark"
});
}