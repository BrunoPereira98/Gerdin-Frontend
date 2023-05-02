import { Component, OnInit } from '@angular/core';
import { SelecaoPerfilService } from './services/selecao-perfil.service';
import { UsuarioDto } from './models/usuario-dto';
import { OnsSelectModel } from '../../models/ons-select-model';

@Component({
    selector: 'app-selecao-perfil',
    templateUrl: './selecao-perfil.component.html',
    styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent implements OnInit {

    perfil: string = '';
    usuario: UsuarioDto = new UsuarioDto();
    perfis: OnsSelectModel[] = [];

    constructor(private selecaoPerfilService: SelecaoPerfilService) {

    }

    ngOnInit() {
        if (this.obterPerfilSelecionado()) {
            this.perfil = this.obterPerfilSelecionado();
        }

        this.selecaoPerfilService.obterDados().subscribe((res) => {

            this.usuario = res;

            if (!this.usuario) {
                localStorage.removeItem(this.obterNomeStoragePerfil());
                localStorage.removeItem('nomeUsuario');
            } else {
                this.usuario.EscopoOperacoes.forEach(escopo => {
                    this.perfis.push(new OnsSelectModel(escopo, escopo));
                });

                if (localStorage.getItem('nomeUsuario') !== this.usuario.Nome) {
                    localStorage.removeItem(this.obterNomeStoragePerfil());
                    this.perfil = '';
                }

                localStorage.setItem('nomeUsuario', this.usuario.Nome);
                if (this.usuario.EscopoOperacoes.length === 1) {
                    this.perfil = this.usuario.EscopoOperacoes[0];
                    if (!localStorage.getItem('perfilSelecionado' + this.usuario.Nome)) {
                        this.confirmar();
                    }
                } else if (!this.obterPerfilSelecionado()
                    && this.usuario.EscopoOperacoes.length > 1) {
                    alert('Deve ser selecionado um perfil');
                }
            }
        });
    }

    confirmar() {
        localStorage.setItem(this.obterNomeStoragePerfil(), this.perfil);
        window.location.reload();
    }

    isVisualizarSelecao() {
        return !this.usuario ? 'block' : (this.usuario.EscopoOperacoes?.length > 1 ? 'block' : 'none');
    }

    obterPerfilSelecionado() {
        const perfil = localStorage.getItem(this.obterNomeStoragePerfil());
        return perfil !== null && perfil !== undefined ?
            perfil :
            '';
    }

    obterNomeStoragePerfil() {
        return 'perfilSelecionado' + localStorage.getItem('nomeUsuario');
    }

}
