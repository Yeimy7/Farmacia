$(document).ready(function () {
    listar_compras();
    rellenar_estado_pago()
    $('.select2').select2();
    var datatable;
    function rellenar_estado_pago() {
        funcion = 'rellenar_estado';
        $.post('../controlador/EstadoController.php', { funcion }, (response) => {
            let estados = JSON.parse(response);
            let template = '';
            estados.forEach(estado => {
                template += `
                    <option value="${estado.id}">${estado.nombre}</option>
                `;
            });
            $('#estado_compra').html(template);
        });
    }
    function listar_compras() {
        funcion = 'listar_compras';
        $.post('../controlador/ComprasController.php', { funcion }, (response) => {
            let datos = JSON.parse(response);
            datatable = $('#compras').DataTable({
                data: datos,
                "columns": [
                    { "data": "numeracion" },
                    { "data": "codigo" },
                    { "data": "fecha_compra" },
                    { "data": "fecha_entrega" },
                    { "data": "total" },
                    { "data": "estado" },
                    { "data": "proveedor" },
                    {
                        "defaultContent": `<button class="imprimir btn btn-secondary"><i class="fas fa-print"></i></button>
                                        <button class="ver btn btn-info" type="button" data-toggle="modal" data-target="#vista_compra"><i class="fas fa-search"></i></button>
                                        <button class="editar btn btn-success" type="button" data-toggle="modal" data-target="#cambiarEstado"><i class="fas fa-pencil-alt"></i></button>
                                        `}
                ],
                "destroy": true,
                "language": espanol
            });

        });
    }
    $('#compras tbody').on('click', '.editar', function () {
        let datos = datatable.row($(this).parents()).data();
        let codigo = (datos.codigo).split(' | ');
        let id = codigo[0];
        let estado = datos.estado;
        funcion = 'cambiarEstado'
        $('#id_estado').val(id);
        $.post('../controlador/EstadoController.php', { funcion, estado }, (response) => {
            let id_estado = JSON.parse(response);
            $('#estado_compra').val(id_estado[0]['id']).trigger('change');
        })
    });
    $('#form-editar').submit(e => {
        let id_compra = $('#id_estado').val();
        let id_estado = $('#estado_compra').val();
        funcion = 'editarEstado';
        $.post('../controlador/ComprasController.php', { funcion, id_compra, id_estado }, (response) => {
            if (response.trim() == 'edit') {
                $('#estado_compra').val('').trigger('change');
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(4000);
                $('#form-editar').trigger('reset');
                listar_compras();
            }
            else {
                $('#noedit').hide('slow');
                $('#noedit').show(1000);
                $('#noedit').hide(4000);
            }
        })
        e.preventDefault();
    });
    $('#compras tbody').on('click', '.ver', function () {
        let datos = datatable.row($(this).parents()).data();
        let codigo = (datos.codigo).split(' | ');
        let id = codigo[0];

        let funcion = 'ver';
        $('#codigo_compra').html(datos.codigo);
        $('#fecha_compra').html(datos.fecha_compra);
        $('#fecha_entrega').html(datos.fecha_entrega);
        $('#estado').html(datos.estado);
        $('#proveedor').html(datos.proveedor);
        $('#total').html(datos.total);
        $.post('../controlador/LoteController.php', { funcion, id }, (response) => {
            console.log(response);
            let registros = JSON.parse(response);
            let template = '';
            $('#detalless').html(template);
            registros.forEach(registro => {
                template += `
                    <tr>
                        <td>${registro.numeracion}</td>
                        <td>${registro.codigo}</td>
                        <td>${registro.cantidad}</td>
                        <td>${registro.vencimiento}</td>
                        <td>${registro.precio_compra}</td>
                        <td>${registro.producto}</td>
                        <td>${registro.laboratorio}</td>
                        <td>${registro.presentacion}</td>
                        <td>${registro.tipo}</td>
                    </tr>
                `;
                $('#detalles').html(template);
            });

        });
    });
    $('#compras tbody').on('click', '.imprimir', function () {
        let datos = datatable.row($(this).parents()).data();
        let codigo = (datos.codigo).split(' | ');
        let id = codigo[0];

        funcion='imprimir';
        $.post('../controlador/ComprasController.php',{id, funcion},(response)=>{
            window.open('../pdf/pdf-compra-'+id+'.pdf','_blank');
        })
        
    });
});


let espanol = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ning??n dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "??ltimo",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",

    }
};