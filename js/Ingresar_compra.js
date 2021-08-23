$(document).ready(function () {
    $('.select2').select2();
    rellenar_productos();
    function rellenar_productos() {
        funcion = 'rellenar_productos';
        $.post('../controlador/ProductoController.php', { funcion }, (response) => {
            let productos = JSON.parse(response);
            let template = '';
            productos.forEach(producto => {
                template += `
                    <option value="${producto.nombre}">${producto.nombre}</option>
                `;
            });
            $('#producto').html(template);
        });
    }
    $(document).on('click', '.agregar-producto', (e) => {
        let producto_select2 = $('#producto').val();
        let codigo_lote = $('#codigo_lote').val();
        let cantidad = $('#cantidad').val();
        let vencimiento = $('#vencimiento').val();
        let precio_compra = $('#precio_compra').val();

        if (producto_select2 == null) {
            $('#error').text('Elija un producto');
            $('#noadd-prod').hide('slow');
            $('#noadd-prod').show(1000);
            $('#noadd-prod').hide(4000);
        }
        else {
            if (codigo_lote == '') {
                $('#error').text('Introduzca un código');
                $('#noadd-prod').hide('slow');
                $('#noadd-prod').show(1000);
                $('#noadd-prod').hide(4000);
            }
            else {
                if (cantidad == '') {
                    $('#error').text('Ingrese una cantidad');
                    $('#noadd-prod').hide('slow');
                    $('#noadd-prod').show(1000);
                    $('#noadd-prod').hide(4000);
                }
                else {
                    if (vencimiento == '') {
                        $('#error').text('Ingrese un vencimiento');
                        $('#noadd-prod').hide('slow');
                        $('#noadd-prod').show(1000);
                        $('#noadd-prod').hide(4000);
                    }
                    else {
                        if (precio_compra == '') {
                            $('#error').text('Ingrese un precio de compra');
                            $('#noadd-prod').hide('slow');
                            $('#noadd-prod').show(1000);
                            $('#noadd-prod').hide(4000);
                        }
                        else {
                            let producto_array = producto_select2.split(' | ');
                            let producto = {
                                id: producto_array['0'],
                                nombre: producto_select2,
                                codigo: codigo_lote,
                                cantidad: cantidad,
                                vencimiento: vencimiento,
                                precio_compra: precio_compra
                            }
                            let template = '';
                            template = `
                            <tr>
                                <td>${producto.nombre}</td>
                                <td>${producto.codigo}</td>
                                <td>${producto.cantidad}</td>
                                <td>${producto.vencimiento}</td>
                                <td>${producto.precio_compra}</td>
                                <td><button class="borrar-producto  btn btn-danger"><i class="fas fa-times-circle"></i></button></td>
                            </tr>
                            `;
                            $('#registros_compra').append(template);
                            $('#add-prod').hide('slow');
                            $('#add-prod').show(1000);
                            $('#add-prod').hide(4000);
                            $('#producto').val('').trigger('change');
                            $('#codigo_lote').val('');
                            $('#cantidad').val('');
                            $('#vencimiento').val('');
                            $('#precio_compra').val('');
                        }
                    }
                }
            }
        }


    });
    $(document).on('click', '.borrar-producto', (e) => {
        let elemento = $(this)[0].activeElement.parentElement.parentElement;
        elemento.remove();
    });

});