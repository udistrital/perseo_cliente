import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'ARKA II',
  //   group: true,
  // },
  {
    title: 'Evaluaciones',
    icon: 'nb-compose',
    children: [
      {
        title: 'Consultar Evaluaciones',
        link: '/pages/reportes/registro-entradas',
      },
    ],
  },
  {
    title: 'Catalogo de Elementos',
    icon: 'nb-compose',
    children: [
      {
        title: 'Lista de Catalogos',
        link: '/pages/catalogo/list-catalogo',
      },
      {
        title: 'Detalle de Catálogo',
        link: '/pages/catalogo_bienes/consulta_catalogo',
      },
      {
        title: 'Construcción de Catálogo',
        link: '/pages/catalogo_bienes/registro_catalogo',
      },
      {
        title: 'Asignacion de Cuentas',
        link: '/pages/catalogo_bienes/registro_cuentas_catalogo',
      },
    ],
  },
];
