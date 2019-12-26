import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MenuService } from '../@core/data/menu.service';



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
export class PagesComponent {
  menu = MENU_ITEMS;

  constructor(
    private translate: TranslateService,
    private menuService: MenuService,
    ) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => { // Live reload
      });
      // this.menuService.get(`ORDENADOR_DEL_GASTO/Evaluacion`).subscribe( menuResult => {
      //   console.info(menuResult);
      //   this.menu = menuResult;
      // } );

    }

}
