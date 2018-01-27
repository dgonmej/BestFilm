var peliculas;
var idPeliculas = [];

$(document).ready(function() {
  conectarArchivo();
  cargarGrafico("grafico1");

  $("#b1").click(function() {
    $(this).addClass("seleccionado");
    $("#b2, #b3").removeClass("seleccionado");
    cargarGrafico("grafico1");
  })
  $("#b2").click(function() {
    $(this).addClass("seleccionado");
    $("#b1, #b3").removeClass("seleccionado");
    cargarGrafico("grafico2");
  })
  $("#b3").click(function() {
    $(this).addClass("seleccionado");
    $("#b1, #b2").removeClass("seleccionado");
    cargarGrafico("grafico3");
  })
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

  for (var i in peliculas) {
    idPeliculas.push(i);
  }
}

// Función para cargar el grafico con la opción elegida
function cargarGrafico(opcion) {
  var datos = [];
  for (var i = 0; i < idPeliculas.length; i++) {
    var pelicula = localStorage.getItem(idPeliculas[i]);
    pelicula = JSON.parse(pelicula);
    datos.push(pelicula);
  }
  
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(function() {
    switch (true) {
      case opcion == "grafico1":
      dibujarGraficos(opcion);
        break;
      case opcion == "grafico2":
      dibujarGraficos(opcion);
        break;
      case opcion == "grafico3":
      dibujarGraficos(opcion);
        break;
    }
  });

  function dibujarGraficos(tipo) {
    
    var data = new google.visualization.DataTable();
    data.addColumn("string", "titulo");
    data.addColumn("number", "votos");

    for (var i = 0; i < datos.length; i++) {
      data.addRow([datos[i][0], datos[i][1]]);
    }

    var opcionesGrafico;
    var grafico;
    
    switch (true) {
      case opcion == "grafico1":
        opcionesGrafico = { 
          title: "RESULTADOS DE LA VOTACIÓN",
          width: $("#grafico").width(),
          height: $("#grafico").height(),
          is3D: true };
        grafico = new google.visualization.PieChart(document.getElementById("grafico"));
        break;
      case opcion == "grafico2":
        opcionesGrafico = { 
          title: "RESULTADOS DE LA VOTACIÓN",
          width: $("#grafico").width(),
          height: $("#grafico").height(), 
          chartArea: { width: "50%" },
          hAxis: { title: "Votos", minValue: 0 }, 
          vAxis: { title: "Películas" } };
        grafico = new google.visualization.BarChart(document.getElementById("grafico"));
        break;
      case opcion == "grafico3":
        opcionesGrafico = { 
          title: "RESULTADOS DE LA VOTACIÓN",
          width: $("#grafico").width(),
          height: $("#grafico").height(),
          pieHole: 0.2 };
        grafico = new google.visualization.PieChart(document.getElementById("grafico"));
        break;
    }
    grafico.draw(data, opcionesGrafico);
  }
}
