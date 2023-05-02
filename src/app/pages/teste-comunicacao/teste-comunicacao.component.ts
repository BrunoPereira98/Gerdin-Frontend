import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { User } from './models/user';
import { testeComunicacaoApi } from './store/teste-comunicacao.actions';
import { testeComunicacaoSelector } from './store/teste-comunicacao.selectors';

@Component({
  selector: 'app-teste-comunicacao',
  templateUrl: './teste-comunicacao.component.html',
  styleUrls: ['./teste-comunicacao.component.scss'],
})
export class TesteComunicacaoComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}

  testeComunicacao$ = this.store.select(testeComunicacaoSelector);
  data = '';
  user: User = {} as User;

  ngOnInit(): void {
    this.user.perfis = [];
    this.user.escopos = [];
    this.user.escopoOperacoes = [];
    this.user.operacoes = [];

    this.verifyTesteComunicacao();
    this.verifyUserAuthenticated();
  }

  private verifyTesteComunicacao(): void {
    this.store.dispatch(testeComunicacaoApi());
    this.testeComunicacao$.subscribe({
      next: (result) => (this.data = result.testeComunicacao),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  private verifyUserAuthenticated(): void {
    this.userService.getUserAuthenticated().subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));
        this.user = res;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
