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
        let producto_array=producto_select2.split(' | ');
        console.log(producto_array);



    })
});