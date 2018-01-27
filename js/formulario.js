var peliculas;

$(document).ready(function() {
  conectarArchivo();
  recogerInformacion()
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
}

// Función para recibir la informacion del json
function recogerInformacion() {
  var pelicula = [];
  var peliculaID = localStorage.getItem("peliculaID");
  for (var i in peliculas) {
    if (i == peliculaID) {
      pelicula.push(peliculas[i]);
    }
    if (localStorage.getItem(i) == null) {
      for (var i in peliculas) {
        var titulo = [peliculas[i].titulo, 0];
        localStorage.setItem(i, JSON.stringify(titulo));
      }
    }
  }
  insertarInformacion(pelicula);
}

// Función para insertar la información en la página
function insertarInformacion(pelicula) {
  $("#tituloPeli .enfasis").text(pelicula[0].titulo);
  $("#estrenoPeli .enfasis").text(pelicula[0].estreno);
  $("#generoPeli .enfasis").text(pelicula[0].genero);
  $("#caratula").attr({"src": pelicula[0].caratula, "alt": "Caratula de " + pelicula[0].titulo, "title": pelicula[0].titulo});
  $("p.enfasis").text(pelicula[0].sipnosis);

  $("form").on("submit", function() {
    actualizarVotaciones();
  });
console.log(pelicula[0].trailer);
  $("#b_trailer").attr("href", pelicula[0].trailer)

  $("#b_trailer").on("keydown", function(event) {
    if (event.keyCode === 13) {
      location.href = pelicula[0].trailer;
    }
  });
}

// Función que actualiza las votaciones
function actualizarVotaciones() {
  var pelicula = JSON.parse(
    localStorage.getItem(localStorage.getItem("peliculaID"))
  );
  localStorage.setItem(
    localStorage.getItem("peliculaID"),
    JSON.stringify([pelicula[0], pelicula[1] + 1])
  );

  insertarUsuario(pelicula);
}

// Función que inserta el usuario en localStorage
function insertarUsuario(pelicula) {
  var contador = localStorage.getItem("votacion");
  if (contador == null) {
    contador = 1;
  } else {
    contador++;
  }

  localStorage.setItem("votacion", contador);

  var usuario = [];
  usuario.push(pelicula[0]);
  usuario.push($("#name").val());
  usuario.push($("#surname").val());
  usuario.push($("#date").val());
  usuario.push($("#opinion").val());

  localStorage.setItem("voto_" + contador, JSON.stringify(usuario));
}
