import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GeneradorProgramaService } from '../../../services/generador-programa.service';
import { Programa, Actividad } from '../../interfaces/programa.interfaces';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent {

  programa    !: Programa[]
  horaInicial !: Date; //Mantener la hora inicial guardada
  hora        !: Date; //Es la hora que enviamos y recibimos



  constructor( private gpService: GeneradorProgramaService ) {

    this.programa = [
      {
        nombreCong: 'Cong. Chapultepec',
        fecha: '16-22 Mayo 2022',
        textoInicial: '2 Samuel 1-3',
        presidente: 'Miguel Ortega Castañeda',
        oracionInicial: 'Hector García Arguello',
        oracionFinal: 'Daniel Gutierrez Acosta',
        horaInicio: new Date('August 19, 1975 18:00:00'),
        secciones: [
          {
            nombreSeccion: '',
            actividades: [
              {
                nombreActividad: 'Canción 103',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: 'Palabras de introducción',
                tiempo: 1,
                zona: 'Zona Principal',
                participantes: []
              }
            ]
          },
          {
            nombreSeccion: 'Tesoros de la biblia',
            actividades: [
              {
                nombreActividad: '"¿Que aprendemos de la canción El arco?"',
                tiempo: 10,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Abdiel Bazarte Trejo'
                  }
                ]
              },
              {
                nombreActividad: 'Busquemos perlas escondidas',
                tiempo: 10,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Ignacio Gutiérrez Cruz'
                  }
                ]
              },
              {
                nombreActividad: 'Lectura de la biblia',
                tiempo: 4,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Nahúm Hernández Peña'
                  }
                ]
              }
            ]
          },
          {
            nombreSeccion: 'Seamos mejores maestros',
            actividades: [
              {
                nombreActividad: 'Primera conversación',
                tiempo: 3,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Nery Rdz'
                  },
                  {
                    nombre: 'Martín Hdz'
                  }
                ]
              },
              {
                nombreActividad: 'Revisita',
                tiempo: 4,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Ismael Z.'
                  },
                  {
                    nombre: 'Martín Ruiz'
                  }
                ]
              },
              {
                nombreActividad: 'Curso bíblico',
                tiempo: 5,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Gloria de P.'
                  },
                  {
                    nombre: 'Perla de G.'
                  }
                ]
              }
            ]
          },
          {
            nombreSeccion: 'Nuestra vida cristiana',
            actividades: [
              {
                nombreActividad: 'Canción 107',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: 'Informe 3 del Cuerpo Gobernante',
                tiempo: 15,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Miguel Ortega Castañeda'
                  }
                ]
              },
              {
                nombreActividad: 'Estudio bíblico de la congregación',
                tiempo: 30,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Roman Rdz'
                  },
                  {
                    nombre: 'Inocencio T.'
                  }
                ]
              },
              {
                nombreActividad: 'Palabras de conclusión',
                tiempo: 3,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: 'Canción 2',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              }
            ]
          }
        ]
      },
      {
        nombreCong: 'Cong. Chapultepec',
        fecha: '23-29 Mayo 2022',
        textoInicial: '2 Samuel 4-6',
        presidente: 'Daniel Gutierrez ACosta',
        oracionInicial: 'Gerardo Avalos Martinez',
        oracionFinal: 'Daniel Gutierrez Acosta',
        horaInicio: new Date('August 19, 1975 18:00:00'),
        secciones: [
          {
            nombreSeccion: '',
            actividades: [
              {
                nombreActividad: 'Canción 135',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: 'Palabras de introducción',
                tiempo: 1,
                zona: 'Zona Principal',
                participantes: []
              }
            ]
          },
          {
            nombreSeccion: 'Tesoros de la biblia',
            actividades: [
              {
                nombreActividad: '"Mantengamos un temor sano a Jehová"',
                tiempo: 10,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Hector García Arguello'
                  }
                ]
              },
              {
                nombreActividad: 'Busquemos perlas escondidas',
                tiempo: 10,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Abdiel Bazarte Trejo'
                  }
                ]
              },
              {
                nombreActividad: 'Lectura de la biblia',
                tiempo: 4,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Jaime García González'
                  }
                ]
              }
            ]
          },
          {
            nombreSeccion: 'Seamos mejores maestros',
            actividades: [
              {
                nombreActividad: 'Primera conversación',
                tiempo: 3,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Laura J.'
                  },
                  {
                    nombre: 'Monico de O.'
                  }
                ]
              },
              {
                nombreActividad: 'Revisita',
                tiempo: 4,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Airam de Z.'
                  },
                  {
                    nombre: 'Cyntia de R.'
                  }
                ]
              },
              {
                nombreActividad: 'Discurso',
                tiempo: 5,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Inocencio Trejo Flores'
                  }
                ]
              }
            ]
          },
          {
            nombreSeccion: 'Nuestra vida cristiana',
            actividades: [
              {
                nombreActividad: 'Canción 143',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: '¿Estan preparados para afrontar los disturbios?',
                tiempo: 15,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Miguel Ortega Castañeda'
                  }
                ]
              },
              {
                nombreActividad: 'Estudio bíblico de la congregación',
                tiempo: 30,
                zona: 'Zona Principal',
                participantes: [
                  {
                    nombre: 'Daniel Gtz'
                  },
                  {
                    nombre: 'Jaime García'
                  }
                ]
              },
              {
                nombreActividad: 'Palabras de conclusión',
                tiempo: 3,
                zona: 'Zona Principal',
                participantes: []
              },
              {
                nombreActividad: 'Canción 96',
                tiempo: 0,
                zona: 'Zona Principal',
                participantes: []
              }
            ]
          }
        ]
      }
    ];

    this.horaInicial = this.programa[0].horaInicio;

    this.hora = this.programa[0].horaInicio;
  }

  resetHour() {
    this.hora = this.horaInicial
  }

  updateMinutes( activity?: Actividad ) {
    if (activity) {
      activity.hora = this.hora;
    }
    const updatedTime = this.gpService.addMinutes( this.hora, activity?.tiempo );
    this.hora = updatedTime;
  }

  updateTime( updatedTime: Date ) {
    this.hora = updatedTime;
  }

  downloadPDF() {
    const DATA = document.getElementById('contenido-programa');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
