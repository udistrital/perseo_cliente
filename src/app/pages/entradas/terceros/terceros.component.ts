import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Contrato } from '../../../@core/data/models/entrada/contrato';
import { SoporteActa } from '../../../@core/data/models/acta_recibido/soporte_acta';
import { EntradaHelper } from '../../../helpers/entradas/entradaHelper';
import { ActaRecibidoHelper } from '../../../helpers/acta_recibido/actaRecibidoHelper';
import { PopUpManager } from '../../../managers/popUpManager';
import { OrdenadorGasto } from '../../../@core/data/models/entrada/ordenador_gasto';
import { Supervisor } from '../../../@core/data/models/entrada/supervisor';
import { Entrada } from '../../../@core/data/models/entrada/entrada';

@Component({
  selector: 'ngx-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss'],
})
export class TercerosComponent implements OnInit {

  // Formularios
  contratoForm: FormGroup;
  facturaForm: FormGroup;
  observacionForm: FormGroup;
  // Validadores
  checked: boolean;
  tipoContratoSelect: boolean;
  vigenciaSelect: boolean;
  // Año Actual
  vigencia: number;
  // Contratos
  contratos: Array<Contrato>;
  // Contrato Seleccionado
  contratoEspecifico: Contrato;
  // Número de Contrato
  contratoInput: string;
  // Soportes
  soportes: Array<SoporteActa>;
  proveedor: string;
  fechaFactura: string;
  observaciones: string;
  validar: boolean;
  // Selects
  opcionTipoContrato: string;
  opcionvigencia: string;

  @Input() actaRecibidoId: string;

  constructor(private entradasHelper: EntradaHelper, private actaRecibidoHelper: ActaRecibidoHelper,
    private pUpManager: PopUpManager, private fb: FormBuilder) {
    this.checked = false;
    this.tipoContratoSelect = false;
    this.vigenciaSelect = false;
    this.contratos = new Array<Contrato>();
    this.contratoEspecifico = new Contrato;
    this.soportes = new Array<SoporteActa>();
    this.proveedor = '';
    this.fechaFactura = '';
    this.validar = false;
    this.iniciarContrato();
  }

  ngOnInit() {
    this.contratoForm = this.fb.group({
      contratoCtrl: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{2,4}$')],
      ],
    });
    this.facturaForm = this.fb.group({
      facturaCtrl: ['', Validators.nullValidator],
    });
    this.observacionForm = this.fb.group({
      observacionCtrl: ['', Validators.nullValidator],
    });
    this.getVigencia();
  }

  /**
   * Métodos para cargar los contratos.
   */
  loadContratos(): void {
    if (this.opcionTipoContrato !== '' && this.opcionvigencia) {
      this.entradasHelper.getContratos(this.opcionTipoContrato, this.opcionvigencia).subscribe(res => {
        if (res !== null) {
          while (this.contratos.length > 0) {
            this.contratos.pop();
          }
          for (const index of Object.keys(res.contratos_suscritos.contrato_suscritos)) {
            const contratoAux = new Contrato;
            contratoAux.NumeroContratoSuscrito = res.contratos_suscritos.contrato_suscritos[index].numero_contrato;
            this.contratos.push(contratoAux);
          }
        }
      });
    }
  }

  loadContratoEspecifico(): void {
    this.entradasHelper.getContrato(this.contratoInput, this.opcionvigencia).subscribe(res => {
      if (res !== null) {
        const ordenadorAux = new OrdenadorGasto;
        const supervisorAux = new Supervisor;
        ordenadorAux.Id = res.contrato.ordenador_gasto.id;
        ordenadorAux.NombreOrdenador = res.contrato.ordenador_gasto.nombre_ordenador;
        ordenadorAux.RolOrdenadorGasto = res.contrato.ordenador_gasto.rol_ordenador;
        supervisorAux.Id = res.contrato.supervisor.id;
        supervisorAux.Nombre = res.contrato.supervisor.nombre;
        supervisorAux.Cargo = res.contrato.supervisor.cargo;
        supervisorAux.DocumentoIdentificacion = res.contrato.supervisor.documento_identificacion;
        this.contratoEspecifico.OrdenadorGasto = ordenadorAux;
        this.contratoEspecifico.NumeroContratoSuscrito = res.contrato.numero_contrato;
        this.contratoEspecifico.TipoContrato = res.contrato.tipo_contrato;
        this.contratoEspecifico.FechaSuscripcion = res.contrato.fecha_suscripcion;
        this.contratoEspecifico.Supervisor = supervisorAux;
      }
    });
  }

  loadSoporte(): void {
    this.actaRecibidoHelper.getSoporte(this.actaRecibidoId).subscribe(res => {
      if (res !== null) {
        for (const index in res) {
          if (res.hasOwnProperty(index)) {
            const soporte = new SoporteActa;
            soporte.Id = res[index].Id;
            soporte.Consecutivo = res[index].Consecutivo;
            soporte.Proveedor = res[index].ProveedorId;
            soporte.FechaSoporte = res[index].FechaSoporte;
            this.soportes.push(soporte);
          }
        }
      }
    });
  }

  /**
   * Métodos para validar campos requeridos en el formulario.
   */
  onContratoSubmit() {
    if (this.contratos.length > 0) {
      const aux = this.contratoForm.value.contratoCtrl;
      let existe = false;
      if (aux !== '') {
        for (const i in this.contratos) {
          if (this.contratos[i].NumeroContratoSuscrito.toString() === aux) {
            this.contratoInput = aux;
            existe = true;
          }
        }
        if (existe) {
          this.loadContratoEspecifico();
          this.loadSoporte();
        } else {
          this.iniciarContrato();
          this.pUpManager.showErrorAlert('El contrato seleccionado no existe!');
        }
      }
    }
    this.contratoForm.markAsDirty();
  }

  onFacturaSubmit() {
    this.validar = true;
    this.facturaForm.markAsDirty();
  }

  /**
   * Método para validar que se seleccionó el checkbox de importación.
   * Si es activo, el formulario se vuelve requerido.
   */
  toggle(event) {
    this.checked = event.target.checked;
    if (this.checked) {
      this.facturaForm = this.fb.group({
        facturaCtrl: ['', Validators.required],
      });
    } else {
      this.facturaForm = this.fb.group({
        facturaCtrl: ['', Validators.nullValidator],
      });
    }
  }

  /**
   * Métodos para cambiar estados de los select.
   */
  changeSelectTipoContrato(event) {
    if (!this.tipoContratoSelect) {
      this.tipoContratoSelect = !this.tipoContratoSelect;
    }
    this.opcionTipoContrato = event.target.options[event.target.options.selectedIndex].value;
    this.loadContratos();
  }

  changeSelectVigencia(event) {
    if (!this.vigenciaSelect) {
      this.vigenciaSelect = !this.vigenciaSelect;
    }
    this.opcionvigencia = event.target.options[event.target.options.selectedIndex].value;
    this.loadContratos();
  }

  changeSelectSoporte(event) {
    const soporteId: string = event.target.options[event.target.options.selectedIndex].value;
    for (const i in this.soportes) {
      if (this.soportes[i].Id.toString() === soporteId) {
        this.proveedor = this.soportes[i].Proveedor.toString();
        this.fechaFactura = this.soportes[i].FechaSoporte.toString();
      }
    }
  }

  iniciarContrato() {
    const ordenadorAux = new OrdenadorGasto;
    const supervisorAux = new Supervisor;
    ordenadorAux.NombreOrdenador = '';
    ordenadorAux.RolOrdenadorGasto = '';
    supervisorAux.Nombre = '';
    this.contratoEspecifico.OrdenadorGasto = ordenadorAux;
    this.contratoEspecifico.Supervisor = supervisorAux;
  }

  /**
   * Método para obtener el año en curso
   */
  getVigencia() {
    this.vigencia = new Date().getFullYear();
  }

  /**
   * Método para enviar registro
   */
  onSubmit() {
    if (this.validar) {
      const entradaData = new Entrada;
      entradaData.TipoEntrada = 5;
      entradaData.ActaRecibidoId = +this.actaRecibidoId;
      entradaData.ContratoId = this.contratoEspecifico.NumeroContratoSuscrito;
      entradaData.Importacion = true;
      entradaData.NumeroImportacion = this.facturaForm.value.facturaCtrl;
      entradaData.FechaCreacion = new Date();
      entradaData.FechaModificacion = new Date();
      entradaData.Observacion = this.observacionForm.value.observacionCtrl;
      // entradaData.Observacion = aux[3];
      // this.entradasHelper.postEntrada(entradaData).subscribe(res => {
      //   console.info(entradaData + 'Rest' + res);
      //   if (res !== null) {
      //     this.pUpManager.showSuccesToast('Registro Exitoso');
      //     this.pUpManager.showSuccessAlert('Entrada registrada satisfactoriamente!');
      //   }
      // });
      // console.log(entradaData);
      this.pUpManager.showSuccesToast('Registro Exitoso');
      this.pUpManager.showSuccessAlert('Entrada registrada satisfactoriamente!');
    } else {
      this.pUpManager.showErrorAlert('No ha llenado todos los campos! No es posible hacer el registro.');
    }
  }
}
