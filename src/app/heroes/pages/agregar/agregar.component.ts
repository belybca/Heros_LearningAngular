import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width:100%;
      border-radius: 7px;
    }
    
    `
  ]
})
export class AgregarComponent implements OnInit {

    publishers =[
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    } ,
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
    
  ]

  heroe: Heroe={
      superhero:'',
      alter_ego:'',
      characters:'',
      first_appearance:'',
      publisher:Publisher.MarvelComics,
      alt_img:''
  }
  constructor(private heroservice : HeroesService, 
              private activatedRoute :ActivatedRoute,
              private router : Router,
              private snackbar : MatSnackBar,
              private dialog : MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroservice.getHerobyId(id))
    )
    .subscribe(heroe => this.heroe = heroe)
  }
  save(){
   // console.log(this.heroe);
   if(this.heroe.superhero.trim().length===0 || this.heroe.alt_img?.trim().length===0){
     return
   }

    if(this.heroe.id){
      //Update
      this.heroservice.updateHeroe(this.heroe)
        .subscribe(heroe => this.showSnackbar('Hero was Updated'));
    }else{
      //add
      this.heroservice.addHeroe(this.heroe)
      .subscribe(heroe => {
       this.router.navigate(['/heroes/editar', heroe.id]);
       this.showSnackbar('Hero was Added')
      })
    }
  }
  delete(){
    const dialog =   this.dialog.open(DialogConfirmComponent,{
        width:'350px',
        data: this.heroe
      });

      dialog.afterClosed().subscribe((result =>{
        if(result){

          this.heroservice.deleteHeroe(this.heroe)
          .subscribe(heroe => {
            this.router.navigate(['/heroes']);
            console.log('deleted');
          })

        }

      }))
  }
  showSnackbar(msj: string){
   this.snackbar.open(msj, 'Ok!',{
     duration:2500
   })
  }
}
