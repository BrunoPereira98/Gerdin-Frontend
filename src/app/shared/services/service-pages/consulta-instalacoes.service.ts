import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultaInstalacoesService {
  apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getInstalacoes(): Observable<any> {
    return this.httpClient.get<any[]>(this.apiUrl + 'UsinaConjuntoUsina/ConsultarInstalacoes');
  }
}
