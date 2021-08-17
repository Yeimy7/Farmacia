$(document).ready(function () {
    $('#aviso1').hide();
    $('#aviso').hide();
    $('#form-recuperar').submit(e => {
        $('#aviso1').hide();
        $('#aviso').hide();
        Mostrar_loader('Recuperar_password');
        let email = $('#email_recuperar').val();
        let dni = $('#dni_recuperar').val();
        if (email == '' || dni == '') {
            $('#aviso1').hide();
            $('#aviso').show();
            $('#aviso').text('Rellene todos los campos');
            Cerrar_loader();
        }
        else {
            $('#aviso').hide();
            let funcion = 'verificar';
            $.post('../controlador/recuperar.php', { funcion, email, dni }, (response) => {
                if (response == 'encontrado') {
                    let funcion = 'recuperar';
                    $('#aviso').hide();
                    $.post('../controlador/recuperar.php', { funcion, email, dni }, (response2) => {
                        $('#aviso1').hide();
                        $('#aviso').hide();
                        console.log(response2);
                        if (response2 == 'enviado') {
                            Cerrar_loader('exito_envio');
                            $('#aviso1').show();
                            $('#aviso1').text('Se reestableció la contraseña');
                            $('#form-recuperar').trigger('reset');
                        }
                        else {
                            Cerrar_loader('error_envio');
                            $('#aviso1').hide();
                            $('#aviso').show();
                            $('#aviso').text('No se puedo reestablecer la contraseña, intentelo de nuevo');
                            $('#form-recuperar').trigger('reset');

                        }
                    })

                }
                else {
                    Cerrar_loader('error_usuario');
                    $('#aviso1').hide();
                    $('#aviso').hide();
                    $('#aviso').show();
                    $('#aviso').text('El correo o el dni no se encuentran registrados en el sistema');
                    $('#form-recuperar').trigger('reset');

                }
            })
        }
        e.preventDefault();
    });
    function Mostrar_loader(mensaje) {
        let texto = null;
        let mostrar = false;
        switch (mensaje) {
            case 'Recuperar_password':
                texto = 'Se esta enviando el correo, por favor espere...';
                mostrar = true;
                break;
        }
        if (mostrar) {
            Swal.fire({
                title: 'Enviando correo',
                text: texto,
                showConfirmButton: false
            })
        }
    }
    function Cerrar_loader(mensaje) {
        let tipo = null;
        let texto = null;
        let mostrar = false;
        switch (mensaje) {
            case 'exito_envio':
                tipo = 'success';
                texto = 'El correo fue enviado correctamente';
                mostrar = true;
                break;
            case 'error_envio':
                tipo = 'error';
                texto = 'El correo no pudo enviarse, por favor intente de nuevo';
                mostrar = true;
                break;
            case 'error_usuario':
                tipo = 'error';
                texto = 'El usuario no fué encontrado.';
                mostrar = true;
                break;
            default:
                Swal.close();
                break;
        }
        if (mostrar) {
            Swal.fire({
                position: 'center',
                icon: tipo,
                text: texto,
                showConfirmButton: false
            })
        }
    }

});