<?php
include '../modelo/Cliente.php';
$cliente = new Cliente();
if($_POST['funcion']=='buscar'){
    $cliente->buscar();
    $json=array();
    foreach ($cliente->objetos as $objeto) {
        $json[]=array(
            'id'=>$objeto->id,
            'nombre'=>$objeto->nombre.' '.$objeto->apellidos,
            'dni'=>$objeto->dni,
            'edad'=>$objeto->edad,
            'telefono'=>$objeto->telefono,
            'correo'=>$objeto->correo,
            'sexo'=>$objeto->sexo,
            'adicional'=>$objeto->adicional,
            'avatar'=>'../img/cliente/'.$objeto->avatar
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}
