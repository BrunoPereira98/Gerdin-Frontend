import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaInstalacoesComponent} from './consulta-instalacoes.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from 'src/app/shared/shared.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {ConsultaInstalacoesRoutingModule} from './consulta-instalacoes-routing.module';
import {MatCommonModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ConsultaInstalacoesComponent
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    FormsModule,
    SharedModule,
    ConsultaInstalacoesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {floatLabel: 'always', appearance: 'outline'},
    },
  ],
})
export class ConsultaInstalacoesModule {
}
