$(document).ready(function () {
    let funcion = '';
    let id_usuario = $('#id_usuario').val();
    let edit = false;
    buscar_usuario(id_usuario);
    function buscar_usuario(dato) {
        funcion = 'buscar_usuario'
        $.post('../controlador/UsuarioController.php', { dato, funcion }, (response) => {
            let nombre = '', apellidos = '', edad = '', dni = '', tipo = '', telefono = '',
                residencia = '', correo = '', sexo = '', adicional = '';
            const usuario = JSON.parse(response);
            nombre += `${usuario.nombre}`;
            apellidos += `${usuario.apellidos}`;
            edad += `${usuario.edad}`;
            dni += `${usuario.dni}`;
            tipo += `${usuario.tipo}`;
            telefono += `${usuario.telefono}`;
            residencia += `${usuario.residencia}`;
            correo += `${usuario.correo}`;
            sexo += `${usuario.sexo}`;
            adicional += `${usuario.adicional}`;
            $('#nombre_us').html(nombre);
            $('#apellidos_us').html(apellidos);
            $('#edad').html(edad);
            $('#dni_us').html(dni);
            $('#us_tipo').html(tipo);
            $('#telefono_us').html(telefono);
            $('#residencia_us').html(residencia);
            $('#correo_us').html(correo);
            $('#sexo_us').html(sexo);
            $('#adicional_us').html(adicional);
            $('#avatar1').attr('src',usuario.avatar);
            $('#avatar2').attr('src',usuario.avatar);
            $('#avatar3').attr('src',usuario.avatar);
            $('#avatar4').attr('src',usuario.avatar);


        })

    }
    $(document).on('click', '.edit', (e) => {
        funcion = 'capturar_datos';
        edit = true;
        $.post('../controlador/UsuarioController.php', { funcion, id_usuario }, (response) => {
            const usuario = JSON.parse(response);
            console.log(usuario)
            $('#telefono').val(usuario.telefono);
            $('#residencia').val(usuario.residencia);
            $('#correo').val(usuario.correo);
            $('#sexo').val(usuario.sexo);
            $('#adicional').val(usuario.adicional);
        })
    });
    $('#form-usuario').submit(e => {
        if (edit) {
            let telefono = $('#telefono').val();
            let residencia = $('#residencia').val();
            let correo = $('#correo').val();
            let sexo = $('#sexo').val();
            let adicional = $('#adicional').val();
            funcion = 'editar-usuario';
            $.post('../controlador/UsuarioController.php', { id_usuario, funcion, telefono, residencia, correo, sexo, adicional }, (response) => {
                if (response == 'editado') {
                    $('#editado').hide('slow');
                    $('#editado').show(1000);
                    $('#editado').hide(4000);
                    $('#form-usuario').trigger('reset');
                }
                edit = false;
                buscar_usuario(id_usuario);
            })
        }
        else {
            $('#noeditado').hide('slow');
            $('#noeditado').show(1000);
            $('#noeditado').hide(4000);
            $('#form-usuario').trigger('reset');
        }
        e.preventDefault();
    });

    $('#form-pass').submit(e => {
        let oldpass = $('#oldpass').val();
        let newpass = $('#newpass').val();
        funcion = 'cambiar_contra';
        $.post('../controlador/UsuarioController.php', { id_usuario, funcion, oldpass, newpass }, (response) => {
            if (response == 'update') {
                $('#update').hide('slow');
                $('#update').show(1000);
                $('#update').hide(4000);
                $('#form-pass').trigger('reset');
            }
            else {
                $('#noupdate').hide('slow');
                $('#noupdate').show(1000);
                $('#noupdate').hide(4000);
                $('#form-pass').trigger('reset');
            }
        })
        e.preventDefault();

    })
    $('#form-photo').submit(e => {
        let formData = new FormData($('#form-photo')[0]);
        $.ajax({
            url: '../controlador/UsuarioController.php',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done(function (response) {
            const json = JSON.parse(response);
            if(json.alert=='edit'){
                $('#avatar1').attr('src', json.ruta);
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(4000);
                $('#form-photo').trigger('reset');
                buscar_usuario(id_usuario);

            }
            else{
                $('#noedit').hide('slow');
                $('#noedit').show(1000);
                $('#noedit').hide(4000);
                $('#form-photo').trigger('reset');
            }
            

        });
        e.preventDefault();
    })


})