import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {



  //Crea el formulario dinamico
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ])
  });

  //Para agregar nuevo elemento al arreglo de favorits
  public newFavorite: FormControl = new FormControl('', Validators.required);

constructor( private fb: FormBuilder ) {}

//Funcion para obtener los favoriteGames en un arreglo y llamarlos en el html
//Almacenado en una propiedad controls
get favoriteGames(){
  return this.myForm.get('favoriteGames') as FormArray;
}

isValidField( field: string ): boolean | null {
  return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
}

isValidFieldInArray( formArray: FormArray, index: number ){
  return formArray.controls[index].errors
  && formArray.controls[index].touched;
}

getFieldError( field: string ): string | null {

  if ( !this.myForm.controls[field] ) return null;

  const errors = this.myForm.controls[field].errors || {};

  for (const key of Object.keys(errors) ) {
    switch( key ) {
      case 'required':
        return 'Este campo es requerido';

      case 'minlength':
        return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
    }
  }

  return null;
}

onAddToFavorites():void{
  //Si el elemento es invalido salir de la funcion
  if( this.newFavorite.invalid ) return;
  const newGame = this.newFavorite.value;
  this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    // this.newFavorite.reset();
}

onDeleteFavorite(index:number): void{
  //Se extrae primero el arreglo y despues se busca la posicion para eliminar
  this.favoriteGames.removeAt(index);
  console.log( this.favoriteGames.value );

}


onSubmit():void{

    //Si formulario no es valido marca los campos como manipulados y sale de la funcion
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    //Si es valido imprime los valores y resetea con campos
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();

  }


}

