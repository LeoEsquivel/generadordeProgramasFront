export interface MenuEPUB {
  _Menu__route?: string;
  _Menu__name? : string;
  msg?         : string;
  extra?       : string;
}

export interface UploadResponse {
  file_name?: string;
  msg       : string;
  ok?       : boolean;
}

export interface ProgramaResponse {
  _Programa__nombreCong  ?: string;
  _Programa__fecha       ?: string;
  _Programa__horaInicio  ?: Date;
  _Programa__textoInicial?: string;
  _Programa__secciones   ?: ProgramaSeccion[];
  msg                    ?: string
}

export interface ProgramaSeccion {
  _Seccion__nombreSeccion: null | string;
  _Seccion__actividades:   SeccionActividad[];
}

export interface SeccionActividad {
  _Actividad__nombreActividad: string;
  _Actividad__tiempo:          number[];
  _Actividad__zona:            string;
  _Actividad__participantes:   string[];
}
