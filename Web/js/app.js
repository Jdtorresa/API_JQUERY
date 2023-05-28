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
          $("#error-message").text("The ID already exists. Enter a different ID.");
        } else {
          var errorMessage = xhr.responseText || "Internal Server Error";
          $("#error-message").text(errorMessage);
        }
        console.log(status);
        console.log(error);
      }
    });
  });

  $("#enviarid").click(function() {
    var IdAConsultar = $("#byid").val();
    $.ajax({
      url: "http://localhost:8080/graphics/"+IdAConsultar,
      type: "GET",
      dataType: "json",
      success: function(datos) {
        var pElement = $("#pid");
        pElement.empty();
        pElement.append(JSON.stringify(datos));
      },
      error: function(xhr, status, error) {
        if (xhr.status === 404) {
          $(".errorNotFound").text("The ID doesn't exists. 404 Not Found");
        } else {
          var errorMessage = xhr.responseText || "Internal Server Error";
          $(".errorNotFound").text(errorMessage);
        }
        console.log(status);
        console.log(error);
      }
    });
  });

  $("#button").click(function() {
    $.ajax({
      url: "http://localhost:8080/graphics/all",
      type: "GET",
      dataType: "json",
      success: function(datos) {
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
