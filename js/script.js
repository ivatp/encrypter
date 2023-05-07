// Diccionario clave : valor
const diccionario = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
  };

 // Función para extraer el texto y limpiarlo 
function inputTexto(){ 

    var input = document.getElementById("mensaje");
    var textoOriginal = input.value;
    // Elimina caractéres especiales
    textoOriginal = textoOriginal.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Convierte a minúsculas
    textoOriginal = textoOriginal.toLowerCase()

    return textoOriginal
}

// Función para esconder/mostrar Imagen y botón copiar
function esconderImagen(texto){
    // Obtiene el valor de los elementos HTML
    var imagen = document.getElementById("advertencia")
    var boton = document.getElementById("copiar")
    // Valida si el input viene vacío 
    if (texto === ""){
        imagen.style.display = "block" // mostrar
        boton.style.display = "none" // esconder
    }
    else{
        imagen.style.display = "none"
        boton.style.display = "block"
    }

}

// Función para codificar y decodificar
function sustituirValores(texto, diccionario, sentido) {
  let resultado = texto;
  if (sentido === "claveValor") {
    // Sustituye las claves por valores
    for (const clave in diccionario) {
      resultado = resultado.replaceAll(clave, diccionario[clave]);
    }
  } else if (sentido === "valorClave") {
    // Sustituye los valores por claves
    for (const clave in diccionario) {
      resultado = resultado.replaceAll(diccionario[clave], clave);
    }
  }
  return resultado;
}

// Función para enviar la respuesta 
function enviarTexto(texto){

    // Envía el texto al elemento HTML
    var areaDestino = document.getElementById("respuesta");
    areaDestino.value = texto;

}

// Función para encriptar el input
function encriptar() {   
    // Sentido clave -> valor
    const sentido = "claveValor"; 
    var textoOriginal = inputTexto();
    esconderImagen(textoOriginal);
    var textoModificado = sustituirValores(textoOriginal, diccionario, sentido);
    enviarTexto(textoModificado);
    document.getElementById("mensaje").value = ""
}

// Función para desencriptar el input
function desencriptar() {
    // Sentido valor -> clave
    const sentido = "valorClave"; 
    var textoOriginal = inputTexto();
    esconderImagen(textoOriginal);
    var textoModificado = sustituirValores(textoOriginal, diccionario, sentido);
    enviarTexto(textoModificado);
    document.getElementById("mensaje").value = ""
}

// Función para copiar el texto de un elemento HTML
function copiar() {
    // Obtiene el texto del textarea
    const texto = document.getElementById("respuesta").value; 
    // Escribe el texto en el portapapeles
    navigator.clipboard.writeText(texto) 
    .then(() => {
        swal({
            title: '¡Texto copiado!',
            timer: 1500,
            buttons: false
            });
        })
    .catch((error) => {
        swal({
            icon: 'error',
            title: 'Error al copiar el texto',
            text: error
            });
        });
        limpiarTexto();
}

// Función para restablecer los textarea
function limpiarTexto(){

    document.getElementById("mensaje").value = ""
    document.getElementById("respuesta").value = ""
    var imagen = document.getElementById("advertencia")
    var boton = document.getElementById("copiar")
    imagen.style.display = "block" ;
    boton.style.display = "none" ;

}
