$(document).ready(function() {

  $("#enviar").click(function(e) {
      
    e.preventDefault();
    var id = $("#id").val();
    var brand = $("#brand").val();
    var model = $("#model").val();
    var vram = $("#vram").val();
    var fanCount = $("#fanCount").val();  
    var data = {
      id: id,
      brand: brand,
      model: model,
      vram: vram,
      fanCount: fanCount
    };  
    $.ajax({
      url: "http://localhost:8080/graphics/new",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function() {
        $("#error-message").text("");
        $("#mensaje").html("");
      },
      success: function(response) {

          var mensaje = "Los datos ingresados son:<br>" +
            "ID: " + data.id + "<br>" +
            "Brand: " + data.brand + "<br>" +
            "Model: " + data.model + "<br>" +
            "Vram: " + data.vram + "<br>"+
            "fanCount: " + data.fanCount + "<br>";

          $("#mensaje").html(mensaje);
        
      },
      error: function(xhr, status, error) {
        if (xhr.status === 409) {
          $("#error-message").text("El ID ya existe. Introduce un ID diferente.");
        } else {
          var errorMessage = xhr.responseText || "Error interno del servidor";
          $("#error-message").text(errorMessage);
        }
        console.log(status);
        console.log(error);
      }
    });
  });

  $("button").click(function() {
    $.ajax({
      url: "http://localhost:8080/graphics/all",
      type: "GET",
      dataType: "json",
      success: function(datos) {
        console.log(datos);
        var ulElement = $("#ul");
        ulElement.empty();
        $.each(datos, function(index, obj) {
          var jsonString = JSON.stringify(obj);
          var listItem = $("<li>").text(jsonString);
          ulElement.append(listItem);
        });
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      }
    });
  });

});
