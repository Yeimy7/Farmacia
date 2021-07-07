$(document).ready(function (){
    let funcion='';
    let id_usuario=$('#id_usuario').val();
    buscar_usuario(id_usuario);
    function buscar_usuario(dato) {
        funcion='buscar_usuario'
        $.post('../controlador/UsuarioController.php',{dato,funcion},(response)=>{
            let nombre='', apellidos='', edad='',dni='', tipo='', telefono='',
            residencia='', correo='', sexo='', adicional='';
            const usuario=JSON.parse(response);
            nombre+=`${usuario.nombre}`;
            apellidos+=`${usuario.apellidos}`;
            edad+=`${usuario.edad}`;
            dni+=`${usuario.dni}`;
            tipo+=`${usuario.tipo}`;
            telefono+=`${usuario.telefono}`;
            residencia+=`${usuario.residencia}`;
            correo+=`${usuario.correo}`;
            sexo+=`${usuario.sexo}`;
            adicional+=`${usuario.adicional}`;
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






        })
        
    }


})