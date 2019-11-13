import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'ARKA II',
  //   group: true,
  // },
  {
    title: 'Home',
    icon: 'nb-compose',
    link: '/pages/dashboard',
  },
  {
    title: 'Evaluaciones',
    icon: 'nb-compose',
    children: [
      {
        title: 'Evaluar Proveedor',
        link: '/pages/evaluar_proveedor/',
      },
    ],
  },
  {
    title: 'Evaluación',
    icon: 'nb-compose',
    children: [
      {
        title: 'Evaluación',
        link: '/pages/evaluacion/',
      },
    ],
  },
  {
    title: 'Consulta Evaluación',
    icon: 'nb-compose',
    children: [
      {
        title: 'Evaluación',
        link: '/pages/consulta_evaluacion/',
      },
    ],
  },
];
