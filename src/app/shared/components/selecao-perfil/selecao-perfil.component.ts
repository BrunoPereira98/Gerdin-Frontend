import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelecaoPerfilService} from './services/selecao-perfil.service';
import { UsuarioDto } from './models/UsuarioDto';
import { OnsSelectModel } from '../../models/ons-select-model';

@Component({
    selector: 'app-selecao-perfil',
    templateUrl: './selecao-perfil.component.html',
    styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent implements OnInit {

    perfil!: FormGroup;
    usuario: UsuarioDto = new UsuarioDto();
    perfis: OnsSelectModel[] = [];

    constructor(private formBuilder: FormBuilder,
                private selecaoPerfilService: SelecaoPerfilService) {

    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.perfil = this.formBuilder.group({
            perfil: null
        });
    }

    inicializar() {
        this.buildForm();

        if (localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'))) {
            this.perfil.controls['perfil'].setValue(localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario')));
        }

        this.selecaoPerfilService.obterDados().subscribe((res) => {

            this.usuario = res;

            if (!this.usuario) {
                localStorage.removeItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'));
                localStorage.removeItem('nomeUsuario');
            } else {
                this.usuario.EscopoOperacoes.forEach(escopo => {
                    this.perfis.push(new OnsSelectModel(escopo, escopo));
                });

                if (localStorage.getItem('nomeUsuario') !== this.usuario.Nome) {
                    localStorage.removeItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'));
                    this.perfil.controls['perfil'].setValue('');
                }

                localStorage.setItem('nomeUsuario', this.usuario.Nome);
                if (this.usuario.EscopoOperacoes.length === 1) {
                    this.perfil.controls['perfil'].setValue(this.usuario.EscopoOperacoes[0]);
                    if (!localStorage.getItem('perfilSelecionado' + this.usuario.Nome)) {
                        this.confirmar();
                    }
                } else if (!localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'))
                    && this.usuario.EscopoOperacoes.length > 1) {
                    alert('Deve ser selecionado um perfil');
                }
            }
        });
    }

    confirmar() {
        localStorage.setItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'), this.perfil.value.perfil);
        window.location.reload();
    }

    isVisualizarSelecao() {
        return !this.usuario ? 'block' : (this.usuario.EscopoOperacoes?.length > 1 ? 'block' : 'none');
    }

}
