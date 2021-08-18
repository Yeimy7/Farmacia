<?php
session_start();
if ($_SESSION['us_tipo'] == 1 || $_SESSION['us_tipo'] == 3) {
    include_once 'layouts/header.php';
?>


    <title>Adm | Editar Cliente</title>
    <!-- Tell the browser to be responsive to screen width -->
    <?php
    include_once 'layouts/nav.php';
    ?>


    <div class="modal fade" id="crearcliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Crear cliente</h3>
                        <button data-dismiss="modal" aria-label="close" class="close" style="outline:none;">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-success text-center" id="add-prov" style="display: none;">
                            <span><i class="fas fa-check m-1"></i>Se agregó correctamente</span>
                        </div>
                        <div class="alert alert-danger text-center" id="noadd-prov" style="display: none;">
                            <span><i class="fas fa-times m-1"></i>El cliente ya existe</span>
                        </div>
                        <div class="alert alert-success text-center" id="edit-prove" style="display: none;">
                            <span><i class="fas fa-check m-1"></i>Se modificó correctamente</span>
                        </div>
                        <form id="form-crear">
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input id="nombre" type="text" class="form-control" placeholder="Ingrese nombre" required>
                            </div>
                            <div class="form-group">
                                <label for="apellido">Apellidos</label>
                                <input id="apellido" type="text" class="form-control" placeholder="Ingrese apellidos" required>
                            </div>
                            <div class="form-group">
                                <label for="dni">Dni</label>
                                <input id="dni" type="number" class="form-control" placeholder="Ingrese dni" required>
                            </div>
                            <div class="form-group">
                                <label for="edad">Nacimiento</label>
                                <input id="edad" type="date" class="form-control" placeholder="Ingrese nacimiento" required>
                            </div>
                            <div class="form-group">
                                <label for="telefono">Teléfono</label>
                                <input id="telefono" type="number" class="form-control" placeholder="Ingrese teléfono" >
                            </div>
                            <div class="form-group">
                                <label for="correo">Correo</label>
                                <input id="correo" type="email" class="form-control" placeholder="Ingrese correo">
                            </div>
                            <div class="form-group">
                                <label for="sexo">Sexo</label>
                                <input id="sexo" type="text" class="form-control" placeholder="Ingrese sexo" required>
                            </div>
                            <div class="form-group">
                                <label for="adicional">Adicional</label>
                                <input id="adicional" type="text" class="form-control" placeholder="Ingrese adicional">
                            </div>
                            <input type="hidden" id="id_edit_prov">
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn bg-gradient-primary float-right m-1">Guardar</button>
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary float-right m-1">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Gestion cliente <button type="button" data-toggle="modal" data-target="#crearcliente" class="btn bg-gradient-primary ml-2">Crear cliente</button></h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="adm_catalogo.php">Home</a></li>
                            <li class="breadcrumb-item active">Gestion cliente</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <section>
            <div class="container-fluid">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Buscar cliente</h3>
                        <div class="input-group">
                            <input type="text" id="buscar_cliente" class="form-control float-left" placeholder="Ingrese nombre de cliente">
                            <div class="input-group-append">
                                <button class="btn btn-default"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="cliente" class="row d-flex align-items-stretch">

                        </div>

                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- /.content-wrapper -->

<?php
    include_once 'layouts/footer.php';
} else {
    header('Location: ../index.php');
}
?>

<script src="../js/Cliente.js"></script>