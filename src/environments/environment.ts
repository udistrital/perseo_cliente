/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  NUXEO: {
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  CONFIGURACION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
  NOTIFICACION_SERVICE: 'ws://10.20.0.254:8199/ws/join',
  CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
  ADMINISTRATIVA_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services/administrativaProxy/',
  // ACTA_RECIBIDO_SERVICE: 'http://10.20.0.254:8206/v1/',
  ACTA_RECIBIDO_SERVICE: 'http://10.20.2.143:8080/v1/',
  ENTRADAS_SERVICE: 'http://10.20.2.157:8080/v1/',
  // ARKA_SERVICE: 'http://10.20.2.143:8080/v1/', PONER EL DE 254
  ARKA_SERVICE: 'http://10.20.2.157:8084/v1/',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: '3Idp5LUlnZY7cOV10NaLuyRfzooa',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role documento',
    REDIRECT_URL: 'http://localhost:4200/',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
  },

};
