$(document).ready(function () {
    RecuperarLS_carrito();
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
        }
    });
    $(document).on('click', '.borrar-producto', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        elemento.remove();
        Eliminar_productoLS(id);
    });
    $(document).on('click', '#vaciar-carrito', (e) => {
        $('#lista').empty();
        EliminarLS();
    });
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
        let productos;
        productos = recuperarLS();
        productos.forEach(producto => {
            template = `
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
});