import { Component, Input } from '@angular/core';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-heroes-cards-component',
  templateUrl: './heroes-cards-component.component.html',
  styles: [
      `
      mat-card{
        margin-top:20px;
      }
      `
  ]
})


export class HeroesCardsComponentComponent  {

 
  @Input() heroe!: Heroe;
 
}
