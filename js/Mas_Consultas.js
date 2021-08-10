$(document).ready(function () {
    let funcion;
    venta_mes();
    vendedor_mes();
    ventas_anual();
    producto_mas_vendido();
    async function producto_mas_vendido(){
        funcion = 'producto_mas_vendido';
        let lista = ['', '', '', '', ''];
        const response = await fetch('../controlador/VentaController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion
        }).then(function (response) {
            return response.json();
        }).then(function (productos) {
            console.log(productos)
            let i=0;
            productos.forEach(producto => {
                lista[i]=producto;
                i++;
            });
        })

        let canvasG4 = $('#Grafico4').get(0).getContext('2d');
        let datos = {
            labels: ['Mes actual'],
            datasets: [
                {
                    label: lista[0].nombre+lista[0].concentracion+lista[0].adicional,
                    backgroundColor: 'rgb(87, 131, 123)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[0].total).toFixed(2)]
                },
                {
                    label: lista[1].nombre+lista[1].concentracion+lista[1].adicional,
                    backgroundColor: 'rgb(201, 216, 182)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[1].total).toFixed(2)]

                },
                {
                    label: lista[2].nombre+lista[2].concentracion+lista[2].adicional,
                    backgroundColor: 'rgb(241, 236, 195)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[2].total).toFixed(2)]

                },
                {
                    label: lista[3].nombre+lista[3].concentracion+lista[3].adicional,
                    backgroundColor: 'rgb(144, 127, 164)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[3].total).toFixed(2)]

                },
                {
                    label: lista[4].nombre+lista[4].concentracion+lista[4].adicional,
                    backgroundColor: 'rgb(166, 214, 214)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[4].total).toFixed(2)]

                }
            ]
        }
        let opciones = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }
        let G4 = new Chart(canvasG4, {
            type: 'bar',
            data: datos,
            options: opciones
        })

    }
    async function ventas_anual() {
        funcion = 'ventas_anual';
        let lista = ['', '', '', '', '', '', '', '', '', '', '', ''];
        const response = await fetch('../controlador/VentaController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion
        }).then(function (response) {
            return response.json();
        }).then(function (meses) {
            meses.forEach(mes => {
                if (mes.mes == 1) {
                    lista[0] = mes;
                }
                if (mes.mes == 2) {
                    lista[1] = mes;
                }
                if (mes.mes == 3) {
                    lista[2] = mes;
                }
                if (mes.mes == 4) {
                    lista[3] = mes;
                }
                if (mes.mes == 5) {
                    lista[4] = mes;
                }
                if (mes.mes == 6) {
                    lista[5] = mes;
                }
                if (mes.mes == 7) {
                    lista[6] = mes;
                }
                if (mes.mes == 8) {
                    lista[7] = mes;
                }
                if (mes.mes == 9) {
                    lista[8] = mes;
                }
                if (mes.mes == 10) {
                    lista[9] = mes;
                }
                if (mes.mes == 11) {
                    lista[10] = mes;
                }
                if (mes.mes == 12) {
                    lista[11] = mes;
                }
            });
        });

        funcion = 'venta_mes';
        let lista1 = ['', '', '', '', '', '', '', '', '', '', '', ''];
        const response1 = await fetch('../controlador/VentaController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion
        }).then(function (response1) {
            return response1.json();
        }).then(function (meses) {
            meses.forEach(mes => {
                if (mes.mes == 1) {
                    lista1[0] = mes;
                }
                if (mes.mes == 2) {
                    lista1[1] = mes;
                }
                if (mes.mes == 3) {
                    lista1[2] = mes;
                }
                if (mes.mes == 4) {
                    lista1[3] = mes;
                }
                if (mes.mes == 5) {
                    lista1[4] = mes;
                }
                if (mes.mes == 6) {
                    lista1[5] = mes;
                }
                if (mes.mes == 7) {
                    lista1[6] = mes;
                }
                if (mes.mes == 8) {
                    lista1[7] = mes;
                }
                if (mes.mes == 9) {
                    lista1[8] = mes;
                }
                if (mes.mes == 10) {
                    lista1[9] = mes;
                }
                if (mes.mes == 11) {
                    lista1[10] = mes;
                }
                if (mes.mes == 12) {
                    lista1[11] = mes;
                }
            });
        });
        let canvasG3 = $('#Grafico3').get(0).getContext('2d');
        let datos = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Año Anterior',
                    backgroundColor: 'rgb(110, 133, 178)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [
                        Number(lista[0].cantidad).toFixed(2),
                        Number(lista[1].cantidad).toFixed(2),
                        Number(lista[2].cantidad).toFixed(2),
                        Number(lista[3].cantidad).toFixed(2), 
                        Number(lista[4].cantidad).toFixed(2),
                        Number(lista[5].cantidad).toFixed(2), 
                        Number(lista[6].cantidad).toFixed(2),
                        Number(lista[7].cantidad).toFixed(2), 
                        Number(lista[8].cantidad).toFixed(2),
                        Number(lista[9].cantidad).toFixed(2), 
                        Number(lista[10].cantidad).toFixed(2),
                        Number(lista[11].cantidad).toFixed(2)
                    ]
                },

                {
                    label: 'Año Actual',
                    backgroundColor: 'rgb(54, 34, 34)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [
                        Number(lista1[0].cantidad).toFixed(2),
                        Number(lista1[1].cantidad).toFixed(2),
                        Number(lista1[2].cantidad).toFixed(2),
                        Number(lista1[3].cantidad).toFixed(2), 
                        Number(lista1[4].cantidad).toFixed(2),
                        Number(lista1[5].cantidad).toFixed(2), 
                        Number(lista1[6].cantidad).toFixed(2),
                        Number(lista1[7].cantidad).toFixed(2), 
                        Number(lista1[8].cantidad).toFixed(2),
                        Number(lista1[9].cantidad).toFixed(2), 
                        Number(lista1[10].cantidad).toFixed(2),
                        Number(lista1[11].cantidad).toFixed(2)
                    ]

                }
            ]
        }
        let opciones = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }
        let G3 = new Chart(canvasG3, {
            type: 'bar',
            data: datos,
            options: opciones
        })


    }
    async function vendedor_mes() {
        funcion = 'vendedor_mes';
        let lista = ['', '', ''];
        const response = await fetch('../controlador/VentaController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion
        }).then(function (response) {
            return response.json();
        }).then(function (vendedores) {
            let i = 0;
            vendedores.forEach(vendedor => {
                lista[i] = vendedor;
                i++;
            });
        })
        let canvasG2 = $('#Grafico2').get(0).getContext('2d');
        let datos = {
            labels: ['Mes actual'],
            datasets: [
                {
                    label: lista[0].vendedor_nombre,
                    backgroundColor: 'rgb(87, 131, 123)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[0].cantidad).toFixed(2)]
                },
                {
                    label: lista[1].vendedor_nombre,
                    backgroundColor: 'rgb(201, 216, 182)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[1].cantidad).toFixed(2)]

                },
                {
                    label: lista[2].vendedor_nombre,
                    backgroundColor: 'rgb(241, 236, 195)',
                    borderColor: 'rgb(0,0,0)',
                    pointRadius: false,
                    pointColor: 'rgb(241, 236, 195)',
                    pointStrokeColor: 'rgb(81, 94, 99)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(189, 75, 75)',
                    data: [Number(lista[2].cantidad).toFixed(2)]

                }
            ]
        }
        let opciones = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }
        let G2 = new Chart(canvasG2, {
            type: 'bar',
            data: datos,
            options: opciones
        })

    }
    async function venta_mes() {
        funcion = 'venta_mes';
        let array = ['', '', '', '', '', '', '', '', '', '', '', ''];
        const response = await fetch('../controlador/VentaController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'funcion=' + funcion
        }).then(function (response) {
            return response.json();
        }).then(function (meses) {
            meses.forEach(mes => {
                if (mes.mes == 1) {
                    array[0] = mes;
                }
                if (mes.mes == 2) {
                    array[1] = mes;
                }
                if (mes.mes == 3) {
                    array[2] = mes;
                }
                if (mes.mes == 4) {
                    array[3] = mes;
                }
                if (mes.mes == 5) {
                    array[4] = mes;
                }
                if (mes.mes == 6) {
                    array[5] = mes;
                }
                if (mes.mes == 7) {
                    array[6] = mes;
                }
                if (mes.mes == 8) {
                    array[7] = mes;
                }
                if (mes.mes == 9) {
                    array[8] = mes;
                }
                if (mes.mes == 10) {
                    array[9] = mes;
                }
                if (mes.mes == 11) {
                    array[10] = mes;
                }
                if (mes.mes == 12) {
                    array[11] = mes;
                }
            });
        });
        let canvasG1 = $('#Grafico1').get(0).getContext('2d');
        let datos = {
            labels: [
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
            datasets: [{
                data: [
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
                backgroundColor: [
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
        let opciones = {
            maintainAspectRatio: false,
            responsive: true
        }
        let G1 = new Chart(canvasG1, {
            type: 'pie',
            data: datos,
            options: opciones
        })
    }

});