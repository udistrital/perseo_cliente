import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Universidad Distrital Francisco José de Caldas - <b>Oficina Asesora de Sistemas</b> - Desarrollo basado en el generador ngx-admin
    <a href="https://akveo.com" target="_blank">Akveo</a></span>
    <div class="socials">
      <a href="https://portalws.udistrital.edu.co/oas/" target="_blank" class="ion ion-university"></a>
      <a href="https://github.com/udistrital/" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.youtube.com/channel/UCQREWiK6PECCWpHrlGvbEkA" target="_blank" class="ion ion-social-youtube"></a>
    </div>
  `,
  //'<div><div class="container"><div class="row"><div class="col-md-4 col-sm-6 footerleft "><div class="logofooter"> Universidad Distrital Francisco José de Caldas</div><p> Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional Adscrita a la Alcaldía Mayor de Bogotá Distrito Capital </p><p><i class="fa fa-map-pin"></i> Carrera 7 # 40B - 53 - Bogotá D.C. - Colombia</p><p><i class="fa fa-phone"></i> Teléfono (Colombia) : +57 3 323 9300</p><p><i class="fa fa-envelope"></i> E-mail : atencion@udistrital.edu.co</p><p><i class="fa fa-handshake-o"></i> Lunes a Viernes de 8:00 a.m. a 5:00 p.m.</p><div class="logofooter"> Redes Sociales</div><div class="col-md-4"><a href="https://es-la.facebook.com/UniversidadDistrital/" target="_blank"><i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i> </a></div><div class="col-md-4"><a href="https://plus.google.com/106543869133961089207?hl=es" target="_blank"><i class="fa fa-google-plus fa-3x" aria-hidden="true"></i></a></div><div class="col-md-4"><a href="https://twitter.com/udistrital?lang=es" target="_blank"><i class="fa fa-twitter fa-3x" aria-hidden="true"></i></a></div></div><div class="col-md-4 col-sm-6 paddingtop-bottom"><h6 class="heading7">ENLACES UNIVERSITARIOS</h6><ul class="footer-ul"><li *ngFor="let elemento of Enlaces_universitarios"><a href="{{elemento.link}}"> {{elemento.nombre}}</a></li></ul></div><div class="col-md-4 col-sm-6 paddingtop-bottom"><h6 class="heading7">ENLACES DE INTERÉS</h6><ul class="footer-ul"><li *ngFor="let elemento of Enlaces_universitarios"><a href="{{elemento.link}}"> {{elemento.nombre}}</a></li></ul></div></div></div></div><div class="copyright"><div class="container"><div class="col-md-6"><p class="copyright">{{Copyright}}</p></div><div class="col-md-6"><ul class="bottom_ul"><li *ngFor="let elemento of Map"><a href="{{elemento.link}}"> {{elemento.nombre}}</a></li></ul></div></div></div>'
})
export class FooterComponent {
}