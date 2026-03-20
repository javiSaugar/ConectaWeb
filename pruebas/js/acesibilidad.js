

function mensajeError(mensaje){
    console.log("entra")
   Swal.fire({
    title: mensaje,
    icon: "info",
   theme:"dark"
});


}


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
    link.href = "./Apps/ConectaAccesible.apk"; 
    link.download = "Conecta.apk";
    

    link.style.display = "none";
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
})