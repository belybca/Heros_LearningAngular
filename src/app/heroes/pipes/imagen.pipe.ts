import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false
  // //en este caso pure esta en false porq cuando se hace el update el argumento no cambia sigue siendo o apuntando al mismo objeto sin importar que hayan cambiado
  // //alguno de sus atributos al ponerlo en falso siempre hara el transform en cada paso del ciclo de detection pero esto consume bastante recursos
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe): string {

    if( !value.id && !value.alt_img){
      return `assets/no-image.png`;
    }else if(value.alt_img){
      return value.alt_img;
    }else{  
      return `assets/heroes/${value.id}.jpg`;
    }
  }

}
