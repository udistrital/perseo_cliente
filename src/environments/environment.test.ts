/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const environment = {
  production: false,
  NUXEO: {
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
  NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws',
  CONF_MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
  EVALUACIONMID_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/evaluacion_mid/v1/',
  EVALUACIONCRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/evaluacion_crud/v1/',
  ADMINISTRIVA_AMAZON: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/',
  PERSEO_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/perseo_mid/v1/',

  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: '67oeGvyGx98w3sDVETSZt9GQ7Ska',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role documento',
    REDIRECT_URL: 'https://pruebasperseo.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://pruebasperseo.portaloas.udistrital.edu.co',
  },
};
