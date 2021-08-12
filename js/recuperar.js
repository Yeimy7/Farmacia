$(document).ready(function () {
    $('#aviso1').hide();
    $('#aviso').hide();
    $('#form-recuperar').submit(e => {
        let email = $('#email_recuperar').val();
        let dni = $('#dni_recuperar').val();
        if (email == '' || dni == '') {
            $('#aviso').show();
            $('#aviso').text('Rellene todos los campos');
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
                            $('#aviso1').show();
                            $('#aviso1').text('Se reestableció la contraseña');
                            $('#form-recuperar').trigger('reset');
                        }
                        else {
                            $('#aviso').show();
                            $('#aviso').text('No se puedo reestablecer la contraseña, intentelo de nuevo');
                            $('#form-recuperar').trigger('reset');
                            
                        }
                    })

                }
                else {
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

});