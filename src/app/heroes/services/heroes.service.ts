import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


import { Heroe } from '../interface/heroes.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

 
  private apiEndPoint: string = environment.apiEndPoint;
  constructor( private http : HttpClient ) { }

  getHeroes() : Observable< Heroe[] >{
    return this.http.get<Heroe[]>(`${this.apiEndPoint}/heroes`);
  }

  getHerobyId(id:string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.apiEndPoint}/heroes/${id}`);
 
  }

  getSugerencias(key : string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.apiEndPoint}/heroes?q=${key}&_limit=6`);
  }

  addHeroe(heroe : Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.apiEndPoint}/heroes`,heroe);     //post para agregar

  }
  updateHeroe(heroe : Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.apiEndPoint}/heroes/${ heroe.id }`,heroe);   //put para actualizar

  }
  deleteHeroe(heroe : Heroe): Observable<any>{
    return this.http.delete<any>(`${this.apiEndPoint}/heroes/${ heroe.id }`);    //delete para borrar

  }
}
  
