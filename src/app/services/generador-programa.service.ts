import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Programa } from '../generador-programa/interfaces/programa.interfaces';
import { UploadResponse, MenuEPUB, ProgramaResponse } from '../generador-programa/interfaces/responses-interfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneradorProgramaService {

  private _baseUrl = environment.baseUrl;

  private _sharingProgramaObservable: BehaviorSubject<Programa[]> =
          new BehaviorSubject<Programa[]>([])

  constructor( private http: HttpClient ) { }

  get sharingProgramaObservable() {
    console.log('GET')
    console.log( this._sharingProgramaObservable.value)
    return this._sharingProgramaObservable.asObservable();
  }

  set sharingProgramaObservableData( data: Programa[] ) {
    console.log('SET')
    this._sharingProgramaObservable.next(data);
    // this._sharingProgramaObservable.next( Object.assign( [], data ));
    // console.log( this._sharingProgramaObservable.value)
  }

  uploadFile( files: any ): Observable<UploadResponse> {
    const url = `${this._baseUrl}/upload-file`

    return this.http.post<UploadResponse>( url, files )
      .pipe(
        tap( resp => {
          if( resp.ok) {
            this._saveLocalStorage(resp);
          }
        }),
        catchError( err => of(err.error.msg))
      )
  }

  getMenuInfo(): Observable<MenuEPUB[]> {
    const epubFile = localStorage.getItem('bookNameFile');
    const url: string = `${this._baseUrl}/obtener-menu/${epubFile}`;
    return this.http.get<MenuEPUB[]>( url )
      .pipe(
        catchError( err => of(err.error) )
      );
  }


  getProgramData( chapter: string ): Observable<ProgramaResponse> {

    const epubFile = localStorage.getItem('bookNameFile');
    const url = `${this._baseUrl}/generar-programa/${chapter}?book=${epubFile}`
    return this.http.get<ProgramaResponse>( url )
      .pipe(
        catchError( err => of( err.error ))
      )

  }


  private _saveLocalStorage( fileName: UploadResponse ) {
    localStorage.setItem('bookNameFile', fileName.file_name! )
  }
}
