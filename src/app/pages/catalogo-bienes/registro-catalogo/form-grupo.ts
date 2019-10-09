export let FORM_GRUPO = {
    titulo: 'Grupo',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'Grupo',
    campos: [
        {
            etiqueta: 'input',
            claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
            nombre: 'Nombre',
            label_i18n: 'nombre',
            placeholder_i18n: 'nombre',
            requerido: true,
            tipo: 'text',
        },
        {
            etiqueta: 'textarea',
            claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
            nombre: 'Descripcion',
            label_i18n: 'descripcion',
            placeholder_i18n: 'descripcion',
            requerido: true,
            tipo: 'text',
        },
        // {
        //     etiqueta: 'checkbox',
        //     claseGrid: 'col-6',
        //     nombre: 'Activo',
        //     label_i18n: 'activo',
        //     placeholder_i18n: 'activo',
        //     requerido: true,
        //     tipo: 'checkbox',
        // },

        // /* {
        //     etiqueta: 'select',
        //     claseGrid: 'col-6',
        //     nombre: 'Grupo',
        //     label_i18n: 'grupo',
        //     placeholder_i18n: 'grupo',
        //     requerido: true,
        //     tipo: 'Grupo',
        //     // key: 'Name',
        //     opciones: [],
        // }, */
    ],
};
