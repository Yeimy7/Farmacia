<?php
include_once '../modelo/Usuario.php';
$usuario = new Usuario();
if ($_POST['funcion'] == 'verificar') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $usuario->verificar($email,$dni);
}
if ($_POST['funcion'] == 'recuperar') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $codigo=generar(10);
    $usuario->reemplazar($codigo,$email,$dni);
}

function generar($longitud){
    $key='';
    $patron='1234567890abcdefghijklmnopqrstuvwxyz';
    $max=strlen($patron)-1;
    for($i=0;$i<$longitud;$i++){
        $key.=$patron{mt_rand(0,$max)};
    }
    return $key;
}