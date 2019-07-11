import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Creado con ♥ por la
      <b>
        <a href="https://www.udistrital.edu.co" target="_blank">Oficina Asesora de Sistemas Universidad Distrital</a>
      </b> 2019
    </span>
    <div class="socials">
      <a href="https://github.com/udistrital" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/UniversidadDistrital/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/udistrital" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
