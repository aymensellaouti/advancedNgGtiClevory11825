import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

export class ConnectedUser {
  constructor(public id: number, public email: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Todos:
   * Ajouter un stream pour le user authentifié
   * Ajouter un stream qui informe qu'on est authentifié
   * Ajouter un stream qui informe qu'on n'est pas authentifié
   * Utiliser le dans le NavbarComponent et dans le DetailsCvComponent
   *
   * Garder la trace de l'utilisateur authentifié meme si on recharge l'application
   * Afficher dans le menu le mail de l'utilisateur authentifié sinon anonnyme
   */



  constructor(private http: HttpClient) {}

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
  }

  saveToken(token: string) {
    localStorage.setItem(CONSTANTES.token, token);
  }

  getToken(): string {
    return localStorage.getItem(CONSTANTES.token) ?? '';
  }

  removeToken() {
    localStorage.removeItem(CONSTANTES.token);
  }

}
