import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ons-filtro-pesquisa',
  templateUrl: './ons-filtro-pesquisa.component.html',
  styleUrls: ['./ons-filtro-pesquisa.component.scss'],
})
export class OnsFiltroPesquisaComponent implements OnInit {
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Input() labelButton: string = '';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
