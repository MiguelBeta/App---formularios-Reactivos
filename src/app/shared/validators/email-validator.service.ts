

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class emailValidator implements AsyncValidator {



  //Se crea un propio observable para estar emitiendo los valores del email
  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscribe) => {


      console.log( { email } );

      //Pregunta si el email se encuentra presente
      if ( email === 'miguel@google.com' ){
        //Se suscribe
        subscribe.next({ emailTaken: true });
        //Cuando lo encuentra se des-suscribe
        subscribe.complete();
      }

      subscribe.next(null);
      subscribe.complete();

    }).pipe(
        delay( 3000 )
      );

      return httpCallObservable;
  }
}

    // const email = control.value;
    // console.log({ email })

    // return of({
    //   emailTaken: true
    // })
