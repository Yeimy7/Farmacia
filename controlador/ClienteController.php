<?php
include '../modelo/Cliente.php';
$cliente = new Cliente();
if($_POST['funcion']=='buscar'){
    $cliente->buscar();
    date_default_timezone_set('America/La_Paz');
    $fecha=date('Y-m-d');
    $fecha_actual=new DateTime($fecha);
    $json=array();
    foreach ($cliente->objetos as $objeto) {
        $nac=new DateTime($objeto->edad);
        $edad=$nac->diff($fecha_actual);
        $json[]=array(
            'id'=>$objeto->id,
            'nombre'=>$objeto->nombre.' '.$objeto->apellidos,
            'dni'=>$objeto->dni,
            'edad'=>$edad->y,
            'telefono'=>$objeto->telefono,
            'correo'=>$objeto->correo,
            'sexo'=>$objeto->sexo,
            'adicional'=>$objeto->adicional,
            'avatar'=>'../img/default.png'
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}
