var peliculas;

$(document).ready(function() {
  var peliculas;
  conectarArchivo();
});

// Funcion para conectar y recibir los datos del JSON
function conectarArchivo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var archivo = xhttp.responseText;
    peliculas = JSON.parse(archivo);
  };
  xhttp.open("GET", "js/peliculas.json", false);
  xhttp.send();

  crearElementos();
}

// Función para crear los elementos en el html
function crearElementos() {
  for (var i in peliculas) {
    var $elemento =
      "<div id='" +
      i +
      "' class='pelicula' tabindex='0' aria-label='Haz click o pulsa enter para más información de la película " + peliculas[i].titulo + "'>" +
      "<img src='" + peliculas[i].caratula + "' title='Película: " + peliculas[i].titulo + "' alt='Película: " + peliculas[i].titulo + "' aria-labelledby='p1'>" +
      "<h2 class='titulopeli' aria-hidden='true'>" +
      peliculas[i].titulo +
      "</h2></div>";
    $("#peliculas").append($elemento);
  }
  elegirPelicula();
}

// Función para interactuar con las peliculas
function elegirPelicula() {
  var $elemento;
  $(".pelicula").on("click", function(event) {
    $elemento = event.currentTarget;
    localStorage.setItem("peliculaID", $elemento.id);
    location.href = "eleccion.html";
  });

  $(".pelicula").on("keydown", function(event) {
    if (event.keyCode === 13) {
      $elemento = event.currentTarget;
      localStorage.setItem("peliculaID", $elemento.id);
      location.href = "eleccion.html";
    }
  });
}



