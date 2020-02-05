import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
  },
  {
    title: 'Votacion',
    icon: 'nb-compose',
    link: '/pages/votacion',
    // key: 'votacion',
    children: [
      {
        title: 'Lista Votacion',
        link: '/pages/votacion/list-votacion',
        // key: 'lista_votacion',
      },
      {
        title: 'CRUD Votacion',
        link: '/pages/votacion/crud-votacion',
        // key: 'crud_votacion',
      },
    ],
  },
  // {
  //   title: 'Consulta Evaluación',
  //   icon: 'nb-search',
  //   children: [
  //     {
  //       title: 'Evaluación',
  //       link: '/pages/consulta_evaluacion/',
  //     },
  //   ],
  // },
];
