import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { TokenStoreService } from '../storage/token-store.service';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenStoreService: TokenStoreService,
    private readonly store: Store,
    private readonly authenticationService: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/oauth2/token') || req.url.includes('/angularsettings/get')) {
      return next.handle(req);
    }

    const token = this.tokenStoreService.getStore();
    req = req.clone({
      headers: req.headers
        .set(
          'Authorization',
          token?.access_token ? 'Bearer ' + token?.access_token : ''
        )
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('perfilSelecionado', this.obterPerfilSelecionado()),
    });

    return next.handle(req).pipe(
      catchError((err) => {
        // if ([401, 403].includes(err.status) && token.refresh_token) {
        //   return this.authenticationService.refreshToken().pipe(
        //     switchMap((data) => {
        //       if (this.tokenStoreService.getToken()) {
        //         this.tokenStoreService.deletoToken();
        //       }
        //       this.tokenStoreService.addStore(data);
        //       req = req.clone({
        //         setHeaders: {
        //           Authorization: `Bearer ${data.access_token}`,
        //         },
        //       });
        //       return next.handle(req);
        //     }),
        //     catchError((error) => {
        //       return throwError(error);
        //     })
        //   );
        // }
        // return next.handle(req);
        if ([401].includes(err.status) && token) {
          console.log('Usuário não autenticado.');
        }
        return throwError(err);
      }),
      map((response) => this.handleResponse(response))
    );
  }

  private handleResponse(response: HttpEvent<any>) {
    const httpResponse = response as HttpResponse<any>;
    if (httpResponse.status !== HttpStatusCode.Ok) {
      return response;
    }

    const body = httpResponse.body;
    if (body?.success === 'undefined' || body.success === true) {
      return response;
    }

    const responseError = {
      messages: body.messages,
      success: false,
      statusCode: HttpStatusCode.BadRequest,
    };

    throwError(responseError);
    const headers = new HttpHeaders({ ...httpResponse.headers });
    return httpResponse.clone({
      headers,
      status: 400,
      statusText: 'Bad Request',
    });
  }

  private obterPerfilSelecionado() {
    const perfil = localStorage.getItem(this.obterNomeStoragePerfil());
    return perfil !== null && perfil !== undefined ?
      perfil :
      '';
  }

  private obterNomeStoragePerfil() {
    return 'perfilSelecionado' + localStorage.getItem('nomeUsuario');
  }
  
}
