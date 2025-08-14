import { Injectable, inject } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

export class ConnectedUser {
  constructor(public id: number, public email: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

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
  #connectedUser$ = new BehaviorSubject<ConnectedUser | null>(null);
  connectedUser$ = this.#connectedUser$.asObservable();
  isLoggedIn$ = this.connectedUser$.pipe(map((user) => !!user));
  isLoggedOut$ = this.connectedUser$.pipe(map((user) => !user));

  constructor() {
    const user = localStorage.getItem(CONSTANTES.connectedUser);
    if (user) {
      this.#connectedUser$.next(JSON.parse(user));
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap( apiResponse => {
        this.saveToken(apiResponse.id);
        const connectedUser: ConnectedUser = {
          id: apiResponse.userId,
          email: credentials.email
        };
        localStorage.setItem(CONSTANTES.connectedUser, JSON.stringify(connectedUser));
        this.#connectedUser$.next(connectedUser);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
    localStorage.removeItem(
      CONSTANTES.connectedUser,
    );
    this.#connectedUser$.next(null);
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
