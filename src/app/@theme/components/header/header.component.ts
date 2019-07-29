import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { NotificacionesService } from '../../../@core/utils/notificaciones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  title: any;

  itemClick: Subscription;
  liveTokenValue: boolean = false;
  
  username = '';
  userMenu = [{ title: 'ver todas', icon: 'fa fa-list' }];
  public noNotify: any = '0';
  
  private autenticacion = new ImplicitAutenticationService;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    public notificacionService: NotificacionesService,
    public translate: TranslateService) {

    this.translate = translate;
    this.itemClick = this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

    this.notificacionService.arrayMessages$
      .subscribe((notification: any) => {
        const temp = notification.map((notify: any) => {
          return { title: notify.Content.Message, icon: 'fa fa-commenting-o' }
        });
        this.userMenu = [...temp.slice(0, 7), ...[{ title: 'ver todas', icon: 'fa fa-list' }]];
      });
    this.liveToken();
  }


  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
  }


  useLanguage(language: string) {
    this.translate.use(language);
  }

  liveToken() {
    if (this.autenticacion.live()) {
      this.liveTokenValue = this.autenticacion.live();
      this.username = (this.autenticacion.getPayload()).sub;
    }
    return this.autenticacion.live();
  }

  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }

  changeStateNoView(): void {
    this.notificacionService.changeStateNoView(this.username)
  }
  login() {
    window.location.replace(this.autenticacion.getAuthorizationUrl(true));
  }
  logout() {
    this.autenticacion.logout();
    // this.liveTokenValue = auth.live(true);
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
