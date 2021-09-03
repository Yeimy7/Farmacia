$(document).ready(function () {
  let funcion = '';

  buscar_lote();

  function buscar_lote(consulta) {
    funcion = 'buscar';
    $.post('../controlador/loteController.php', { consulta, funcion }, (response) => {
      const lotes = JSON.parse(response);
      let template = '';
      lotes.forEach(lote => {
        template += `
                <div loteId="${lote.id}" loteStock="${lote.stock}" loteCodigo="${lote.codigo}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                    <div class="card bg-${lote.estado}">
                    <div class="card-header border-bottom-0">
                    <h6>Codigo: ${lote.codigo}</h6>
                    <i class="fas fa-lg fa-cubes mr-1"></i>${lote.stock}
                    </div>
                    <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${lote.nombre}</b></h2>


                      <ul class="ml-4 mb-0 fa-ul">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span> Concentración: ${lote.concentracion}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle-alt"></i></span> Adicional: ${lote.adicional}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span> Laboratorio: ${lote.laboratorio}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span> Tipo: ${lote.tipo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span> Presentación: ${lote.presentacion}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-times"></i></span> Vencimiento: ${lote.vencimiento}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-truck"></i></span> Proveedor: ${lote.proveedor}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar"></i></span> Año: ${lote.anio}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-alt"></i></span> Mes: ${lote.mes}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-day"></i></span> Día: ${lote.dia}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-clock"></i></span> Hora: ${lote.hora}</li>

                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${lote.avatar}" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button  class="editar btn btn-sm btn-success" type="button" data-toggle="modal" data-target="#editarlote">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button  class="borrar btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
                `;
      });
      $('#lotes').html(template);
    })
  }
  $(document).on('keyup', '#buscar-lote', function () {
    let valor = $(this).val();
    if (valor != '') {
      buscar_lote(valor);
    }
    else {
      buscar_lote();
    }
  });
  $(document).on('click', '.editar', (e) => {
    let elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
    let id = $(elemento).attr('loteId');
    let stock = $(elemento).attr('loteStock');
    let codigo = $(elemento).attr('loteCodigo');

    $('#id_lote_prod').val(id);
    $('#stock').val(stock);
    $('#codigo_lote').html(codigo);
    edit = true;
  });
  $('#form-editar-lote').submit(e => {
    let id = $('#id_lote_prod').val();
    let stock = $('#stock').val();
    funcion = 'editar';
    $.post('../controlador/LoteController.php', { id, stock, funcion }, (response) => {
      if (response == 'edit') {
        $('#edit-lote').hide('slow');
        $('#edit-lote').show(1000);
        $('#edit-lote').hide(4000);
        $('#form-editar-lote').trigger('reset');
        buscar_lote();
      }
    });
    e.preventDefault();
  });
  $(document).on('click', '.borrar', (e) => {
    funcion = 'borrar';
    const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
    const id = $(elemento).attr('loteId');

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Desea aliminar lote ' + id + '?',
      text: "No podrá revertir acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.post('../controlador/LoteController.php', { id, funcion }, (response) => {
          console.log(response);
          if (response == 'borrado') {
            swalWithBootstrapButtons.fire(
              'Borrado!',
              'El lote ' + id + ' fue borrado',
              'success'
            )
            buscar_lote();
          }
          else {
            swalWithBootstrapButtons.fire(
              'No se pudo borrar!',
              'El lote ' + id + ' no fue borrado porque esta siendo usado.',
              'error'
            )
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El lote ' + id + ' no fue borrado',
          'error'
        )
      }
    })

  });

});