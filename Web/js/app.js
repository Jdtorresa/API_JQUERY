$(document).ready(function() {

  
  //NEW Graphic Card
  $("#enviar").click(function(e) {    
    e.preventDefault();
    let id = $("#id").val();
    let brand = $("#brand").val();
    let model = $("#model").val();
    let vram = $("#vram").val();
    let fanCount = $("#fanCount").val();
    let errorMensaje = document.querySelector('#message')
    errorMensaje.innerHTML='';
    errorMensaje.classList.remove('alert-danger')
    if (id === '' || brand === '' || model === '' || vram === '' || fanCount === '') {
      errorMensaje.classList.add('alert-danger');
      $("#message").text("Please complete all the required fields.");
      return;
    }
    let data = {
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
      success: function() {
        errorMensaje.classList.add('alert-success');
        $("#message").text("The data has been sent correctly.");
        $("#id").val('');
        $("#brand").val('');
        $("#model").val('');
        $("#vram").val('');
        $("#fanCount").val('');
      },
      error: function(xhr, status, error) {
        if (xhr.status === 409) {
          errorMensaje.classList.add('alert-danger');
          $("#message").text("The ID already exists. Enter a different ID.");
          
        }else {
          errorMensaje.classList.add('alert-danger');
          errorMensaje.innerHTML+='Internal Server Error'
        }
        console.log(status);
        console.log(error);
      }
    });
  });


  //Graphic Card By ID
  $("#enviarid").click(function(e) {
    e.preventDefault();
    let IdAConsultar = $("#byid").val();
    let tabla = document.querySelector('#tableid')
    let errorMensaje = document.querySelector('#errormes')
    if (IdAConsultar === '' ) {
      errorMensaje.classList.add('alert-danger');
      $("#errormes").text("Please enter an ID to make the query.");
      return;
    }
    $.ajax({
      url: "http://localhost:8080/graphics/"+IdAConsultar,
      type: "GET",
      dataType: "JSON",
      success: function(respuesta) {
        errorMensaje.innerHTML='';
        errorMensaje.classList.remove('alert-danger')
        tabla.innerHTML=''
        var nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML += '<td>' + 'ID' +
        '</td><td>' + 'Brand' +
        '</td><td>' + 'Model' +
        '</td><td>' + 'VRAM' +
        '</td><td>' + 'fanCount' +
        '</td>';
        nuevaFila.classList.add("resaltado");
        tabla.appendChild(nuevaFila);
        tabla.innerHTML += '<tr><td>' + respuesta.id +
        '</td><td>' + respuesta.brand +
        '</td><td>' + respuesta.model +
        '</td><td>' + respuesta.vram +
        '</td><td>' + respuesta.fanCount +
        '</td></tr>';   
      },
      error: function(xhr, status, error) {
        tabla.innerHTML=''
        errorMensaje.innerHTML='';
        errorMensaje.classList.remove('alert-danger')
        if (xhr.status === 404) {
          errorMensaje.classList.add('alert-danger');
          errorMensaje.innerHTML+='The id '+IdAConsultar+ ' does not exist. Not Found.'
        } else {
          errorMensaje.classList.add('alert-danger');
          errorMensaje.innerHTML+='Internal Server Error'
        }
        console.log(status);
        console.log(error);
      }
    });
  });


  //ALL Graphics Cards
  $('#list').on('click', function() {
    let tabla = document.querySelector('#table')
    tabla.innerHTML = ''
    $.ajax({
        url: "http://localhost:8080/graphics/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
          var nuevaFila = document.createElement("tr");
          nuevaFila.innerHTML += '<td>' + 'ID' +
          '</td><td>' + 'Brand' +
          '</td><td>' + 'Model' +
          '</td><td>' + 'VRAM' +
          '</td><td>' + 'fanCount' +
          '</td>';
          nuevaFila.classList.add("resaltado");
          tabla.appendChild(nuevaFila);
            for (i = 0; i < respuesta.length; i++) {
                tabla.innerHTML += '<tr><td>' + respuesta[i].id +
                    '</td><td>' + respuesta[i].brand +
                    '</td><td>' + respuesta[i].model +
                    '</td><td>' + respuesta[i].vram +
                    '</td><td>' + respuesta[i].fanCount +
                    '</td></tr>';
            }
        }

    })
});

  //Delete a graphic Card
  $('#deleteid').click(function(e){
    e.preventDefault();
    let idAEliminar= $('#idDelete').val();
    let mensajeEliminar= document.querySelector('#mensajeEliminar');
    mensajeEliminar.classList.remove('alert-danger')
    mensajeEliminar.classList.remove('alert-success');
    if(idAEliminar===''){
      mensajeEliminar.classList.add('alert-danger')
      $('#mensajeEliminar').text('Please enter an ID to make the delete')
    }
    $.ajax({
      url: 'http://localhost:8080/graphics/delete/'+idAEliminar,
      type: 'DELETE',
      datatype: 'JSON',
      success: function(){
        mensajeEliminar.classList.add('alert-success');
        $('#mensajeEliminar').text('The graphic card with ID '+idAEliminar+' has been deleted')
      },
      error: function(xhr, status, error){
        if(xhr.status===404){
          mensajeEliminar.classList.add('alert-danger');
          $('#mensajeEliminar').text('The id '+idAEliminar+ ' does not exist. Not Found.');
        }
        console.log(status)
        console.log(error)
      }
    })
  })

   //Charge Info
   $('#formUpdate').submit(function(e) {
    e.preventDefault();
    let mensajeCharge= document.querySelector('#mensajeCharge');
    var idActualizar = $('#idUpdate').val();
    mensajeCharge.classList.remove('alert-danger')
    $('#mensajeCharge').text('')
    if(idActualizar===''){
      $('#updateBrand').val('');
      $('#updateModel').val('');
      $('#updateVram').val('');
      $('#updateFanCount').val('');
      mensajeCharge.classList.add('alert-danger')
      mensajeCharge.classList.add('alert-sucess')
      $('#mensajeCharge').text('Please enter an ID to make the update')
      return;
    }
    $.ajax({
      url: "http://localhost:8080/graphics/" + idActualizar,
      type: "GET",
      dataType: "JSON",
      success: function(respuesta) {
        $('#idUpdate').prop('disabled', true);
        $('#updateBrand').val(respuesta.brand);
        $('#updateModel').val(respuesta.model);
        $('#updateVram').val(respuesta.vram);
        $('#updateFanCount').val(respuesta.fanCount);
        mensajeCharge.classList.add('alert-success');
        $('#mensajeCharge').text('The information has been loaded, please update.');
      },
      error: function(xhr, status, error) {
        if(xhr.status===404){
          mensajeCharge.classList.add('alert-danger');
          $('#mensajeCharge').text('The id '+idActualizar+ ' does not exist. Not Found.');
        }
        console.log(status);
        console.log(error);
      }
    });
  });

  //Update a Graphic
  $('#update').submit(function(e) {
    e.preventDefault();
    let mensajeCharge= document.querySelector('#mensajeCharge');
    let mensajeUpdate= document.querySelector('#mensajeUpdate');
    let id = $('#idUpdate').val();
    let brand = $('#updateBrand').val();
    let model = $('#updateModel').val();
    let vram = $('#updateVram').val();
    let fanCount = $('#updateFanCount').val();
    if (id === '' || brand === '' || model === '' || vram === '' || fanCount === '') {
      errorMensaje.classList.add('alert-danger');
      $("#mensajeUpdate").text("Please complete all the required fields.");
      return;
    }
    let data = {
      id: id,
      brand: brand,
      model: model,
      vram: vram,
      fanCount: fanCount
    };  
    $.ajax({
      url: "http://localhost:8080/graphics/update",
      type: "PUT",
      dataType: "JSON",
      data: JSON.stringify(data), 
      contentType: "application/json",
      success: function(respuesta) {
        $('#idUpdate').prop('disabled', false);
        $('#updateBrand').val('');
        $('#updateModel').val('');
        $('#updateVram').val('');
        $('#updateFanCount').val('');
        mensajeUpdate.classList.add('alert-success');
        $('#mensajeUpdate').text('It has been successfully updated.');
        mensajeCharge.classList.remove('alert-success');
        $('#idUpdate').val('')
        $('#mensajeCharge').text('');
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  });
});
