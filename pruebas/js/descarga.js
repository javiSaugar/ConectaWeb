
document.querySelector("#btnIos").addEventListener("click",()=>{
    mensajeInfo("Estamos trabajando en ello")
})

function mensajeInfo(mensaje){
Swal.fire({
  position: "center",
  icon: "info",
  title: mensaje,
  showConfirmButton: false,
  timer: 1500
});
}

document.querySelector("#btnAndroid").addEventListener("click",()=>{
        
   const link = document.createElement("a");
    link.href = "./Apps/Conecta.apk"; // Asegúrate de que esta ruta sea accesible
    link.download = "Conecta.apk";
    
    // Añadimos esto por compatibilidad con algunos navegadores móviles
    link.style.display = "none";
    document.body.appendChild(link);
    
    link.click();
    
    // Limpieza
    document.body.removeChild(link);
})