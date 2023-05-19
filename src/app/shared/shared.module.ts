import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularSettingsService } from './services/angular-settings.service';
import { AuthenticationService } from './services/authentication.service';
import { AngularSettingsStoreService } from './storage/angular-settings-store.service';
import { TokenStoreService } from './storage/token-store.service';
import { AngularSettingEffect } from './store/angular-setting.effect';
import { angularSettingReducer } from './store/angular-setting.reducer';

import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/legacy-form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MenuTabModule } from './components/menu-tab/menu-tab.module';
import { StatusBarModule } from './components/status-bar/status-bar.module';
import { SelecaoPerfilModule } from './components/selecao-perfil/selecao-perfil.module';
import { VersaoSistemaModule } from './components/versao-sistema/versao-sistema.module';
import { FiltroModule } from './components/filtro/filtro.module';
import { OnsInputModule } from './components/ons-input/ons-input.module';
import { OnsInputNumberModule } from './components/ons-input-number/ons-input-number.module';
import { OnsCalendarModule } from './components/ons-calendar/ons-calendar.module';
import { OnsSelectModule } from './components/ons-select/ons-select.module';
import { OnsFiltroPesquisaModule } from './components/ons-filtro-pesquisa/ons-filtro-pesquisa.module';
import { OnsDataModule } from './components/ons-data/ons-data.module';
import { OnsInputAutocompleteModule } from './components/ons-input-autocomplete/ons-input-autocomplete.module';
import { MaterialModule } from './material-module/material.module';
import { OnsInputAutocompleteChipListModule } from './components/ons-input-autocomplete-chip-list/ons-input-autocomplete-chip-list.module';
import { LoadingModule } from './components/loading/loading.module';
import { AlertModule } from './components/alert/alert.module';
import { MaxLengthNumberDirective } from './directive/max-length-number.directive/max-length-number.directive';
import { NonNullNumbersDirective } from './directive/non-null-number.directive';
import { EdicaoComandoOperacaoModule } from './components/edicao-comando-operacao/edicao-comando-operacao.module';
import { OnsTextareaModule } from './components/ons-textarea/ons-textarea.module';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { OnsDatetimeModule } from './components/ons-datetime/ons-datetime.module';

@NgModule({
  declarations: [
    // NumberDirective, AlertComponent, PermissaoPipe
    MaxLengthNumberDirective, NonNullNumbersDirective
  ],
  providers: [
    AngularSettingsService,
    AngularSettingsStoreService,
    TokenStoreService,
    AuthenticationService,
    DatePipe,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'DD/MM/YYYY HH:mm',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'outline' },
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
    { provide: MatPaginatorIntl, 
      // useClass: MyCustonPaginatorIntl 
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MomentDateModule,
    MenuTabModule,
    MaterialModule,
    StoreModule.forFeature('angularSetting', angularSettingReducer),
    EffectsModule.forFeature([AngularSettingEffect]),
    OnsInputModule,
    OnsInputNumberModule,
    OnsCalendarModule,
    OnsSelectModule,
    OnsFiltroPesquisaModule,
    OnsDataModule,
    OnsInputAutocompleteModule,
    OnsInputAutocompleteChipListModule,
    OnsInputAutocompleteChipListModule,
    StatusBarModule,
    SelecaoPerfilModule,
    VersaoSistemaModule,
    FiltroModule,
    LoadingModule,
    AlertModule,
    EdicaoComandoOperacaoModule,
    OnsTextareaModule,
    ConfirmDialogModule,
    OnsDatetimeModule
  ],
  exports: [
    MenuTabModule,
    MaterialModule,
    OnsInputModule,
    OnsInputNumberModule,
    OnsCalendarModule,
    OnsSelectModule,
    OnsFiltroPesquisaModule,
    OnsDataModule,
    OnsInputAutocompleteModule,
    StatusBarModule,
    SelecaoPerfilModule,
    VersaoSistemaModule,
    FiltroModule,
    LoadingModule,
    AlertModule,
    EdicaoComandoOperacaoModule,
    OnsTextareaModule,
    ConfirmDialogModule,
    OnsDatetimeModule
  ],
})
export class SharedModule {}
