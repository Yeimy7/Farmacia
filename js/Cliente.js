$(document).ready(function () {
    buscar_cliente();
    var funcion;
    function buscar_cliente(consulta) {
        funcion = 'buscar';
        $.post('../controlador/ClienteController.php', { consulta, funcion }, (response) => {
            console.log(response);
        
        //   const proveedores = JSON.parse(response);
        //   let template = '';
        //   proveedores.forEach(proveedor => {
        //     template += `
        //             <div provId="${proveedor.id}" provNombre="${proveedor.nombre}" provTelefono="${proveedor.telefono}" provCorreo="${proveedor.correo}" provDireccion="${proveedor.direccion}" provAvatar="${proveedor.avatar}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
        //             <div class="card bg-light">
        //             <div class="card-header text-muted border-bottom-0">
        //                 <h1 class="badge badge-success">Proveedor</h1>
        //             </div>
        //             <div class="card-body pt-0">
        //           <div class="row">
        //             <div class="col-7">
        //               <h2 class="lead"><b>${proveedor.nombre}</b></h2>
        //               <ul class="ml-4 mb-0 fa-ul text-muted">
        //                 <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Dirección: ${proveedor.direccion}</li>
        //                 <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Teléfono: ${proveedor.telefono}</li>
        //                 <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span> Correo: ${proveedor.correo}</li>
        //               </ul>
        //             </div>
        //             <div class="col-5 text-center">
        //               <img src="${proveedor.avatar}" alt="" class="img-circle img-fluid">
        //             </div>
        //           </div>
        //         </div>
        //         <div class="card-footer">
        //           <div class="text-right">
        //             <button  class="avatar btn btn-sm bg-info" title="Editar logo" type="button" data-toggle="modal" data-target="#cambiologo">
        //               <i class="fas fa-image"></i>
        //             </button>
        //             <button  class="editar btn btn-sm btn-success" title="Editar proveedor" type="button" data-toggle="modal" data-target="#crearproveedor">
        //               <i class="fas fa-pencil-alt"></i>
        //             </button>
        //             <button  class="borrar btn btn-sm btn-danger" title="Borrar proveedor">
        //               <i class="fas fa-trash-alt"></i>
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //             `;
        //   });
        //   $('#cliente').html(template);
        })
      }
      $(document).on('keyup', '#buscar_cliente', function () {
        let valor = $(this).val();
        if (valor != '') {
          buscar_cliente(valor);
        }
        else {
          buscar_cliente();
        }
      });
});