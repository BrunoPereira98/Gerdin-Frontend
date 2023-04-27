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

  matControl = new FormControl('');

  matFilteredOptions!: Observable<any[]>;

  @ViewChild('matInput', { static: true }) matInput!: ElementRef<HTMLInputElement>;

  @Input() filteredOptions: any[] = [];

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
    if (this.filteredOptions) {
      this.filteredOptions = this.padronizarItensFiltro(this.filteredOptions);
      if (this.filteredOptions.sort()) {
        this.matFilteredOptions =
          this.preencherFiltroObjeto(this.filteredOptions);
      }
    }
  }

  ngOnChanges() {
    if (this.filteredOptions) {
      this.filteredOptions = this.padronizarItensFiltro(this.filteredOptions);
      if (this.filteredOptions.sort()) {
        this.matFilteredOptions =
          this.preencherFiltroObjeto(this.filteredOptions);
      }
    }
  }

  preencherFiltroObjeto(opcoes: FiltroDto[]) {
    return this.matControl.valueChanges.pipe(
      startWith(''),
      map(value => (value === null ? '' : (value !== undefined ? value.toLowerCase() : ''))),
      map(value => this._filtrarObjeto(opcoes, value || ''))
    );
  }

  private _filtrarObjeto(opcoes: any[], item: string): string[] {
    return opcoes.filter(opcao => opcao.Descricao.toLowerCase().includes(item.toLowerCase()));
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

  selecionarItem(item: any, campo: string) {
    if (!this.isItemSelecionado(item)) {
      this.retornosFiltro.push(item);
    } else {
      this.removerItem(item);
    }
    
    if (campo === 'FS') {
      this.matFilteredOptions = new Observable<any[]>;
    }

    this.selectMetodo.emit(event);
  }

  fecharAutocomplete() {
    this.matControl.setValue('');
    this.matInput.nativeElement.value = '';
    sessionStorage.setItem('isPesquisou', 'I');
  }

  removerItem(remover: any) {
    const index = this.retornosFiltro.indexOf(remover);

    if (index >= 0) {
      this.retornosFiltro.splice(index, 1);
    }
  }

  isItemSelecionado(item: any) {
    try {
      return this.retornosFiltro.indexOf(item) >= 0;
    } catch (e) {
      return false;
    }
  }

  padronizarItensFiltro(filtroSelecionado: any) {
    let filtros: FiltroDto[] = [];

    if (filtroSelecionado) {
      filtroSelecionado.forEach((item: any) => {
        if (typeof item === 'string') {
          item = new FiltroDto(item, item, undefined);
        } else {
          item = new FiltroDto(item.Id, item.Nome, item.TipoInstalacao);
        }
        filtros.push(item)
      });
    }

    return filtros;
  }

}
