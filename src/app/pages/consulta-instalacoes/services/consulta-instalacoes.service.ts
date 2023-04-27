import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResult} from "../../../shared/models/BaseResult";
import {InstalacaoModel} from "../models/InstalacaoModel";

@Injectable({
  providedIn: 'root'
})
export class ConsultaInstalacoesService {
  apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getInstalacoes(): Observable<BaseResult<InstalacaoModel[]>> {
    return this.httpClient.get<BaseResult<InstalacaoModel[]>>(this.apiUrl + 'UsinaConjuntoUsina/ConsultarInstalacoes');
  }
}
