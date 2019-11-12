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

];
