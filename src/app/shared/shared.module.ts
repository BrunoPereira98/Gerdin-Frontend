import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
// import { ngxLoadingAnimationTypes } from './components/ngx-loading/ngx-loading-config';
// import { OnsDataModule } from './components/ons-data/ons-data.module';
// import { OnsFiltroPesquisaModule } from './components/ons-filtro-pesquisa/ons-filtro-pesquisa.module';
// import { OnsInputModule } from './components/ons-input/ons-input.module';
import { AngularSettingsService } from './services/angular-settings.service';
import { AuthenticationService } from './services/authentication.service';
import { AngularSettingsStoreService } from './storage/angular-settings-store.service';
import { TokenStoreService } from './storage/token-store.service';
import { AngularSettingEffect } from './store/angular-setting.effect';
import { angularSettingReducer } from './store/angular-setting.reducer';

import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/legacy-form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MenuTabModule } from './components/menu-tab/menu-tab.module';
// import { AlertComponent } from './components/alert/alert.component';
// import { NgxLoadingModule } from './components/ngx-loading/ngx-loading.module';
// import { OnsCalendarModule } from './components/ons-calendar/ons-calendar.module';
// import { OnsInputAutocompleteModule } from './components/ons-input-autocomplete/ons-input-autocomplete.module';
// import { OnsInputNumberModule } from './components/ons-input-number/ons-input-number.module';
// import { OnsSelectModule } from './components/ons-select/ons-select.module';
// import { NumberDirective } from './directive/number.directive';
// import { MaterialModule } from './material-module/material.module';
// import { MyCustonPaginatorIntl } from './models/my-custon-paginator-intl';
// import { PermissaoPipe } from './pipes/permissao.pipe';
@NgModule({
  declarations: [
    // NumberDirective, AlertComponent, PermissaoPipe
  ],
  providers: [
    AngularSettingsService,
    AngularSettingsStoreService,
    TokenStoreService,
    AuthenticationService,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MomentDateModule,
    MenuTabModule,
    // MaterialModule,
    // ConfirmDialogModule,
    StoreModule.forFeature('angularSetting', angularSettingReducer),
    EffectsModule.forFeature([AngularSettingEffect]),
    // OnsInputModule,
    // OnsInputNumberModule,
    // OnsCalendarModule,
    // OnsSelectModule,
    // OnsFiltroPesquisaModule,
    // OnsDataModule,
    // OnsInputAutocompleteModule,
    // NgxLoadingModule.forRoot({
    //   animationType: ngxLoadingAnimationTypes.rectangleBounce,
    //   backdropBackgroundColour: 'rgba(0,0,0,0.6)',
    //   primaryColour: '#E06F36',
    //   secondaryColour: '#E06F36',
    //   tertiaryColour: '#E06F36',
    //   fullScreenBackdrop: true,
    // }),
  ],
  exports: [
    MenuTabModule,
    // NumberDirective,
    // MaterialModule,
    // ConfirmDialogModule,
    // OnsInputModule,
    // OnsInputNumberModule,
    // OnsCalendarModule,
    // OnsSelectModule,
    // OnsFiltroPesquisaModule,
    // OnsDataModule,
    // OnsInputAutocompleteModule,
    // PermissaoPipe,
    // NgxLoadingModule,
  ],
})
export class SharedModule {}