import { Component , OnInit} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MenuService } from '../@core/data/menu.service';
import { ImplicitAutenticationService } from '../@core/utils/implicit_autentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NbMenuItem } from '@nebular/theme';



import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
      <footer></footer>
    </ngx-sample-layout>


  `,
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;
  roles: any;
  rol: string;
  menuLogin: NbMenuItem[] = [];

  constructor(
    private translate: TranslateService,
    private menuService: MenuService,
    private implicitAutenticationService: ImplicitAutenticationService,
    ) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
      });

    }

    ngOnInit() {
      if ( this.implicitAutenticationService.live() ) {
        this.roles = (JSON.parse(atob(localStorage.getItem('id_token').split('.')[1])).role)
        .filter((data: any) => (data.indexOf('/') === -1));
        // console.info(this.roles);
        this.menuService.get(this.roles + `/Perseo`).subscribe( menuResult => {
          // console.info(menuResult);
          const menuRespuesta = <any>menuResult;
          this.menuLogin.push({
            title: 'Home',
            icon: 'nb-home',
            link: '/pages/dashboard',
          });
          // this.menuLogin.push({
          //   title: 'Votacion',
          //   icon: 'nb-compose',
          //   link: '/pages/votacion',
          //   // key: 'votacion',
          //   children: [
          //     {
          //       title: 'Lista Votacion',
          //       link: '/pages/votacion/list-votacion',
          //       // key: 'lista_votacion',
          //     },
          //     {
          //       title: 'CRUD Votacion',
          //       link: '/pages/votacion/crud-votacion',
          //       // key: 'crud_votacion',
          //     },
          //   ],
          // });
          if (menuRespuesta !== null) {
            for (let i = 0; i < menuRespuesta.length; i++) {
              if ( menuRespuesta[i]['Opciones'] !== null ) {
                const hijos: Hijo[] = [];
                // this.menuLogin.push({
                //   title: menuRespuesta[i]['Nombre'],
                //   link: menuRespuesta[i]['Url'],
                //   icon: 'nb-compose',
                // });
                for (let j = 0; j < menuRespuesta[i]['Opciones'].length; j++) {
                  hijos.push({
                    title: menuRespuesta[i]['Opciones'][j]['Nombre'],
                    link: menuRespuesta[i]['Opciones'][j]['Url'],
                  });
                }
                this.menuLogin.push({
                  title: menuRespuesta[i]['Nombre'],
                  link: menuRespuesta[i]['Url'],
                  icon: 'nb-compose',
                  children: hijos,
                });
              } else {
                this.menuLogin.push({
                  title: menuRespuesta[i]['Nombre'],
                  link: menuRespuesta[i]['Url'],
                  icon: 'nb-compose',
                });
              }

            }
            // console.info(this.menuLogin);
          }
          this.menu = this.menuLogin;
        },
        (error: HttpErrorResponse) => {
          this.menu = MENU_ITEMS;
        });
      }
    }
}



interface Hijo {
  title: string;
  link: string;
  }
