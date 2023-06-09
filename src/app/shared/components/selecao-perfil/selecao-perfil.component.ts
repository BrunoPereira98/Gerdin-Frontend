import { Component, OnInit } from '@angular/core';
import { SelecaoPerfilService } from './services/selecao-perfil.service';
import { UsuarioDto } from './models/usuario-dto';
import { OnsSelectModel } from '../../models/ons-select-model';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/pages/teste-comunicacao/models/user';

@Component({
    selector: 'app-selecao-perfil',
    templateUrl: './selecao-perfil.component.html',
    styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent implements OnInit {

    perfil: string = '';
    usuario: UsuarioDto = new UsuarioDto();
    perfis: OnsSelectModel[] = [];
    perfisSelecao: string[] = [];

    constructor(private selecaoPerfilService: SelecaoPerfilService,
                private authenticationService: AuthenticationService) {

    }

    ngOnInit() {}

    inicializar() {
        if (this.obterPerfilSelecionado()) {
            this.perfil = this.obterPerfilSelecionado();
        }

        const userSelect = this.authenticationService.havePermission()

        if (userSelect) {
            this.selecaoPerfilService.obterPerfisSelecao().subscribe((res: any) => {

                this.perfisSelecao = res;
    
                if (!this.perfisSelecao) {
                    localStorage.removeItem(this.obterNomeStoragePerfil());
                    localStorage.removeItem('nomeUsuario');
                } else {
                    this.perfisSelecao.forEach(perfil => {
                        this.perfis.push(new OnsSelectModel(perfil, perfil));
                    });
    
                    if (localStorage.getItem('nomeUsuario') !== userSelect.nome) {
                        localStorage.removeItem(this.obterNomeStoragePerfil());
                        this.perfil = '';
                    }
    
                    localStorage.setItem('nomeUsuario', userSelect.nome);
                    if (this.perfisSelecao.length === 1) {
                        this.perfil = this.perfisSelecao[0];
                        if (!localStorage.getItem('perfilSelecionado' + userSelect.nome)) {
                            this.confirmar();
                        }
                    } else if (!this.obterPerfilSelecionado()
                        && this.perfisSelecao.length > 1) {
                        alert('Deve ser selecionado um perfil');
                    }
                }
            });
        }        
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
