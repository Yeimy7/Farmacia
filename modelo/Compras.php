
<?php
include_once 'Conexion.php';
class Compras
{
    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function crear($codigo,$fecha_compra,$fecha_entrega,$total,$id_estado,$id_proveedor)
    {
        $sql = "INSERT INTO compra(codigo,fecha_compra,fecha_entrega,total,id_estado_pago,id_proveedor) VALUES (:codigo,:fecha_compra,:fecha_entrega,:total,:id_estado_pago,:id_proveedor);";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':codigo' =>$codigo,':fecha_compra' =>$fecha_compra,':fecha_entrega' =>$fecha_entrega,':total' =>$total,':id_estado_pago' =>$id_estado,':id_proveedor' =>$id_proveedor ));
    }
    function ultima_compra()
    {
        $sql = "SELECT MAX(id) as ultima_compra FROM compra ;";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }
    function listar_compras()
    {
        $sql = "SELECT concat(c.id,' | ',c.codigo) as codigo, fecha_compra, fecha_entrega, total, e.nombre as estado, p.nombre as proveedor FROM compra as c
        JOIN estado_pago as e ON e.id=c.id_estado_pago
        JOIN proveedor as p ON p.id_proveedor=c.id_proveedor ;";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }
    
}
