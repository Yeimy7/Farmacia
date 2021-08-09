$(document).ready(function(){
    let funcion;
    venta_mes();

    async function venta_mes(){
        funcion='venta_mes';
        let array=['','','','','','','','','','','',''];
        const response = await fetch('../controlador/VentaController.php',{
            method:'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion 
        }).then(function(response){
            return response.json();
        }).then(function(meses){
            meses.forEach(mes => {
                if(mes.mes==1){
                    array[0]=mes;
                }
                if(mes.mes==2){
                    array[1]=mes;
                }
                if(mes.mes==3){
                    array[2]=mes;
                }
                if(mes.mes==4){
                    array[3]=mes;
                }
                if(mes.mes==5){
                    array[4]=mes;
                }
                if(mes.mes==6){
                    array[5]=mes;
                }
                if(mes.mes==7){
                    array[6]=mes;
                }
                if(mes.mes==8){
                    array[7]=mes;
                }
                if(mes.mes==9){
                    array[8]=mes;
                }
                if(mes.mes==10){
                    array[9]=mes;
                }
                if(mes.mes==11){
                    array[10]=mes;
                }
                if(mes.mes==12){
                    array[11]=mes;
                }
            });
        });
        let canvasG1=$('#Grafico1').get(0).getContext('2d');
        let datos={
            labels:[
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
            ],
            datasets:[{
                data:[
                    Number(array[0].cantidad).toFixed(2),
                    Number(array[1].cantidad).toFixed(2),
                    Number(array[2].cantidad).toFixed(2),
                    Number(array[3].cantidad).toFixed(2),
                    Number(array[4].cantidad).toFixed(2),
                    Number(array[5].cantidad).toFixed(2),
                    Number(array[6].cantidad).toFixed(2),
                    Number(array[7].cantidad).toFixed(2),
                    Number(array[8].cantidad).toFixed(2),
                    Number(array[9].cantidad).toFixed(2),
                    Number(array[10].cantidad).toFixed(2),
                    Number(array[11].cantidad).toFixed(2),
                ],
                backgroundColor:[
                    '#986D8E',
                    '#87A8A4',
                    '#D9CAB3',
                    '#EFE3D0',
                    '#716F81',
                    '#B97A95',
                    '#F6AE99',
                    '#F2E1C1',
                    '#2F5D62',
                    '#5E8B7E',
                    '#A7C4BC',
                    '#DFEEEA'

                ]
            }]
        }
        let opciones={
            maintainAspectRatio:false,
            responsive:true
        }
        let G1=new Chart(canvasG1,{
            type:'pie',
            data:datos,
            options:opciones
        })
    }
    
});