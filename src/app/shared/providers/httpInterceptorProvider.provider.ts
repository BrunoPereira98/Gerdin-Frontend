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
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenStoreService } from '../storage/token-store.service';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenStoreService: TokenStoreService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/oauth2/token') || req.url.includes('/angularsettings')) {
      return next.handle(req);
    }

    const token = this.tokenStoreService.getStore();
    let httpRequest: HttpRequest<any>;
    if (token) {
      httpRequest = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + token.access_token)
          .set('Content-Type', 'application/json')
          .set('Cache-Control', 'no-cache')
          .set('perfilSelecionado', this.obterPerfilSelecionado()),
      });
    } else {
      httpRequest = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
        .set('perfilSelecionado', this.obterPerfilSelecionado()),
      });
    }
    
    return next.handle(httpRequest).pipe(
      catchError((err) => {
        // if ([401].includes(err.status) && token) {
        //   this.authService.logout().then(() => console.log('Usuário não autenticado.'));
        // }

        if ([401].includes(err.status) && token) {
          console.log('Usuário não autenticado.');
        }
        
        // if ([403].includes(err.status) && token) {
        //   this.router.navigate(['/acesso-negado']).then(() => console.log('Error 403 .Redirecionado para acesso negado'));
        // }
        return throwError(err);
      }),
      map(response => this.handleResponse(response)));
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
      statusCode: HttpStatusCode.BadRequest
    }

    throwError(responseError);
    const headers = new HttpHeaders({ ...httpResponse.headers });
    return httpResponse.clone(
      {
        headers,
        status: 400,
        statusText: 'Bad Request'
      }
    );
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
