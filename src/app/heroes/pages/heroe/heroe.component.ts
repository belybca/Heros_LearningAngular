import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width:100%;
      border-radius:8px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe! : Heroe;

  constructor(private activatedRoute : ActivatedRoute,
              private heroService: HeroesService,
              private router : Router) { }

  ngOnInit(): void {
    //recibo los parametros de la ruta  en este caso el id 
    //luego uso el pipe y switchMap de rxjs para transformar o este id en el heroe 
    //usando el metodo del servicio
    //es por esto que mi respuesta es de tipo heroe y la puedo utilizar o asignar a este componenente
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHerobyId(id) )
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  return(){
    this.router.navigate(['/heroes/listado'])
  }
}
