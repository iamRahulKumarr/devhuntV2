import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  host:{
    class: 'd-block position-relative vh-100 vw-100'
  }
})
export class AuthComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);

  private service: AuthService = inject(AuthService);

  public form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public formSubmit(){
    const formPayload = this.form.value;

    this.service.login(formPayload).subscribe({
      next: (value: any) =>{
        console.log(value);
      },
      error: (error: HttpErrorResponse)=>{

       if([401].includes(error.status)){
        this.form.setErrors({server: error.message});
       }

      }
    })
  }
}
