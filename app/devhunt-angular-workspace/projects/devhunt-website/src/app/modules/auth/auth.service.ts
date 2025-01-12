import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'devhunt-angular-workspace/environments/environment.development';

import {LoginPayload} from 'devhunt-api/src/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public API_ROOT = environment.API_ROOT;

  private httpClient: HttpClient = inject(HttpClient);

  public login(LoginPayload: LoginPayload){
    return this.httpClient.post(this.API_ROOT + '/v1/auth/login', LoginPayload);
  }

}
