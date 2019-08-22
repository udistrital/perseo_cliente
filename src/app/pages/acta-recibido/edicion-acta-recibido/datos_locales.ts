export const DatosLocales: any[] = [
    {
        'Id': 0,
        'Nombre': '',
        'Cantidad': 0,
        'Marca': '',
        'Serie': '',
        'UnidadMedida': 0,
        'ValorUnitario': 0,
        'Subtotal': 0,
        'Descuento': 0,
        'ValorTotal': 0,
        'PorcentajeIvaId': 0,
        'ValorIva': 0,
        'ValorFinal': 0,
        'SubgrupoCatalogoId': 0,
        'Verificado': true,
        'TipoBienId': {
            'Id': 0,
            'Nombre': 'Consumo',
            'Descripcion': 'Elemento designado como bien de consumo',
            'CodigoAbreviacion': 'Consumo',
            'Activo': true,
            'NumeroOrden': 0,
            'FechaCreacion': '2009-07-24T09:02:39.03906-05:00',
            'FechaModificacion': '2009-07-24T09:02:39.03906-05:00',
        },
        'EstadoElementoId': {
            'Id': 0,
            'Nombre': 'Registrado',
            'Descripcion': 'Elemento registrado',
            'CodigoAbreviacion': 'Registrado',
            'Activo': true,
            'NumeroOrden': 2,
            'FechaCreacion': '2009-07-24T09:02:39.037655-05:00',
            'FechaModificacion': '2009-07-24T09:02:39.037655-05:00',
        },
        'SoporteActaId': {
            'Id': 4,
            'Consecutivo': '00-0235',
            'ProveedorId': 234,
            'FechaSoporte': '2009-03-20T09:00:00-05:00',
            'ActaRecibidoId': {
                'Id': 2,
                'UbicacionId': 0,
                'FechaVistoBueno': '0000-00-00T00:00:00Z',
                'RevisorId': 0,
                'Observaciones': 'Segunda acta de prueba',
                'Activo': true,
                'FechaCreacion': '2006-00-02T05:04:05-05:00',
                'FechaModificacion': '2006-00-02T05:04:05-05:00',
            },
            'Activo': true,
            'FechaCreacion': '2009-07-24T04:02:39.02968-05:00',
            'FechaModificacion': '2009-07-24T04:02:39.02968-05:00',
        },
        'Activo': true,
        'FechaCreacion': '2009-06-23T04:00:00-05:00',
        'FechaModificacion': '2009-06-23T04:00:00-05:00',
    },
];

export const Formulario: any = {

    "Formulario1": {
        "Sede": "Sede 3",
        "Dependencia": "Dependencia 3",
        "Ubicacion": "Ubicación 3"
    },
    "Formulario2": [
        {
            "Proveedor": "asdfasdfasdfasd",
            "Consecutivo": "asdfasdfasdf",
            "Fecha_Factura": "2019-08-10T05:00:00.000Z",
            "Soporte": "C:\\fakepath\\arka_acta_recibido(1).dbm",
            "Elementos": [
                {
                    "TipoBienId": "2",
                    "SubgrupoCatalogoId": "7674234",
                    "Nombre": "adsfasdf",
                    "Cantidad": 1,
                    "Marca": "asdfasd",
                    "Serie": "fasdfasdf",
                    "UnidadMedida": "asdfasdf",
                    "ValorUnitario": "$456.00",
                    "Subtotal": "$456.00",
                    "Descuento": "$0.00",
                    "PorcentajeIvaId": 19,
                    "ValorIva": "$86.64",
                    "ValorTotal": "$542.64"
                },
                {
                    "TipoBienId": "3",
                    "SubgrupoCatalogoId": "7674234",
                    "Nombre": "erqwrwe",
                    "Cantidad": 1,
                    "Marca": "sergsdfga",
                    "Serie": "dfgadfgsdfg",
                    "UnidadMedida": "sdfgsdfg",
                    "ValorUnitario": "$987.00",
                    "Subtotal": "$987.00",
                    "Descuento": "$234.00",
                    "PorcentajeIvaId": 19,
                    "ValorIva": "$143.07",
                    "ValorTotal": "$896.07"
                }
            ]
        },
        {
            "Proveedor": "asdfasdfasd",
            "Consecutivo": "fasdfasdf",
            "Fecha_Factura": "2019-08-06T05:00:00.000Z",
            "Soporte": "C:\\fakepath\\movimientos_v2.dbm",
            "Elementos": [
                {
                    "Cantidad": 1,
                    "ValorUnitario": "$444.00",
                    "Subtotal": "$444.00",
                    "Descuento": "$0.00",
                    "PorcentajeIvaId": 19,
                    "ValorIva": "$84.36",
                    "ValorTotal": "$528.36"
                }
            ]
        }
    ],
    "Formulario3": {
        "Datos_Adicionales": "asdfadgdfgjdfghsdfg"
    }
};
