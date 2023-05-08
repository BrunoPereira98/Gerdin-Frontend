import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SelectItem } from '../../models/select-Item';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ItemSelecao } from './models/item-selecao';
import { FiltroDto } from '../filtro/dto/filtro-dto';

const INPUT_AUTOCOMPLETE_FIEL_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsInputAutocompleteChipListComponent),
  multi: true,
};

@Component({
  selector: 'ons-input-autocomplete-chip-list',
  templateUrl: './ons-input-autocomplete-chip-list.component.html',
  styleUrls: ['./ons-input-autocomplete-chip-list.component.scss'],
  providers: [INPUT_AUTOCOMPLETE_FIEL_VALUER_ACCESSOR],
})
export class OnsInputAutocompleteChipListComponent implements ControlValueAccessor, OnInit {
  @Input() placeHolder!: string;
  @Input() myControl: any;
  @Input() label!: string;
  // @Input() filteredOptions!: Observable<SelectItem[]>;
  @Input() isReadOnly = false;
  @Input() name!: string;
  @Input() id!: any;
  @Input() disabled = true;

  @Output() keyUp = new EventEmitter();
  @Output() keyDown = new EventEmitter();
  @Output() selectMetodo = new EventEmitter();

  private innerValue: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  public retornosFiltro: any[] = [];

  @Input() matControl = new FormControl('');

  matFilteredOptions!: Observable<any[]>;

  @ViewChild('matInput', { static: true }) matInput!: ElementRef<HTMLInputElement>;

  @Input() filteredOptions: any[] = [];

  @Input() multiselecao: boolean = true;

  @Input() campoSalvar: string = '';

  filtradoVazio = false;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  carregarSalvos() {
    if (this.campoSalvar
        && sessionStorage.getItem(this.campoSalvar)) {
          const valores = sessionStorage.getItem(this.campoSalvar);
          this.retornosFiltro = JSON.parse(valores ? valores : '');
          this.value = this.retornosFiltro;
    }
  }

  ngOnDestroy() {
    if (this.campoSalvar) {
      sessionStorage.setItem(this.campoSalvar, JSON.stringify(this.retornosFiltro));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredOptions'].currentValue !==  changes['filteredOptions'].previousValue ) {
      this.inicializarFiltros();
    }
  }

  inicializarFiltros() {
    if (this.filteredOptions) {
      const opcoesPadronizadas = this.padronizarItens(this.filteredOptions);
      if (opcoesPadronizadas.sort()) {
        this.matFilteredOptions =
          this.preencherFiltroObjeto(opcoesPadronizadas);
      }
    }
  }

  preencherFiltroObjeto(opcoes: ItemSelecao[]) {
    return this.matControl.valueChanges.pipe(
      startWith(''),
      map(value => (value === null ? '' : (value !== undefined ? value.toLowerCase() : ''))),
      // map(value => (
      //   value === null ?
      //     '' :
      //     (value !== undefined ?
      //       (value as unknown as ItemSelecao).Descricao?.toLowerCase() :
      //       ''))),
      map(value => this._filtrarObjeto(opcoes, value || ''))
    );
  }

  private _filtrarObjeto(opcoes: any[], item: string): string[] {
    const filtrado = opcoes.filter(opcao => opcao.Descricao.toLowerCase().includes(item.toLowerCase()));
    this.filtradoVazio = !filtrado;
    return filtrado;
    // return opcoes.filter(opcao => (opcao.Descricao ? opcao.Descricao : '').toLowerCase().includes(item.toLowerCase()));
  }

  onChangeCb: (_: any) => void = () => { };
  onTouchedCb: (_: any) => void = () => { };

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  onKeyUp(event: any) {
    this.keyUp.emit(event);
  }

  onKeyDown(event: any) {
    this.keyDown.emit(event);
  }

  onDisplayFn(item: SelectItem | null): string {
    return item && item.label ? item.label : '';
  }

  selecionarItem(item: any) {
    if (!this.isItemSelecionado(item)) {
      this.retornosFiltro.push(item);

      if (!this.multiselecao) {
        this.matFilteredOptions = new Observable<any[]>;
      }
    } else {
      this.removerItem(item);
    }

    this.value = this.retornosFiltro;
    this.filtradoVazio = true;

    this.selectMetodo.emit(event);
  }

  fecharAutocomplete() {
    if (this.filtradoVazio) {
      this.limparCampo();
      this.filtradoVazio = false;
    }
  }

  limparCampo() {
    this.matControl.setValue('');
    this.matInput.nativeElement.value = '';
    sessionStorage.setItem('isPesquisou', 'I');
  }

  removerItem(remover: any) {
    const index = this.retornosFiltro.indexOf(remover);

    if (index >= 0) {
      this.retornosFiltro.splice(index, 1);
    }

    if (!this.multiselecao) {
      this.inicializarFiltros();
    }
  }

  isItemSelecionado(item: any) {
    try {
      return this.retornosFiltro.indexOf(item) >= 0;
    } catch (e) {
      return false;
    }
  }

  padronizarItens(itemSelecionado: any) {
    let itens: ItemSelecao[] = [];

    if (itemSelecionado) {
      itemSelecionado.forEach((item: any) => {
        if (typeof item === 'string') {
          item = new ItemSelecao(item, item, undefined);
        } else if (item['Nome']) {
          item = new ItemSelecao(item.Id.toString(), item.Nome, item.Fonte);
        } else if (item['Descricao']) {
          item = new ItemSelecao(item.Id.toString(), item.Descricao, undefined);
        } else if (item['Condicao']) {
          item = new ItemSelecao(item.Codigo.toString(), item.Condicao, undefined);
        }
        
        itens.push(item)
      });
    }

    return itens;
  }

  limpar() {
    this.retornosFiltro = [];
    this.value = this.retornosFiltro;
  }

}
