import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  key : string= "";
  heroes: Heroe[] =[];
  selectedHero : Heroe | undefined;

  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
  }
  search(){
      this.heroesService.getSugerencias( this.key)
      .subscribe(heroes => this.heroes = heroes)
  }
  selectedOption( event :MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }
    
    const heroe : Heroe = event.option.value;
    this.key = heroe.superhero;

    this.heroesService.getHerobyId(heroe.id!)
    .subscribe( heroe => this.selectedHero = heroe)

  }
}
