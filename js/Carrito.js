$(document).ready(function () {
    RecuperarLS_carrito();
    Contar_productos();
    RecuperarLS_carrito_compra();
    $(document).on('click', '.agregar-carrito', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const nombre = $(elemento).attr('prodNombre');
        const concentracion = $(elemento).attr('prodConcentracion');
        const adicional = $(elemento).attr('prodAdicional');
        const precio = $(elemento).attr('prodPrecio');
        const laboratorio = $(elemento).attr('prodLaboratorio');
        const tipo = $(elemento).attr('prodtipo');
        const presentacion = $(elemento).attr('prodPresentacion');
        const avatar = $(elemento).attr('prodAvatar');
        const stock = $(elemento).attr('prodStock');

        const producto = {
            id: id,
            nombre: nombre,
            concentracion: concentracion,
            adicional: adicional,
            precio: precio,
            laboratorio: laboratorio,
            tipo: tipo,
            presentacion: presentacion,
            avatar: avatar,
            stock: stock,
            cantidad: 1
        }
        let id_producto, productos;
        productos = recuperarLS();
        productos.forEach(prod => {
            if (prod.id === producto.id) {
                id_producto = prod.id;
            }
        });
        if (id_producto === producto.id) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto ya esta en el carrito!',
            })
        }
        else {

            let template = `
            <tr prodId="${producto.id}">
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
                <td>${producto.concentracion}</td>
                <td>${producto.adicional}</td>
                <td>${producto.precio}</td>
                <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>
                </tr>
                `;
            $('#lista').append(template);
            AgregarLS(producto);
            Contar_productos();
        }
    });
    $(document).on('click', '.borrar-producto', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        elemento.remove();
        Eliminar_productoLS(id);
        Contar_productos();

    });
    $(document).on('click', '#vaciar-carrito', (e) => {
        $('#lista').empty();
        EliminarLS();
        Contar_productos();

    });
    $(document).on('click', '#procesar-pedido', (e) => {
        Procesar_pedido();
    })
    function recuperarLS() {
        let productos;
        if (localStorage.getItem('productos') === null) {
            productos = [];
        }
        else {
            productos = JSON.parse(localStorage.getItem('productos'));
        }
        return productos;
    }
    function AgregarLS(producto) {
        let productos;
        productos = recuperarLS();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    function RecuperarLS_carrito() {
        let productos, id_producto;
        productos = recuperarLS();
        funcion = 'buscar_id';
        productos.forEach(producto => {
            id_producto = producto.id;
            $.post('../controlador/ProductoController.php', { funcion, id_producto }, (response) => {
                let template_carrito = '';
                let json = JSON.parse(response);
                template_carrito = `
                <tr prodId="${json.id}">
                    <td>${json.id}</td>
                    <td>${json.nombre}</td>
                    <td>${json.concentracion}</td>
                    <td>${json.adicional}</td>
                    <td>${json.precio}</td>
                    <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>
                </tr>
                `;
                $('#lista').append(template_carrito);

            });
        });
    }
    function Eliminar_productoLS(id) {
        let productos;
        productos = recuperarLS();
        productos.forEach(function (producto, indice) {
            if (producto.id === id) {
                productos.splice(indice, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    function EliminarLS() {
        localStorage.clear();
    }
    function Contar_productos() {
        let productos;
        let contador = 0;
        productos = recuperarLS();
        productos.forEach(producto => {
            contador++;
        });
        $('#contador').html(contador);
    }
    function Procesar_pedido() {
        let productos;
        productos = recuperarLS();
        if (productos.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito está vacio',
            })
        }
        else {
            location.href = '../vista/adm_compra.php'
        }
    }
    function RecuperarLS_carrito_compra() {
        let productos, id_producto;
        productos = recuperarLS();
        funcion = 'buscar_id';
        productos.forEach(producto => {
            id_producto = producto.id;
            $.post('../controlador/ProductoController.php', { funcion, id_producto }, (response) => {
                let template_compra = '';
                let json = JSON.parse(response);
                template_compra = `
                <tr prodId="${producto.id}">
                    <td>${json.nombre}</td>
                    <td>${json.stock}</td>
                    <td>${json.precio}</td>
                    <td>${json.concentracion}</td>
                    <td>${json.adicional}</td>
                    <td>${json.laboratorio}</td>
                    <td>${json.presentacion}</td>
                    <td>
                        <input type="number" min="1" class="form-control cantidad_producto" value="${producto.cantidad}">
                    </td>
                    <td class="subtotales">
                        <h5>${json.precio * producto.cantidad}</h5> 
                    </td>

                    <td><button class="borrar-producto btn btn-danger"><i class="fas fa-times-circle"></i></button></td>
                </tr>
                `;
                $('#lista-compra').append(template_compra);

            });
        });
       
    }
    $('#cp').keyup((e) => {
        let id, cantidad, producto, productos, montos;
        producto = $(this)[0].activeElement.parentElement.parentElement;
        id = $(producto).attr('prodId');
        cantidad = producto.querySelector('input').value;
        montos = document.querySelectorAll('.subtotales');
        productos = recuperarLS();
        productos.forEach(function (prod, indice) {
            if (prod.id === id) {
                prod.cantidad = cantidad;
                montos[indice].innerHTML = `<h5>${cantidad * productos[indice].precio}</h5>`;
            }
        });
        localStorage.setItem('productos', JSON.stringify(productos));
    });
});