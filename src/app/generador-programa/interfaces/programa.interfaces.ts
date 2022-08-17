export interface Programa {
  nombreCong     : string;
  fecha          : string;
  horaInicio     : Date;
  presidente     : string;
  oracionInicial : string;
  oracionFinal   : string;
  textoInicial   : string;
  secciones      : Seccion [];
}

export interface Seccion {
  nombreSeccion : string;
  actividades   : Actividad[]
}

export interface Actividad {
  nombreActividad : string;
  tiempo          : number;
  zona            : string;
  participantes   : Participante [];
  hora           ?: Date
}

export interface Participante {
  nombre: string;
}
